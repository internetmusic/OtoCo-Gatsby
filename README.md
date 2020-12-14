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

## General informations

The app works both on Ropsten and Mainnet. For ropsten app uses a ERC20 in the place of DAI.

### Supplementary Smart-contracts

To reach smart contracts used on this product just this
[link](https://github.com/otocorp/SmartContract). The project needs Truffle to deploy contracts properly.

### Using Local Network

To use the app on a local network just change properties for the "private" variables at "smart-contracts" folder scripts with the newly deployed contracts from contracts below.
