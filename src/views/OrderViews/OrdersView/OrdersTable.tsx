import { useState } from "react";

import TableHeader from "./ui/TableHeader";
import LoadingBody from "./ui/LoadingBody";
import TableBody from "./ui/TableBody";

import { useFetchRows, useTable } from "./context";

const OrdersTable = () => {
  const { cols: tableCols, setRows: setTableRows } = useTable();
  const { loading } = useFetchRows(setTableRows);

  const [widths, setWidths] = useState([
    55,
    ...Array.from(tableCols, ([_, value]) => value.initialWidth),
  ]);

  return (
    <div
      style={{
        width: "calc(100% - 200px)",
        boxShadow: "0 0 0 0.6px black",
        borderWidth: "1px",
      }}
      className="ring-offset fixed bottom-2 right-2 top-12 overflow-hidden rounded-lg border-neutral-500/50"
    >
      <div className="relative h-full overflow-auto ">
        {/* {loading && <LoadingBody />} */}
        <table>
          <TableHeader widths={widths} />
          <TableBody widths={widths} />
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
