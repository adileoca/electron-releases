import Login from "./views/Login";
import AppRoutes from "./Routes";

import { useHandleSession } from "./hooks/useHandleSession";
import useIpcListeners from "./hooks/useIpcListeners";
import { useSyncData } from "./hooks/useSyncData";
import Spinner from "@/static/spinner.svg";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./styles/App.css";
import { useEffect } from "react";

const App = () => {
  const session = useHandleSession();
  useEffect(() => {
    console.log("session update");
  }, [session]);
  if (session === undefined) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-neutral-900/90">
        <img
          className="block h-8 w-auto rounded-full ring-blue-500 ring-offset-2 transition hover:ring-2 lg:h-12"
          src={Spinner}
          alt=""
          loading="eager"
        />
      </div>
    );
  }

  if (session === null) {
    return <Login />;
  }

  return <Routes />;
};

export default App;

const Routes = () => {
  // todo: use this to set navigation in the app from the plugin
  const initSyncDone = useSyncData();
  // useIpcListeners();

  if (!initSyncDone) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-neutral-900/90">
        <img
          className="block h-8 w-auto rounded-full ring-blue-500 ring-offset-2 transition hover:ring-2 lg:h-12"
          src={Spinner}
          alt=""
          loading="eager"
        />
        <span className="font-semibold text-neutral-200">Please wait</span>
      </div>
    );
  }

  return <AppRoutes />;
};
