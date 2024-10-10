import { useDispatch } from "./hooks/useDispatch";

type col = {
  label?: string;
  id: string;
  isSticky?: boolean;
  position: number;
  minConstraints: [width: number, height: number];
  initialWidth: number;
  Component?: React.ReactNode;
  width: number;
};
export type TableContextType = ReturnType<typeof useDispatch> & TableState;

type CheckboxColProps = {
  enabled: boolean;
  position: 0;
  minConstraints: [width: number, height: number];
  initialWidth: number;
  width: number;
}; 

export type RowProps = {
  enabled: boolean;
  position: 0;
  minConstraints: [width: number, height: number];
  initialWidth: number;
  width: number;
};

export type TableState = {
  checkboxCol: CheckboxColProps;
  cols: col[];
  rows: RowProps[];
  pagination: {
    currentPage: number;
    totalPages: number;
    resultsPerPage: number;
  };
  filters: {}[];
  sorting: {}[];
  selectedRowIds: number[];
};

export type TableAction =
  | { type: "SET_PAYMENT_METHOD"; payload: string }
  | { type: "SET_ROWS"; payload: RowProps[] };
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

export interface TableProviderProps {
  children: React.ReactNode;
  clientSecret: string;
}
