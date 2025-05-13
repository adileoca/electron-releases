import { useEffect, useState } from "react";
import { useDatabase } from "@/lib/supabase/context";
import { ContextData } from "../types";
import { getOrderSummaries } from "@/lib/supabase/queries";

export const useData = (): ContextData => {
  const { db, supabase } = useDatabase();
  const [orders, setOrders] = useState<ContextData>(null);

  const fetchOrders = async () => {
    const orders = await getOrderSummaries(supabase);
    setOrders(orders);
  };

  //todo: set up subscriptions
  useEffect(() => {
    fetchOrders();
  }, []);

  return orders;
};
