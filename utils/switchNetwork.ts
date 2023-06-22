const switchNetwork = async (ethereum: any) => {
  try {
    await ethereum?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }],
    });
  } catch (error) {
    throw new Error("Failed to switch network");
  }
};

export default switchNetwork;
