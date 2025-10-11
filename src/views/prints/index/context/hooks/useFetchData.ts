import { useEffect, useState } from "react";
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

// export const fetchData = async (
//   supabase: Supabase,
//   {
//     filters,
//     pagination,
//   }: {
//     filters: ContextState["filters"];
//     pagination: ContextState["pagination"];
//   }
// ) => {
//   const query = supabase.from("orders").select(
//     `*,
//     totals:order_totals(*),
//     status:order_statuses!inner(*, name),
//     payment:order_payments(*),
//     billing_address: addresses!orders_billing_address_id_fkey(*),
//     shipping_address: addresses!orders_shipping_address_id_fkey(*)`,
//     { count: "exact" }
//   );
//   query.order("created_at", { ascending: false });
//   // query.eq("order_statuses.name", "feedback");

//   console.log("filters", filters);
//   Object.values(filters)
//     .filter(({ enabled }) => enabled)
//     .forEach((filter) => {
//       const value = filter.value.replace("#", "");
//       if (filter.type === "equals") {
//         query.eq(filter.dataKey, value);
//       } else if (filter.type === "includes") {
//         query.ilike(filter.dataKey, `%${value}%`);
//       } else if (filter.type === "not_equals") {
//         query.neq(filter.dataKey, value);
//       }
//     });

//   if (pagination) {
//     query.range(
//       (pagination.currentPage - 1) * pagination.resultsPerPage,
//       pagination.currentPage * pagination.resultsPerPage - 1
//     );
//   }

//   const { data, error, count } = await query;

//   if (error) {
//     console.error("Error getting orders summaries:", error);
//     throw new Error(error?.message || "Unknown error occurred");
//   }

//   return { results: data, count };
// };

// export const useFetchPrints = () => {
//   const { supabase } = useDatabase();
//   const [prints, setPrints] = useState();

//   const fetchPrints = async () => {
//     const data = await fetchData(supabase);
//     setPrints(data);
//   };

//   //todo: set up subscriptions
//   useEffect(() => {
//     fetchPrints();
//   }, []);

//   return prints;
// };

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

  // Apply active filters (mirrors orders view behavior)
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

  // Pagination (offset/limit via range)
  if (pagination) {
    const from = (pagination.currentPage - 1) * pagination.resultsPerPage;
    const to = pagination.currentPage * pagination.resultsPerPage - 1;
    query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error || !data) {
    console.error("Error getting prints:", error);
    throw new Error(error?.message || "Unknown error occurred");
  }

  return { results: data, count };
};
