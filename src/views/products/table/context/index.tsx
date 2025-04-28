import React, { useContext, useReducer, createContext, useEffect } from "react";

import { reducer, createActions, initialState } from "./reducer";
import { ContextType, ProviderProps } from "./types";

import { useParseRows } from "./hooks/useParseRows";
import { useParseCols } from "./hooks/useParseCols";
import { useData } from "./hooks/useFetchData";

const ProductsTableContext = createContext<ContextType>(undefined);

const ProductsTableProvider: React.FC<ProviderProps> = ({ children }) => {
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
    <ProductsTableContext.Provider value={{ state, data, actions }}>
      {children}
    </ProductsTableContext.Provider>
  );
};

const useProductsTableContext = () => {
  const context = useContext(ProductsTableContext);
  if (!context) {
    throw Error("use with orders table context");
  }
  return context;
};

export { useProductsTableContext, ProductsTableProvider };
