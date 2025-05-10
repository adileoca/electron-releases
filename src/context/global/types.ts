import { ContextActions } from "./reducer";
import { Reducer } from "react";

export type ProviderProps = {
  children: React.ReactNode;
  platform: "win32" | "darwin" | "linux";
};

export type UpdateStatusType =
  | "update-available"
  | "update-downloaded"
  | "checking-for-update"
  | "update-not-available"
  | null;

export type State = {
  platform: "darwin" | "win32" | "linux";
  plugin: {
    version: string | null;
    updateError: string | null;
  };
  update: { status: UpdateStatusType; progress?: any; error?: any };
  navigation: {
    latestIndex: number;
    canGoBack: boolean;
    canGoForward: boolean;
  };
};

export type ContextType =
  | {
      actions: ContextActions;
      state: State;
    }
  | undefined;

export type Actions =
  | {
      type: "setUpdateStatus";
      payload: UpdateStatusType;
    }
  | { type: "setUpdateProgress"; payload: any }
  | { type: "setUpdateError"; payload: any }
  | { type: "setNavigationLatestIndex"; payload: number }
  | { type: "setNavigationCanGoBack"; payload: boolean }
  | { type: "setNavigationCanGoForward"; payload: boolean }
  | { type: "setPluginVersion"; payload: string }
  | { type: "setPluginUpdateError"; payload: string };

export type ReducerType = Reducer<State, Actions>;
