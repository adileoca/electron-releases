import { logDebug, logWarn } from "@/lib/logging";

const DB_NAME = "adipan-cache";
const DB_VERSION = 2;
const STORE_NAME = "orders-cache";
const STORE_INDEX_TIMESTAMP = "timestamp";
const INDEXED_DB_MAX_ENTRIES = 200;

const STORE_NAME_COLUMN_WIDTHS = "orders-col-widths";
const COLUMN_WIDTHS_KEY = "column-widths";
const COLUMN_WIDTHS_FALLBACK_KEY = "orders:col-widths";

const STORAGE_KEY_FALLBACK = "orders:list-cache";
const FALLBACK_MAX_ENTRIES = 20;

type StoredOrdersCacheEntry<T = unknown> = {
  key: string;
  data: T;
  timestamp: number;
};

type StoredOrdersCache = Record<string, StoredOrdersCacheEntry<unknown>>;

type StoredColumnWidthsEntry = {
  key: string;
  widths: Record<string, number>;
  timestamp: number;
};

type ColumnWidthsMap = Record<string, number>;

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
        if (!db.objectStoreNames.contains(STORE_NAME_COLUMN_WIDTHS)) {
          db.createObjectStore(STORE_NAME_COLUMN_WIDTHS, { keyPath: "key" });
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
        logWarn("orders-storage-open-error", { error: request.error });
        resolve(null);
      };

      request.onblocked = () => {
        logWarn("orders-storage-open-blocked");
      };
    } catch (error) {
      logWarn("orders-storage-init-error", { error });
      resolve(null);
    }
  });

  return dbInitPromise;
};

const readFromIndexedDb = async <T = unknown>(key: string) => {
  const db = await getIndexedDb();
  if (!db) return undefined;

  return new Promise<StoredOrdersCacheEntry<T> | undefined>((resolve) => {
    try {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => {
        const entry = request.result as StoredOrdersCacheEntry<T> | undefined;
        if (entry && entry.data) {
          logDebug("orders-local-cache-hit", {
            key,
            ageMs: Date.now() - entry.timestamp,
          });
        }
        resolve(entry);
      };
      request.onerror = () => {
        logWarn("orders-storage-read-error", { key, error: request.error });
        resolve(undefined);
      };
    } catch (error) {
      logWarn("orders-storage-read-error", { key, error });
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
        logWarn("orders-storage-trim-cursor-error", {
          error: cursorRequest.error,
        });
      };

      transaction.oncomplete = () => {
        if (removed > 0) {
          logDebug("orders-local-cache-trim", { removed });
        }
        resolve();
      };
      transaction.onerror = () => {
        logWarn("orders-storage-trim-tx-error", { error: transaction.error });
        resolve();
      };
    } catch (error) {
      logWarn("orders-storage-trim-error", { error });
      resolve();
    }
  });
};

const writeToIndexedDb = async <T = unknown>(
  entry: StoredOrdersCacheEntry<T>
) => {
  const db = await getIndexedDb();
  if (!db) return;

  await new Promise<void>((resolve) => {
    try {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(entry);

      request.onerror = () => {
        logWarn("orders-storage-write-error", {
          key: entry.key,
          error: request.error,
        });
      };

      transaction.oncomplete = () => {
        logDebug("orders-local-cache-write", { key: entry.key });
        resolve();
      };
      transaction.onerror = () => {
        logWarn("orders-storage-transaction-error", {
          key: entry.key,
          error: transaction.error,
        });
        resolve();
      };
    } catch (error) {
      logWarn("orders-storage-write-error", { key: entry.key, error });
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
    logWarn("orders-storage-trim-error", { error });
  }
};

const getStorage = (): Storage | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch (error) {
    logWarn("orders-storage-unavailable", { error });
    return null;
  }
};

const readCacheFallback = (): StoredOrdersCache => {
  const storage = getStorage();
  if (!storage) return {};

  try {
    const raw = storage.getItem(STORAGE_KEY_FALLBACK);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredOrdersCache;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch (error) {
    logWarn("orders-storage-parse-error", { error });
    return {};
  }
};

const writeCacheFallback = (cache: StoredOrdersCache) => {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY_FALLBACK, JSON.stringify(cache));
  } catch (error) {
    logWarn("orders-storage-write-error", { error });
  }
};

const readFromFallback = <T = unknown>(key: string) => {
  const cache = readCacheFallback();
  const entry = cache[key] as StoredOrdersCacheEntry<T> | undefined;
  if (!entry) return undefined;

  logDebug("orders-local-cache-hit", {
    key,
    ageMs: Date.now() - entry.timestamp,
  });
  return entry;
};

