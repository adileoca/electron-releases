import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";

import TaskView from "./views/TaskView";
import OrdersView from "./views/OrdersView";
import EmailsView from "./views/EmailsView";
import EmailDetailedView from "./views/EmailDetailedView";
import Login from "./views/Login";
import { Session } from "@supabase/supabase-js";
import Spinner from "@/static/spinner.svg";
import { useSupabase } from "./lib/supabase/context";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./styles/App.css";

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  const supabase = useSupabase();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("event", _event);
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-neutral-900/90">
        {" "}
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
            <Route path="/" element={<div>Home</div>} index />
            {/* <Route path="/tasks" element={<TaskView />} index /> */}
            <Route path="/emails" element={<EmailsView />} index />
            <Route path="/orders" element={<OrdersView />} index />
            <Route path="/emails/:emailId" element={<EmailDetailedView />} /> //
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
