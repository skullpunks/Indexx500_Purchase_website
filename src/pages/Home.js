import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import WelcomeIcon from "../assets/icons/welcome-logo.svg";
import Header from "../components/Header";
import CardComponent from "../components/Card";

const Home = ({ setStage }) => {
  return (
    <div>
      <Header />
      <Container>
        <h2 className="welcome-title">Welcome to Pre-ICO of indexx500</h2>
        <p className="welcome-description">
          There are 6 stages of Pre-ICO of indexx500, each stage has 2 weeks
          time frame and discount, do not miss!
        </p>
        <div className="text-center">
          <img src={WelcomeIcon} alt="welcome-icon" className="welcome-icon" />
        </div>
        <div className="">
          <h2 className="instructions">Instructions</h2>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Row>
            <Col xs={6}>
              <Card className="instruction-card">
                <Card.Text className="instruction-card-number">1</Card.Text>
                <Card.Text className="instruction-card-details">
                  Click Buy Token and connect Metamask wallet + Coinbase wallet
                </Card.Text>
              </Card>
            </Col>
            <Col xs={6}>
              <Card className="instruction-card">
                <Card.Text className="instruction-card-number">2</Card.Text>
                <Card.Text className="instruction-card-details">
                  Buy tokens with one of the following: <br />
                  BUSD / BNB / WBTC / WETH / Stripe
                </Card.Text>
              </Card>
            </Col>
            <Col xs={6}>
              <Card className="instruction-card">
                <Card.Text className="instruction-card-number">3</Card.Text>
                <Card.Text className="instruction-card-details">
                  Token price is set according to live S&P500 price
                </Card.Text>
              </Card>
            </Col>
            <Col xs={6}>
              <Card className="instruction-card">
                <Card.Text className="instruction-card-number">4</Card.Text>
                <Card.Text className="instruction-card-details">
                  Added Discount tokens will be transferred to the same wallet
                  and locked
                </Card.Text>
              </Card>
            </Col>
            <Col xs={6}>
              <Card className="instruction-card">
                <Card.Text className="instruction-card-number">5</Card.Text>
                <Card.Text className="instruction-card-details">
                  Token assigned to the wallet and locked in the time lock
                  contract
                </Card.Text>
              </Card>
            </Col>
            <Col xs={6}>
              <Card className="instruction-card">
                <Card.Text className="instruction-card-number">6</Card.Text>
                <Card.Text className="instruction-card-details">
                  Added Discount tokens will be transferred to the same wallet
                  and locked
                </Card.Text>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="curculating">
          <h2>
            <span className="supply">CIRCULATING SUPPLY:</span>{" "}
            <span className="price">199,999,999,999</span>
          </h2>
        </div>

        <div>
          <Row className="amount-card">
            <Col xl={6} md={6}>
              <CardComponent
                title="PRO-ICO STAGE 1"
                discount="15%"
                unitPrice="0.000009"
                progressBar={98}
              />
            </Col>
            <Col xl={6} md={6}>
              <CardComponent
                title="PRO-ICO STAGE 2"
                discount="12%"
                unitPrice="0.0001215"
                progressBar={89}
              />
            </Col>
            <Col xl={6} md={6} style={{ marginTop: 25 }}>
              <CardComponent
                title="PRO-ICO STAGE 3"
                discount="9%"
                unitPrice="0.000164"
                progressBar={10}
              />
            </Col>
            <Col xl={6} md={6} style={{ marginTop: 25 }}>
              <CardComponent
                title="PRO-ICO STAGE 4"
                discount="6%"
                unitPrice="0.00002889"
                progressBar={10}
              />
            </Col>
            <Col xl={6} md={6} style={{ marginTop: 25 }}>
              <CardComponent
                title="PRO-ICO STAGE 5"
                discount="3%"
                unitPrice="0.0002214"
                progressBar={10}
              />
            </Col>
            <Col xl={6} md={6} style={{ marginTop: 25 }}>
              <CardComponent
                title="PRO-ICO STAGE 6"
                discount="1%"
                unitPrice="0.00004"
                progressBar={10}
              />
            </Col>
          </Row>
        </div>
        <div className="walletBtn-connect" onClick={() => setStage("connect")}>
          CONNECT WALLET
        </div>
      </Container>
    </div>
  );
};

export default Home;