const writeToFallback = <T = unknown>(entry: StoredOrdersCacheEntry<T>) => {
  const cache = readCacheFallback();
  cache[entry.key] = entry;

  const entries = Object.entries(cache).sort(
    (a, b) => b[1].timestamp - a[1].timestamp
  );
  const trimmed = entries.slice(0, FALLBACK_MAX_ENTRIES);
  const nextCache: StoredOrdersCache = {};
  trimmed.forEach(([entryKey, value]) => {
    nextCache[entryKey] = value;
  });

  writeCacheFallback(nextCache);
  logDebug("orders-local-cache-write", { key: entry.key });
};

export const readOrdersCacheEntry = async <T = unknown>(key: string) => {
  const entry = await readFromIndexedDb<T>(key);
  if (entry) return entry;

  const fallbackEntry = readFromFallback<T>(key);
  if (fallbackEntry && supportsIndexedDb()) {
    void writeToIndexedDb(fallbackEntry);
  }
  return fallbackEntry;
};

export const writeOrdersCacheEntry = async <T = unknown>(
  key: string,
  data: T
) => {
  if (data === undefined || data === null) return;

  const entry: StoredOrdersCacheEntry<T> = {
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

const readColumnWidthsFromIndexedDb = async () => {
  const db = await getIndexedDb();
  if (!db) return undefined;

  return new Promise<StoredColumnWidthsEntry | undefined>((resolve) => {
    try {
      const transaction = db.transaction(STORE_NAME_COLUMN_WIDTHS, "readonly");
      const store = transaction.objectStore(STORE_NAME_COLUMN_WIDTHS);
      const request = store.get(COLUMN_WIDTHS_KEY);
      request.onsuccess = () => {
        resolve(request.result as StoredColumnWidthsEntry | undefined);
      };
      request.onerror = () => {
        logWarn("orders-col-widths-read-error", {
          error: request.error,
        });
        resolve(undefined);
      };
    } catch (error) {
      if ((error as DOMException).name === "NotFoundError") {
        resolve(undefined);
        return;
      }
      logWarn("orders-col-widths-read-error", { error });
      resolve(undefined);
    }
  });
};

const writeColumnWidthsToIndexedDb = async (entry: StoredColumnWidthsEntry) => {
  const db = await getIndexedDb();
  if (!db) return;

  await new Promise<void>((resolve) => {
    try {
      const transaction = db.transaction(STORE_NAME_COLUMN_WIDTHS, "readwrite");
      const store = transaction.objectStore(STORE_NAME_COLUMN_WIDTHS);
      const request = store.put(entry);
      request.onerror = () => {
        logWarn("orders-col-widths-write-error", {
          error: request.error,
        });
      };
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => {
        logWarn("orders-col-widths-tx-error", { error: transaction.error });
        resolve();
      };
    } catch (error) {
      logWarn("orders-col-widths-write-error", { error });
      resolve();
    }
  });
};

const readColumnWidthsFallback = (): ColumnWidthsMap => {
  const storage = getStorage();
  if (!storage) return {};

  try {
    const raw = storage.getItem(COLUMN_WIDTHS_FALLBACK_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ColumnWidthsMap;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch (error) {
    logWarn("orders-col-widths-parse-error", { error });
    return {};
  }
};

const writeColumnWidthsFallback = (widths: ColumnWidthsMap) => {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(COLUMN_WIDTHS_FALLBACK_KEY, JSON.stringify(widths));
  } catch (error) {
    logWarn("orders-col-widths-write-error", { error });
  }
};

export const readOrdersColumnWidths = async (): Promise<ColumnWidthsMap | null> => {
  const entry = await readColumnWidthsFromIndexedDb();
  if (entry && entry.widths) {
    return entry.widths;
  }

  const fallback = readColumnWidthsFallback();
  if (Object.keys(fallback).length > 0) {
    if (supportsIndexedDb()) {
      void writeColumnWidthsToIndexedDb({
        key: COLUMN_WIDTHS_KEY,
        widths: fallback,
        timestamp: Date.now(),
      });
    }
    return fallback;
  }

  return null;
};

export const writeOrdersColumnWidths = async (widths: ColumnWidthsMap) => {
  const db = await getIndexedDb();
  const entry: StoredColumnWidthsEntry = {
    key: COLUMN_WIDTHS_KEY,
    widths,
    timestamp: Date.now(),
  };
  if (db) {
    await writeColumnWidthsToIndexedDb(entry);
    return;
  }
  writeColumnWidthsFallback(widths);
};
