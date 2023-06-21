"use client";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type Props = {};

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Profile = (props: Props) => {
  const user = {
    name: "Jay Keraliya",
    address: "0x011080Eb860c929a57056009592eB46710EbFe8c",
    subscription: "silver",
    active: true,
  };

  const gradients = {
    none: "from-amber-600 to-yellow-600",
    silver: "from-blue-600 to-teal-500",
    gold: "from-amber-600 to-orange-500",
    platinum: "from-purple-600 to-fuchsia-500",
    diamond: "from-black to-gray-700",
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <div className="w-24 h-24 mb-3 rounded-full shadow-lg border flex justify-center items-center">
            <Jazzicon
              diameter={90}
              seed={jsNumberForAddress(
                "0x011080Eb860c929a57056009592eB46710EbFe8c"
              )}
            />
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900">
            {user.name}
          </h5>
          <span className="text-sm text-gray-500">
            {user.address.slice(0, 6)}...{user.address.slice(-4)}
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <a
              href="#"
              className={classNames(
                user.active
                  ? "text-gray-900 bg-white border-gray-300 hover:bg-gray-100 focus:ring-gray-200"
                  : "text-white bg-amber-500 border-transparent hover:bg-amber-600 focus:ring-amber-200",
                "inline-flex items-center px-4 py-2 text-sm font-medium text-center border rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-150 "
              )}
            >
              {user.active ? "Cancel Subscription" : "Subscribe"}
            </a>
          </div>
        </div>
        <div
          className={classNames(
            gradients[
              user.subscription.toLowerCase() as keyof typeof gradients
            ],
            "w-full p-3 bg-gradient-to-r rounded-b-lg"
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
                    <span className="text-xs font-medium">05 Oct 2023</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold">Starting at:</span>{" "}
                    <span className="font-medium">
                      10{" "}
                      <svg
                        className="h-4 w-4 inline-block mb-1.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1535"
                        height="2500"
                        preserveAspectRatio="xMidYMid"
                        viewBox="0 0 256 417"
                        id="ethereum"
                      >
                        <path
                          fill="#CBCBCB"
                          d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
                        ></path>
                        <path
                          fill="#8C8C8C"
                          d="M127.962 0L0 212.32l127.962 75.639V154.158z"
                        ></path>
                        <path
                          fill="#888887"
                          d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
                        ></path>
                        <path
                          fill="#8C8C8C"
                          d="M127.962 416.905v-104.72L0 236.585z"
                        ></path>
                        <path
                          fill="#EBEBEB"
                          d="M127.961 287.958l127.96-75.637-127.96-58.162z"
                        ></path>
                        <path
                          fill="#C5C5C5"
                          d="M0 212.32l127.96 75.638v-133.8z"
                        ></path>
                      </svg>
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
