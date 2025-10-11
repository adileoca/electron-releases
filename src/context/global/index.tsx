import React, {
  useContext,
  useReducer,
  createContext,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { logDebug, logInfo } from "@/lib/logging";

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
  const actions = useMemo(() => createActions(dispatch), [dispatch]);
  const loggedInitRef = useRef(false);

  useEffect(() => {
    if (!state) return;
    if (!loggedInitRef.current) {
      loggedInitRef.current = true;
      logInfo("global-context-init", {
        platform: state.platform,
        updateStatus: state.update.status,
      });
    }

    logDebug("global-state-change", {
      updateStatus: state.update.status,
      updateProgress: state.update.progress,
      pluginVersion: state.plugin.version,
      navigation: {
        latestIndex: state.navigation.latestIndex,
        canGoBack: state.navigation.canGoBack,
        canGoForward: state.navigation.canGoForward,
      },
    });
  }, [state]);

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
