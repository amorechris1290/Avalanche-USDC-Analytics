# Avalanche USDC Analytics

Backend service for fetching, aggregating, and analyzing USDC transfer data from the Avalanche blockchain.

## Description

This backend service provides endpoints to retrieve and aggregate USDC transfer data from the Avalanche blockchain. It utilizes Express.js for routing and web3.js for interacting with the blockchain.

## Installation

1. Clone the repository:

git clone <repository-url>

2. Install dependencies:

npm install

## Usage

To start the server, run:

npm start

This will start the server at http://localhost:3000.

## Endpoints

### Get USDC Transfers

GET /usdc-transfers

Retrieves USDC transfer data from the specified contract address.

### Get Aggregated USDC Transfers

GET /usdc-transfers/aggregated

Retrieves aggregated USDC transfer data from the specified contract address.

## Configuration

Modify the numberOfBlocksToFetch constant in controller.js to adjust the number of blocks to fetch for USDC transfers.

## Dependencies

- big-int: ^0.0.6
- express: ^4.18.2
- punycode: ^2.3.1
- web3: ^4.5.0

## Development Dependencies

- jest: ^27.5.1
- supertest: ^6.3.4

## License

This project is licensed under the ISC License. See the LICENSE file for details.
