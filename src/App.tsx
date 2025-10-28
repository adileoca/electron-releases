import { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";

import useIpcListeners from "./hooks/useIpcListeners";
import { useSupabase } from "./lib/supabase/context";
import { useSyncData } from "./hooks/useSyncData";
import Spinner from "@/static/spinner.svg";
import Login from "./views/Login";
import AppRoutes from "./Routes";

const App = () => {
  const { session } = useSupabase();

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

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;

const Routes = () => {
  // const initSyncDone = useSyncData();
  useIpcListeners();


  // if (!initSyncDone) {
  if (false) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-neutral-900">
        <img
          className="block h-8 w-auto rounded-full ring-blue-500 ring-offset-2 transition hover:ring-2 lg:h-12"
          src={Spinner}
          alt=""
          loading="eager"
        />
        <span className="font-semibold text-white/80">
          Va rugam asteptati...
        </span>
      </div>
    );
  }

  return <AppRoutes />;
};
