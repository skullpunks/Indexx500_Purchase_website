import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WelcomeIcon from "../assets/icons/welcome-logo.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardComponent from "../components/Card";
import { providerOptions } from "../providerOptions";
import BuyCoin from "./BuyCoin";
import moment from "moment";
import InstructionsModal from "../components/InstructionsModal";
import { toast } from "react-toastify";

const web3Modal = new Web3Modal({
  cacheProvider: false, // optional
  providerOptions, // required
});

const Home = () => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const [networkName, setNetworkName] = useState();
  const [sprice, setSprice] = useState("");
  const [signer, setSigner] = useState("");
  const [page, setPage] = useState("HOME");
  const [showInstructionsModal, setShowInstructionsModal] = useState(false)

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
            chainId: "0x38",
            chainName: "BSC Mainnet",
            rpcUrls: ["https://bsc-dataseed1.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com"],
            nativeCurrency: {
              symbol: "BNB",
              decimals: 18,
            },
          },
        ],
      }).then((result) => {
        // console.log(asset);
        // console.log(asset[1]);
        // console.log(asset.networkVersion);
        // if(asset.networkVersion === 56){
        setPage("BUYCOIN");
        // }
      });

    } catch (switchError) {
      console.log(switchError);
    }
  };

  const connectWallet = async () => {
    try {
      let provider = await web3Modal.connect();
      let library = new ethers.providers.Web3Provider(provider);
      let accounts = await library.listAccounts();

      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);

      const signer = library.getSigner();
      setSigner(signer);
      let network = await library.getNetwork();
      setNetworkName(network.name);
      setChainId(network.chainId);

      if (network.chainId !== 56) {
        await selectNetwork(library.provider);
      } else {
        setPage("BUYCOIN");
      }

    } catch (error) {
      if (window.confirm(' Please Install Metamask wallet to participate in PRE-ICO/ICO ')) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
          '_blank'
        );
      };

    }
  };

  const indexPrice = async () => {
    let spprice = 0;
    let spaddr = "0xb24D1DeE5F9a3f761D286B56d2bC44CE1D02DF7e";
    let rpcProvider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed1.binance.org/"
    );
    const spFeed = new ethers.Contract(spaddr, chainlinkABI, rpcProvider);
    await spFeed.latestRoundData().then((roundData) => {
      spprice = roundData[1] / 10000000000;
      spprice = Math.round(spprice * 100) / 100;
      setSprice(spprice);
      return spprice;
    });
  };

  const releaseTokens = async () => {
    try {
      let provider = await web3Modal.connect();
      let library = new ethers.providers.Web3Provider(provider);
      let accounts = await library.listAccounts();

      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);

      const signer = library.getSigner();
      setSigner(signer);
      let network = await library.getNetwork();
      setNetworkName(network.name);
      setChainId(network.chainId);

      const timelockContractAddr = '0x94C6156Da5DF99b3A529b47b54C6ff480c1440bb';
      const timelockContractABI = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "InitiateLock",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "ReleaseLock",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "admin",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_admin",
              "type": "address"
            }
          ],
          "name": "changeAdmin",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_lockers",
              "type": "address"
            }
          ],
          "name": "changeLockers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address[]",
              "name": "_investor",
              "type": "address[]"
            }
          ],
          "name": "changeWithdrawalStatus",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_beneficiary",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "initiateTokenLock",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "lockAmount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "lockAmountPerPhase",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "lockers",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "releaseTime",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "releaseTokens",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "token",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "withdrawalStatus",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      const timelockContract = new ethers.Contract(timelockContractAddr, timelockContractABI, signer);
      const tx = await timelockContract.releaseTokens();
      console.log(`Transaction hash: ${tx.hash}`);
      const receipts = await tx.wait();
      console.log(`Transaction confirmed in block ${receipts.blockNumber}`);
      console.log(`Gas used: ${receipts.gasUsed.toString()}`);
      toast.success("Tokens Released Successful");
    } catch (err) {
      toast.success("Tokens Released Un-Successful." + err);
    }
  }

  const importTokens = async () => {
    const tokenAddress = "0xf58e5644a650C0e4db0d6831664CF1Cb6A3B005A";
    const tokenSymbol = "IN500";
    const tokenDecimals = 18;
    const tokenImage = "https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/in500.png";

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    indexPrice();
  }, []);

  return (
    <div>
      <Header />
      {page === "HOME" && (
        <Container>
          <h2 className="welcome-title">Welcome to PRE-ICO/ICO of Indexx500(IN500)</h2>
          <p className="welcome-description">
            There are 3 stages of Pre-ICO and 3 stages of ICO for Indexx500, each stage has 2 weeks
            time frame and discount, do not miss!
          </p>
          <div className="text-center">

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Col xl={6} md={6}>
                <CardComponent
                  title="ICO STAGE 2"
                  discount="10%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221101")}
                  edate={moment("20221115")}
                />
              </Col>
            </div>

            {/* <img
              src={WelcomeIcon}
              alt="welcome-icon"
              className="welcome-icon"
            /> */}

            <div className="walletBtn-connect" onClick={() => connectWallet()}>
              BUY NOW
            </div>

            <div className="warningBarContainer">
              <label htmlFor="viewVideoButton">Going through the Instructions is highly suggested before proceeding further!!!</label>
            </div>


            {showInstructionsModal &&
              <InstructionsModal
                isOpen={showInstructionsModal}
                closeModal={() => setShowInstructionsModal(false)}
              />
            }


          </div>
          <div className="instructionsHeading">
            <h2 className="instructions">Instructions</h2>
            <button id="viewVideoButton" className="viewVideo" onClick={() => setShowInstructionsModal(true)}>
              Watch Video
            </button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Row>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">1</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Click BUY NOW and link Metamask or Coinbase wallet: <br></br>
                    Make sure you are on Binance Smart Chain Network
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">2</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Payment Options: BUSD / BNB / WBTC / WETH / STRIPE <br></br>
                    Only Wrapped Bitcoin and Ethereum allowed which is on Binance Chain
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">3</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Token amount is calculated according to LIVE S&P500 Index price
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">4</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Approve your tokens to allow access to ICO contract  <br></br>
                    Scroll down on Metamask page to confirm approval
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">5</Card.Text>
                  <div className="informationCard">
                    <Card.Text className="instruction-card-details">
                      Tokens are assigned to the wallet and locked in  <br></br> the vesting schedule
                    </Card.Text>
                    <Card.Text className="instruction-card-details">
                      <a className="link"
                        target="_blank"
                        href={"https://bscscan.com/address/0x94C6156Da5DF99b3A529b47b54C6ff480c1440bb#readContract"}> Check Your Tokens</a>
                    </Card.Text>
                  </div>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">6</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Added Discount tokens will be transferred to the same wallet instantly
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">7</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Release tokens
                    <button id="viewVideoButton" className="viewVideo" onClick={() => releaseTokens()}>
                      Release Tokens
                    </button>
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">8</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Import Tokens
                    <button id="viewVideoButton" className="viewVideo" onClick={() => importTokens()}>
                      Import Tokens
                    </button>
                  </Card.Text>
                </Card>
              </Col>
            </Row>
          </div>


          {/* <div className="instructionsHeading">
            <h2 className="instructions">Release Tokens</h2>
            <button id="viewVideoButton" className="viewVideo" onClick={() => releaseTokens()}>
              Release Tokens
            </button>
          </div> */}

          <div className="curculating">
            <h2>
              <span className="supply">TOTAL PRE-ICO/ICO SUPPLY:</span>{" "}
              <span className="price">150,000</span>
            </h2>
          </div>

          <div>
            <Row className="amount-card">
              <Col xl={6} md={6}>
                <CardComponent
                  title="PRE-ICO STAGE 1"
                  discount="15%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20220815")}
                  edate={moment("20220915")}
                />
              </Col>
              <Col xl={6} md={6}>
                <CardComponent
                  title="PRE-ICO STAGE 2"
                  discount="12%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20220916")}
                  edate={moment("20220930")}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRE-ICO STAGE 3"
                  discount="9%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221001")}
                  edate={moment("20221015")}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="ICO STAGE 1"
                  discount="15%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221016")}
                  edate={moment("20221031")}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="ICO STAGE 2"
                  discount="10%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221101")}
                  edate={moment("20221115")}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="ICO STAGE 3"
                  discount="5%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221116")}
                  edate={moment("20221130")}
                />
              </Col>
            </Row>
          </div>
          {/* <div className="walletBtn-connect" onClick={() => connectWallet()}>
            CONNECT WALLET
          </div> */}

        </Container>

      )}

      {page === "BUYCOIN" && <BuyCoin signer={signer} account={account} networkName={networkName} />}
      <br></br><br></br><br></br><br></br>
      <Footer />
    </div>
  );
};

export default Home;
