import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

  useEffect(() => {
    if (!data) return;

    if (state.updating) {
      actions.setRows([]);
      return;
    }

    const rows = data.results.reduce((acc, order) => {
      const currency = new CurrencyFormatter(order.totals?.currency!);

      acc.push({
        checkbox: {
          Component: (
            <CheckboxInput
              checked={state.selectedOrderIds.includes(order.id)}
              onChange={(checked) =>
                actions.setSelectedOrderIds(
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
          value: order.totals?.amount_total!,
          text: ` ${order.shipping_address?.line_1},
                  ${
                    order.shipping_address?.line_2
                      ? `${order.shipping_address?.line_2},`
                      : ""
                  }
                  ${order.shipping_address?.state},
                  ${order.shipping_address?.country}`,
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

    actions.setRows(rows);
  }, [data, state.selectedOrderIds, state.updating]);
};

const getTime = (date: string) => {
  const d = new Date(date);
};
