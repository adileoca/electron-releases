import { logDebug, logWarn } from "@/lib/logging";
import { ContextData } from "./types";

const DB_NAME = "adipan-cache-prints";
const DB_VERSION = 2;
const STORE_NAME_QUERIES = "prints-cache";
const STORE_NAME_PRINTS = "prints-items";
const STORE_INDEX_TIMESTAMP = "timestamp";
const INDEXED_DB_MAX_QUERY_ENTRIES = 200;
const INDEXED_DB_MAX_PRINT_ENTRIES = 1000;

const STORAGE_KEY_QUERIES_FALLBACK = "prints:list-cache";
const STORAGE_KEY_PRINTS_FALLBACK = "prints:item-cache";
const FALLBACK_MAX_QUERY_ENTRIES = 20;
const FALLBACK_MAX_PRINT_ENTRIES = 200;

type NonNullableContextData = NonNullable<ContextData>;
type ContextResults = NonNullableContextData["results"];
type PrintRecord = ContextResults extends Array<infer T> ? T : never;

type StoredPrintsQueryEntry = {
  key: string;
  ids: string[];
  count: number;
  timestamp: number;
};

type StoredLegacyQueryEntry = {
  key: string;
  data: ContextData;
  timestamp: number;
};

type HydratedQueryEntry = {
  key: string;
  data: ContextData;
  timestamp: number;
};

type StoredPrintEntry = {
  id: string;
  data: PrintRecord;
  timestamp: number;
};

type StoredPrintsQueryCache = Record<
  string,
  StoredPrintsQueryEntry | StoredLegacyQueryEntry
