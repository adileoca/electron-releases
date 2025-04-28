import React, { useContext, useReducer, createContext, useEffect } from "react";

import { reducer, createActions, initialState } from "./reducer";
import { ContextType, ProviderProps } from "./types";

import { useParseRows } from "./hooks/useParseRows";
import { useParseCols } from "./hooks/useParseCols";

const ProductSizesTableContext = createContext<ContextType>(undefined);

const ProductSizesTableProvider: React.FC<ProviderProps> = ({
  children,
  productSizes,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = createActions(state, dispatch);

  useParseCols(state, productSizes, actions);
  useParseRows(state, productSizes, actions);

  useEffect(() => {
    console.log("table state", state);
  }, [state]);

  // useEffect(() => {
  //   console.log("table data", products);
  // }, [products]);

  return (
    <ProductSizesTableContext.Provider value={{ state, actions }}>
      {children}
    </ProductSizesTableContext.Provider>
  );
};

const useProductSizesTableContext = () => {
  const context = useContext(ProductSizesTableContext);
  if (!context) {
    throw Error("use with product sizes table context");
  }
  return context;
};

export { useProductSizesTableContext, ProductSizesTableProvider };
