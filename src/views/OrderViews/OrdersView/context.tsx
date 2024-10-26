import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import OrderStatusBadge from "@/components/ui/OrderStatusBadge";

import { useDatabase } from "@/lib/supabase/context";
import { createTableContext } from "@/context/Table";
import { useFetchData } from "@/hooks/useFetchData";

import { RowProps } from "@/context/Table/types";
import { formatDate } from "@/utils/format";

export const ordersTableColumns = {
  order_no: {
    id: "order_no",
    label: "Order No.",
    isSticky: true,
    position: 1,
    minConstraints: [135, 48] as [number, number],
    initialWidth: 135,
    width: 135,
  },
  date_placed: {
    id: "date_placed",
    label: "Date Placed",
    position: 2,
    minConstraints: [200, 48] as [number, number],
    initialWidth: 200,
    width: 200,
  },
  status: {
    id: "status",
    label: "Status",
    position: 3,
    minConstraints: [150, 48] as [number, number],
    initialWidth: 150,
    width: 150,
  },
  amount: {
    id: "amount",
    label: "Amount",
    position: 4,
    minConstraints: [100, 48] as [number, number],
    initialWidth: 100,
    width: 100,
  },
  address: {
    id: "address",
    label: "Address",
    position: 5,
    minConstraints: [400, 48] as [number, number],
    initialWidth: 400,
    width: 400,
  },
} as const;

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
              className="hover:underline"
              onClick={() => {
                const params = new URLSearchParams({
                  order_id: order.id!,
                  order_no: order.display_name!,
                  order_status: order.status?.name!,
                  last_updated: order.last_updated!.replace(/%2B/g, "+"),
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
          Component: <OrderStatusBadge text={order.status!.name!} />,
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
