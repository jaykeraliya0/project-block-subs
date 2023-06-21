"use client";
import MetaMaskSDK from "@metamask/sdk";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  className?: string;
};

const ConnectWallet = ({ className }: Props) => {
  const MMSDK = new MetaMaskSDK({
    dappMetadata: {
      name: "BlockSubs",
    },
  });
  const ethereum = MMSDK.getProvider();

  const [address, setAddress] = useState<string>();

  const switchNetwork = async () => {
    try {
      await ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
      toast.success("Switched to Arbitrum");
    } catch (error) {
      toast.error("Failed to switch network");
    }
  };

  const toggleConnect = async () => {
    try {
      await ethereum?.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum?.request({ method: "eth_accounts" });
      const chainId = await ethereum?.request({ method: "eth_chainId" });
      if (chainId !== "0xaa36a7") await switchNetwork();
      setAddress(accounts?.toString());
      toast.success("Connected to MetaMask");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button className={className} onClick={toggleConnect}>
        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect"}
      </button>
    </>
  );
};

export default ConnectWallet;
