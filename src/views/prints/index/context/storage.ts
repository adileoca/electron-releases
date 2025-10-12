import { logDebug, logWarn } from "@/lib/logging";
import { ContextData } from "./types";

const DB_NAME = "adipan-cache-prints";
const DB_VERSION = 1;
const STORE_NAME = "prints-cache";
const STORE_INDEX_TIMESTAMP = "timestamp";
const INDEXED_DB_MAX_ENTRIES = 200;

const STORAGE_KEY_FALLBACK = "prints:list-cache";
const FALLBACK_MAX_ENTRIES = 20;

type StoredPrintsCacheEntry = {
  key: string;
  data: ContextData;
  timestamp: number;
};

type StoredPrintsCache = Record<string, StoredPrintsCacheEntry>;

let cachedDb: IDBDatabase | null = null;
let dbInitPromise: Promise<IDBDatabase | null> | null = null;

const supportsIndexedDb = () =>
  typeof window !== "undefined" && !!window.indexedDB;

const getIndexedDb = (): Promise<IDBDatabase | null> => {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  if (!supportsIndexedDb()) {
    return Promise.resolve(null);
  }

  if (dbInitPromise) {
    return dbInitPromise;
  }

  dbInitPromise = new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "key" });
          store.createIndex(STORE_INDEX_TIMESTAMP, STORE_INDEX_TIMESTAMP);
        }
      };

      request.onsuccess = () => {
        const db = request.result;
        cachedDb = db;

        db.onclose = () => {
          cachedDb = null;
          dbInitPromise = null;
        };

        db.onversionchange = () => {
          db.close();
          cachedDb = null;
          dbInitPromise = null;
        };

        resolve(db);
      };

      request.onerror = () => {
        logWarn("prints-storage-open-error", { error: request.error });
        resolve(null);
      };

      request.onblocked = () => {
        logWarn("prints-storage-open-blocked");
      };
    } catch (error) {
      logWarn("prints-storage-init-error", { error });
      resolve(null);
    }
  });

  return dbInitPromise;
};

const readFromIndexedDb = async (key: string) => {
  const db = await getIndexedDb();
  if (!db) return undefined;

  return new Promise<StoredPrintsCacheEntry | undefined>((resolve) => {
    try {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => {
        const entry = request.result as StoredPrintsCacheEntry | undefined;
        if (entry && entry.data) {
          logDebug("prints-local-cache-hit", {
            key,
            ageMs: Date.now() - entry.timestamp,
          });
        }
        resolve(entry);
      };
      request.onerror = () => {
        logWarn("prints-storage-read-error", { key, error: request.error });
        resolve(undefined);
      };
    } catch (error) {
      logWarn("prints-storage-read-error", { key, error });
      resolve(undefined);
    }
  });
};

const countIndexedDbEntries = async (db: IDBDatabase) =>
  new Promise<number>((resolve, reject) => {
    try {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const countRequest = store.count();
      countRequest.onsuccess = () => resolve(countRequest.result);
      countRequest.onerror = () =>
        reject(countRequest.error ?? new Error("count failed"));
    } catch (error) {
      reject(error);
    }
  });

const deleteOldestIndexedDbEntries = async (
  db: IDBDatabase,
  entriesToRemove: number
) => {
  if (entriesToRemove <= 0) return;

  await new Promise<void>((resolve) => {
    try {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index(STORE_INDEX_TIMESTAMP);
      let removed = 0;

      const cursorRequest = index.openCursor();
      cursorRequest.onsuccess = () => {
        const cursor = cursorRequest.result;
        if (!cursor) return;
        if (removed >= entriesToRemove) return;
        cursor.delete();
        removed += 1;
        cursor.continue();
      };

      cursorRequest.onerror = () => {
        logWarn("prints-storage-trim-cursor-error", {
          error: cursorRequest.error,
        });
      };

      transaction.oncomplete = () => {
        if (removed > 0) {
          logDebug("prints-local-cache-trim", { removed });
        }
        resolve();
      };
      transaction.onerror = () => {
        logWarn("prints-storage-trim-tx-error", { error: transaction.error });
        resolve();
      };
    } catch (error) {
      logWarn("prints-storage-trim-error", { error });
      resolve();
    }
  });
};

const writeToIndexedDb = async (entry: StoredPrintsCacheEntry) => {
  const db = await getIndexedDb();
  if (!db) return;

  await new Promise<void>((resolve) => {
    try {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(entry);

      request.onerror = () => {
        logWarn("prints-storage-write-error", {
          key: entry.key,
          error: request.error,
        });
      };

      transaction.oncomplete = () => {
        logDebug("prints-local-cache-write", { key: entry.key });
        resolve();
      };
      transaction.onerror = () => {
        logWarn("prints-storage-transaction-error", {
          key: entry.key,
          error: transaction.error,
        });
        resolve();
      };
    } catch (error) {
      logWarn("prints-storage-write-error", { key: entry.key, error });
      resolve();
    }
  });

  try {
    const totalEntries = await countIndexedDbEntries(db);
    const excessEntries = totalEntries - INDEXED_DB_MAX_ENTRIES;
    if (excessEntries > 0) {
      await deleteOldestIndexedDbEntries(db, excessEntries);
    }
  } catch (error) {
    logWarn("prints-storage-trim-error", { error });
  }
};

const getStorage = (): Storage | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch (error) {
    logWarn("prints-storage-unavailable", { error });
    return null;
  }
};

const readCacheFallback = (): StoredPrintsCache => {
  const storage = getStorage();
  if (!storage) return {};

  try {
    const raw = storage.getItem(STORAGE_KEY_FALLBACK);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredPrintsCache;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch (error) {
    logWarn("prints-storage-parse-error", { error });
    return {};
  }
};

const writeCacheFallback = (cache: StoredPrintsCache) => {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY_FALLBACK, JSON.stringify(cache));
  } catch (error) {
    logWarn("prints-storage-write-error", { error });
  }
};

const readFromFallback = (key: string) => {
  const cache = readCacheFallback();
  const entry = cache[key];
  if (!entry) return undefined;

  logDebug("prints-local-cache-hit", {
    key,
    ageMs: Date.now() - entry.timestamp,
  });
  return entry;
};

const writeToFallback = (entry: StoredPrintsCacheEntry) => {
  const cache = readCacheFallback();
  cache[entry.key] = entry;

  const entries = Object.entries(cache).sort(
    (a, b) => b[1].timestamp - a[1].timestamp
  );
  const trimmed = entries.slice(0, FALLBACK_MAX_ENTRIES);
  const nextCache: StoredPrintsCache = {};
  trimmed.forEach(([entryKey, value]) => {
    nextCache[entryKey] = value;
  });

  writeCacheFallback(nextCache);
  logDebug("prints-local-cache-write", { key: entry.key });
};

export const readPrintsCacheEntry = async (key: string) => {
  const entry = await readFromIndexedDb(key);
  if (entry) return entry;

  const fallbackEntry = readFromFallback(key);
  if (fallbackEntry && supportsIndexedDb()) {
    void writeToIndexedDb(fallbackEntry);
  }
  return fallbackEntry;
};

export const writePrintsCacheEntry = async (
  key: string,
  data: ContextData
) => {
  if (!data) return;

  const entry: StoredPrintsCacheEntry = {
    key,
    data,
    timestamp: Date.now(),
  };

  const db = await getIndexedDb();
  if (db) {
    await writeToIndexedDb(entry);
    return;
  }

  writeToFallback(entry);
};
