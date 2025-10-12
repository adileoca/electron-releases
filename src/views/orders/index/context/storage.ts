import { logDebug, logWarn } from "@/lib/logging";
import { ContextData } from "./types";

const STORAGE_KEY = "orders:list-cache";
const MAX_ENTRIES = 20;

type StoredOrdersCache = Record<
  string,
  {
    data: ContextData;
    timestamp: number;
  }
>;

const getStorage = (): Storage | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch (error) {
    logWarn("orders-storage-unavailable", { error });
    return null;
  }
};

const readCache = (): StoredOrdersCache => {
  const storage = getStorage();
  if (!storage) return {};

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredOrdersCache;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch (error) {
    logWarn("orders-storage-parse-error", { error });
    return {};
  }
};

const writeCache = (cache: StoredOrdersCache) => {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (error) {
    logWarn("orders-storage-write-error", { error });
  }
};

export const readOrdersCacheEntry = (key: string) => {
  const cache = readCache();
  const entry = cache[key];
  if (!entry) return undefined;

  logDebug("orders-local-cache-hit", {
    key,
    ageMs: Date.now() - entry.timestamp,
  });
  return entry;
};

export const writeOrdersCacheEntry = (key: string, data: ContextData) => {
  if (!data) return;

  const cache = readCache();
  cache[key] = {
    data,
    timestamp: Date.now(),
  };

  const entries = Object.entries(cache).sort(
    (a, b) => b[1].timestamp - a[1].timestamp
  );
  const trimmed = entries.slice(0, MAX_ENTRIES);
  const nextCache: StoredOrdersCache = {};
  trimmed.forEach(([entryKey, value]) => {
    nextCache[entryKey] = value;
  });

  writeCache(nextCache);
  logDebug("orders-local-cache-write", { key });
};
