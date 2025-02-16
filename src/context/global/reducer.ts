import { State, Actions } from "./types";
import { Reducer, Dispatch } from "react";
import { UpdateStatusType } from "./types";

export const reducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case "setUpdateStatus":
      return {
        ...state,
        update: { ...state.update, status: action.payload },
      };
    case "setUpdateProgress":
      return {
        ...state,
        update: { ...state.update, progress: action.payload },
      };
    case "setUpdateError":
      return {
        ...state,
        update: { ...state.update, error: action.payload },
      };
    case "setNavigationLatestIndex":
      return {
        ...state,
        navigation: { ...state.navigation, latestIndex: action.payload },
      };
    case "setNavigationCanGoBack":
      return {
        ...state,
        navigation: { ...state.navigation, canGoBack: action.payload },
      };
    case "setNavigationCanGoForward":
      return {
        ...state,
        navigation: { ...state.navigation, canGoForward: action.payload },
      };
    default:
      return state;
  }
};

export const createActions = (state: State, dispatch: Dispatch<Actions>) => ({
  update: {
    setStatus: (status: UpdateStatusType) => {
      dispatch({
        type: "setUpdateStatus",
        payload: status,
      });
    },
    setProgress: (progress: any) => {
      dispatch({
        type: "setUpdateProgress",
        payload: progress,
      });
    },
    setError: (progress: any) => {
      dispatch({
        type: "setUpdateProgress",
        payload: progress,
      });
    },
  },
  navigation: {
    setLatestIndex: (index: number) => {
      dispatch({
        type: "setNavigationLatestIndex",
        payload: index,
      });
    },
    setCanGoBack: (canGoBack: boolean) => {
      dispatch({
        type: "setNavigationCanGoBack",
        payload: canGoBack,
      });
    },
    setCanGoForward: (canGoForward: boolean) => {
      dispatch({
        type: "setNavigationCanGoForward",
        payload: canGoForward,
      });
    },
  },
});

export type ContextActions = ReturnType<typeof createActions>;

export const initialState: State = {
  update: { status: null, progress: null },
  navigation: { latestIndex: 0, canGoBack: false, canGoForward: false },
};
