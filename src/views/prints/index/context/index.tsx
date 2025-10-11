import React, { useContext, useReducer, createContext, useEffect } from "react";

import { reducer, createActions, initialState } from "./reducer";
import { ContextType, ProviderProps } from "./types";

import { useData } from "./hooks/useFetchData";

const PrintsDisplayContext = createContext<ContextType>(undefined);

const PrintsDisplayProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = createActions(state, dispatch);

  const data = useData(state, actions);

  useEffect(() => {
    console.log("table state", state);
  }, [state]);

  useEffect(() => {
    console.log("table data", data);
  }, [data]);

  return (
    <PrintsDisplayContext.Provider value={{ state, data, actions }}>
      {children}
    </PrintsDisplayContext.Provider>
  );
};

const usePrintsDisplayContext = () => {
  const context = useContext(PrintsDisplayContext);
  if (!context) {
    throw Error("use with prints display context");
  }
  return context;
};

export { usePrintsDisplayContext, PrintsDisplayProvider };
