import { TableState, TableAction } from "./types";

export function reducer<T>(
  state: TableState<T>,
  action: TableAction<T>
): TableState<T> {
  switch (action.type) {
    case "SET_ROWS":
      return { ...state, rows: action.payload };
    default:
      return state;
  }
}
