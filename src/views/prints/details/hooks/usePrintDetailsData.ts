import { useEffect, useState } from "react";
import { useSupabase } from "@/lib/supabase/context";
import { Supabase } from "@/lib/supabase/database";
import { Print } from "../types";

export const usePrintDetailsData = (printId: string) => {
  const [data, setData] = useState<Print>();
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPrintById(supabase, printId);
      setData(data);
    };
    fetchData();
  }, []);

  return data;
};

export const getPrintById = async (supabase: Supabase, printId: string) => {
  const { data, error } = await supabase
    .from("prints")
    .select(
      `*,
        versions: print_versions(*,
          file: media!print_versions_file_id_fkey(*),
          thumbnail: media!print_versions_thumbnail_id_fkey(*),
          created_by: user_profiles(*)
        ),
        assets: print_item_assets(*,
          item_asset: item_assets(*,
            created_by: user_profiles(*),
            thumbnail: media!item_assets_thumbnail_id_fkey(*),
            file: media!item_assets_psd_id_fkey(*),
            item: order_items(*,
              order: orders(*),
              product: products(*),
              configuration: item_configurations(*, size: product_sizes(*))
            )
          )
        ),
        locked_by: user_profiles(*)
      `
    )
    .eq("id", printId)
    .single();

  if (error || !data) {
    console.error("error", error);
    throw new Error(error.message);
  }

  return data;
};
