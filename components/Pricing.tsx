import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const tiers = [
  {
    name: "Silver",
    href: "#",
    priceMonthly: 10,
    includedFeatures: ["Silver Background", "Silver Logo", "Silver Text"],
  },
  {
    name: "Gold",
    href: "#",
    priceMonthly: 20,
    includedFeatures: ["Gold Background", "Gold Logo", "Gold Text"],
  },
  {
    name: "Platinum",
    href: "#",
    priceMonthly: 30,
    includedFeatures: ["Platinum Background", "Platinum Logo", "Platinum Text"],
  },
  {
    name: "Diamond",
    href: "#",
    priceMonthly: 40,
    includedFeatures: ["Diamond Background", "Diamond Logo", "Diamond Text"],
  },
];

export default function Pricing() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-20 px-6 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-center">
            Pricing
          </h1>
          <p className="mt-5 text-xl text-gray-500 sm:text-center">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
          <Link
            href="/profile"
            className="mt-3 text-sm text-amber-500 font-medium sm:text-center hover:underline"
          >
            Do not have tokens? Buy some here.
          </Link>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold leading-6 text-gray-900">
                  {tier.name}
                </h2>
                <p className="mt-8 flex items-end space-x-2">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {tier.priceMonthly} <span className="text-xl"> Tokens</span>
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /mo
                  </span>
                </p>
                <button className="mt-8 block w-full rounded-md border border-amber-500 bg-amber-500 py-2 text-center text-sm font-semibold text-white hover:bg-amber-600 transition-all duration-150">
                  Buy {tier.name}
                </button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-sm font-medium text-gray-900">
                  What's included
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {tier.includedFeatures.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <CheckIcon
                        className="h-5 w-5 flex-shrink-0 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
