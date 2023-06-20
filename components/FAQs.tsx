"use client";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "How can I integrate BlockSubs into my application?",
    answer:
      "To integrate BlockSubs into your application, you can interact with the smart contract using Ethereum-compatible wallets or libraries. You can use the provided functions to register users, add subscriptions, cancel subscriptions, and retrieve user information. Additionally, you can customize the contract to fit your specific business requirements.",
  },
  {
    question: "Is BlockSubs customizable?",
    answer:
      "Yes, BlockSubs is customizable. You can modify the contract to suit your specific subscription models, pricing structures, and business rules. You can extend the contract's functionalities, add additional roles or features, or integrate with other smart contracts or systems.",
  },
  {
    question: "What is the role of the ERC20 token in BlockSubs?",
    answer:
      "BlockSubs utilizes an ERC20 token, named BSB (BlockSubs Token), for transactions within the platform. Users need to hold a sufficient balance of BSB tokens to purchase and maintain their subscriptions. The token can also be used for other purposes, such as granting rewards or accessing exclusive features within your application.",
  },
  {
    question: "How can I acquire BSB tokens?",
    answer:
      "You can acquire BSB tokens by minting them directly through the smart contract. The 'mintTokens' function allows users to purchase a specified amount of BSB tokens by sending the corresponding payment in Ether (ETH). The tokens will be transferred to the user's wallet.",
  },
  {
    question: "Can users transfer their BSB tokens to other addresses?",
    answer:
      "Yes, users can transfer their BSB tokens to other addresses within the Ethereum network. The 'transfer' and 'transferFrom' functions are provided for token transfers between addresses. Users need to have a sufficient balance of BSB tokens and follow the standard ERC20 transfer rules.",
  },
  {
    question:
      "Is there a maximum limit for the number of BSB tokens that can be minted?",
    answer:
      "Yes, there is a maximum minting limit for BSB tokens to prevent excessive token creation. The current maximum minting amount is set to 2000 tokens per wallet. This limit can be adjusted within the contract if necessary.",
  },
  {
    question: "Is there a refund policy for canceled subscriptions?",
    answer:
      "Yes, BlockSubs offers a refund policy for canceled subscriptions. When a user cancels their subscription, they are eligible for a refund based on the remaining time of their subscription period. The refund amount is calculated proportionally from the original subscription price. The refund is automatically transferred back to the user's wallet.",
  },
];

export default function FAQs() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-5xl text-center font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {!open ? (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
