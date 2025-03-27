import { Supabase } from "@/lib/supabase/database";

export const getTemplates = async (supabase: Supabase) => {
  return await supabase
    .from("product_sizes")
    .select(`*, product: products(*), template: media(*)`);
};

export type TemplatesData = NonNullable<
  Awaited<ReturnType<typeof getTemplates>>["data"]
>;
