import React, { createContext, useContext, useMemo, useReducer } from "react";
import { TableState, TableContextType, RowProps, ColProps } from "./types";
import { useDispatch } from "./useDispatch";
import { reducer } from "./reducer";

type ColMetadata = Record<string, ColProps>;

export function createTableContext<C extends ColMetadata>(columns: C) {
  type T = keyof C; // T is now the union of the keys of columns

  // move this to reducer file
  const createInitialState = (): TableState<T> => {
    // Build the cols Map from columns
    const cols = new Map<T, ColProps>(
      Object.entries(columns).map(([key, colProps]) => [key as T, colProps])
    );

    const initialState: TableState<T> = {
      checkboxCol: {
        enabled: true,
        position: 0,
        minConstraints: [55, 48],
        initialWidth: 55,
        width: 55,
      },
      cols,
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
    return initialState;
  };

  const initialState = createInitialState();

  const TableContext = createContext<TableContextType<T> | undefined>(
    undefined
  );

  const TableProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer<T>, initialState);
    const tableUpdaters = useDispatch<T>(dispatch); // rename this to create actions


    const handleOnResize = (columnKey: T, newWidth: number) => {
      state.cols.set(columnKey, {
        ...state.cols.get(columnKey)!,
        width: newWidth,
      });
    };

    const value = useMemo(
      () => ({ ...tableUpdaters, ...state, handleOnResize }),
      [tableUpdaters, state, handleOnResize]
    );

    return (
      <TableContext.Provider value={value}>{children}</TableContext.Provider>
    );
  };

  const useTable = (): TableContextType<T> => {
    const context = useContext(TableContext);
    if (!context) {
      throw new Error("useTable must be used within a TableProvider");
    }
    return context;
  };

  return { TableProvider, useTable };
}
