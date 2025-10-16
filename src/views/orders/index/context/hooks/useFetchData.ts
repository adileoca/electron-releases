import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useDatabase } from "@/lib/supabase/context";
import {
  ContextData,
  ContextState,
  OrdersListCacheValue,
} from "../types";
import { ContextActions } from "../reducer";
import { Supabase, OrderSummaries } from "@/lib/supabase/database";
import { ordersQueryCache, createCacheKey } from "@/lib/cache/QueryCache";
import { logDebug, logError } from "@/lib/logging";
import { readOrdersCacheEntry, writeOrdersCacheEntry } from "../storage";

const LIVE_MODE_REFRESH_MS = 20_000;

type OrderSummary = OrderSummaries extends (infer T)[] ? T : never;

type OrdersFetchResult = Awaited<ReturnType<typeof fetchData>>;

const getListKey = (filters: ContextState["filters"]) =>
  createCacheKey("orders:list", { filters });

const getEntityKey = (id: string) => createCacheKey("orders:entities", { id });

const getFetchKey = (
  filters: ContextState["filters"],
  pagination: ContextState["pagination"]
) => createCacheKey("orders:fetch", { filters, pagination });

const getViewKey = (
  filters: ContextState["filters"],
  pagination: ContextState["pagination"]
) => createCacheKey("orders:view", { filters, pagination });

const mergeListWithResult = (
  current: OrdersListCacheValue | undefined,
  result: OrdersFetchResult,
  pagination: ContextState["pagination"]
): OrdersListCacheValue => {
  const baseIds = current?.ids ?? [];
  const startIndex = Math.max(
    (pagination.currentPage - 1) * pagination.resultsPerPage,
    0
  );
  const fetchedIds = result.results
    .map((order) => order?.id)
    .filter((id): id is string => Boolean(id));
  const fetchedSet = new Set(fetchedIds);
  const filteredExisting = baseIds.filter(
    (id) => id && !fetchedSet.has(id)
  );

  let nextIds = filteredExisting.slice();
  fetchedIds.forEach((id, index) => {
    const insertIndex = Math.min(startIndex + index, nextIds.length);
    nextIds.splice(insertIndex, 0, id);
  });

  const deduped: string[] = [];
  const seen = new Set<string>();
  for (const id of nextIds) {
    if (!id) continue;
    if (seen.has(id)) continue;
    seen.add(id);
    deduped.push(id);
  }

  const count =
    typeof result.count === "number"
      ? result.count
      : current?.count ?? null;

  const trimmed =
    typeof count === "number" ? deduped.slice(0, count) : deduped;

  return {
    ids: trimmed,
    count,
    metadata: {
      sort: "created_at:desc",
      updatedAt: Date.now(),
    },
  };
};

type ComposeOptions = {
  allowStorageRead: boolean;
  pagination: ContextState["pagination"];
  preloadEntities?: Map<string, OrderSummary>;
};

const composePageDataFromList = async (
  listData: OrdersListCacheValue,
  options: ComposeOptions
): Promise<{ data: OrdersFetchResult; missingIds: string[] }> => {
  const { pagination, allowStorageRead, preloadEntities } = options;
  const startIndex = Math.max(
    (pagination.currentPage - 1) * pagination.resultsPerPage,
    0
  );
  const endIndex = startIndex + pagination.resultsPerPage;
  const pageIds = listData.ids.slice(startIndex, endIndex);

  const resolved = new Map<number, OrderSummary>();
  const missingIds: string[] = [];

  for (let index = 0; index < pageIds.length; index += 1) {
    const id = pageIds[index];
    if (!id) continue;

    let entity = preloadEntities?.get(id);
    if (!entity) {
      const cachedEntity = ordersQueryCache.get<OrderSummary>(
        getEntityKey(id)
      );
      entity = cachedEntity?.data;
    }

    if (!entity && allowStorageRead) {
      const stored = await readOrdersCacheEntry<OrderSummary>(
        getEntityKey(id)
      );
      if (stored?.data) {
        ordersQueryCache.set(getEntityKey(id), stored.data);
        entity = stored.data;
      }
    }

    if (entity) {
      resolved.set(index, entity);
    } else {
      missingIds.push(id);
    }
  }

  const results: OrderSummary[] = [];
  pageIds.forEach((_, index) => {
    const entity = resolved.get(index);
    if (entity) {
      results.push(entity);
    }
  });

  return {
    data: {
      results,
      count: listData.count,
    },
    missingIds,
  };
};

type ListSource = "memory" | "storage" | null;

const ensureListData = async (listKey: string): Promise<{
  listData: OrdersListCacheValue | undefined;
  source: ListSource;
  stale: boolean;
}> => {
  const inMemory = ordersQueryCache.get<OrdersListCacheValue>(listKey);
  if (inMemory?.data) {
    return {
      listData: inMemory.data,
      source: "memory",
      stale: inMemory.stale,
    };
  }

  const stored = await readOrdersCacheEntry<OrdersListCacheValue>(listKey);
  if (stored?.data) {
    ordersQueryCache.set(listKey, stored.data);
    return {
      listData: stored.data,
      source: "storage",
      stale: false,
    };
  }

  return {
    listData: undefined,
    source: null,
    stale: true,
  };
};

