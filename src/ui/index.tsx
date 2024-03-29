import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

const main = () => {
  const el = document.getElementById("root");
  if (el === null) return;
  createRoot(el).render(<App />);
};

main();
