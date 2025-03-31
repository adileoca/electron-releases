import { useEffect } from "react";

import { ContextActions, ordersTableColumns } from "../reducer";
import { ContextData, ContextState } from "../types";

import CheckboxInput from "@/components/ui/CheckboxInput";
export const useParseCols = (
  state: ContextState,
  data: ContextData,
  actions: ContextActions
) => {
  useEffect(() => {
    if (!data) return;

    const cols: ContextState["cols"] = {
      ...ordersTableColumns,
      checkbox: {
        ...ordersTableColumns.checkbox,
        Component: (
          <CheckboxInput
            checked={
              state.selected.length === state.rows.length &&
              state.rows.length > 0
            }
            onChange={(checked) =>
              actions.setSelected(
                checked
                  ? [
                      ...state.rows.map(
                        (row) => row.id.text?.toString() as string
                      ),
                    ]
                  : []
              )
            }
          />
        ),
      },
    };

    actions.setCols(cols);
  }, [data, state.selected]);
};
