import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import { formatDate, CurrencyFormatter } from "@/lib/utils/format";
import { ContextData, RowPropsMap, ContextState } from "../types";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";

import { ContextActions } from "../reducer";
import CheckboxInput from "@/components/ui/CheckboxInput";
export const useParseRows = (
  state: ContextState,
  data: ContextData,
  actions: ContextActions
) => {
  const navigate = useNavigate();
  const setRowsRef = useRef(actions.setRows);
  const setSelectedOrderIdsRef = useRef(actions.setSelectedOrderIds);

  useEffect(() => {
    setRowsRef.current = actions.setRows;
    setSelectedOrderIdsRef.current = actions.setSelectedOrderIds;
  }, [actions.setRows, actions.setSelectedOrderIds]);

  const previousDataRef = useRef<ContextData>(null);
  const previousSelectedRef = useRef<string[]>([]);

  useEffect(() => {
    if (previousDataRef.current === data && previousSelectedRef.current === state.selectedOrderIds) {
      return;
    }
    previousDataRef.current = data;
    previousSelectedRef.current = state.selectedOrderIds;

    if (!data || !data.results?.length) {
      if (state.rows.length > 0) {
        setRowsRef.current([]);
      }
      return;
    }

    const rows = data.results.reduce((acc, order) => {
      const currency = new CurrencyFormatter(order.totals?.currency!);
      const addressParts = [
        order.shipping_address?.line_1,
        order.shipping_address?.line_2,
        order.shipping_address?.state,
        order.shipping_address?.country,
      ].filter((part) => {
        if (!part) return false;
        const trimmed = String(part).trim();
        return trimmed.length > 0 && trimmed.toLowerCase() !== "null";
      });
      const addressText = addressParts.join(", ");

      acc.push({
        checkbox: {
          Component: (
            <CheckboxInput
              checked={state.selectedOrderIds.includes(order.id)}
              onChange={(checked) =>
                setSelectedOrderIdsRef.current(
                  checked
                    ? [...state.selectedOrderIds, order.id]
                    : state.selectedOrderIds.filter((id) => id !== order.id)
                )
              }
            />
          ),
        },
        order_no: {
          Component: (
            <button
              className=" -mx-1.5 rounded-lg px-1.5 py-0.5 hover:bg-white/10"
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              #{order.display_name!}
            </button>
          ),
          value: order.id!,
        },
        name: {
          text: order?.name!,
          value: order?.name!,
        },
        amount: {
          value: order.totals?.amount_total!,
          text: currency.format(order.totals?.amount_total!),
        },
        address: {
          value: addressText,
          text: addressText,
        },
        status: {
          value: order.status!.name!,
          Component: (
            <OrderStatusBadge text={order.status!.name!} color="amber" />
          ),
        },
        date_placed: {
          text: formatDate(order.created_at!, {
            locale: "ro-RO",
            relative: true,
          }),
          value: order.created_at!,
        },
      });
      return acc;
    }, [] as RowPropsMap[]);

    setRowsRef.current(rows);
  }, [data, state.rows.length, state.selectedOrderIds]);
};

const getTime = (date: string) => {
  const d = new Date(date);
};
