import { useEffect, useState } from "react";
import { useSupabase } from "@/lib/supabase/context";
import { ContextData } from "../types";
import { getProducts } from "../../queries/getProducts";
import { useEffectTrigger } from "./useEffectTrigger";

export const useData = (): ContextData => {
  const { supabase } = useSupabase();
  const [data, setData] = useState<ContextData>(null);
  const [shouldFetch, triggerFetch] = useEffectTrigger();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await getProducts(supabase);
      console.log("templates", data);

      setData(data);
    };

    fetchProducts();
  }, [shouldFetch]);

  useEffect(() => {
    const channel = supabase
      .channel(`products`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          triggerFetch();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return data;
};
