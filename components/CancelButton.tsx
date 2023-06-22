"use client";
import MetaMaskSDK from "@metamask/sdk";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import abi from "@/artifacts/BlockSubs.json";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type Props = {
  user: {
    name: string;
    active: boolean;
    subscription: string;
    tokens: number;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const CancelButton = ({ setUser, user }: Props) => {
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

  const cancelSubscription = async () => {
    const chainId = await ethereum?.request({ method: "eth_chainId" });
    if (chainId !== "0xaa36a7") await switchNetwork();

    const notification = toast.loading("Cancelling subscription");
    try {
      const provider = new ethers.BrowserProvider(ethereum as any);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
        abi.abi,
        signer
      );

      const tx = await contract.cancelSubscription();
      await tx.wait();
      toast.success("Subscription cancelled", { id: notification });
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
        className="inline-flex shadow items-center px-4 py-2 text-sm font-medium text-center border rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-150 text-gray-900 bg-white border-gray-300 hover:bg-gray-100 focus:ring-gray-200"
      >
        Cancel Subscription
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Deactivate account
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to cancel your subscription?
                            All of your subscription will be permanently
                            removed. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={cancelSubscription}
                    >
                      Cancel Subscription
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default CancelButton;
