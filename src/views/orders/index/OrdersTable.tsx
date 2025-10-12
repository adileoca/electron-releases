import ViewShell from "@/components/ViewShell";

import { useOrdersTableContext } from "./context";
import ViewHeader from "./ViewHeader";

import LoadingBody from "./ui/LoadingBody";
import TableHeader from "./ui/TableHeader";
import Pagination from "./ui/Pagination";
import TableBody from "./ui/TableBody";

const OrdersTable = () => {
  const {
    state: { loading, updating, rows },
  } = useOrdersTableContext();

  const hasRows = rows.length > 0;
  const showSpinnerRow = !hasRows && (loading || updating);

  return (
    <ViewShell header={<ViewHeader />}>
      <div className="relative h-full overflow-auto">
        {loading ? (
          <LoadingBody />
        ) : (
          <div>
            <table>
              <TableHeader />
              {!showSpinnerRow ? <TableBody /> : <LoadingBody />}
            </table>
            <Pagination />
          </div>
        )}
      </div>
    </ViewShell>
  );
};

export default OrdersTable;

// export default OrdersTable;
// import { useEffect, useMemo, useRef } from "react";
// import ViewShell from "@/components/ViewShell";

// import { useOrdersTableContext } from "./context";
// import ViewHeader from "./ViewHeader";

// import TableHeader from "./ui/TableHeader";
// import Pagination from "./ui/Pagination";
// import TableBody from "./ui/TableBody";
// import Spinner from "@/static/spinner.svg";
// import { logDebug } from "@/lib/logging";

// const OrdersTable = () => {
//   const {
//     state: { loading, updating, rows, cols },
//     actions: { setColWidth },
//   } = useOrdersTableContext();
//   const tableRef = useRef<HTMLTableElement | null>(null);
//   const orderedColumns = useMemo(
//     () =>
//       Object.entries(cols).sort(
//         ([_keyA, colA], [_keyB, colB]) => colA.position - colB.position
//       ),
//     [cols]
//   );
//   const columnCount = orderedColumns.length || 1;

//   const hasRows = rows.length > 0;
//   const showSpinnerRow = !hasRows && (loading || updating);

//   useEffect(() => {
//     if (process.env.NODE_ENV === "production") return;
//     if (!tableRef.current) return;

//     const handle = window.requestAnimationFrame(() => {
//       const tableEl = tableRef.current;
//       if (!tableEl) return;

//       const firstRow = tableEl.querySelector("tbody tr");
//       if (!firstRow) return;

//       const headers = Array.from(
//         tableEl.querySelectorAll<HTMLTableCellElement>("thead th")
//       );
//       const bodyCells = Array.from(
//         firstRow.querySelectorAll<HTMLTableCellElement>("td")
//       );

//       const mismatches = headers.map((header, index) => {
//         const headerWidth = header.getBoundingClientRect().width;
//         const bodyWidth =
//           bodyCells[index]?.getBoundingClientRect().width ?? 0;
//         const diff = Number((headerWidth - bodyWidth).toFixed(2));
//         return {
//           column: header.dataset.columnId ?? `index-${index}`,
//           headerWidth,
//           bodyWidth,
//           diff,
//         };
//       });

//       const updates: Array<{ column: string; width: number }> = [];

//       mismatches.forEach(({ column, diff, headerWidth, bodyWidth }) => {
//         if (!column || Number.isNaN(diff)) return;
//         if (Math.abs(diff) <= 1) return;
//         const targetWidth = Math.round(Math.max(headerWidth, bodyWidth));
//         updates.push({ column, width: targetWidth });
//       });

//       if (updates.length > 0) {
//         logDebug("orders-col-width-adjust", { updates });
//         updates.forEach(({ column, width }) => {
//           const existing = cols[column as keyof typeof cols];
//           if (!existing) return;
//           if (Math.abs(existing.width - width) <= 1) return;
//           setColWidth(column as keyof typeof cols, width);
//         });
//       }
//     });

//     return () => window.cancelAnimationFrame(handle);
//   }, [cols, rows, setColWidth]);

//   return (
//     <ViewShell header={<ViewHeader />}>
//       <div className="relative h-full overflow-auto">
//         <div>
//           <table
//             ref={tableRef}
//             data-orders-table
//             className="w-full table-fixed"
//             style={{ borderSpacing: 0 }}
//           >
//             <colgroup>
//               {orderedColumns.map(([key, column]) => (
//                 <col
//                   key={key}
//                   style={{
//                     width: `${column.width}px`,
//                     minWidth: `${column.width}px`,
//                     maxWidth: `${column.width}px`,
//                   }}
//                 />
//               ))}
//             </colgroup>
//             <TableHeader />
//             {showSpinnerRow ? (
//               <tbody>
//                 <tr>
//                   <td colSpan={columnCount} className="p-0">
//                     <div className="flex w-full items-center justify-center border-y border-l border-r border-neutral-200 bg-white py-16 dark:border-neutral-700 dark:bg-neutral-900">
//                       <img
//                         className="h-8 w-8 animate-spin lg:h-10 lg:w-10"
//                         src={Spinner}
//                         alt="Loading"
//                         loading="eager"
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             ) : (
//               <TableBody />
//             )}
//           </table>
//           <Pagination />
//         </div>
//       </div>
//     </ViewShell>
//   );
// };

// export default OrdersTable;
