import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import App from './App';

const RoutesComponent = () => {
  <Routes>
    {/* <Route path="/app" element={<App />} /> */}
    <Route path="/*" element={<Home />} />
    {/* <Route path="/buy-token" element={<ConnectWallet />} /> */}
  </Routes>;
};

export default RoutesComponent;
