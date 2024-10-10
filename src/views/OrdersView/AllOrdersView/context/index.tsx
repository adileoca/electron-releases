"use client";

import { createContext, useContext, useState, useMemo } from "react";

import { createClient } from "@/lib/supabase/client";
import { useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { useDispatch } from "./hooks/useDispatch";
import { TableContextType } from "./types";

export const TableContext = createContext<TableContextType | undefined>(
  undefined
);

export const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const tableUpdaters = useDispatch(dispatch);
  const checkout = { ...tableUpdaters, ...state };

  const value = useMemo(() => checkout, [tableUpdaters, state]);

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export const useTable = (): TableContextType => {
  const context = useContext(TableContext) as TableContextType;
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

type TableContextProps = {
  headers: []; // fetch from account data, load preferences into local storage on login
  rows: [];
  pagination: {
    currentPage: number;
    totalPages: number;
    resultsPerPage: number;
  };
  filters: {}[];
  sorting: {}[];
  selectedRowIds: number[];
};




