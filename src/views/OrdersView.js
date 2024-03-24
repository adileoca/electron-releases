import { TruckIcon, DocumentTextIcon } from "@heroicons/react/20/solid";

import { EyeIcon } from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@apollo/client";

import { OrdersService } from "../lib/apolloServices";
import { formatDate } from "../utils/format";
import Button from "../components/button";
import OrderTimeline from "../components/orderTimeline";
import OrderDetails from "../components/orderDetails";
import OrderHeader from "../components/orderHeader";
import OrderItems from "../components/orderItems";

export default function OrdersView() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="mt-5 flow-root px-10">
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
}

const OrderDetailPage = ({ selectedOrder, setSelectedOrder }) => {
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
      <OrderTimeline userSrc={auth0.user.picture} />
    </div>
  );
};

const OrdersTable = ({ setSelectedOrder }) => {
  const orders = useQuery(OrdersService.query);

  if (orders.loading) {
    return <div>Loading Orders...</div>;
  }

  if (orders.data) {
    const headers = [
      "Comanda",
      "Data",
      "Status",
      "Total",
      "Adresa",
      "AWB",
      "Factura",
      "",
    ];
    return (
      <table className="min-w-full">
        <thead className="border-b border-neutral-200 pr-3">
          {headers.map((header) => (
            <th key={header}>
              <p className="py-3.5 text-left font-semibold text-neutral-900">
                {header}
              </p>
            </th>
          ))}
        </thead>
        <tbody>
          {Array(8)
            .fill(OrdersService.parse(orders.data)[0])
            .map((order) => (
              <OrderRow order={order} setSelectedOrder={setSelectedOrder} />
            ))}
        </tbody>
      </table>
    );
  }
};

const OrderRow = ({ order, setSelectedOrder }) => {
  return (
    <tr
      key={order.id}
      onClick={() => setSelectedOrder(order)}
      className="cursor-pointer items-center even:bg-neutral-50 hover:bg-neutral-100"
    >
      <td className="py-4 pr-3">
        <button className="whitespace-nowrap font-semibold hover:text-blue-700">
          #{order.id} - {order.name}
        </button>
      </td>
      <td className="pr-3 whitespace-nowrap ">{formatDate(order.created_at)}</td>
      <td className="pr-3 whitespace-nowrap ">
        <span className="items-center rounded-md border border-neutral-400 bg-neutral-100 px-3 py-1.5 text-sm capitalize text-neutral-600">
          {order.status}
        </span>
      </td>
      <td className="pr-3">{order.amount_total}</td>
      <td className="pr-3">&nbsp;{order.shipping_address.state},&nbsp;{order.shipping_address.country}</td>
      <td className="pr-3">
        <Button Icon={TruckIcon} label="AWB" />
      </td>
      <td className="pr-3">
        <Button Icon={DocumentTextIcon} label="Factura" />
      </td>
      <td className="text-end">
        <EyeIcon className="h-5 w-5" />
      </td>
    </tr>
  );
};
