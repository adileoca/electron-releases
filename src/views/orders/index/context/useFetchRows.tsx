import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import OrderStatusBadge from "@/components/ui/OrderStatusBadge";

import { useDatabase } from "@/lib/supabase/context";
import { useFetchData } from "@/hooks/useFetchData";
import { formatDate } from "@/lib/utils/format";

import { Row } from "./index";

export function useFetchRows(setRows: (rows: Row[]) => void) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { db } = useDatabase();
  const response = useFetchData(db.get.order.summary.all());

  useEffect(() => {
    if (!response?.data) return;
    console.log("orders", response.data);
    const orders = response.data;
    const mappedRows = orders.map((order) => {
      const rowMap: Row = new Map();

      rowMap.set("order_no", {
        id: "order_no",

        Component: (
          <button
            className=" hover:bg-white/10 px-1.5 py-0.5 rounded-lg -mx-1.5"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            #{order.display_name!}
          </button>
        ),
      });
      rowMap.set("date_placed", {
        id: "date_placed",
        text: formatDate(order.created_at!, {
          locale: "ro-RO",
          relative: true,
        }),
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
    });

    setRows(mappedRows);
    setLoading(false);
  }, [response]);

  return { loading };
}
