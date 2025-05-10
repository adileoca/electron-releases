import ReactDOM from "react-dom/client";
import React from "react";

import { SupabaseProvider } from "./lib/supabase/context";
import { GlobalProvider } from "./context/global";

import "./styles/index.css";
import "./styles/App.css";
import App from "./App";

// import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

async function renderApp() {
  const platform = await window.electron.getPlatform();

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <GlobalProvider platform={platform}>
          <SupabaseProvider>
            <App />
          </SupabaseProvider>
        </GlobalProvider>
      </React.StrictMode>
    );
  } else {
    console.error("Root element not found");
  }
}

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
