import React from "react";
import ReactDOM from "react-dom/client";
// import { ChakraProvider } from "@chakra-ui/react";
// import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import Home from "./pages/Home";
import BuyCoin from "./pages/BuyCoin";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/buy-token" element={<BuyCoin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
