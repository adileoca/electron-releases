import ViewShell from "@/components/ViewShell";

import { useOrdersTableContext } from "./context";
import ViewHeader from "./ViewHeader";

import LoadingBody from "./ui/LoadingBody";
import TableHeader from "./ui/TableHeader";
import Pagination from "./ui/Pagination";
import TableBody from "./ui/TableBody";

const OrdersTable = () => {
  const {
    state: { loading, updating },
  } = useOrdersTableContext();

  return (
    <ViewShell header={<ViewHeader />}>
      <div className="relative h-full overflow-auto">
        {loading ? (
          <LoadingBody />
        ) : (
          <div>
            <table>
              <TableHeader />
              {!updating ? <TableBody /> : <LoadingBody />}
            </table>
            <Pagination />
          </div>
        )}
      </div>
    </ViewShell>
  );
};

export default OrdersTable;
