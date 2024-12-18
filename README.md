# Crypto-Wallet

## Scenario:

Your task is to build a REST API for a basic cryptocurrency wallet application with your preferred
blockchain network and a simple user interface to interact with the API. The wallet should allow users to:

1. Create a wallet.
2. View their balance.
3. Send cryptocurrency to another user.
4. Retrieve transaction history

## Requirements:

1. Wallet Creation Endpoint
   o Accepts a username.
   o Generates a wallet address for the user.
2. Balance Endpoint
   o Returns the balance for a user’s wallet.
3. Transaction Endpoint
   o Accepts sender wallet address, recipient wallet address, and amount.
   o Validates sufficient balance and do the transaction.
   o Returns a transaction ID.
4. Transaction History Endpoint
   o Returns a list of transactions for a given wallet address.

## Tech Stacks

- Nest.js
- React.js
- MySQL

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- MySQL supported database
- An Ethereum client like Ganache, or access to testnet/mainnet via Infura/Alchemy

## Database Setup

If you just run the MySQL sever
Database will be created automatically running the backend sever

## Backend Setup

### Install Dependencies

```bash
cd yourproject/crypto-wallet-backend

yarn install

```

### Set Up Environment Variables

.env

```
PORT=8080
DB_TYPE=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=your_database
DB_PASSWORD=your_password
DB_NAME=crypto_wallet
DB_SYNCHRONIZE=true
ETHERSCAN_API_KEY=ETHERSCAN_API_KEY
ETHERSCAN_API_BASEURL = https://api-rinkeby.etherscan.io/api
ETHEREUM_RPC_URL=http://127.0.0.1:8545

```

### Start the Backend Server

```bash
yarn start run:dev
```

## Ethereum Environment Configuration

### Local Development

```bash
# Start Ganache
ganache-cli

```

Ensure your ETHEREUM_RPC_URL in .env matches the RPC server provided by Ganache.

### Using Testnets

For deploying to Ethereum testnets like Ropsten or Rinkeby, configure your ETHEREUM_RPC_URL to use an Infura endpoint:

```plaintext
ETHEREUM_RPC_URL=https://rinkeby.infura.io/v3/[YOUR_INFURA_PROJECT_ID]
```

## Frontend Setup

### Install Dependencies

```bash
cd ../crypto-wallet-frontend

yarn install
```

### Set Up Environment Variables

.env

```

REACT_APP_API_BASE_URL=http://localhost:8080
```

### Start the Frontend Server

```bash
yarn start
```

This will launch the frontend on http://localhost:3000.
