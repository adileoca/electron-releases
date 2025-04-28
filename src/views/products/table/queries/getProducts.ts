import { Supabase } from "@/lib/supabase/database";

export const getProducts = async (supabase: Supabase) => {
  return await supabase
    .from("products")
    .select(`*`);
};

export type ProductsData = NonNullable<
  Awaited<ReturnType<typeof getProducts>>["data"]
>;
