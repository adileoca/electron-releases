import { useCallback, useEffect, useState } from "react";
import { useDatabase } from "@/lib/supabase/context";
import { ContextData, ContextState } from "../types";
import { ContextActions } from "../reducer";
import { Supabase } from "@/lib/supabase/database";

export const useData = (
  { filters, pagination, shouldRefresh }: ContextState,
  { setUpdating, setShouldRefresh }: ContextActions
): ContextData => {
  const { supabase } = useDatabase();
  const [data, setData] = useState<ContextData>(null);

  //todo: set up subscriptions

  useEffect(() => {
    setUpdating(true);
    fetchData(supabase, { filters, pagination }).then((data) => {
      setData(data);
      setUpdating(false);
    });
  }, [filters, pagination]);

  useEffect(() => {
    if (!shouldRefresh) return;

    setUpdating(true);
    fetchData(supabase, { filters, pagination }).then((data) => {
      setData(data);
      setUpdating(false);
      setShouldRefresh(false);
    });
  }, [shouldRefresh]);

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

  console.log("filters", filters);
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
    console.error("Error getting orders summaries:", error);
    throw new Error(error?.message || "Unknown error occurred");
  }

  return { results: data, count };
};
