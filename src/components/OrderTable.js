import { formatDate, formatShippingAddress } from "../utils/format";
import { Flag } from "../components/flag";

const OrderTable = ({ orders, setSelectedOrder }) => (
  <table className="min-w-full">
    {renderTableHeader()}
    <tbody className="bg-white">
      {orders.map((order) => renderOrderRow(order, setSelectedOrder))}
    </tbody>
  </table>
);
export default OrderTable;

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

const renderOrderRow = (order, setSelectedOrder) => {
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
