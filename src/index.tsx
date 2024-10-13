import ReactDOM from "react-dom/client";
import React from "react";

import { SupabaseProvider } from "./lib/supabase/context";
import App from "./App";

import "./styles/index.css";
// import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
