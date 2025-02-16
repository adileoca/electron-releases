import { OrdersTableProvider } from "./context";
import OrdersTable from "./OrdersTable";

const OrdersView = () => (
  <OrdersTableProvider>
    <OrdersTable />
  </OrdersTableProvider>
);

export default OrdersView;
