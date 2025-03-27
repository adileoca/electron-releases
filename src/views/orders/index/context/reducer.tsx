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
    case "setSelectedOrderIds": {
      return {
        ...state,
        selectedOrderIds: action.payload,
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
  setSelectedOrderIds: (ids: string[]) => {
    dispatch({
      type: "setSelectedOrderIds",
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
  name: {
    label: "Nume",
    position: 2,
    minConstraints: [200, 48] as [number, number],
    initialWidth: 200,
    width: 200,
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
    minConstraints: [150, 48] as [number, number],
    initialWidth: 150,
    width: 150,
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
  sorting: [],
  selectedOrderIds: [],
  loading: true,
};
