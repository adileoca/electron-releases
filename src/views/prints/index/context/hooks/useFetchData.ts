import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDatabase } from "@/lib/supabase/context";
import { ContextData, ContextState } from "../types";
import { ContextActions } from "../reducer";
import { Supabase } from "@/lib/supabase/database";
import { sharedQueryCache, createCacheKey } from "@/lib/cache/QueryCache";
import { logDebug, logError } from "@/lib/logging";
import { readPrintsCacheEntry, writePrintsCacheEntry } from "../storage";

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
      createCacheKey("prints", {
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

  const handleRealtimeEvent = useCallback(() => {
    sharedQueryCache.invalidatePrefix("prints:");
    if (updatingRef.current) {
      pendingRealtimeRefresh.current = true;
      logDebug("prints-realtime-queued", { key: cacheKey });
      return;
    }
    if (shouldRefreshRef.current) {
      return;
    }
    logDebug("prints-realtime-trigger", { key: cacheKey });
    setShouldRefreshSafe(true);
  }, [cacheKey, setShouldRefreshSafe]);

  useEffect(() => {
    if (lastHydratedKeyRef.current === cacheKey) return;
    lastHydratedKeyRef.current = cacheKey;

    let cancelled = false;

    void (async () => {
      const entry = await readPrintsCacheEntry(cacheKey);
      if (cancelled) return;
      if (!entry || !entry.data) return;

      sharedQueryCache.set(cacheKey, entry.data);
      applyData(cacheKey, entry.data);
      setShouldRefreshSafe(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [applyData, cacheKey, setShouldRefreshSafe]);

  useEffect(() => {
    let isMounted = true;
    const requestKey = cacheKey;
    const cached = sharedQueryCache.get<ContextData>(cacheKey);

    if (cached) {
      applyData(cacheKey, cached.data);
      logDebug("prints-cache-hit", { key: cacheKey, stale: cached.stale });
      if (!cached.stale) {
        setUpdatingSafe(false);
      }
    } else {
      logDebug("prints-cache-miss", { key: cacheKey });
      setUpdatingSafe(true);
      const previousData = dataRef.current;
      if (previousData) {
        if (dataKeyRef.current && dataKeyRef.current !== cacheKey) {
          applyData(cacheKey, { ...previousData, results: [] });
        } else {
          applyData(cacheKey, previousData);
        }
      } else {
        applyData(cacheKey, null);
      }
    }

    if (!cached || cached.stale) {
      let hadError = false;
      logDebug("prints-fetch-start", {
        key: cacheKey,
        reason: cached ? "stale" : "miss",
      });
      setUpdatingSafe(true);
      sharedQueryCache
        .fetch(cacheKey, () => fetchData(supabase, { filters, pagination }))
        .then((result) => {
          if (!isMounted) return;
          void writePrintsCacheEntry(requestKey, result);
          if (latestKeyRef.current !== requestKey) {
            logDebug("prints-fetch-stale", {
              requestKey,
              latestKey: latestKeyRef.current,
            });
            return;
          }
          applyData(requestKey, result);
          setUpdatingSafe(false);
          logDebug("prints-fetch-success", { key: requestKey });
        })
        .catch((error) => {
          if (latestKeyRef.current !== requestKey) {
            return;
          }
          logError("prints-fetch-error", { key: requestKey, error });
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
    logDebug("prints-refresh-start", { key: cacheKey });
    sharedQueryCache
      .fetch(cacheKey, () => fetchData(supabase, { filters, pagination }))
      .then((result) => {
        void writePrintsCacheEntry(requestKey, result);
        if (latestKeyRef.current !== requestKey) {
          logDebug("prints-refresh-stale", {
            requestKey,
            latestKey: latestKeyRef.current,
          });
          return;
        }
        applyData(requestKey, result);
        setUpdatingSafe(false);
        setShouldRefreshSafe(false);
        logDebug("prints-refresh-success", { key: requestKey });
      })
      .catch((error) => {
        if (latestKeyRef.current !== requestKey) {
          return;
        }
        logError("prints-refresh-error", { key: requestKey, error });
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!liveModeEnabled) {
      if (liveModeIntervalRef.current) {
        window.clearInterval(liveModeIntervalRef.current);
        liveModeIntervalRef.current = null;
        logDebug("prints-live-stop", { key: cacheKey });
      }
      return;
    }

    if (liveModeIntervalRef.current) {
      window.clearInterval(liveModeIntervalRef.current);
    }

    logDebug("prints-live-start", { key: cacheKey });
    setShouldRefreshSafe(true);
    liveModeIntervalRef.current = window.setInterval(() => {
      logDebug("prints-live-tick", { key: cacheKey });
      setShouldRefreshSafe(true);
    }, LIVE_MODE_REFRESH_MS);

    return () => {
      if (liveModeIntervalRef.current) {
        window.clearInterval(liveModeIntervalRef.current);
        liveModeIntervalRef.current = null;
        logDebug("prints-live-stop", { key: cacheKey });
      }
    };
  }, [cacheKey, liveModeEnabled, setShouldRefreshSafe]);

  useEffect(() => {
    const channel = supabase
      .channel("prints-list")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "prints" },
        handleRealtimeEvent
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "print_versions" },
        handleRealtimeEvent
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "print_item_assets" },
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
  const query = supabase.from("prints").select(
    `*,
        versions: print_versions(*,
          file: media!print_versions_file_id_fkey(*),
          thumbnail: media!print_versions_thumbnail_id_fkey(*),
          created_by: user_profiles(*)
        ),
        assets: print_item_assets(*,
        item_asset: item_assets(*,
        created_by: user_profiles(*),
        thumbnail:media!item_assets_thumbnail_id_fkey(*),
        file: media!item_assets_psd_id_fkey(*),
        item: order_items(*, order: orders(*), product: products(*), configuration: item_configurations(*, size: product_sizes(*))))),
        locked_by: user_profiles(*)
        `,
    { count: "exact" }
  );
  query.order("created_at", { ascending: false });

  logDebug("prints-db-fetch", { filters, pagination });

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
    const from = (pagination.currentPage - 1) * pagination.resultsPerPage;
    const to = pagination.currentPage * pagination.resultsPerPage - 1;
    query.range(from, to);
  }

  const { data: results, error, count } = await query;

  if (error || !results) {
    logError("prints-db-error", error);
    throw new Error(error?.message || "Unknown error occurred");
  }

  return { results, count };
};
