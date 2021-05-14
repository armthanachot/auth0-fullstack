// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";
// import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { Auth0Provider } from "@auth0/auth0-react";

import "./index.css";

const providerConfig = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  audience:process.env.REACT_APP_AUTH0_AUDIENCE,
  redirectUri: window.location.origin,
};
// scope:"default:admin"
// scope ต้องมีใน api ด้วย ถ้าใส่แบบไม่มีไป มันไม่ error แต่จะไม่ได้ scope นั้น
ReactDOM.render(
  <Router>
  <Auth0Provider {...providerConfig}>
    <App />
  </Auth0Provider>,
  </Router>,
  document.getElementById("root")
);
