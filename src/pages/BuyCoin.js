import React, { useState } from "react";
import Header from "../components/Header";
import LogoIcon from "../assets/icons/logo.svg";
import BottomArrow from "../assets/icons/bottom-arrow.svg";
import { Coins } from "../utility/constant";
import InputText from "../components/InputText";

const BuyCoin = () => {
  const [to, setTo] = useState(Coins[0]);
  const [from, setFrom] = useState(Coins[Coins.length - 1]);

  return (
    <div>
      <Header />
      <div
        style={{
          width: "60%",
          margin: "auto",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        <img
          src={LogoIcon}
          style={{ width: 64, height: 64 }}
          alt="indexx logo"
        />
        <h3 style={{ color: "#1950d5", fontSize: 18 }}>indexx500</h3>
        <h3 style={{ marginTop: 20, color: "#808080", marginBottom: 0 }}>
          SWAP
        </h3>
        <p style={{ color: "#808080" }}>Trade token in an instant</p>
        <InputText icon={to.icon} value={to.label} position={["bottom"]} onChange={(item) => setTo(item)} />
        <img
          src={BottomArrow}
          alt="bottom-arrow"
          style={{ width: 32, height: 32, marginBottom: 15 }}
        />
        <InputText icon={from.icon} value={from.label} onChange={(item) => setFrom(item)} />
      </div>
      <div className="buy-now-btn">BUY</div>
      <div>
        <p className="guide-lines text-center">
          Payment bought with discount will be released as per time lock
          schedule with KYC guidelines
        </p>
      </div>
    </div>
  );
};

export default BuyCoin;
