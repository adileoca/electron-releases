import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import TasksDashboardView from "./views/TasksViews/TasksDashboardView";
import EmailDetailedView from "./views/EmailViews/EmailDetailsView";
import OrderDetailsView from "./views/OrderViews/OrderDetailsView";
import DashboardView from "./views/DashboardViews/DashboardView";
import OrdersView from "./views/OrderViews/OrdersView";
import EmailsView from "./views/EmailViews/EmailsView";
import Login from "./views/Login";

import { useSupabase } from "./lib/supabase/context";
import useIpcRenderer from "./hooks/useIpcRenderer";
import { Session } from "@supabase/supabase-js";

import Sidebar from "./components/sidebar";
import Spinner from "@/static/spinner.svg";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./styles/App.css";

const App = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const supabase = useSupabase();
  useIpcRenderer();
  const [cachedFilenames, setCachedFilenames] = useState([]);

  useEffect(() => {
    // fetch cached templates from main process, check against all templates
    const getCachedFilenames = async () => {
      console.log("getting cached filenames...");
      const filenames = await window.electron.invoke("get-cached-filenames");
      setCachedFilenames(filenames);
      console.log("got cached filenames.");
    };
    getCachedFilenames();
    // send new templates to be cached to main process
  }, [session]);

  useEffect(() => {
    console.log("cachedFilenames", cachedFilenames);
  }, [cachedFilenames]);

  const updateSession = (session: Session | null) => {
    if (session) {
      setSession(session);
      window.electron.setSession(session);
    } else {
      setSession(null);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateSession(session);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("event", _event);
      updateSession(session);
    });
    return () => data.subscription.unsubscribe();
  }, []);

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
      <div className="relative">
        <Sidebar />
        <div className="z-50">
          <Routes>
            <Route path="/" element={<DashboardView />} index />
            <Route path="/tasks" element={<TasksDashboardView />} index />

            <Route path="/orders" element={<OrdersView />} index />
            <Route
              path="/orders/details"
              element={<OrderDetailsView />}
              index
            />

            <Route path="/emails" element={<EmailsView />} index />
            <Route path="/emails/:emailId" element={<EmailDetailedView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
