"use client";
import BuyTokens from "@/components/BuyTokens";
import { useEffect, useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import MetaMaskSDK from "@metamask/sdk";
import abi from "@/artifacts/BlockSubs.json";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import SubscriptionButton from "@/components/SubscriptionButton";
import CancelButton from "@/components/CancelButton";

type Props = {};

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const gradients = {
  none: "from-amber-600 to-yellow-600",
  silver: "from-blue-600 to-teal-500",
  gold: "from-amber-600 to-orange-500",
  platinum: "from-purple-600 to-fuchsia-500",
  diamond: "from-black to-gray-700",
};

const Profile = (props: Props) => {
  const MMSDK = new MetaMaskSDK({
    dappMetadata: {
      name: "BlockSubs",
    },
  });
  const ethereum = MMSDK.getProvider();

  const [user, setUser] = useState<{
    name: string;
    active: boolean;
    subscription: string;
    tokens: number;
    expiration: Date;
  }>();
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  const switchNetwork = async () => {
    try {
      await ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
    } catch (error) {
      toast.error("Failed to switch network");
    }
  };

  const registerUser = async (name: string) => {
    const chainId = await ethereum?.request({ method: "eth_chainId" });
    if (chainId !== "0xaa36a7") await switchNetwork();

    const notification = toast.loading("Registering user...");
    try {
      const provider = new ethers.BrowserProvider(ethereum as any);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
        abi.abi,
        signer
      );

      const tx = await contract.registerUser(name);
      await tx.wait();
      toast.success("User registered", { id: notification });
      getUser();
    } catch (error) {
      toast.error("Failed to register user", { id: notification });
    }
  };

  const getUser = async () => {
    setLoading(true);
    const chainId = await ethereum?.request({ method: "eth_chainId" });
    if (chainId !== "0xaa36a7") await switchNetwork();

    const provider = new ethers.BrowserProvider(ethereum as any);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      abi.abi,
      signer
    );

    const user = await contract.getUser(ethereum?.selectedAddress);
    const tokens = await contract.balanceOf(ethereum?.selectedAddress);

    const parseSubscription = (subscription: number) => {
      switch (subscription) {
        case 0:
          return "none";
        case 1:
          return "silver";
        case 2:
          return "gold";
        case 3:
          return "platinum";
        case 4:
          return "diamond";
      }
    };
    const date = new Date(Number(user.expiration) * 1000);
    setUser({
      name: user.name,
      active:
        date.getTime() > Date.now() &&
        parseSubscription(Number(user.roleId)) !== "none",
      subscription: parseSubscription(Number(user.roleId))!,
      tokens: Number(tokens),
      expiration: date,
    });

    setLoading(false);
  };

  useEffect(() => {
    const connect = async () => {
      setLoading(true);
      const accounts = await ethereum?.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts?.toString());
      setLoading(false);
    };
    connect();
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-12 h-12 mr-2 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else if (address && user && user.name) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-gray-100 to-gray-50 flex justify-center items-center p-10">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow pt-10">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <div className="w-24 h-24 mb-3 rounded-full shadow-lg border flex justify-center items-center bg-white">
              <Jazzicon diameter={90} seed={jsNumberForAddress(address!)} />
            </div>
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              {user.name}
            </h5>
            <span className="text-sm text-gray-500">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <span className="text-xs font-bold text-gray-800">
              {user.tokens} BSB
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              {!user.active ? (
                <SubscriptionButton setUser={setUser} user={user} />
              ) : (
                <CancelButton setUser={setUser} user={user} />
              )}
              <BuyTokens
                setUser={setUser}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center border rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-150 text-white bg-amber-500 border-transparent hover:bg-amber-600 focus:ring-amber-200"
              />
            </div>
          </div>
          <div
            className={classNames(
              gradients[
                user.subscription.toLowerCase() as keyof typeof gradients
              ],
              "w-full p-3 bg-gradient-to-r rounded-b-lg border-t border-gray-500 shadow-inner"
            )}
          >
            <h1 className="text-3xl font-semibold text-gray-100 pb-1 capitalize">
              {user.active ? `${user.subscription} member` : "subscribe today"}
            </h1>
            <div className="flex justify-between items-center pt-1">
              <div className="flex flex-col">
                <p className="text-gray-100">
                  {user.active ? (
                    <>
                      <span className="font-bold">Expiration:</span>{" "}
                      <span className="text-xs font-medium">
                        {user.expiration.toDateString()}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold">Starting at:</span>{" "}
                      <span className="text-xs font-medium">10 BSB</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (!loading) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-gray-100 to-gray-50 flex justify-center items-center p-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = (e as any).target[0].value;
            registerUser(name);
          }}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow py-10 px-5 flex flex-col justify-center items-center"
        >
          <div className="my-5">
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="User Name"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-white mx-auto border border-gray-200 rounded-lg shadow px-4 py-2 text-sm font-medium text-center focus:ring-4 focus:outline-none transition-all ease-in-out duration-150"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
};

export default Profile;
