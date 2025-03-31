import { useEffect, useState } from "react";
import { useSupabase } from "@/lib/supabase/context";
import { ContextData } from "../types";
import { getTemplates } from "../../queries/getTemplates";
import { useEffectTrigger } from "./useEffectTrigger";

export const useData = (): ContextData => {
  const { supabase } = useSupabase();
  const [data, setData] = useState<ContextData>(null);
  const [shouldFetch, triggerFetch] = useEffectTrigger();

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await getTemplates(supabase);
      console.log("templates", data);

      setData(data);
    };

    fetchTemplates();
  }, [shouldFetch]);

  useEffect(() => {
    const channel = supabase
      .channel(`templates_changes`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product_sizes" },
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
