import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import Home from "./pages/Home";
import BuyCoin from "./pages/BuyCoin";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {
  const [signer, setSigner] = useState({});

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home setSigner={setSigner} />} />
          <Route path="/buy-token" element={<BuyCoin signer={signer} />} />
          <Route
            path="/app"
            element={
              <ChakraProvider>
                <App />
              </ChakraProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

root.render(<Index />);
