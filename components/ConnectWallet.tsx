"use client";
import switchNetwork from "@/utils/switchNetwork";
import MetaMaskSDK from "@metamask/sdk";
import { useState } from "react";

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

  const toggleConnect = async () => {
    try {
      await ethereum?.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum?.request({ method: "eth_accounts" });
      const chainId = await ethereum?.request({ method: "eth_chainId" });
      if (chainId !== "0xaa36a7") await switchNetwork(ethereum);
      setAddress(accounts?.toString());
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
