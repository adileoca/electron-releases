import { useEffect } from "react";

import { ContextData, RowPropsMap, ContextState } from "../types";

import { ContextActions } from "../reducer";
import CheckboxInput from "@/components/ui/CheckboxInput";

import { useNavigate } from "react-router-dom";

export const useParseRows = (
  state: ContextState,
  data: ContextData,
  actions: ContextActions
) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;

    // const sortedRows = data.sort((a, b) => {
    //   const nameA = a.name || "";
    //   const nameB = b.name || "";
    //   const nameLengthComparison = nameB.length - nameA.length;
    //   return nameLengthComparison;
    // });

    const rows = data.reduce((acc, entry) => {
      const rowProps: RowPropsMap = {
        checkbox: {
          Component: (
            <CheckboxInput
              checked={state.selected.includes(entry.id.toString())}
              onChange={(checked) =>
                actions.setSelected(
                  checked
                    ? [...state.selected, entry.id.toString()]
                    : state.selected.filter((id) => id !== entry.id.toString())
                )
              }
            />
          ),
        },
        id: { text: entry.id.toString() },
        width: {
          Component: (
            <button
              className=" -mx-1.5 rounded-lg px-1.5 py-0.5 hover:bg-white/10"
              onClick={() => navigate(`/products/${entry.id}`)}
            >
              {entry.width_cm!}
            </button>
          ),
          value: entry.width_cm!,
        },
        height: {
          Component: (
            <button
              className=" -mx-1.5 rounded-lg px-1.5 py-0.5 hover:bg-white/10"
              onClick={() => navigate(`/products/${entry.id}`)}
            >
              {entry.height_cm!}
            </button>
          ),
          value: entry.height_cm!,
        },
      };

      acc.push(rowProps);
      return acc;
    }, [] as RowPropsMap[]);
    actions.setRows(rows);
  }, [data, state.selected]);
};
