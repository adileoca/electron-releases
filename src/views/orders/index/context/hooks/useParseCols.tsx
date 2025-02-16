import { useEffect } from "react";

import { ContextData, ContextState } from "../types";
import CheckboxInput from "../../ui/CheckboxInput";
import { ContextActions } from "../reducer";

export const useParseCols = (
  state: ContextState,
  data: ContextData,
  actions: ContextActions
) => {
  useEffect(() => {
    if (!data) return;

    const cols: ContextState["cols"] = {
      checkbox: {
        position: 0,
        minConstraints: [55, 48],
        initialWidth: 55,
        width: 55,
        isSticky: true,
        Component: (
          <CheckboxInput
            checked={state.selectedOrderIds.length === state.rows.length && state.rows.length > 0}
            onChange={(checked) =>
              actions.setSelectedOrderIds(
                checked
                  ? [...state.rows.map((row) => row.order_no.value as string)]
                  : []
              )
            }
          />
        ),
      },
      order_no: {
        label: "Nr. comandǎ",
        minConstraints: [135, 48] as [number, number],
        initialWidth: 135,
        isSticky: true,
        position: 1,
        width: 135,
      },
      date_placed: {
        label: "Datǎ plasare",
        position: 2,
        minConstraints: [200, 48] as [number, number],
        initialWidth: 200,
        width: 200,
      },
      status: {
        label: "Stare",
        position: 3,
        minConstraints: [150, 48] as [number, number],
        initialWidth: 150,
        width: 150,
      },
      amount: {
        label: "Sumǎ",
        position: 4,
        minConstraints: [100, 48] as [number, number],
        initialWidth: 100,
        width: 100,
      },
      address: {
        label: "Adresǎ",
        position: 5,
        minConstraints: [400, 48] as [number, number],
        initialWidth: 400,
        width: 400,
      },
    };

    actions.setCols(cols);
  }, [data, state.selectedOrderIds]);
};
