import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App";
// import Login from './Login'

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(window.location.hash);

if (window.location.hash == "#/leaderboard") {
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
