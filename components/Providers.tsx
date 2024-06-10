"use client";
import { ReactNode } from "react";
import { MetaMaskProvider } from "@metamask/sdk-react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <MetaMaskProvider
      sdkOptions={{
        dappMetadata: {
          name: "Block Subs",
        },
      }}
    >
      {children}
    </MetaMaskProvider>
  );
};

export default Providers;
