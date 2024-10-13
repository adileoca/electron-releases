import { useState } from "react";

import TableHeader from "./TableHeader";
import LoadingBody from "./LoadingBody";
import TableBody from "./TableBody";

import { useFetchRows, useTable } from "../context";

const OrdersTable = () => {
  const { cols: tableCols, setRows: setTableRows } = useTable();
  const { loading } = useFetchRows(setTableRows);

  const [widths, setWidths] = useState([
    55,
    ...Array.from(tableCols, ([_, value]) => value.initialWidth),
  ]);

  return (
    <div
      style={{ width: "calc(100% - 234px)" }}
      className="fixed -right-1.5 top-12 h-screen overflow-hidden"
    >
      <div className="relative h-full overflow-auto">
        {loading && <LoadingBody />}
        <table>
          <TableHeader widths={widths} />
          <TableBody widths={widths} />
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
