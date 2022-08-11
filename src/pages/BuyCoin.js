import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import LogoIcon from "../assets/icons/logo.svg";
import BottomArrow from "../assets/icons/bottom-arrow.svg";
import { Coins, PaymentContract } from "../utility/constant";
import InputText from "../components/InputText";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const BuyCoin = ({ signer, account }) => {
  const [to, setTo] = useState(Coins[0]);
  const [from, setFrom] = useState({ label: "indexx500", icon: LogoIcon });
  const [token, setToken] = useState(0);
  const [payment, setPayment] = useState(PaymentContract["BUSD"]);
  const [inputtoken, setInputtoken] = useState("");
  const [buyNowBtn, setBuyNowBtn] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const icoAddress = "0x68A62a16d381fd8C11F092b3Eea68845C3Db721E";

  const icoABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_reserveWallet",
          type: "address",
        },
        {
          internalType: "address",
          name: "_token",
          type: "address",
        },
        {
          internalType: "address",
          name: "_timelockContract",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_openingTime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_closingTime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_investorMinCap",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_discount",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "purchaser",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "beneficiary",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "TokenPurchase",
      type: "event",
    },
    {
      stateMutability: "payable",
      type: "fallback",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "acceptedTokens",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_beneficiary",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
      ],
      name: "buyIndexxFromAnyBEP20",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_beneficiary",
          type: "address",
        },
      ],
      name: "buyIndexxFromBNB",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_discount",
          type: "uint256",
        },
      ],
      name: "changeDiscount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_newAdmin",
          type: "address",
        },
      ],
      name: "changeIcoAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "closingTime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "contributions",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "discount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "hasClosed",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "icoAdmin",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "investorMinCap",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "openingTime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "reserveWallet",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_openingTime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_closingTime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_discount",
          type: "uint256",
        },
      ],
      name: "scheduleSale",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "sp500ByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "timelockContract",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "weiRaised",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ];

  const paymentABI = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_upgradedAddress", type: "address" }],
      name: "deprecate",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "deprecated",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_evilUser", type: "address" }],
      name: "addBlackList",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_from", type: "address" },
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "upgradedAddress",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "address" }],
      name: "balances",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "maximumFee",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "unpause",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_maker", type: "address" }],
      name: "getBlackListStatus",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "", type: "address" },
        { name: "", type: "address" },
      ],
      name: "allowed",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "paused",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "who", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "pause",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getOwner",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "newBasisPoints", type: "uint256" },
        { name: "newMaxFee", type: "uint256" },
      ],
      name: "setParams",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "amount", type: "uint256" }],
      name: "issue",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "amount", type: "uint256" }],
      name: "redeem",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "_owner", type: "address" },
        { name: "_spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ name: "remaining", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "basisPointsRate",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "address" }],
      name: "isBlackListed",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_clearedUser", type: "address" }],
      name: "removeBlackList",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "MAX_UINT",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_blackListedUser", type: "address" }],
      name: "destroyBlackFunds",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { name: "_initialSupply", type: "uint256" },
        { name: "_name", type: "string" },
        { name: "_symbol", type: "string" },
        { name: "_decimals", type: "uint256" },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: "amount", type: "uint256" }],
      name: "Issue",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: "amount", type: "uint256" }],
      name: "Redeem",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: "newAddress", type: "address" }],
      name: "Deprecate",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: "feeBasisPoints", type: "uint256" },
        { indexed: false, name: "maxFee", type: "uint256" },
      ],
      name: "Params",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: "_blackListedUser", type: "address" },
        { indexed: false, name: "_balance", type: "uint256" },
      ],
      name: "DestroyedBlackFunds",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: "_user", type: "address" }],
      name: "AddedBlackList",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: "_user", type: "address" }],
      name: "RemovedBlackList",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "owner", type: "address" },
        { indexed: true, name: "spender", type: "address" },
        { indexed: false, name: "value", type: "uint256" },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "from", type: "address" },
        { indexed: true, name: "to", type: "address" },
        { indexed: false, name: "value", type: "uint256" },
      ],
      name: "Transfer",
      type: "event",
    },
    { anonymous: false, inputs: [], name: "Pause", type: "event" },
    { anonymous: false, inputs: [], name: "Unpause", type: "event" },
  ];

  const setInputValue = async (e) => {
    setLoading(true);
    let inputs = e.target.value;
    setInputtoken(inputs);
    let addr = "";
    let tokenPrice = 0;
    let spprice = 0;
    let spaddr = "0xb24D1DeE5F9a3f761D286B56d2bC44CE1D02DF7e";
    if (payment === "0x0000000000000000000000000000000000000000") {
      addr = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";
    } else if (payment === "0xFd6a8739Ce434f5cB52FB4d4E0DBeA4a9cB25532") {
      addr = "1";
    } else if (payment === "0xd15B482A08b44FA055Ad77dF5Cc99dae6E3A4184") {
      addr = "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf";
    } else if (payment === "0x9b9f1b34bC30e2789DB71eD18C749167880215Bd") {
      addr = "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e";
    } else {
      // stripe payment
    }

    let rpcProvider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed1.binance.org/"
    );
    if (addr === "1") {
      tokenPrice = 1;
    } else if (addr !== "") {
      const tokenFeed = new ethers.Contract(addr, chainlinkABI, rpcProvider);
      await tokenFeed.latestRoundData().then((roundData) => {
        tokenPrice = roundData[1] / 100000000;
        console.log("token value: " + tokenPrice);
      });
    }
    const spFeed = new ethers.Contract(spaddr, chainlinkABI, rpcProvider);
    await spFeed.latestRoundData().then((roundData) => {
      spprice = roundData[1] / 10000000000;
      console.log("sp500 value: " + spprice);
      let rate = inputs * (tokenPrice / spprice);
      setToken(Math.round(rate * 100) / 100);
      setLoading(false);
    });
  };

  const handlePayment = async (e) => {
    setLoading(true);
    const tokenContract = e;
    setPayment(PaymentContract[e.label]);

    setTo(e);
    let addr = "";
    let tokenPrice = 0;
    let spprice = 0;
    let spaddr = "0xb24D1DeE5F9a3f761D286B56d2bC44CE1D02DF7e";

    if (tokenContract.label === "BNB") {
      addr = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";
    } else if (tokenContract.label === "BUSD") {
      addr = "1";
    } else if (tokenContract.label === "WBTC") {
      addr = "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf";
    } else if (tokenContract.label === "WETH") {
      addr = "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e";
    } else {
      // stripe payment
    }

    let rpcProvider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed1.binance.org/"
    );
    if (addr === "1") {
      tokenPrice = 1;
    } else if (addr !== "") {
      const tokenFeed = new ethers.Contract(addr, chainlinkABI, rpcProvider);
      await tokenFeed.latestRoundData().then((roundData) => {
        tokenPrice = roundData[1] / 100000000;
        console.log("token value: " + tokenPrice);
      });
    }
    const spFeed = new ethers.Contract(spaddr, chainlinkABI, rpcProvider);
    await spFeed.latestRoundData().then((roundData) => {
      spprice = roundData[1] / 10000000000;
      console.log("sp500 value: " + spprice);
      let rate = inputtoken * (tokenPrice / spprice);
      setToken(Math.round(rate * 100) / 100);
      setLoading(false);
    });
  };

  const payCrypto = async () => {
    try {
      setLoading(true);
      const ico_contract = new ethers.Contract(icoAddress, icoABI, signer);
      let tx;

      if (payment === "0x0000000000000000000000000000000000000000") {
        tx = await ico_contract.buyIndexxFromBNB(account, {
          value: ethers.utils.parseUnits(inputtoken, "ether"),
        });
      } else if (payment !== "") {
        tx = await ico_contract.buyIndexxFromAnyBEP20(
          account,
          ethers.utils.parseUnits(inputtoken, "ether"),
          payment
        );
      }
      console.log(`Transaction hash: ${tx.hash}`);
      const receipts = await tx.wait();
      console.log(`Transaction confirmed in block ${receipts.blockNumber}`);
      console.log(`Gas used: ${receipts.gasUsed.toString()}`);
      setBuyNowBtn(false);
      toast.success("Payment Successful");
      setLoading(false);
    } catch (error) {
      console.log('error', error)
      // TODO Error handle with toast message
      if (error?.data?.message != undefined)
        toast.error(error?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      toast.error("Transaction Failed. Please again later!");
      setLoading(false);
    }
  };

  const approve = async () => {
    try {
      setLoading(true);
      const paymentContract = new ethers.Contract(payment, paymentABI, signer);
      const tx = await paymentContract.approve(
        "0x68A62a16d381fd8C11F092b3Eea68845C3Db721E",
        ethers.utils.parseUnits(inputtoken, "ether")
      );
      setLoading(true);
      const receipt = await tx.wait();
      setBuyNowBtn(true);
      setLoading(false);
      console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
      console.log(`Gas used: ${receipt.gasUsed.toString()}`);
      toast.success("Approved");
      setLoading(false);
    } catch (error) {
      // TODO Error handle with toast message
      toast.error(error);
      setLoading(false);

    }
  };

  return (
    <div>
      <div
        style={{
          width: "60%",
          margin: "auto",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        <figure>
          <img
            src={LogoIcon}
            style={{ width: 64, height: 64 }}
            alt="indexx logo"
          />
          <figcaption style={{ color: "#0052CC", fontSize: "larger", fontWeight: "bold" }}>indexx500</figcaption>
        </figure>
        <h3 style={{ marginTop: 20, color: "#808080", marginBottom: 0 }}>
          SWAP
        </h3>
        <p style={{ color: "#808080" }}>Trade token in an instant</p>
        <InputText
          icon={to.icon}
          value={to.label}
          position={["left"]}
          onChange={(e) => handlePayment(e)}
          inputtoken={inputtoken}
          handleChange={setInputValue}
        />
        <img
          src={BottomArrow}
          alt="bottom-arrow"
          style={{ width: 32, height: 32, marginBottom: 15 }}
        />
        {/* <InputText icon={from.icon} value={from.label} onChange={(item) => setFrom(item)} /> */}
        <div
          style={{ display: "flex", justifyContent: "center", marginRight: 50 }}
        >
          <div style={{ display: "grid" }}>
            <img
              src={from.icon}
              alt="icon"
              style={{ height: 32, width: 32, margin: "auto" }}
            />
            <span style={{ fontSize: 10, margin: 0, color: "#808080" }}>
              {from.label}
            </span>
          </div>
          <div>
            <Form.Control
              type="text"
              id="inputBusd"
              value={token}
              aria-describedby="passwordHelpBlock"
              disabled
            />
          </div>
        </div>
      </div>
      {to.label === "BNB" || to.label === "Stripe" || buyNowBtn ? (
        <div className="buy-now-btn" onClick={payCrypto}>
          {loading ? <Spinner animation="border" variant="light" /> : `BUY`}
        </div>
      ) : (
        <div className="buy-now-btn" onClick={approve}>
          {loading ? <Spinner animation="border" variant="light" /> : `APPROVE`}
        </div>
      )}
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
