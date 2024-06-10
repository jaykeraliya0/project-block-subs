"use client";
import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";

type Props = {
  className?: string;
};

const ConnectWallet = ({ className }: Props) => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  console.log(sdk?.getProvider());

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  return (
    <>
      <button className={className} onClick={connect}>
        {connected && account
          ? `Connected: ${account?.slice(0, 6)}...${account?.slice(-4)}`
          : "Connect Wallet"}
      </button>
    </>
  );
};

export default ConnectWallet;
