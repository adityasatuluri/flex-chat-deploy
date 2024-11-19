import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner.jsx";
import { Socket } from "socket.io-client";
import { SocketProvider } from "@/context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <SocketProvider>
    <App />
    <Toaster closeButton />
  </SocketProvider>
  //</React.StrictMode>,
);
