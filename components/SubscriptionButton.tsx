"use client";
import MetaMaskSDK from "@metamask/sdk";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import abi from "@/artifacts/BlockSubs.json";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ReceiptPercentIcon } from "@heroicons/react/24/outline";

type Props = {
  user: {
    name: string;
    active: boolean;
    subscription: string;
    tokens: number;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const SubscriptionButton = ({ setUser, user }: Props) => {
  const MMSDK = new MetaMaskSDK({
    dappMetadata: {
      name: "BlockSubs",
    },
  });
  const ethereum = MMSDK.getProvider();

  const [open, setOpen] = useState(false);

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

  const subscribe = async (type: string) => {
    const chainId = await ethereum?.request({ method: "eth_chainId" });
    if (chainId !== "0xaa36a7") await switchNetwork();

    const notification = toast.loading("Subscribing...");
    try {
      const value = ["silver", "gold", "platinum", "diamond"].indexOf(type) + 1;

      const provider = new ethers.BrowserProvider(ethereum as any);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
        abi.abi,
        signer
      );

      const tx = await contract.addSubscription(value);
      await tx.wait();
      toast.success("Subscribed", { id: notification });

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

      setOpen(false);
    } catch (error: any) {
      toast.error(error.message.split("(")[0], { id: notification });
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex shadow items-center px-4 py-2 text-sm font-medium text-center border rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-150 text-white bg-amber-500 border-transparent hover:bg-amber-600 focus:ring-amber-200"
      >
        Subscribe
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const value = (e.target as any).plan.value;
                      subscribe(value);
                    }}
                  >
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                        <ReceiptPercentIcon
                          className="h-6 w-6 text-amber-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Purchase Subscription
                        </Dialog.Title>
                        <div className="mt-2">
                          <div>
                            <p className="text-sm text-gray-500">
                              Select the subscription plan that best suits your
                              needs.
                            </p>
                            <div className="relative mt-5 rounded-md shadow-sm">
                              <select
                                id="plan"
                                name="plan"
                                className="block w-full pl-3 pr-10 py-2 text-base text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                              >
                                <option value={"silver"}>
                                  Silver (10 BSB Tokens)
                                </option>
                                <option value={"gold"}>
                                  Gold (20 BSB Tokens)
                                </option>
                                <option value={"platinum"}>
                                  Platinum (30 BSB Tokens)
                                </option>
                                <option value={"diamond"}>
                                  Diamond (40 BSB Tokens)
                                </option>
                              </select>
                              {/* className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      >
                        Subscribe
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SubscriptionButton;
