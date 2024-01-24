import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/App.css";
import Leaderboard from "@/Leaderboard";
import Profile from "@/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(window.location.hash.toLowerCase());

if (window.location.hash.toLowerCase().startsWith("#leaderboard")) {
  root.render(
    <React.StrictMode>
      <Leaderboard />
    </React.StrictMode>
  );
} else if (window.location.hash.toLowerCase().startsWith("#profile")) {
  root.render(
    <React.StrictMode>
      <Profile />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
