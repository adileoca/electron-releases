import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDatabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";
import { TableProvider } from "./context";
import OrdersTable from "./OrdersTable";
import ViewHeader from "./ViewHeader";

type AllOrderViewProps = {
  setSelectedOrder: Dispatch<SetStateAction<string | null>>;
};

export const AllOrdersView: React.FC<{
  setSelectedOrder: Dispatch<SetStateAction<string | null>>;
}> = ({ setSelectedOrder }) => {
  return (
    <TableProvider>
      <div style={{ width: "calc(100% - 240px)" }} className="fixed right-0">
        <ViewHeader />
      </div>
      <OrdersTable setSelectedOrder={setSelectedOrder} />
    </TableProvider>
  );
};

// const db = useDatabase();
// const { data: orders, error } = useFetchData(() => db.get.order.summary.all());

// useEffect(() => {
//   console.log("Orders: ", orders);
// }, [orders]);

// if (orders === undefined || orders === null) {
//   return <div>Loading Orders...</div>;
// }

// if (error) {
//   return <div>{JSON.stringify(error)}</div>;
// }
