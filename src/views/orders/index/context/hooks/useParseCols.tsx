import { useEffect } from "react";

import { ContextActions } from "../reducer";
import { ContextData, ContextState } from "../types";

import CheckboxInput from "@/components/ui/CheckboxInput";
export const useParseCols = (
  state: ContextState,
  data: ContextData,
  actions: ContextActions
) => {
  useEffect(() => {
    if (!data) return;
    if (!state.cols) return;

    const cols: ContextState["cols"] = {
      ...state.cols,
      checkbox: {
        ...state.cols.checkbox,
        Component: (
          <CheckboxInput
            checked={
              state.selectedOrderIds.length === state.rows.length &&
              state.rows.length > 0
            }
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
    };

    actions.setCols(cols);
  }, [data, state.rows.length, state.selectedOrderIds.length]);
};
