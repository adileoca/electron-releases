import { replace, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { createTableContext } from "@/context/Table";
import { ordersTableColumns } from "@/constants";
import Chip from "@/components/ui/Chip";

import { useDatabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";
import { RowProps } from "@/context/Table/types";
import { formatDate } from "@/utils/format";
import { id } from "date-fns/locale";

export type ColumnId = keyof typeof ordersTableColumns;

const { TableProvider, useTable } = createTableContext(ordersTableColumns);
export { useTable, TableProvider };

export function useFetchRows(
  setRows: (rows: Map<ColumnId, RowProps<ColumnId>>[]) => void
) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const db = useDatabase();
  const { data: orders, error } = useFetchData(() =>
    db.get.order.summary.all()
  );

  useEffect(() => {
    if (!orders) return;
    console.log("orders", orders);

    const mappedRows = (Array(24).fill(orders[0]) as typeof orders).map(
      (order) => {
        const rowMap = new Map<ColumnId, RowProps<ColumnId>>();
        rowMap.set("order_no", {
          id: "order_no",
          text: order.display_name!,
          Component: (
            <button
              onClick={() => {
                const params = new URLSearchParams({
                  order_id: order.id!,
                  order_no: order.display_name!,
                  order_status: order.status?.name!,
                  last_updated: order.last_updated!.replace(/%2B/g, '+'),
                });
                navigate(`/orders/details?${params.toString()}`);
              }}
            >
              #{order.display_name!}
            </button>
          ),
        });
        rowMap.set("date_placed", {
          id: "date_placed",
          text: formatDate(order.created_at!),
          value: order.created_at!,
        });
        rowMap.set("status", {
          id: "status",
          value: order.status!.name!,
          Component: <Chip className="rounded" text={order.status!.name!} />,
        });
        rowMap.set("amount", {
          id: "amount",
          value: order.totals?.amount_total!,
          text: String(order.totals?.amount_total!),
        });

        rowMap.set("address", {
          id: "amount",
          value: order.totals?.amount_total!,
          text: ` ${order.shipping_address?.line_1},
                ${order.shipping_address?.line_2},
                ${order.shipping_address?.state},
                ${order.shipping_address?.country}`,
        });
        return rowMap;
      }
    );

    setRows(mappedRows);
    setLoading(false);
  }, [orders]);

  return { loading };
}
