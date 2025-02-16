import React, { useContext, useReducer, createContext, useEffect } from "react";

import { reducer, createActions, initialState } from "./reducer";
import { ContextType, ProviderProps } from "./types";

import { useParseRows } from "./hooks/useParseRows";
import { useParseCols } from "./hooks/useParseCols";
import { useData } from "./hooks/useFetchData";

const OrdersTableContext = createContext<ContextType>(undefined);

const OrdersTableProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = createActions(state, dispatch);

  const data = useData();
  useParseCols(state, data, actions);
  useParseRows(state, data, actions);

  useEffect(() => {
    console.log("table state", state);
  }, [state]);

  useEffect(() => {
    console.log("table data", data);
  }, [data]);

  return (
    <OrdersTableContext.Provider value={{ state, data, actions }}>
      {children}
    </OrdersTableContext.Provider>
  );
};

const useOrdersTableContext = () => {
  const context = useContext(OrdersTableContext);
  if (!context) {
    throw Error("use with orders table context");
  }
  return context;
};

export { useOrdersTableContext, OrdersTableProvider };
