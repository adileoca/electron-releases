import { useState } from "react";

import ViewShell from "@/components/ViewShell";
import TableHeader from "./ui/TableHeader";
import TableBody from "./ui/TableBody";
import ViewHeader from "./ViewHeader";
import LoadingBody from "./ui/LoadingBody";
import { useFetchRows } from "./context/useFetchRows";
import { useTable } from "./context";

const OrdersTable = () => {
  const { cols: tableCols, setRows: setTableRows } = useTable();
  const { loading } = useFetchRows(setTableRows);

  // move to table context
  const [widths, setWidths] = useState([
    55,
    ...Array.from(tableCols, ([_, value]) => value.initialWidth),
  ]);

  return (
    <ViewShell header={<ViewHeader />}>
      <div className="relative h-full overflow-auto ">
        {loading ? (
          <LoadingBody />
        ) : (
          <table>
            <TableHeader widths={widths} />
            <TableBody widths={widths} />
          </table>
        )}
      </div>
    </ViewShell>
  );
};

export default OrdersTable;
