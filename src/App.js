import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import React,{ useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

import TaskView from "./views/TaskView";
import OrdersView from "./views/OrdersView";
import { createApolloClient } from "./lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./styles/App.css";

const App = () => {
  const auth0 = useAuth0();
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchToken = async () => {
      const tokenClaims = await auth0.getIdTokenClaims();
      if (tokenClaims) setToken(tokenClaims.__raw);
    };
    fetchToken();
  }, [auth0]);

  if (auth0.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth0.isAuthenticated && !auth0.isLoading) {
    auth0.loginWithRedirect();
  }

  if (auth0.isAuthenticated && !auth0.isLoading) {
    console.log("token", token)
    const apolloClient = createApolloClient(token);
    return (
      <ApolloProvider client={apolloClient}>
        <Router>
          <div className="relative flex h-full min-h-screen">
            <Sidebar />
            <div className="z-50 flex flex-1 flex-col shadow-neutral-200/75">
              {/* <Header /> */}
              <Routes>
                <Route path="/" element={<div>cxaca</div>} index />
                <Route path="/tasks" element={<TaskView />} index />
                <Route path="/orders" element={<OrdersView />} index />
              </Routes>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
};

export default App;
