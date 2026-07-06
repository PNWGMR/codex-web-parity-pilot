import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import "./App.css";

const rootElement: HTMLElement | null = document.getElementById("root");

if (rootElement === null) {
  throw new Error("SprintPulse root element was not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

