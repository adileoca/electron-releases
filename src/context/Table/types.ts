import { useDispatch } from "./useDispatch";

export type TableContextType<T> = ReturnType<typeof useDispatch<T>> &
  TableState<T> & {
    handleOnResize: (columnKey: T, newWidth: number) => void;
  };

type CheckboxColProps = {
  enabled: boolean;
  position: 0;
  minConstraints: [width: number, height: number];
  initialWidth: number;
  width: number;
};

export type ColProps = {
  label?: string;
  id: string;
  isSticky?: boolean;
  position: number;
  minConstraints: [width: number, height: number];
  initialWidth: number;
  Component?: React.ReactNode;
  width: number;
};

export type ColMeta = Record<string, ColProps>;

export type RowProps<T> = {
  id: T;
  Component?: React.ReactNode;
  text?: string;
  value?: string | number;
};

export type TableState<T> = {
  checkboxCol: CheckboxColProps;
  cols: Map<T, ColProps>;
  rows: Map<T, RowProps<T>>[];
  pagination: {
    currentPage: number;
    totalPages: number;
    resultsPerPage: number;
  };
  filters: {}[];
  sorting: {}[];
  selectedRowIds: number[];
};

export type TableAction<T> = {
  type: "SET_ROWS";
  payload: Map<T, RowProps<T>>[];
};
// | { type: "SET_PAYMENT_INTENT_ID"; payload: string }
// | { type: "SET_CUSTOMER_INFO"; payload: Partial<TableState["customer"]> }
// | {
//     type: "SET_BILLING_DETAILS";
//     payload: Partial<TableState["billingDetails"]>;
//   }
// | {
//     type: "SET_SHIPPING_DETAILS";
//     payload: Partial<TableState["shippingDetails"]>;
//   }
// | {
//     type: "SET_BILLING_ADDRESS";
//     payload: Partial<TableState["billingDetails"]["address"]>;
//   }
// | {
//     type: "SET_SHIPPING_ADDRESS";
//     payload: Partial<TableState["shippingDetails"]["address"]>;
//   }
// | {
//     type: "SET_BUSINESS_INFO";
//     payload: Partial<TableState["businessInfo"]>;
//   }
// | { type: "SET_LOADING"; payload: boolean }
// | { type: "SET_ERROR"; payload: string | null }
// | { type: "RESET_STATE" }
// | { type: "UPDATE_TOTALS"; payload: Partial<TableState["totals"]> };
