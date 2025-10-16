import { ContextActions } from "./reducer";
import { OrderSummaries } from "@/lib/supabase/database";
import { fetchData } from "./hooks/useFetchData";

export type ProviderProps = {
  children: React.ReactNode;
};

export type ContextType =
  | {
      state: ContextState;
      actions: ContextActions;
      data: ContextData;
    }
  | undefined;

export type ContextData = Awaited<ReturnType<typeof fetchData>> | null;

export type OrdersListCacheValue = {
  ids: string[];
  count: number | null;
  metadata: {
    sort: "created_at:desc";
    updatedAt: number;
  };
};

export type ColProps = {
  position: number;

  minConstraints: [width: number, height: number];
  initialWidth: number;
  width: number;

  filter?: FilterConfig;

  dataKey?: string;
  visible?: boolean;
  Component?: React.ReactNode;
  isSticky?: boolean;
  label?: string;
};

export type ColPropsMap = {
  [key in ColId]: ColProps;
};

export type RowPropsMap = {
  [key in ColId]: RowProps;
};

export type RowProps = {
  Component?: React.ReactNode;
  value?: string | number;
  text?: string;
};

export type Pagination = {
  currentPage: number;
  resultsPerPage: number;
};

export type ColId =
  | "checkbox"
  | "name"
  | "amount"
  | "address"
  | "status"
  | "order_no"
  | "date_placed";

export type FilterOperations = "includes" | "equals" | "not_equals";
export type FilterType = {
  dataKey: string;
  type: FilterOperations;
  value: string;
  enabled: boolean;
};

export type ContextState = {
  cols: ColPropsMap;
  rows: RowPropsMap[];
  pagination: Pagination;
  filters: { [id: string]: FilterType };
  draftFilters: { [id: string]: FilterType };
  sorting: {}[];
  selectedOrderIds: string[];
  loading: boolean;
  updating: boolean;
  shouldRefresh?: boolean;
  liveModeEnabled: boolean;
  error?: string;
};

export type ContextReducer =
  | {
      type: "setCols";
      payload: ColPropsMap;
    }
  | {
      type: "setRows";
      payload: RowPropsMap[];
    }
  | {
      type: "setSelectedOrderIds";
      payload: string[];
    }
  | {
      type: "setPagination";
      payload: Partial<Pagination>;
    }
  | {
      type: "setFilters";
      payload: ContextState["filters"];
    }
  | {
      type: "setLoading";
      payload: boolean;
    }
  | {
      type: "setUpdating";
      payload: boolean;
    }
  | {
      type: "setShouldRefresh";
      payload: boolean;
    }
  | {
      type: "setLiveModeEnabled";
      payload: boolean;
    }
  | {
      type: "addDraftFilter";
      payload: {
        id: string;
        filter: FilterType;
      };
    }
  | {
      type: "removeDraftFilter";
      payload: { id: string };
    }
  | {
      type: "mutateDraftFilter";
      payload: {
        id: string;
        filter: Partial<FilterType>;
      };
    }
  | {
      type: "hydrateColumnWidths";
      payload: Record<string, number>;
    };

export type FilterConfig = {
  label: string;
  dataKey: string;
  operations: FilterOperations[];
  options?: { id: string; label: string; color?: string }[];
};
