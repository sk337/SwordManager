import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/App.css";
import "@/JetBrainsMono.css";
import "highlight.js/styles/base16/windows-10.min.css";
import Leaderboard from "@/Leaderboard";
import Profile from "@/Profile";
import Stats from "@/Stats";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(window.location.hash.toLowerCase());

if (window.location.hash.toLowerCase().startsWith("#leaderboard")) {
  root.render(
    <React.StrictMode>
      <Leaderboard />
    </React.StrictMode>,
  );
} else if (window.location.hash.toLowerCase().startsWith("#profile")) {
  root.render(
    <React.StrictMode>
      <Profile />
    </React.StrictMode>,
  );
} else if (window.location.hash.toLowerCase().startsWith("#stats")) {
  root.render(
    <React.StrictMode>
      <Stats />
    </React.StrictMode>,
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
