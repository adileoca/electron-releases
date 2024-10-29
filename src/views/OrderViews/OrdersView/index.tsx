import { TableProvider } from "./context";
import OrdersTable from "./OrdersTable";
import ViewHeader from "./ViewHeader";

const OrdersView = () => (
  <TableProvider>
    <ViewHeader />

    <OrdersTable />
  </TableProvider>
);

export default OrdersView;
