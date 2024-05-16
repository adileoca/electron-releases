import { EyeIcon } from "@heroicons/react/24/outline";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";

import { formatDate } from "../utils/format";

import OrderTimeline from "../components/orderTimeline";
import OrderDetails from "../components/orderDetails";
import OrderHeader from "../components/orderHeader";
import OrderItems from "../components/orderItems";

import { useGetOrdersQuery, SalesOrders } from "../types/graphql";

const OrdersView: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<SalesOrders | null>(null);

  return (
    <div className="flow-root px-10">
      {selectedOrder ? (
        <OrderDetailPage
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      ) : (
        <OrdersTable setSelectedOrder={setSelectedOrder} />
      )}
    </div>
  );
};

const OrderDetailPage: React.FC<{
  selectedOrder: SalesOrders;
  setSelectedOrder: React.Dispatch<React.SetStateAction<SalesOrders | null>>;
}> = ({ selectedOrder, setSelectedOrder }) => {
  const auth0 = useAuth0();
  return (
    <div className="space-y-16">
      <OrderHeader
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
      <OrderDetails
        billingAddress={selectedOrder.billing_address}
        shippingAddress={selectedOrder.shipping_address}
      />
      <OrderItems items={selectedOrder.items} />
      <OrderTimeline userSrc={auth0.user!.picture} />
    </div>
  );
};

const OrdersTable: React.FC<{
  setSelectedOrder: React.Dispatch<React.SetStateAction<SalesOrders | null>>;
}> = ({ setSelectedOrder }) => {
  const { data, loading } = useGetOrdersQuery();

  if (loading) {
    return <div>Loading Orders...</div>;
  }
  if (data) {
    console.log("data", data);
    const { sales_orders: orders } = data;

    const headers = ["Comanda", "Data", "Status", "Total", "Adresa", ""];
    return (
      <div className="mt-5 overflow-hidden rounded-lg border border-neutral-200">
        <table className="min-w-full">
          <thead className="border-b border-neutral-200">
            <tr>
              {headers.map((header, index) => (
                <th key={index}>
                  <p className="px-2.5 py-3.5 text-left font-medium text-neutral-900">
                    {header}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <OrderRow order={order} setSelectedOrder={setSelectedOrder} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <div>no orders</div>;
};

const OrderRow: React.FC<{
  order: SalesOrders;
  setSelectedOrder: React.Dispatch<React.SetStateAction<SalesOrders | null>>;
}> = ({ order, setSelectedOrder }) => {
  return (
    <tr
      key={order.id}
      onClick={() => setSelectedOrder(order)}
      className="hover cursor-pointer items-center even:bg-neutral-50 hover:bg-neutral-100"
    >
      <td className="px-2.5 py-4">
        <button className="whitespace-nowrap font-medium hover:text-blue-700">
          #{order.id} - {order.name}
        </button>
      </td>
      <td className="whitespace-nowrap px-2.5 ">
        {formatDate(order.created_at)}
      </td>
      <td className="whitespace-nowrap px-2.5 ">
        <span className="items-center rounded-full border border-neutral-400 bg-neutral-100 px-3 py-1.5 text-sm capitalize text-neutral-600">
          {order.status}
        </span>
      </td>
      <td className="px-2.5">{order.amount_total}</td>
      <td className="px-2.5">
        &nbsp;{order.shipping_address?.state},&nbsp;
        {order.shipping_address?.country}
      </td>
      <td className="pr-5 text-end">
        <EyeIcon className="h-5 w-5" />
      </td>
    </tr>
  );
};

export default OrdersView;
