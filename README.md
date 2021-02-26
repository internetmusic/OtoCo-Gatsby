# Otoco DAPP - Gatsby version

[![Netlify Status](https://api.netlify.com/api/v1/badges/9d93e4b2-86e3-4bad-a5c4-dd1570f80680/deploy-status)](https://app.netlify.com/sites/upbeat-shaw-75fa27/deploys)

![thumb](https://user-images.githubusercontent.com/13040410/102030750-b10ef880-3d92-11eb-9041-edc18c9249ae.png)

## Features

- Gatsby Integrated app
- Bootstrap framework integrated
- Typescript support
- Netlify integration
- Firebase integration to store private data.
- Web3 + [Web3Modal](https://github.com/Web3Modal/web3modal) integration
- ENS integration
- Gnosis Safe wallet deployment on behalf of Series
- ERC20 custom deployment on behalf of series

## Installation

Install Gatsby+Typescript globally
`npm install -g gatsby typescript`

Install all dependencies inside package:
`npm install`

## Development mode

To serve a development terminal just type
`gatsby develop`

## Fluxogram for Creating and Managing Companies

![Otoco - Creation and Manage](https://user-images.githubusercontent.com/13040410/102531418-098b1200-4081-11eb-9f8e-8b85a41a2926.jpg)

## General informations

The app works both on Ropsten and Mainnet. For ropsten app uses a ERC20 in the place of DAI.

### Supplementary Smart-contracts

To reach smart contracts used on this product just this
[link](https://github.com/otocorp/SmartContract). The project needs Truffle to deploy contracts properly.

### Using Local Network

To use the app on a local network just change properties for the "private" variables at "smart-contracts" folder scripts with the newly deployed contracts from contracts below.

### REFERENCES

#### Liquidity Pool And DAOs

[Balancer Liquidity Pool](https://medium.com/balancer-protocol/building-liquidity-into-token-distribution-a49d4286e0d4)

[BentoBox](https://boringcrypto.medium.com/bentobox-to-launch-and-beyond-d2d5dc2350bd)

[Sushi SWAP Documentation](https://help.sushidocs.com)

[Balancer Core Repo](https://github.com/balancer-labs/balancer-core)

[DAO Repo](https://github.com/blockchainsllc/DAO/blob/develop/DAO.sol)

#### ICOs

[ICO Smart Contracts](https://github.com/TokenMarketNet/smart-contracts/tree/master/contracts)

#### Calculating Bonuses

[Token Bonding Curves](http://coders-errand.com/token_bonding_curves/)

[More Token Bonding Curves](https://hackernoon.com/more-price-functions-for-token-bonding-curves-d42b325ca14b)

#### Identity and Whitelisting

[The Basics of Decentralized Identity](https://medium.com/uport/the-basics-of-decentralized-identity-d1ff01f15df1)

[3ID Provider](https://github.com/ceramicstudio/js-3id-did-provider)

[3ID Connect](https://github.com/ceramicstudio/3id-connect)

[Textile.io Docs](https://textileio.github.io/js-textile/docs/)

[Metamask Identity using textile.io](https://github.com/textileio/js-examples/blob/master/metamask-identities-ed25519/)

[UPort Decentralized ID ERC-1056](https://github.com/uport-project/ethr-did)

[Claims Registry](https://github.com/ethereum/EIPs/issues/780)

[Library to Create Verifiable Credentials](https://github.com/decentralized-identity/did-jwt-vc)

[Library to create JWT with DID](https://github.com/decentralized-identity/did-jwt)

#### Payment Widget

- Add test to price oracles calls
- Add prices to Master Registry
- Calculate if the amount sent to the Master Registry is enough.

[Sending value with function calls](https://ethereum.stackexchange.com/questions/9705/how-can-you-call-a-payable-function-in-another-contract-with-arguments-and-send)

[Getting latest price from Oracle](https://docs.chain.link/docs/get-the-latest-price)
