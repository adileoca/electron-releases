"use client";

import {
  ContextState,
  ContextReducer,
  ColPropsMap,
  RowPropsMap,
} from "./types";

import CheckboxInput from "@/components/ui/CheckboxInput";
export const reducer: React.Reducer<ContextState, ContextReducer> = (
  state,
  action
) => {
  switch (action.type) {
    case "setCols": {
      return {
        ...state,
        cols: action.payload,
      };
    }
    case "setRows": {
      return {
        ...state,
        rows: action.payload,
        loading: false,
      };
    }
    case "setSelected": {
      return {
        ...state,
        selected: action.payload,
      };
    }
    default:
      return state;
  }
};

export const createActions = (
  state: ContextState,
  dispatch: React.Dispatch<ContextReducer>
) => ({
  setCols: (cols: ColPropsMap) => {
    dispatch({
      type: "setCols",
      payload: cols,
    });
  },
  setColWidth: (colId: keyof ColPropsMap, width: number) => {
    dispatch({
      type: "setCols",
      payload: {
        ...state.cols,
        [colId]: {
          ...state.cols[colId],
          width,
        },
      },
    });
  },
  setRows: (rows: RowPropsMap[]) => {
    dispatch({
      type: "setRows",
      payload: rows,
    });
  },
  setSelected: (ids: string[]) => {
    dispatch({
      type: "setSelected",
      payload: ids,
    });
  },
});

export type ContextActions = ReturnType<typeof createActions>;

export const ordersTableColumns: ContextState["cols"] = {
  checkbox: {
    position: 0,
    minConstraints: [55, 48],
    initialWidth: 55,
    width: 55,
    isSticky: true,
    Component: <CheckboxInput checked={false} onChange={() => {}} />,
  },
  id: {
    label: "ID",
    position: 1,
    minConstraints: [60, 48] as [number, number],
    initialWidth: 60,
    isSticky: true,
    width: 60,
  },
  product_name: {
    label: "Nume produs",
    position: 2,
    minConstraints: [150, 48] as [number, number],
    initialWidth: 300,
    isSticky: true,
    width: 300,
    Component: (
      <div className="flex w-full items-center justify-between">
        <span>Nume produs</span>
      </div>
    ),
  },
  // size: {
  //   label: "Dimensiune",
  //   minConstraints: [135, 48] as [number, number],
  //   initialWidth: 135,

  //   position: 3,
  //   width: 135,
  // },
  // download_template: {
  //   label: "Sablon",
  //   minConstraints: [150, 48] as [number, number],
  //   initialWidth: 150,
  //   position: 5,
  //   width: 150,
  // },
  // upload_template: {
  //   label: "Incarca sablon",
  //   minConstraints: [150, 48] as [number, number],
  //   initialWidth: 150,
  //   position: 4,
  //   width: 150,
  // },
};

export type ColumnId = keyof typeof ordersTableColumns;

export const initialState: ContextState = {
  cols: ordersTableColumns,
  rows: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    resultsPerPage: 50,
  },
  filters: [],
  sorting: [], //
  selected: [],
  loading: true,
};