>;
type StoredPrintItemsCache = Record<string, StoredPrintEntry>;

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

      request.onupgradeneeded = (event) => {
        const db = request.result;
        const oldVersion = event.oldVersion ?? 0;

        let queriesStore: IDBObjectStore;
        if (!db.objectStoreNames.contains(STORE_NAME_QUERIES)) {
          queriesStore = db.createObjectStore(STORE_NAME_QUERIES, {
            keyPath: "key",
          });
        } else {
          const transaction = request.transaction;
          if (!transaction) {
            logWarn("prints-storage-upgrade-missing-transaction");
            return;
          }
          queriesStore = transaction.objectStore(STORE_NAME_QUERIES);
        }

        if (!queriesStore.indexNames.contains(STORE_INDEX_TIMESTAMP)) {
          queriesStore.createIndex(
            STORE_INDEX_TIMESTAMP,
            STORE_INDEX_TIMESTAMP
          );
        }

        if (!db.objectStoreNames.contains(STORE_NAME_PRINTS)) {
          const printsStore = db.createObjectStore(STORE_NAME_PRINTS, {
            keyPath: "id",
          });
          printsStore.createIndex(STORE_INDEX_TIMESTAMP, STORE_INDEX_TIMESTAMP);
        }

        if (oldVersion < 2) {
          try {
            queriesStore.clear();
          } catch (error) {
            logWarn("prints-storage-upgrade-clear-error", { error });
          }
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

const countIndexedDbEntries = async (db: IDBDatabase, storeName: string) =>
  new Promise<number>((resolve, reject) => {
    try {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
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
  storeName: string,
  indexName: string,
  entriesToRemove: number
) => {
  if (entriesToRemove <= 0) return;

  await new Promise<void>((resolve) => {
    try {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
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
          store: storeName,
          error: cursorRequest.error,
        });
      };

      transaction.oncomplete = () => {
        if (removed > 0) {
          logDebug("prints-storage-trim", { store: storeName, removed });
        }
        resolve();
      };
      transaction.onerror = () => {
        logWarn("prints-storage-trim-tx-error", {
          store: storeName,
          error: transaction.error,
        });
        resolve();
      };
    } catch (error) {
      logWarn("prints-storage-trim-error", { store: storeName, error });
      resolve();
    }
  });
};

const trimStore = async (
  db: IDBDatabase,
  storeName: string,
  maxEntries: number
) => {
  const indexName = STORE_INDEX_TIMESTAMP;
  try {
    const totalEntries = await countIndexedDbEntries(db, storeName);
    const excessEntries = totalEntries - maxEntries;
    if (excessEntries > 0) {
      await deleteOldestIndexedDbEntries(db, storeName, indexName, excessEntries);
    }
  } catch (error) {
    logWarn("prints-storage-trim-error", { store: storeName, error });
  }
};

const readQueryFromIndexedDb = async (key: string) => {
  const db = await getIndexedDb();
  if (!db) return undefined;

  return new Promise<
    StoredPrintsQueryEntry | StoredLegacyQueryEntry | undefined
  >((resolve) => {
    try {
      const transaction = db.transaction(STORE_NAME_QUERIES, "readonly");
      const store = transaction.objectStore(STORE_NAME_QUERIES);
      const request = store.get(key);
      request.onsuccess = () => {
        const entry = request.result as
          | StoredPrintsQueryEntry
          | StoredLegacyQueryEntry
          | undefined;
        if (entry) {
          const ageMs = Date.now() - entry.timestamp;
          logDebug("prints-local-cache-hit", { key, ageMs });
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

const readPrintFromIndexedDb = async (id: string) => {
  const db = await getIndexedDb();
  if (!db) return undefined;

  return new Promise<StoredPrintEntry | undefined>((resolve) => {
    try {
      const transaction = db.transaction(STORE_NAME_PRINTS, "readonly");
      const store = transaction.objectStore(STORE_NAME_PRINTS);
      const request = store.get(id);
      request.onsuccess = () => {
        resolve(request.result as StoredPrintEntry | undefined);
      };
      request.onerror = () => {
        logWarn("prints-storage-item-read-error", {
          id,
          error: request.error,
        });
        resolve(undefined);
      };
    } catch (error) {
      logWarn("prints-storage-item-read-error", { id, error });
      resolve(undefined);
    }
  });
};

const writeQueryToIndexedDb = async (
  db: IDBDatabase,
  entry: StoredPrintsQueryEntry
) => {
  await new Promise<void>((resolve) => {
    try {
      const transaction = db.transaction(STORE_NAME_QUERIES, "readwrite");
      const store = transaction.objectStore(STORE_NAME_QUERIES);
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

  await trimStore(db, STORE_NAME_QUERIES, INDEXED_DB_MAX_QUERY_ENTRIES);
};

const writePrintEntriesToIndexedDb = async (
  db: IDBDatabase,
  entries: StoredPrintEntry[]
) => {
  if (!entries.length) return;

  await new Promise<void>((resolve) => {
    try {
      const transaction = db.transaction(STORE_NAME_PRINTS, "readwrite");
      const store = transaction.objectStore(STORE_NAME_PRINTS);

      entries.forEach((entry) => {
        const request = store.put(entry);
        request.onerror = () => {
          logWarn("prints-storage-item-write-error", {
            id: entry.id,
            error: request.error,
          });
        };
      });

      transaction.oncomplete = () => {
        logDebug("prints-local-item-write", { count: entries.length });
        resolve();
      };
      transaction.onerror = () => {
        logWarn("prints-storage-item-transaction-error", {
          error: transaction.error,
        });
        resolve();
      };
    } catch (error) {
      logWarn("prints-storage-item-write-error", { error });
      resolve();
    }
  });

  await trimStore(db, STORE_NAME_PRINTS, INDEXED_DB_MAX_PRINT_ENTRIES);
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

const readQueryCacheFallback = (): StoredPrintsQueryCache => {
  const storage = getStorage();
  if (!storage) return {};

  try {
    const raw = storage.getItem(STORAGE_KEY_QUERIES_FALLBACK);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredPrintsQueryCache;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch (error) {
    logWarn("prints-storage-parse-error", { error });
    return {};
  }
};

const writeQueryCacheFallback = (cache: StoredPrintsQueryCache) => {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY_QUERIES_FALLBACK, JSON.stringify(cache));
  } catch (error) {
    logWarn("prints-storage-write-error", { error });
  }
};

const readItemsCacheFallback = (): StoredPrintItemsCache => {
  const storage = getStorage();
  if (!storage) return {};

  try {
    const raw = storage.getItem(STORAGE_KEY_PRINTS_FALLBACK);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredPrintItemsCache;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch (error) {
    logWarn("prints-storage-item-parse-error", { error });
    return {};
  }
};

const writeItemsCacheFallback = (cache: StoredPrintItemsCache) => {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY_PRINTS_FALLBACK, JSON.stringify(cache));
  } catch (error) {
    logWarn("prints-storage-item-write-error", { error });
  }
};

const readQueryFromFallback = (key: string) => {
  const cache = readQueryCacheFallback();
  const entry = cache[key];
  if (!entry) return undefined;

  const ageMs = Date.now() - entry.timestamp;
  logDebug("prints-local-cache-hit", { key, ageMs });
  return entry;
};

const writeQueryToFallback = (entry: StoredPrintsQueryEntry) => {
  const cache = readQueryCacheFallback();
  cache[entry.key] = entry;

  const entries = Object.entries(cache).sort(
    (a, b) => b[1].timestamp - a[1].timestamp
  );
  const trimmed = entries.slice(0, FALLBACK_MAX_QUERY_ENTRIES);
  const nextCache: StoredPrintsQueryCache = {};
  trimmed.forEach(([entryKey, value]) => {
    nextCache[entryKey] = value;
  });

  writeQueryCacheFallback(nextCache);
  logDebug("prints-local-cache-write", { key: entry.key });
};

const readPrintFromFallback = (id: string) => {
  const cache = readItemsCacheFallback();
  return cache[id];
};

const writePrintsToFallback = (entries: StoredPrintEntry[]) => {
  if (!entries.length) return;

  const cache = readItemsCacheFallback();
  entries.forEach((entry) => {
    cache[entry.id] = entry;
  });

  const trimmed = Object.entries(cache)
    .sort((a, b) => b[1].timestamp - a[1].timestamp)
    .slice(0, FALLBACK_MAX_PRINT_ENTRIES);
  const nextCache: StoredPrintItemsCache = {};
  trimmed.forEach(([id, value]) => {
    nextCache[id] = value;
  });

  writeItemsCacheFallback(nextCache);
  logDebug("prints-local-item-write", { count: entries.length });
};

const hydrateQueryEntry = async (
  entry: StoredPrintsQueryEntry | StoredLegacyQueryEntry
): Promise<HydratedQueryEntry | undefined> => {
  if ("data" in entry) {
    if (!entry.data) {
      return undefined;
    }
    void writePrintsCacheEntry(entry.key, entry.data);
    return {
      key: entry.key,
      data: entry.data,
      timestamp: entry.timestamp,
    };
  }

  const ids = entry.ids;
  if (!ids.length) {
    return {
      key: entry.key,
      data: { results: [], count: entry.count },
      timestamp: entry.timestamp,
    };
  }

  const records = await Promise.all(ids.map((id) => readStoredPrint(id)));
  if (records.some((record) => !record)) {
    return undefined;
  }

  const results = records.map((record) => record!.data);
  return {
    key: entry.key,
    data: { results, count: entry.count },
    timestamp: entry.timestamp,
  };
};

const readStoredPrint = async (id: string) => {
  const entry = await readPrintFromIndexedDb(id);
  if (entry) return entry;

  const fallbackEntry = readPrintFromFallback(id);
  if (!fallbackEntry) return undefined;

  if (supportsIndexedDb()) {
    void (async () => {
      const db = await getIndexedDb();
      if (db) {
        await writePrintEntriesToIndexedDb(db, [fallbackEntry]);
      }
    })();
  }

  return fallbackEntry;
};

export const readPrintsCacheEntry = async (key: string) => {
  const entry = await readQueryFromIndexedDb(key);
  if (entry) {
    const hydrated = await hydrateQueryEntry(entry);
    if (hydrated) {
      return hydrated;
    }
  }

  const fallbackEntry = readQueryFromFallback(key);
  if (fallbackEntry) {
    const hydrated = await hydrateQueryEntry(fallbackEntry);
    if (hydrated) {
      if (supportsIndexedDb()) {
        void writePrintsCacheEntry(hydrated.key, hydrated.data);
      }
      return hydrated;
    }
  }

  return undefined;
};

export const writePrintsCacheEntry = async (
  key: string,
  data: ContextData
) => {
  if (!data || !data.results) return;

  const timestamp = Date.now();
  const entries: StoredPrintEntry[] = [];

  data.results.forEach((print) => {
    const idValue = (print as { id?: string | number } | undefined)?.id;
    if (idValue === undefined || idValue === null) {
      return;
    }

    entries.push({
      id: String(idValue),
      data: print as PrintRecord,
      timestamp,
    });
  });

  const ids = entries.map((entry) => entry.id);
  const count = data.count ?? entries.length;

  const queryEntry: StoredPrintsQueryEntry = {
    key,
    ids,
    count,
    timestamp,
  };

  const db = await getIndexedDb();
  if (db) {
    await writePrintEntriesToIndexedDb(db, entries);
    await writeQueryToIndexedDb(db, queryEntry);
    return;
  }

  writePrintsToFallback(entries);
  writeQueryToFallback(queryEntry);
};
