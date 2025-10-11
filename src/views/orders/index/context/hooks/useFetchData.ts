import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDatabase } from "@/lib/supabase/context";
import { ContextData, ContextState } from "../types";
import { ContextActions } from "../reducer";
import { Supabase } from "@/lib/supabase/database";
import {
  sharedQueryCache,
  createCacheKey,
} from "@/lib/cache/QueryCache";
import { logDebug, logError } from "@/lib/logging";

export const useData = (
  { filters, pagination, shouldRefresh, updating }: ContextState,
  { setUpdating, setShouldRefresh }: ContextActions
): ContextData => {
  const { supabase } = useDatabase();
  const [data, setData] = useState<ContextData>(null);
  const pendingRealtimeRefresh = useRef(false);
  const updatingRef = useRef(updating);
  const shouldRefreshRef = useRef(shouldRefresh);

  useEffect(() => {
    updatingRef.current = updating;
  }, [updating]);

  useEffect(() => {
    shouldRefreshRef.current = shouldRefresh;
  }, [shouldRefresh]);
  const cacheKey = useMemo(
    () =>
      createCacheKey("orders", {
        filters,
        pagination,
      }),
    [filters, pagination]
  );

  const setUpdatingSafe = useCallback(
    (value: boolean) => {
      if (updatingRef.current === value) return;
      updatingRef.current = value;
      setUpdating(value);
    },
    [setUpdating]
  );

  const setShouldRefreshSafe = useCallback(
    (value: boolean) => {
      if (shouldRefreshRef.current === value) return;
      shouldRefreshRef.current = value;
      setShouldRefresh(value);
    },
    [setShouldRefresh]
  );

  const handleRealtimeEvent = useCallback(() => {
    sharedQueryCache.invalidatePrefix("orders:");
    if (updatingRef.current) {
      pendingRealtimeRefresh.current = true;
      logDebug("orders-realtime-queued", { key: cacheKey });
      return;
    }
    if (shouldRefreshRef.current) {
      return;
    }
    logDebug("orders-realtime-trigger", { key: cacheKey });
    setShouldRefreshSafe(true);
  }, [cacheKey, setShouldRefreshSafe]);

  //todo: set up subscriptions

  useEffect(() => {
    let isMounted = true;
    const cached = sharedQueryCache.get<ContextData>(cacheKey);

    if (cached) {
      if (data !== cached.data) {
        setData(cached.data);
        logDebug("orders-cache-hit", { key: cacheKey, stale: cached.stale });
      }
      if (!cached.stale) {
        setUpdatingSafe(false);
      }
    } else {
      logDebug("orders-cache-miss", { key: cacheKey });
      setUpdatingSafe(true);
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
          setData(result);
          setUpdatingSafe(false);
          logDebug("orders-fetch-success", { key: cacheKey });
        })
        .catch((error) => {
          logError("orders-fetch-error", { key: cacheKey, error });
          hadError = true;
          if (isMounted) {
            setUpdatingSafe(false);
          }
        })
        .finally(() => {
          if (!isMounted) return;
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
  }, [cacheKey, data, filters, pagination, setShouldRefreshSafe, setUpdatingSafe, supabase]);

  useEffect(() => {
    if (!shouldRefresh) return;

    setUpdatingSafe(true);
    sharedQueryCache.invalidate(cacheKey);
    let hadError = false;
    logDebug("orders-refresh-start", { key: cacheKey });
    sharedQueryCache
      .fetch(cacheKey, () => fetchData(supabase, { filters, pagination }))
      .then((result) => {
        setData(result);
        setUpdatingSafe(false);
        setShouldRefreshSafe(false);
        logDebug("orders-refresh-success", { key: cacheKey });
      })
      .catch((error) => {
        logError("orders-refresh-error", { key: cacheKey, error });
        hadError = true;
        setUpdatingSafe(false);
        setShouldRefreshSafe(false);
      })
      .finally(() => {
        if (pendingRealtimeRefresh.current) {
          if (!hadError) {
            pendingRealtimeRefresh.current = false;
            setShouldRefreshSafe(true);
          } else {
            pendingRealtimeRefresh.current = false;
          }
        }
      });
  }, [cacheKey, filters, pagination, setShouldRefreshSafe, setUpdatingSafe, shouldRefresh, supabase]);

  useEffect(() => {
    const channel = supabase
      .channel("orders-list")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        handleRealtimeEvent
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "order_statuses" },
        handleRealtimeEvent
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "order_totals" },
        handleRealtimeEvent
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [handleRealtimeEvent, supabase]);

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
