type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

export class QueryCache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private pending = new Map<string, Promise<unknown>>();

  constructor(private ttlMs: number) {}

  get<T>(key: string):
    | {
        data: T;
        stale: boolean;
      }
    | undefined {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return undefined;

    const stale = Date.now() - entry.timestamp > this.ttlMs;
    return {
      data: entry.data,
      stale,
    };
  }

  set<T>(key: string, data: T) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  async fetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const existing = this.pending.get(key) as Promise<T> | undefined;
    if (existing) {
      return existing;
    }

    const promise = fetcher()
      .then((result) => {
        this.set(key, result);
        return result;
      })
      .finally(() => {
        this.pending.delete(key);
      });

    this.pending.set(key, promise);
    return promise;
  }

  invalidate(key: string) {
    this.cache.delete(key);
    this.pending.delete(key);
  }

  invalidatePrefix(prefix: string) {
    const matches = new Set<string>();

    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        matches.add(key);
      }
    }

    for (const key of this.pending.keys()) {
      if (key.startsWith(prefix)) {
        matches.add(key);
      }
    }

    matches.forEach((key) => {
      this.cache.delete(key);
      this.pending.delete(key);
    });
  }

  clear() {
    this.cache.clear();
    this.pending.clear();
  }
}

const DEFAULT_TTL = 30 * 1000; // 30 seconds
const PRINTS_TTL = 5 * 60 * 1000; // 5 minutes

export const sharedQueryCache = new QueryCache(DEFAULT_TTL);
export const printsQueryCache = new QueryCache(PRINTS_TTL);

export const createCacheKey = (
  namespace: string,
  payload: Record<string, unknown>
): string => {
  const stableStringify = (value: unknown): string => {
    if (value === null || typeof value !== "object") {
      return JSON.stringify(value);
    }

    if (Array.isArray(value)) {
      return `[${value.map((item) => stableStringify(item)).join(",")}]`;
    }

    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0))
      .map(([key, val]) => `"${key}":${stableStringify(val)}`);

    return `{${entries.join(",")}}`;
  };

  return `${namespace}:${stableStringify(payload)}`;
};
