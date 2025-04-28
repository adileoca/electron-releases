import { useSupabase } from "@/lib/supabase/context";
import { Product, fetchProduct } from "../queries";
import { useEffect, useState } from "react";

export const useProductData = (product_id: number) => {
  const { supabase } = useSupabase();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    fetchProduct(supabase, product_id).then((data) => setProduct(data));
  }, [product_id]);

  return product;
};
