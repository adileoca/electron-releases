import { ContextActions } from "./reducer";
import { OrderSummaries } from "@/lib/supabase/database";

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

export type ContextData = OrderSummaries | null;

export type ColProps = {
  position: number;

  minConstraints: [width: number, height: number];
  initialWidth: number;
  width: number;

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
  totalPages: number;
  resultsPerPage: number;
};

export type ColId =
  | "checkbox"
  | "amount"
  | "address"
  | "status"
  | "order_no"
  | "date_placed";

export type ContextState = {
  cols: ColPropsMap;
  rows: RowPropsMap[];
  pagination: Pagination;
  filters: {}[];
  sorting: {}[];
  selectedOrderIds: string[];
  loading: boolean;
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
    };
