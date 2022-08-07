import React from "react";
import { ProgressBar } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import BUSDIcon from "../assets/icons/busd-icon.svg";
import LogoIcon from "../assets/icons/logo.svg";

const CardComponent = ({ title, discount, unitPrice, progressBar }) => {
  return (
    <Card className="supply-card">
      <Card.Body>
        <div className="price-info">
          <h2 className="price-title">{title}</h2>
          <h3>
            <span className="discount">DISCOUNT</span> {discount}
          </h3>
        </div>
        <div className="price-info" style={{ marginTop: 60 }}>
          <p
            style={{
              marginBottom: "0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            AMOUNT
            <img
              src={LogoIcon}
              alt="price-amount"
              style={{ width: 24, height: 24, marginLeft: 6 }}
            />
          </p>
          <h3 className="amountPrice">33,333,333,333</h3>
        </div>
        <div className="price-info" style={{ marginTop: 30 }}>
          <p
            style={{
              marginBottom: "0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            UNIT PRICE
            <img
              src={BUSDIcon}
              alt="price-amount"
              style={{ width: 21, height: 21, marginLeft: 6 }}
            />
          </p>
          <h1 className="unitPrice">{unitPrice}</h1>
        </div>
        <div>
          <div>
            <p className="percentage">98%</p>
          </div>
          <ProgressBar now={progressBar} className="progressBar" />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
