import React from "react";
import { Routes, Route } from "react-router-dom";
import BuyCoin from "./pages/BuyCoin";
import Home from "./pages/Home";

const RoutesComponent = () => {
  <Routes>
    <Route path="/*" element={<Home />} />
    <Route path="/buy-token" element={<BuyCoin />} />
  </Routes>;
};

export default RoutesComponent;