const persistListData = async (listKey: string, data: OrdersListCacheValue) => {
  ordersQueryCache.set(listKey, data);
  await writeOrdersCacheEntry(listKey, data);
};

const persistEntities = (orders: OrderSummary[]) => {
  orders.forEach((order) => {
    if (!order?.id) return;
    const entityKey = getEntityKey(order.id);
    ordersQueryCache.set(entityKey, order);
    void writeOrdersCacheEntry(entityKey, order);
  });
};

export const useData = (
  {
    filters,
    pagination,
    shouldRefresh,
    updating,
    liveModeEnabled,
  }: ContextState,
  { setUpdating, setShouldRefresh }: ContextActions
): ContextData => {
  const { supabase } = useDatabase();
  const [data, setData] = useState<ContextData>(null);
  const pendingRealtimeRefresh = useRef(false);
  const updatingRef = useRef(updating);
  const shouldRefreshRef = useRef(shouldRefresh);
  const liveModeIntervalRef = useRef<number | null>(null);
  const setUpdatingActionRef = useRef(setUpdating);
  const setShouldRefreshActionRef = useRef(setShouldRefresh);
  const dataKeyRef = useRef<string | null>(null);
  const dataRef = useRef<ContextData>(null);
  const latestKeyRef = useRef<string | null>(null);

  useEffect(() => {
    updatingRef.current = updating;
  }, [updating]);

  useEffect(() => {
    shouldRefreshRef.current = shouldRefresh;
  }, [shouldRefresh]);

  useEffect(() => {
    setUpdatingActionRef.current = setUpdating;
  }, [setUpdating]);

  useEffect(() => {
    setShouldRefreshActionRef.current = setShouldRefresh;
  }, [setShouldRefresh]);

  const listKey = useMemo(() => getListKey(filters), [filters]);
  const fetchKey = useMemo(
    () => getFetchKey(filters, pagination),
    [filters, pagination]
  );
  const viewKey = useMemo(
    () => getViewKey(filters, pagination),
    [filters, pagination]
  );

  latestKeyRef.current = viewKey;

  const applyData = useCallback((key: string, nextData: ContextData) => {
    const sameKey = dataKeyRef.current === key;
    const sameData = dataRef.current === nextData;
    if (sameKey && sameData) return;
    dataKeyRef.current = key;
    dataRef.current = nextData;
    setData(nextData);
  }, []);

  const applyTransitionPlaceholder = useCallback(
    (key: string) => {
      const previousData = dataRef.current;
      if (!previousData) {
        applyData(key, null);
        return;
      }

      if (dataKeyRef.current && dataKeyRef.current !== key) {
        applyData(key, { ...previousData, results: [] });
        return;
      }

      applyData(key, previousData);
    },
    [applyData]
  );

  const setUpdatingSafe = useCallback((value: boolean) => {
    if (updatingRef.current === value) return;
    updatingRef.current = value;
    setUpdatingActionRef.current(value);
  }, []);

  const setShouldRefreshSafe = useCallback((value: boolean) => {
    if (shouldRefreshRef.current === value) return;
    shouldRefreshRef.current = value;
    setShouldRefreshActionRef.current(value);
  }, []);

  const runFetch = useCallback(
    (reason: "miss" | "stale" | "refresh" | "hydrate-missing") => {
      const requestViewKey = viewKey;
      const requestListKey = listKey;
      const requestFetchKey = fetchKey;

      logDebug("orders-fetch-start", {
        reason,
        fetchKey: requestFetchKey,
        listKey: requestListKey,
      });

      ordersQueryCache
        .fetch(requestFetchKey, () =>
          fetchData(supabase, { filters, pagination })
        )
        .then(async (result) => {
          persistEntities(result.results);
          const existingList =
            ordersQueryCache.get<OrdersListCacheValue>(requestListKey)?.data ??
            (await readOrdersCacheEntry<OrdersListCacheValue>(requestListKey))?.data;

          const mergedList = mergeListWithResult(
            existingList,
            result,
            pagination
          );
          await persistListData(requestListKey, mergedList);

          const preload = new Map<string, OrderSummary>();
          result.results.forEach((order) => {
            if (!order?.id) return;
            preload.set(order.id, order);
          });

          const { data: pageData } = await composePageDataFromList(mergedList, {
            allowStorageRead: false,
            pagination,
            preloadEntities: preload,
          });

          if (latestKeyRef.current !== requestViewKey) {
            logDebug("orders-fetch-stale", {
              requestKey: requestViewKey,
              latestKey: latestKeyRef.current,
              reason,
            });
            return;
          }

          applyData(requestViewKey, pageData);
          setUpdatingSafe(false);
          if (reason === "refresh") {
            setShouldRefreshSafe(false);
          }
          logDebug("orders-fetch-success", {
            fetchKey: requestFetchKey,
            reason,
          });
        })
        .catch((error) => {
          if (latestKeyRef.current !== requestViewKey) {
            return;
          }
          logError("orders-fetch-error", {
            fetchKey: requestFetchKey,
            reason,
            error,
          });
          setUpdatingSafe(false);
          if (reason === "refresh") {
            setShouldRefreshSafe(false);
          }
        })
        .finally(() => {
          if (latestKeyRef.current !== requestViewKey) {
            return;
          }
          if (pendingRealtimeRefresh.current) {
            pendingRealtimeRefresh.current = false;
            setShouldRefreshSafe(true);
          }
        });
    },
    [
      applyData,
      fetchKey,
      filters,
      listKey,
      pagination,
      setShouldRefreshSafe,
      setUpdatingSafe,
      supabase,
      viewKey,
    ]
  );

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      const { listData, source, stale } = await ensureListData(listKey);
      if (cancelled) return;

      if (!listData) {
        applyTransitionPlaceholder(viewKey);
        setUpdatingSafe(true);
        runFetch("miss");
        return;
      }

      logDebug("orders-list-hydrate", {
        listKey,
        source,
      });

      const { data: pageData, missingIds } = await composePageDataFromList(
        listData,
        {
          allowStorageRead: true,
          pagination,
        }
      );
      if (cancelled) return;

      applyData(viewKey, pageData);

      if (missingIds.length > 0) {
        logDebug("orders-entities-missing", {
          viewKey,
          ids: missingIds,
        });
        setUpdatingSafe(true);
        runFetch("hydrate-missing");
        return;
      }

      if (stale) {
        setUpdatingSafe(true);
        runFetch("stale");
        return;
      }

      setUpdatingSafe(false);
    };

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, [
    applyData,
    applyTransitionPlaceholder,
    listKey,
    pagination,
    runFetch,
    setUpdatingSafe,
    viewKey,
  ]);

  useEffect(() => {
    if (!shouldRefresh) return;

    logDebug("orders-refresh-start", {
      fetchKey,
      listKey,
      viewKey,
    });
    setUpdatingSafe(true);
    runFetch("refresh");
  }, [fetchKey, listKey, runFetch, setUpdatingSafe, shouldRefresh, viewKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!liveModeEnabled) {
      if (liveModeIntervalRef.current) {
        window.clearInterval(liveModeIntervalRef.current);
        liveModeIntervalRef.current = null;
        logDebug("orders-live-stop", { viewKey });
      }
      return;
    }

    if (liveModeIntervalRef.current) {
      window.clearInterval(liveModeIntervalRef.current);
    }

    logDebug("orders-live-start", { viewKey });
    setShouldRefreshSafe(true);
    liveModeIntervalRef.current = window.setInterval(() => {
      logDebug("orders-live-tick", { viewKey });
      setShouldRefreshSafe(true);
    }, LIVE_MODE_REFRESH_MS);

    return () => {
      if (liveModeIntervalRef.current) {
        window.clearInterval(liveModeIntervalRef.current);
        liveModeIntervalRef.current = null;
        logDebug("orders-live-stop", { viewKey });
      }
    };
  }, [liveModeEnabled, setShouldRefreshSafe, viewKey]);

  return data;
};

