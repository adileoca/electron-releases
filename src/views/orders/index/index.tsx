import { TableProvider } from "./context";
import OrdersTable from "./OrdersTable";

const OrdersView = () => (
  <TableProvider>
    <OrdersTable />
  </TableProvider>
);

export default OrdersView;
