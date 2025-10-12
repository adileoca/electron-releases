import React, {
  useContext,
  useReducer,
  createContext,
  useEffect,
  useRef,
} from "react";

import { reducer, createActions, initialState } from "./reducer";
import { ContextType, ProviderProps } from "./types";

import { useParseRows } from "./hooks/useParseRows";
import { useParseCols } from "./hooks/useParseCols";
import { useData } from "./hooks/useFetchData";
import {
  readOrdersColumnWidths,
  writeOrdersColumnWidths,
} from "./storage";

const OrdersTableContext = createContext<ContextType>(undefined);

const OrdersTableProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = createActions(state, dispatch);

  const data = useData(state, actions);
  useParseCols(state, data, actions);
  useParseRows(state, data, actions);

  const widthsHydratedRef = useRef(false);
  const lastStoredWidthsRef = useRef<Record<string, number> | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (widthsHydratedRef.current) return;

    void (async () => {
      const stored = await readOrdersColumnWidths();
      if (cancelled) return;
      widthsHydratedRef.current = true;
      if (!stored || Object.keys(stored).length === 0) {
        return;
      }
      dispatch({
        type: "hydrateColumnWidths",
        payload: stored,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!state.cols) return;

    const widths = Object.entries(state.cols).reduce(
      (acc, [key, col]) => {
        if (typeof col.width === "number" && Number.isFinite(col.width)) {
          acc[key] = col.width;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    const prev = lastStoredWidthsRef.current;
    const same =
      prev &&
      Object.keys(widths).length === Object.keys(prev).length &&
      Object.entries(widths).every(([key, value]) => prev[key] === value);

    lastStoredWidthsRef.current = widths;

    if (!widthsHydratedRef.current || same) {
      return;
    }

    void writeOrdersColumnWidths(widths);
  }, [state.cols]);

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
