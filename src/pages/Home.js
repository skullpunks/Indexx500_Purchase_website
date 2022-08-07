import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import LogoIcon from "../assets/icons/logo.svg";
import WelcomeIcon from "../assets/icons/welcome-logo.svg";
import BUSDIcon from "../assets/icons/busd-icon.svg";
import Header from "../components/Header";

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
              <Card className="supply-card">
                <Card.Body>
                  <div className="price-info">
                    <h2 className="price-title">PRO-ICO STAGE 1</h2>
                    <h3>
                      <span className="discount">DISCOUNT</span> 15%
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
                    <h1 className="unitPrice">0.000009</h1>
                  </div>
                  <div>
                    <div>
                      <p className="percentage">98%</p>
                    </div>
                    <ProgressBar now={98} className="progressBar" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={6} md={6}>
              <Card className="supply-card">
                <Card.Body>
                  <div className="price-info">
                    <h2 className="price-title">PRO-ICO STAGE 2</h2>
                    <h3>
                      <span className="discount">DISCOUNT</span> 12%
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
                    <h1 className="unitPrice">0.0001215</h1>
                  </div>
                  <div>
                    <div>
                      <p className="percentage">89%</p>
                    </div>
                    <ProgressBar now={89} className="progressBar" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={6} md={6}>
              <Card className="supply-card" style={{ marginTop: "20px" }}>
                <Card.Body>
                  <div className="price-info">
                    <h2 className="price-title">PRO-ICO STAGE 3</h2>
                    <h3>
                      <span className="discount">DISCOUNT</span> 9%
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
                    <h1 className="unitPrice">0.000164</h1>
                  </div>
                  <div>
                    <div>
                      <p className="percentage">10%</p>
                    </div>
                    <ProgressBar now={10} className="progressBar" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={6} md={6}>
              <Card className="supply-card" style={{ marginTop: "20px" }}>
                <Card.Body>
                  <div className="price-info">
                    <h2 className="price-title">PRO-ICO STAGE 4</h2>
                    <h3>
                      <span className="discount">DISCOUNT</span> 6%
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
                    <h1 className="unitPrice">0.0002214</h1>
                  </div>
                  <div>
                    <div>
                      <p className="percentage">10%</p>
                    </div>
                    <ProgressBar now={10} className="progressBar" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={6} md={6}>
              <Card className="supply-card" style={{ marginTop: "20px" }}>
                <Card.Body>
                  <div className="price-info">
                    <h2 className="price-title">PRO-ICO STAGE 5</h2>
                    <h3>
                      <span className="discount">DISCOUNT</span> 3%
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
                    <h1 className="unitPrice">0.00002889</h1>
                  </div>
                  <div>
                    <div>
                      <p className="percentage">10%</p>
                    </div>
                    <ProgressBar now={10} className="progressBar" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={6} md={6}>
              <Card className="supply-card" style={{ marginTop: "20px" }}>
                <Card.Body>
                  <div className="price-info">
                    <h2 className="price-title">PRO-ICO STAGE 6</h2>
                    <h3>
                      <span className="discount">DISCOUNT</span> 1%
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
                    <h1 className="unitPrice">0.00004</h1>
                  </div>
                  <div>
                    <div>
                      <p className="percentage">10%</p>
                    </div>
                    <ProgressBar now={10} className="progressBar" />
                  </div>
                </Card.Body>
              </Card>
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
