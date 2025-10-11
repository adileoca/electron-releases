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
    case "setPluginVersion":
      return {
        ...state,
        plugin: { ...state.plugin, version: action.payload },
      };
    case "setPluginUpdateError":
      return {
        ...state,
        plugin: { ...state.plugin, updateError: action.payload },
      };
    default:
      return state;
  }
};

export const createActions = (dispatch: Dispatch<Actions>) => ({
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
    setError: (error: any) => {
      dispatch({
        type: "setUpdateError",
        payload: error,
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
  photoshop: {
    setVersion: (version: string) => {
      console.log("setting plugin version...", version);
      dispatch({
        type: "setPluginVersion",
        payload: version,
      });
    },
    setUpdateError: (error: string) => {
      dispatch({
        type: "setPluginUpdateError",
        payload: error,
      });
    },
  },
});

export type ContextActions = ReturnType<typeof createActions>;

export const initialState: Omit<State, "platform"> = {
  update: { status: null, progress: null },
  navigation: { latestIndex: 0, canGoBack: false, canGoForward: false },
  plugin: { version: null, updateError: null },
};
