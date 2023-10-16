import { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import { formatDate, formatShippingAddress } from "../utils/format";
import OrderDetails from "../components/orderDetails";
import OrderTimeline from "../components/orderTimeline";
import OrderHeader from "../components/orderHeader";
import OrderItems from "../components/orderItems";
import { Flag } from "../components/flag";

export default function OrdersView() {
  const auth0 = useAuth0();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      const token = await auth0.getAccessTokenSilently();
      const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/orders/`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  }, [auth0]);

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(() => {
      fetchOrders();
    }, 30000);
    return () => clearInterval(intervalId);
  }, [auth0, fetchOrders]);

  const headers = ["ID", "Date", "Status", "Liveaza la"];
  const renderTableHeader = () => {
    return (
      <thead className="border-b border-neutral-200">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderOrderRow = (order) => {
    return (
      <tr key={order.id} className="even:bg-neutral-50">
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-900 sm:pl-3">
          <Flag countryCode={order.shipping_address.country} />
          <button
            onClick={() => setSelectedOrder(order)}
            className="pl-2 font-semibold hover:text-blue-600 hover:underline"
          >
            {order.id}
          </button>
        </td>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-900 sm:pl-3">
          {formatDate(order.created_at)}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">
          <span className="inline-flex items-center rounded-md border border-neutral-300 bg-neutral-100 px-2 py-1 text-xs font-medium capitalize text-gray-600">
            {order.status}
          </span>
        </td>
        <td className="w-60 px-3 py-4 text-sm text-neutral-500">
          {formatShippingAddress(order.shipping_address)}
        </td>
      </tr>
    );
  };

  return (
    <div className="mt-5 flow-root px-10">
      {selectedOrder ? (
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
      ) : orders.length > 0 ? (
        <table className="min-w-full">
          {renderTableHeader()}
          <tbody className="bg-white">
            {orders.map((order) => renderOrderRow(order))}
          </tbody>
        </table>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
