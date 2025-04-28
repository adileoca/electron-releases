import { Supabase } from "@/lib/supabase/database";

export const fetchProduct = async (supabase: Supabase, product_id: number) => {
  const query = `*,
    sizes: product_sizes(*),
    attributes: product_attributes(*),
    images: product_images(*),
    names: product_names(*)
  `;

  const { data, error } = await supabase
    .from("products")
    .select(query)
    .eq("id", product_id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
};

export type Product = Awaited<ReturnType<typeof fetchProduct>>;
