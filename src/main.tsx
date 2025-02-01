import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css"
import PromptInput from "./PromptInput.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PromptInput />
  </React.StrictMode>,
);
