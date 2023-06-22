# BlockSubs Smart Contract

The BlockSubs smart contract is a decentralized subscription management system implemented on the Ethereum blockchain. It allows users to register, subscribe to different roles, and manage their subscriptions using ERC20 tokens. This smart contract can be used as a foundation for building subscription-based applications on the blockchain.

## Features

### User Registration

Users can register by providing their name through the `registerUser` function. Once registered, a user can manage their subscription status and interact with the contract.

### Subscription Roles

The smart contract defines different subscription roles: Silver, Gold, Platinum, and Diamond. Each role has a specific price associated with it, which is set by the contract owner. Users can subscribe to a particular role by calling the `addSubscription` function and providing the desired role. The subscription is active for a fixed duration of 30 days, after which it expires.

### Subscription Status

The contract keeps track of the user's subscription status, including the active role, expiration timestamp, and cancellation time. Users can query their own subscription status using the `getUser` function.

### Subscription Cancellation

Users have the option to cancel their active subscription at any time by calling the `cancelSubscription` function. If a subscription is canceled before its expiration, the user is eligible for a refund based on the remaining time. The refund amount is calculated proportional to the remaining subscription time and deducted from the contract's balance.

### Token Minting

The smart contract supports minting and transfer of ERC20 tokens, referred to as BlockSubs (BSB) tokens. Users can mint tokens by calling the `mintTokens` function and providing the desired amount. The minting process requires an equivalent payment in Ether (ETH) based on the predefined token price. The maximum minting amount per wallet is set to 2000 tokens.

### Token Transfers

Users can transfer their BSB tokens to other addresses using the `transfer` and `transferFrom` functions. The contract ensures that the sender has a sufficient balance and the transfer amount does not exceed the available balance or allowance.

### Ownership and Access Control

The smart contract utilizes the OpenZeppelin `Ownable` contract to manage ownership and access control. The contract owner can set the prices for each subscription role and perform administrative tasks.

## Deployment

1. Install the [Truffle](https://www.trufflesuite.com/truffle) framework.

```bash
npm install -g truffle
```

2. Clone the repository and install the dependencies:

```bash
git clone
cd project-block-subs
npm install
```

3. Compile and test the smart contract:

```bash
truffle compile
truffle test
```

4. Deploy the smart contract to a blockchain:

```bash
truffle dashboard
```

Connect wallet to the dashboard and deploy the contract to a local or remote network.

```
truffle migrate --network dashboard
```

5. Copy the contract address and ABI from the dashboard and use them in your application.

6. (Optional) Verify the contract on Etherscan.

7. Deploy the frontend application to vercel.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/jaykeraliya0/project-block-subs)

## License

The BlockSubs project is licensed under the MIT License.

## Disclaimer

This smart contract is provided as-is without any warranties or guarantees. Use it at your own risk. The contract author and contributors are not responsible for any loss of funds or damages caused by the usage of this contract.
