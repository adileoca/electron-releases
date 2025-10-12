import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDatabase } from "@/lib/supabase/context";
import { ContextData, ContextState } from "../types";
import { ContextActions } from "../reducer";
import { Supabase } from "@/lib/supabase/database";
import { sharedQueryCache, createCacheKey } from "@/lib/cache/QueryCache";
import { logDebug, logError } from "@/lib/logging";
import { readOrdersCacheEntry, writeOrdersCacheEntry } from "../storage";

const LIVE_MODE_REFRESH_MS = 20_000;

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
  const lastHydratedKeyRef = useRef<string | null>(null);
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
  const cacheKey = useMemo(
    () =>
      createCacheKey("orders", {
        filters,
        pagination,
      }),
    [filters, pagination]
  );
  latestKeyRef.current = cacheKey;

  const applyData = useCallback((key: string, nextData: ContextData) => {
    const sameKey = dataKeyRef.current === key;
    const sameData = dataRef.current === nextData;
    if (sameKey && sameData) return;
    dataKeyRef.current = key;
    dataRef.current = nextData;
    setData(nextData);
  }, []);

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

  // const handleRealtimeEvent = useCallback(() => {
  //   sharedQueryCache.invalidatePrefix("orders:");
  //   if (updatingRef.current) {
  //     pendingRealtimeRefresh.current = true;
  //     logDebug("orders-realtime-queued", { key: cacheKey });
  //     return;
  //   }
  //   if (shouldRefreshRef.current) {
  //     return;
  //   }
  //   logDebug("orders-realtime-trigger", { key: cacheKey });
  //   setShouldRefreshSafe(true);
  // }, [cacheKey, setShouldRefreshSafe]);

  useEffect(() => {
    if (lastHydratedKeyRef.current === cacheKey) return;
    lastHydratedKeyRef.current = cacheKey;
    const entry = readOrdersCacheEntry(cacheKey);
    if (!entry || !entry.data) return;

    sharedQueryCache.set(cacheKey, entry.data);
    applyData(cacheKey, entry.data);
    setShouldRefreshSafe(true);
  }, [applyData, cacheKey, setShouldRefreshSafe]);

  useEffect(() => {
    let isMounted = true;
    const requestKey = cacheKey;
    const cached = sharedQueryCache.get<ContextData>(cacheKey);

    if (cached) {
      applyData(cacheKey, cached.data);
      logDebug("orders-cache-hit", { key: cacheKey, stale: cached.stale });
      if (!cached.stale) {
        setUpdatingSafe(false);
      }
    } else {
      logDebug("orders-cache-miss", { key: cacheKey });
      setUpdatingSafe(true);
      const previousData = dataRef.current;
      if (previousData) {
        applyData(cacheKey, { ...previousData, results: [] });
      } else {
        applyData(cacheKey, null);
      }
    }

    if (!cached || cached.stale) {
      let hadError = false;
      logDebug("orders-fetch-start", {
        key: cacheKey,
        reason: cached ? "stale" : "miss",
      });
      setUpdatingSafe(true);
      sharedQueryCache
        .fetch(cacheKey, () => fetchData(supabase, { filters, pagination }))
        .then((result) => {
          if (!isMounted) return;
          writeOrdersCacheEntry(requestKey, result);
          if (latestKeyRef.current !== requestKey) {
            logDebug("orders-fetch-stale", {
              requestKey,
              latestKey: latestKeyRef.current,
            });
            return;
          }
          applyData(requestKey, result);
          setUpdatingSafe(false);
          logDebug("orders-fetch-success", { key: requestKey });
        })
        .catch((error) => {
          if (latestKeyRef.current !== requestKey) {
            return;
          }
          logError("orders-fetch-error", { key: requestKey, error });
          hadError = true;
          if (isMounted) {
            setUpdatingSafe(false);
          }
        })
        .finally(() => {
          if (!isMounted) return;
          if (latestKeyRef.current !== requestKey) {
            return;
          }
          if (pendingRealtimeRefresh.current) {
            if (hadError) {
              pendingRealtimeRefresh.current = false;
              return;
            }
            pendingRealtimeRefresh.current = false;
            setShouldRefreshSafe(true);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [
    applyData,
    cacheKey,
    filters,
    pagination,
    setShouldRefreshSafe,
    setUpdatingSafe,
    supabase,
  ]);

  useEffect(() => {
    if (!shouldRefresh) return;

    setUpdatingSafe(true);
    sharedQueryCache.invalidate(cacheKey);
    let hadError = false;
    const requestKey = cacheKey;
    logDebug("orders-refresh-start", { key: cacheKey });
    sharedQueryCache
      .fetch(cacheKey, () => fetchData(supabase, { filters, pagination }))
      .then((result) => {
        writeOrdersCacheEntry(requestKey, result);
        if (latestKeyRef.current !== requestKey) {
          logDebug("orders-refresh-stale", {
            requestKey,
            latestKey: latestKeyRef.current,
          });
          return;
        }
        applyData(requestKey, result);
        setUpdatingSafe(false);
        setShouldRefreshSafe(false);
        logDebug("orders-refresh-success", { key: requestKey });
      })
      .catch((error) => {
        if (latestKeyRef.current !== requestKey) {
          return;
        }
        logError("orders-refresh-error", { key: requestKey, error });
        hadError = true;
        setUpdatingSafe(false);
        setShouldRefreshSafe(false);
      })
      .finally(() => {
        if (latestKeyRef.current !== requestKey) {
          return;
        }
        if (pendingRealtimeRefresh.current) {
          if (!hadError) {
            pendingRealtimeRefresh.current = false;
            setShouldRefreshSafe(true);
          } else {
            pendingRealtimeRefresh.current = false;
          }
        }
      });
  }, [
    applyData,
    cacheKey,
    filters,
    pagination,
    setShouldRefreshSafe,
    setUpdatingSafe,
    shouldRefresh,
    supabase,
  ]);

  // useEffect(() => {
  //   const channel = supabase
  //     .channel("orders-list")
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "orders" },
  //       handleRealtimeEvent
  //     )
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "order_statuses" },
  //       handleRealtimeEvent
  //     )
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "order_totals" },
  //       handleRealtimeEvent
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, [handleRealtimeEvent, supabase]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!liveModeEnabled) {
      if (liveModeIntervalRef.current) {
        window.clearInterval(liveModeIntervalRef.current);
        liveModeIntervalRef.current = null;
        logDebug("orders-live-stop", { key: cacheKey });
      }
      return;
    }

    if (liveModeIntervalRef.current) {
      window.clearInterval(liveModeIntervalRef.current);
    }

    logDebug("orders-live-start", { key: cacheKey });
    setShouldRefreshSafe(true);
    liveModeIntervalRef.current = window.setInterval(() => {
      logDebug("orders-live-tick", { key: cacheKey });
      setShouldRefreshSafe(true);
    }, LIVE_MODE_REFRESH_MS);

    return () => {
      if (liveModeIntervalRef.current) {
        window.clearInterval(liveModeIntervalRef.current);
        liveModeIntervalRef.current = null;
        logDebug("orders-live-stop", { key: cacheKey });
      }
    };
  }, [cacheKey, liveModeEnabled, setShouldRefreshSafe]);

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
) => {
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
  // query.eq("order_statuses.name", "feedback");

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

  return { results: data, count };
};
