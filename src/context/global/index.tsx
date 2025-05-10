import React, { useContext, useReducer, createContext, useEffect } from "react";

import { ContextType, ProviderProps, ReducerType } from "./types";
import { reducer, createActions, initialState } from "./reducer";


const GlobalContext = createContext<ContextType>(undefined);

export const GlobalProvider: React.FC<ProviderProps> = ({
  children,
  platform,
}) => {
  const [state, dispatch] = useReducer<ReducerType>(reducer, {
    ...initialState,
    platform,
  });
  const actions = createActions(state, dispatch);

  useEffect(() => {
    console.log("global state", state);
  }, []);

  return (
    <GlobalContext.Provider value={{ state, actions }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw Error("use with global provider");
  }
  return context;
};
