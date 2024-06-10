import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const divDoIndexHtml = document.getElementById("root");
const root = createRoot(divDoIndexHtml);

root.render(
    <BrowserRouter><App /></BrowserRouter>
);