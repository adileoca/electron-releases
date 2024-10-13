import { Dispatch } from "react";
import { TableAction, TableState, RowProps } from "./types";

export function useDispatch<T>(dispatch: Dispatch<TableAction<T>>) {
  const setRows = (rows: Map<T, RowProps<T>>[]) => {
    dispatch({ type: "SET_ROWS", payload: rows });
  };

  // ...other dispatch functions

  return { setRows /* ...other dispatch functions */ };
}
