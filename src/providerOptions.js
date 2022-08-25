import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Indexx500", // Required
      infuraId: "30ee77021a9c4586831648007630766b" // Required unless you provide a JSON RPC url; see `rpc` below
    }
  }
};
