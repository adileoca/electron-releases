import { TableState, TableAction } from "./types";

export const initialState: TableState = {
  checkboxCol: {
    enabled: true,
    position: 0,
    minConstraints: [60, 48],
    initialWidth: 60,
    width: 60,
  },
  cols: [
    {
      id: "order_no",
      label: "Order No.",
      isSticky: true,
      position: 1,
      minConstraints: [150, 48],
      initialWidth: 150,
      width: 150,
    },
    {
      id: "order_no",
      label: "Date Placed",
      position: 2,
      minConstraints: [200, 48],
      initialWidth: 200,
      width: 200,
    },
    {
      id: "status",
      label: "Status",
      position: 3,
      minConstraints: [200, 48],
      initialWidth: 200,
      width: 200,
    },
    {
      id: "date",
      label: "Amount",
      minConstraints: [200, 48],
      initialWidth: 200,
      position: 4,
      width: 200,
    },
    {
      id: "total",
      label: "Address",
      minConstraints: [150, 48],
      initialWidth: 150,
      position: 5,
      width: 200,
    },
  ],
  rows: [],
  selectedRowIds: [],
  pagination: {
    currentPage: 1,
    totalPages: 25,
    resultsPerPage: 50,
  },
  filters: [],
  sorting: [],
};

export const reducer = (state: TableState, action: TableAction): TableState => {
  switch (action.type) {
    // case "SET_PAYMENT_METHOD":
    //   return { ...state, paymentMethod: action.payload };
    // case "SET_PAYMENT_INTENT_ID":
    //   return { ...state, paymentIntentId: action.payload };
    // case "SET_CUSTOMER_INFO":
    //   return { ...state, customer: { ...state.customer, ...action.payload } };
    // case "SET_BILLING_DETAILS":
    //   return {
    //     ...state,
    //     billingDetails: { ...state.billingDetails, ...action.payload },
    //   };
    // case "SET_SHIPPING_DETAILS":
    //   return {
    //     ...state,
    //     shippingDetails: { ...state.shippingDetails, ...action.payload },
    //   };
    // case "SET_BILLING_ADDRESS":
    //   return {
    //     ...state,
    //     billingDetails: {
    //       ...state.billingDetails,
    //       address: { ...state.billingDetails.address, ...action.payload },
    //     },
    //   };
    // case "SET_SHIPPING_ADDRESS":
    //   return {
    //     ...state,
    //     shippingDetails: {
    //       ...state.shippingDetails,
    //       address: { ...state.shippingDetails.address, ...action.payload },
    //     },
    //   };
    // case "SET_BUSINESS_INFO":
    //   return {
    //     ...state,
    //     businessInfo: { ...state.businessInfo, ...action.payload },
    //   };
    // case "UPDATE_TOTALS":
    //   return { ...state, totals: { ...state.totals, ...action.payload } };
    // case "SET_LOADING":
    //   return { ...state, isLoading: action.payload };
    // case "SET_ERROR":
    //   return { ...state, error: action.payload };
    // case "RESET_STATE":
    //   return initialState;
    default:
      return state;
  }
};
