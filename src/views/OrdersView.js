import { useEffect } from "react";

import OrderDetailPage from "../components/OrderDetailPage";
import OrderTable from "../components/OrderTable";
import useOrders from "../hooks/useOrders";

export default function OrdersView() {
  const { orders, selectedOrder, setSelectedOrder, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 30000);
    return () => clearInterval(intervalId);
  }, [fetchOrders]);

  return (
    <div className="mt-5 flow-root px-10">
      {selectedOrder ? (
        <OrderDetailPage
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      ) : (
        <OrderTable orders={orders} setSelectedOrder={setSelectedOrder} />
      )}
    </div>
  );
}
