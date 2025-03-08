// import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
// import { ContextProvider } from "./contexts/ContextProvider";
// import "./index.css";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    //     <ContextProvider>

    //     </ContextProvider>
    // </React.StrictMode>

    <RouterProvider router={router} />
);
