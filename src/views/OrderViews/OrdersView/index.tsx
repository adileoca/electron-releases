import { TableProvider } from "./context";
import OrdersTable from "./ui/OrdersTable";
import ViewHeader from "./ui/ViewHeader";

const OrdersView = () => (
  <TableProvider>
    <ViewHeader />
    <OrdersTable />
  </TableProvider>
);

export default OrdersView;