export const fetchData = async (
  supabase: Supabase,
  {
    filters,
    pagination,
  }: {
    filters: ContextState["filters"];
    pagination: ContextState["pagination"];
  }
): Promise<{ results: OrderSummary[]; count: number | null }> => {
  const query = supabase.from("orders").select(
    `*,
    totals:order_totals(*),
    status:order_statuses!inner(*, name),
    payment:order_payments(*),
    billing_address: addresses!orders_billing_address_id_fkey(*),
    shipping_address: addresses!orders_shipping_address_id_fkey(*)`,
    { count: "exact" }
  );
  query.order("created_at", { ascending: false });

  logDebug("orders-db-fetch", { filters, pagination });
  Object.values(filters)
    .filter(({ enabled }) => enabled)
    .forEach((filter) => {
      const value = filter.value.replace("#", "");
      if (filter.type === "equals") {
        query.eq(filter.dataKey, value);
      } else if (filter.type === "includes") {
        query.ilike(filter.dataKey, `%${value}%`);
      } else if (filter.type === "not_equals") {
        query.neq(filter.dataKey, value);
      }
    });

  if (pagination) {
    query.range(
      (pagination.currentPage - 1) * pagination.resultsPerPage,
      pagination.currentPage * pagination.resultsPerPage - 1
    );
  }

  const { data, error, count } = await query;

  if (error) {
    logError("orders-db-error", error);
    throw new Error(error?.message || "Unknown error occurred");
  }

  return {
    results: (data ?? []) as OrderSummary[],
    count: count ?? null,
  };
};
