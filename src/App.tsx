import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "./components/sidebar";

import TaskView from "./views/TaskView";
import OrdersView from "./views/OrdersView";
import { createApolloClient } from "./lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./styles/App.css";

const { ipcRenderer } = window.require("electron");

const App: React.FC = () => {
  const auth0 = useAuth0();
  const [apolloClient, setApolloClient] = useState<any>(null);

  const fetchToken = useCallback(async () => {
    const tokenClaims = await auth0.getIdTokenClaims();
    if (tokenClaims) {
      const token = tokenClaims.__raw;
      ipcRenderer.send("set-token", token);
      return token;
    }
    return null;
  }, [auth0]);

  useEffect(() => {
    const initializeClient = async () => {
      const token = await fetchToken();
      if (token) {
        setApolloClient(createApolloClient(token));
      }
    };
    initializeClient();
    const tokenRefreshInterval = setInterval(() => {
      fetchToken();
    }, 3600000); // Refresh token every hour
    return () => clearInterval(tokenRefreshInterval);
  }, [fetchToken]);

  if (auth0.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth0.isAuthenticated && !auth0.isLoading) {
    auth0.loginWithRedirect();
  }

  if (auth0.isAuthenticated && apolloClient) {
    return (
      <ApolloProvider client={apolloClient}>
        <Router>
          <div className="relative flex h-full min-h-screen">
            <Sidebar />
            <div className="z-50 flex flex-1 flex-col shadow-neutral-200/75">
              <Routes>
                <Route path="/" element={<div>Home</div>} index />
                <Route path="/tasks" element={<TaskView />} index />
                <Route path="/orders" element={<OrdersView />} index />
              </Routes>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }

  return <div>Loading...</div>;
};

export default App;
