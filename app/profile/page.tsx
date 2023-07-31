"use client";
import BuyTokens from "@/components/BuyTokens";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import SubscriptionButton from "@/components/SubscriptionButton";
import CancelButton from "@/components/CancelButton";


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

const Profile = () => {

  const address = "0x6060a36DCc3cD0D9cdc1FCe8C2eDaa33e653Ed47"

  const user = {
    name: "Henil",
    address: "0x6060a36DCc3cD0D9cdc1FCe8C2eDaa33e653Ed47",
    tokens: 100,
    subscription: "Gold",
    expiration: new Date(),
    active: true,
  }

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
              <SubscriptionButton user={user} />
            ) : (
              <CancelButton user={user} />
            )}
            <BuyTokens
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
      )
    </div>
  );
};

      export default Profile;
