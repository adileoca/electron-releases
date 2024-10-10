import { Dispatch } from "react";
import { TableAction, TableState } from "../types";
import { RowProps } from "../types";

export const useDispatch = (dispatch: Dispatch<TableAction>) => {
  const setPaymentMethod = (method: string) => {
    dispatch({
      type: "SET_PAYMENT_METHOD",
      payload: method,
    });
  };

  const setRows = (rows: RowProps[]) => {
    dispatch({
      type: "SET_ROWS",
      payload: rows,
    });
  };

  // const setPaymentIntentId = (id: string) => {
  //   dispatch({
  //     type: "SET_PAYMENT_INTENT_ID",
  //     payload: id,
  //   });
  // };

  // const setCustomerInfo = (customer: Partial<CheckoutState["customer"]>) => {
  //   dispatch({
  //     type: "SET_CUSTOMER_INFO",
  //     payload: customer,
  //   });
  // };

  // const setBillingDetails = (
  //   billing: Partial<CheckoutState["billingDetails"]>
  // ) => {
  //   dispatch({
  //     type: "SET_BILLING_DETAILS",
  //     payload: billing,
  //   });
  // };

  // const setShippingDetails = (
  //   shipping: Partial<CheckoutState["shippingDetails"]>
  // ) => {
  //   dispatch({
  //     type: "SET_SHIPPING_DETAILS",
  //     payload: shipping,
  //   });
  // };

  // const setBillingAddress = (
  //   address: Partial<CheckoutState["billingDetails"]["address"]>
  // ) => {
  //   dispatch({
  //     type: "SET_BILLING_ADDRESS",
  //     payload: address,
  //   });
  // };

  // const setShippingAddress = (
  //   address: Partial<CheckoutState["shippingDetails"]["address"]>
  // ) => {
  //   dispatch({
  //     type: "SET_SHIPPING_ADDRESS",
  //     payload: address,
  //   });
  // };

  // const setBusinessInfo = (
  //   business: Partial<CheckoutState["businessInfo"]>
  // ) => {
  //   dispatch({
  //     type: "SET_BUSINESS_INFO",
  //     payload: business,
  //   });
  // };

  // const setLoading = (loading: boolean) => {
  //   dispatch({
  //     type: "SET_LOADING",
  //     payload: loading,
  //   });
  // };

  // const setError = (error: string | null) => {
  //   dispatch({
  //     type: "SET_ERROR",
  //     payload: error,
  //   });
  // };

  // const resetState = () => {
  //   dispatch({
  //     type: "RESET_STATE",
  //   });
  // };

  // const updateTotals = (totals: Partial<CheckoutState["totals"]>) => {
  //   dispatch({
  //     type: "UPDATE_TOTALS",
  //     payload: totals,
  //   });
  // };

  return {
    setPaymentMethod,
    // setPaymentIntentId,
    // setCustomerInfo,
    // setBillingDetails,
    // setShippingDetails,
    // setBillingAddress,
    // setShippingAddress,
    // setBusinessInfo,
    // setLoading,
    // setError,
    // resetState,
    // updateTotals,
  };
};
