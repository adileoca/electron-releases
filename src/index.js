import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import React from "react";

import reportWebVitals from "./reportWebVitals";
import "./styles/index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-qlush8at7ytza0tr.eu.auth0.com"
      clientId="VARjIegzs032HFVd1c4wFd9ZXyDypRl4"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-qlush8at7ytza0tr.eu.auth0.com/api/v2/",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
