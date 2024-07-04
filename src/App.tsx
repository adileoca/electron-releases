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
  const { isLoading, isAuthenticated, loginWithRedirect, getIdTokenClaims } =
    useAuth0();
  const [apolloClient, setApolloClient] = useState<any>(null);

  const fetchToken = useCallback(async () => {
    if (!isAuthenticated) return;
    const tokenClaims = await getIdTokenClaims();
    if (tokenClaims) {
      const token = tokenClaims.__raw;
      ipcRenderer.send("set-token", token);
      return token;
    }
    return null;
  }, [getIdTokenClaims, isAuthenticated]);

  const initializeApolloClient = useCallback(async () => {
    const token = await fetchToken();
    if (token) setApolloClient(createApolloClient(token));
  }, [fetchToken]);

  useEffect(() => {
    initializeApolloClient();
    const tokenRefreshInterval = setInterval(() => {
      initializeApolloClient(); // Re-initialize Apollo Client with new token
    }, 1800000); // Refresh token every hour
    return () => clearInterval(tokenRefreshInterval); // Clear interval on unmount
  }, [initializeApolloClient]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && !isLoading) {
    loginWithRedirect();
    return null;
  }

  if (isAuthenticated && apolloClient) {
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
