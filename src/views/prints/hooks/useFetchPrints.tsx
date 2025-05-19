import { useEffect, useState } from "react";
import { useDatabase } from "@/lib/supabase/context";
import { Print } from "@/lib/supabase/database";
import { Supabase } from "@/lib/supabase/database";

export const useFetchPrints = () => {
  const { supabase } = useDatabase();
  const [prints, setPrints] = useState<Print[] | undefined>();

  const fetchPrints = async () => {
    const orders = await getPrints(supabase);
    setPrints(orders);
  };

  //todo: set up subscriptions
  useEffect(() => {
    fetchPrints();
  }, []);

  return prints;
};

const getPrints = async (supabase: Supabase) => {
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
        `
  );
  query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error || !data) {
    console.error("Error getting prints:", error);
    throw new Error(error?.message || "Unknown error occurred");
  }

  return data;
};
