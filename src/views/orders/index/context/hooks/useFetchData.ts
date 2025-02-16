import { useEffect, useState } from "react";
import { useDatabase } from "@/lib/supabase/context";
import { ContextData } from "../types";

export const useData = (): ContextData => {
  const { db } = useDatabase();
  const [orders, setOrders] = useState<ContextData>(null);

  const fetchOrders = async () => {
    const orders = await db.getOrderSummaries();
    setOrders(orders);
  };

  //todo: set up subscriptions
  useEffect(() => {
    fetchOrders();
  }, []);

  return orders;
};
