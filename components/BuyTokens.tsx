"use client";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { ReceiptPercentIcon } from "@heroicons/react/24/outline";
import abi from "@/artifacts/BlockSubs.json";
import switchNetwork from "@/utils/switchNetwork";
import { ethers } from "ethers";
import { useSDK } from "@metamask/sdk-react";

type Props = {
  className?: string;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const BuyTokens = ({ className, setUser }: Props) => {
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const ethereum = sdk?.getProvider();

  const [open, setOpen] = useState(false);

  const buyTokens = async (value: number) => {
    const notification = toast.loading("Minting Tokens...");
    await sdk?.connect();
    // try {
    const chainId = await ethereum?.request({ method: "eth_chainId" });
    if (chainId !== "0xaa36a7") await switchNetwork(ethereum);

    const provider = new ethers.BrowserProvider(ethereum as any);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      abi.abi,
      signer
    );

    const tx = await contract.mintTokens(value, {
      value: ethers.parseEther(String(value * 0.0001)),
    });
    await tx.wait();
    toast.success("Tokens Minted!", {
      id: notification,
    });
    const tokens = await contract.balanceOf(signer.getAddress());
    setUser((prev: any) => ({ ...prev, tokens: tokens.toString() }));
    setOpen(false);
    // } catch (error: any) {
    //   console.log(error);

    //   toast.error(error.message.split("(")[0].trim(), {
    //     id: notification,
    //   });
    // }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        Buy Tokens
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
                      const value = (e.target as any).price.value;
                      buyTokens(value);
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
                          Buy BSB Tokens
                        </Dialog.Title>
                        <div className="mt-2">
                          <div>
                            <p className="text-sm text-gray-500">
                              Enter the amount of BSB tokens you would like to
                              purchase.
                            </p>
                            <div className="relative mt-5 rounded-md shadow-sm">
                              <input
                                type="text"
                                name="price"
                                id="price"
                                className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                placeholder="0.00"
                              />
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="text-gray-500 sm:text-sm">
                                  BSB
                                </span>
                              </div>
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
                        Buy Tokens
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

export default BuyTokens;
