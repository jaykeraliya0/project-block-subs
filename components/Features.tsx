import {
  LockClosedIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
const features = [
  {
    name: "Secure Blockchain Technology",
    description:
      "BlockSubs leverages the power of blockchain technology to ensure secure and transparent subscription management.",
    icon: LockClosedIcon,
  },
  {
    name: "Immutable and Transparent Transactions",
    description:
      "With the power of blockchain, BlockSubs ensures that all subscription transactions recorded on the distributed ledger are immutable and transparent.",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Decentralized",
    description:
      "BlockSubs is a decentralized platform that allows users to manage their subscriptions without the need for a third party.",
    icon: CubeTransparentIcon,
  },
  {
    name: "Accurate Billing and Revenue Sharing",
    description:
      "The contract terms are predefined and executed automatically, ensuring that subscribers are billed accurately and revenue is shared seamlessly among relevant parties.",
    icon: NewspaperIcon,
  },
];

export default function Features() {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-amber-600">
            Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to know about our services
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

