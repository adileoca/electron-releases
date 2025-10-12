"use client";

import {
  ContextState,
  ContextReducer,
  ColPropsMap,
  RowPropsMap,
} from "./types";
import { statusConfig as orderStatusesConfig } from "@/const/statusConfig";
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
    case "setFilters": {
      return {
        ...state,
        filters: action.payload,
      };
    }
    case "setPagination": {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
      };
    }
    case "setLoading": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case "setUpdating": {
      return {
        ...state,
        updating: action.payload,
      };
    }
    case "setShouldRefresh": {
      return {
        ...state,
        shouldRefresh: action.payload,
      };
    }
    case "setLiveModeEnabled": {
      return {
        ...state,
        liveModeEnabled: action.payload,
      };
    }
    case "addDraftFilter": {
      return {
        ...state,
        draftFilters: {
          ...state.draftFilters,
          [action.payload.id]: action.payload.filter,
        },
      };
    }
    case "removeDraftFilter": {
      const { [action.payload.id]: _, ...rest } = state.draftFilters;
      return {
        ...state,
        draftFilters: rest,
      };
    }
    case "mutateDraftFilter": {
      return {
        ...state,
        draftFilters: {
          ...state.draftFilters,
          [action.payload.id]: {
            ...state.draftFilters[action.payload.id],
            ...action.payload.filter,
          },
        },
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
  setFilters: (filters: ContextState["filters"]) => {
    dispatch({
      type: "setFilters",
      payload: filters,
    });
  },
  setPagination: (pagination: Partial<ContextState["pagination"]>) => {
    dispatch({
      type: "setPagination",
      payload: pagination,
    });
  },
  setLoading: (loading: boolean) => {
    dispatch({
      type: "setLoading",
      payload: loading,
    });
  },
  setUpdating: (updating: boolean) => {
    dispatch({
      type: "setUpdating",
      payload: updating,
    });
  },
  setShouldRefresh: (shouldRefresh: boolean) => {
    dispatch({
      type: "setShouldRefresh",
      payload: shouldRefresh,
    });
  },
  setLiveModeEnabled: (enabled: boolean) => {
    dispatch({
      type: "setLiveModeEnabled",
      payload: enabled,
    });
  },
  addDraftFilter: (id: string, filter: ContextState["filters"][string]) => {
    dispatch({
      type: "addDraftFilter",
      payload: { id, filter },
    });
  },
  removeDraftFilter: (id: string) => {
    dispatch({
      type: "removeDraftFilter",
      payload: { id },
    });
  },
  mutateDraftFilter: (
    id: string,
    filter: Partial<ContextState["filters"]["string"]>
  ) => {
    dispatch({
      type: "mutateDraftFilter",
      payload: { id, filter },
    });
  },
});

export type ContextActions = ReturnType<typeof createActions>;

export const ordersTableColumns: ContextState["cols"] = {
  checkbox: {
    position: 0,
    minConstraints: [55, 48],
    initialWidth: 52,
    width: 52,
    isSticky: true,
    Component: <CheckboxInput checked={false} onChange={() => {}} />,
  },

  order_no: {
    label: "Nr. comandǎ",
    filter: {
      operations: ["includes", "equals"],
      label: "Nr. comandǎ",
      dataKey: "display_name",
    },
    minConstraints: [140, 48] as [number, number],
    initialWidth: 140,
    isSticky: true,
    position: 1,
    width: 140,
  },
  name: {
    label: "Nume",
    position: 2,
    filter: {
      operations: ["equals", "includes"],
      label: "Nume",
      dataKey: "name",
    },
    minConstraints: [207, 48] as [number, number],
    initialWidth: 207,
    width: 207,
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
    filter: {
      operations: ["equals", "not_equals"],
      label: "Stare",
      dataKey: "status.name",
      options: Object.entries(orderStatusesConfig).map(([key, value]) => ({
        id: key,
        label: value.label,
        color: value.color,
      })),
    },

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
    resultsPerPage: 100,
  },
  filters: {},
  draftFilters: {},
  sorting: [],
  selectedOrderIds: [],
  loading: true,
  updating: false,
  liveModeEnabled: true,
};
