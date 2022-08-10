import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WelcomeIcon from "../assets/icons/welcome-logo.svg";
import Header from "../components/Header";
import CardComponent from "../components/Card";
import { providerOptions } from "../providerOptions";
import { SetSignerInfo } from "../state/actions/user.action";
import localforage from "localforage";
import BuyCoin from "./BuyCoin";
const web3Modal = new Web3Modal({
  cacheProvider: false, // optional
  providerOptions, // required
});

const Home = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const [error, setError] = useState("");
  const [sprice, setSprice] = useState("");
  const [signer, setSigner] = useState("");
  const [page, setPage] = useState("HOME");

  const chainlinkABI = [
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "description",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
      name: "getRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const selectNetwork = async (asset) => {
    try {
      asset.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x61",
            chainName: "BSC Testnet",
            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
            blockExplorerUrls: ["https://explorer.binance.org/smart-testnet"],
            nativeCurrency: {
              symbol: "BNB",
              decimals: 18,
            },
          },
        ],
      });
      // await asset.send('wallet_switchEthereumChain', [{ chainId: `0x61` }])
    } catch (switchError) {
      console.log(switchError);
    }
  };

  const connectWallet = async () => {
    console.log("connect wallet");
    try {
      console.log("inside try");
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      console.log("accounts", accounts);
      // console.log('provider',provider)
      console.log("network", network);
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);

      const signer = library.getSigner();
      // localforage.setItem("SIGNER", signer);
      // dispatch(SetSignerInfo(signer));
      setSigner(signer);
      if (network.chainId !== 97) {
        // alert("chain not 97");
        await selectNetwork(library.provider);
      }
      setPage("BUYCOIN");
      // navigate("/buy-token");
    } catch (error) {
      setError(error);
    }
  };

  const indexPrice = async () => {
    let spprice = 0;
    let spaddr = "0xb24D1DeE5F9a3f761D286B56d2bC44CE1D02DF7e";
    let rpcProvider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed1.binance.org/"
    );
    console.log("rpcProvider", rpcProvider);
    const spFeed = new ethers.Contract(spaddr, chainlinkABI, rpcProvider);
    await spFeed.latestRoundData().then((roundData) => {
      spprice = roundData[1] / 10000000000;
      spprice = Math.round(spprice * 100) / 100;
      console.log("spprice", spprice);
      setSprice(spprice);
      return spprice;
    });
  };
  useEffect(() => {
    indexPrice();
  }, []);

  return (
    <div>
      <Header />
      {page === "HOME" && (
        <Container>
          <h2 className="welcome-title">Welcome to Pre-ICO of indexx500</h2>
          <p className="welcome-description">
            There are 6 stages of Pre-ICO of indexx500, each stage has 2 weeks
            time frame and discount, do not miss!
          </p>
          <div className="text-center">
            <img
              src={WelcomeIcon}
              alt="welcome-icon"
              className="welcome-icon"
            />
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
                    Click Buy Token and connect Metamask wallet + Coinbase
                    wallet
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
                  unitPrice={sprice}
                  progressBar={98}
                />
              </Col>
              <Col xl={6} md={6}>
                <CardComponent
                  title="PRO-ICO STAGE 2"
                  discount="12%"
                  unitPrice={sprice}
                  progressBar={89}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRO-ICO STAGE 3"
                  discount="9%"
                  unitPrice={sprice}
                  progressBar={10}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRO-ICO STAGE 4"
                  discount="6%"
                  unitPrice={sprice}
                  progressBar={10}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRO-ICO STAGE 5"
                  discount="3%"
                  unitPrice={sprice}
                  progressBar={10}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRO-ICO STAGE 6"
                  discount="1%"
                  unitPrice={sprice}
                  progressBar={10}
                />
              </Col>
            </Row>
          </div>
          <div className="walletBtn-connect" onClick={() => connectWallet()}>
            CONNECT WALLET
          </div>
        </Container>
      )}
      {page === "BUYCOIN" && (
        <BuyCoin signer={signer} />
      )}
    </div>
  );
};

export default Home;
