import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import { ChakraProvider } from "@chakra-ui/react";
// import App from "./App";
// import RoutesComponent from "./Routes";
// import { BrowserRouter } from "react-router-dom";
// import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import Home from "./pages/Home";
import BuyCoin from "./pages/BuyCoin";

const root = ReactDOM.createRoot(document.getElementById("root"));

const HomeScreen = () => {
  const [stage, setStage] = useState("home");

  return <>{stage === "home" ? <Home setStage={setStage} /> : <BuyCoin />}</>;
};

root.render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter> */}
    <HomeScreen />
  </React.StrictMode>
);


