import { useEffect, useState } from "react";
import { useDatabase } from "@/lib/supabase/context";
import { Print } from "@/lib/supabase/database";
export const useFetchPrints = () => {
  const { db } = useDatabase();
  const [prints, setPrints] = useState<Print[] | undefined>();

  const fetchPrints = async () => {
    const orders = await db.getPrints();
    setPrints(orders);
  };

  //todo: set up subscriptions
  useEffect(() => {
    fetchPrints();
  }, []);

  return prints;
};
