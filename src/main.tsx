import React from "react";
import ReactDOM from "react-dom/client";
import PromptPage from "./pages/PromptPage";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PromptPage />
  </React.StrictMode>,
);
