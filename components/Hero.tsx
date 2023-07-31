import Image from "next/image";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
export default function Hero() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 lg:w-full lg:max-w-2xl">
          <svg
            className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="0,0 90,0 50,100 0,100" />
          </svg>

          <div className="relative px-6 pt-6 lg:pl-8 lg:pr-0">
            <nav
              className="flex items-center justify-between sm:h-10 lg:justify-start"
              aria-label="Global"
            >
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">BlockSubs</span>
                <Image
                  alt="Your Company"
                  className="h-12 w-auto"
                  height={200}
                  width={200}
                  src="/logo.png"
                />
              </Link>
            </nav>
          </div>

          <div className="relative py-32 px-6 lg:px-8 lg:pr-0">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <div className="hidden sm:mb-10 sm:flex">
                <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Explore membership{" "}
                  <a
                    href="#pricing"
                    className="whitespace-nowrap font-semibold text-amber-600"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    plans <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Decentralized Subscriptions
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                BlockSubs is a blockchain-based subscription management platform
                that simplifies and secures the way businesses handle
                subscriptions. Say goodbye to traditional models and embrace the
                future of subscription management with BlockSubs.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <ConnectWallet className="rounded-md bg-amber-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 transition-all duration-150" />
                <Link
                  href="/profile"
                  className="text-base font-semibold leading-7 text-gray-900"
                >
                  Profile &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
          src="/hero.jpg"
          width={2000}
          height={1333}
          alt=""
        />
      </div>
    </div>
  );
}
