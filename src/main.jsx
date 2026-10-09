import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "@cloudflare/kumo/styles/standalone";
import "./styles.css";
const root = document.getElementById("root");
if (root.querySelector("main")) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
