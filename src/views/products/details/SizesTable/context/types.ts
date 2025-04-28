import { ContextActions } from "./reducer";
// import { OrderSummaries } from "@/lib/supabase/database";
import { Product } from "../../queries";

export type ProviderProps = {
  children: React.ReactNode;
  productSizes: NonNullable<Product>["sizes"];
};

export type ContextType =
  | {
      state: ContextState;
      actions: ContextActions;
    }
  | undefined;

export type ContextData = NonNullable<Product>["sizes"];

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

export type ColId = "checkbox" | "id" | "width" | "height";

export type ContextState = {
  cols: ColPropsMap;
  rows: RowPropsMap[];
  pagination: Pagination;
  filters: {}[];
  sorting: {}[];
  selected: string[];
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
      type: "setSelected";
      payload: string[];
    }
  | {
      type: "setPagination";
      payload: Partial<Pagination>;
    };
