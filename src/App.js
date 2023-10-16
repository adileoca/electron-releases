import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Sidebar from "./components/sidebar";
import Header from "./components/header";

import TaskView from "./views/TaskView";
import OrdersView from "./views/OrdersView";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./styles/App.css";

const App = () => {
  const auth0 = useAuth0();

  if (auth0.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth0.isAuthenticated && !auth0.isLoading) {
    auth0.loginWithRedirect();
  }

  if (auth0.isAuthenticated && !auth0.isLoading) {
    return (
      <Router>
        <div className="relative flex min-h-screen h-full">
          <Sidebar />
          <div className="z-50 flex flex-1 flex-col shadow-2xl shadow-neutral-200/75">
            <Header />
            <Routes>
              <Route path="/tasks" element={<TaskView />} index />
              <Route path="/orders" element={<OrdersView />} index />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
};

export default App;
