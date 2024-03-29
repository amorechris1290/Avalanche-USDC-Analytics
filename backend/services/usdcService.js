/**
 * Service functions for handling USDC transactions.
 * @module services/usdcServices
 */

const { Web3 } = require('web3');
const USDC_ABI = require('../abi/usdcABI.json');

/** Web3 instance connected to Avalanche network. */
const web3 = new Web3('https://api.avax.network/ext/bc/C/rpc');

/**
 * Retrieves USDC transfers within a specified block range.
 * @param {string} contractAddress - The address of the USDC contract.
 * @param {number} numberOfBlocksToFetch - The number of blocks to fetch transfers from.
 * @returns {Promise<Array>} An array of transfer events.
 */
async function getUsdcTransfers(contractAddress, numberOfBlocksToFetch) {
  const blocksToFetch = parseInt(numberOfBlocksToFetch, 10);
  const latestBlockNumber = await web3.eth.getBlockNumber();
  const latestBlockNumberRegular = Number(latestBlockNumber);
  const fromBlock = Math.max(0, latestBlockNumberRegular - blocksToFetch);
  const contract = new web3.eth.Contract(USDC_ABI, contractAddress);
  const events = await contract.getPastEvents('Transfer', {
    fromBlock: fromBlock,
    toBlock: 'latest'
  });
  return events;
}

/**
 * Aggregates USDC transfers to calculate total transferred amount and top accounts by volume.
 * @param {Array} transfers - An array of transfer events.
 * @returns {Object} An object containing total USDC transferred and top accounts by volume.
 */
function aggregateUsdcTransfers(transfers) {
  let totalUsdcTransferred = 0;
  let accountsTransactionVolume = {};

  transfers.forEach(transfer => {
    const { returnValues: { from, to, value } } = transfer;
    const transferValue = parseInt(value);
    if (!isNaN(transferValue)) {
      totalUsdcTransferred += transferValue;
      accountsTransactionVolume[from] = (accountsTransactionVolume[from] || 0) - transferValue;
      accountsTransactionVolume[to] = (accountsTransactionVolume[to] || 0) + transferValue;
    } else {
      console.error("Invalid transfer value:", value);
    }
  });

  const topAccountsByVolume = Object.entries(accountsTransactionVolume)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([account, volume]) => ({ account, volume }));

  return {
    totalUsdcTransferred,
    topAccountsByVolume
  };
}

module.exports = {
  getUsdcTransfers,
  aggregateUsdcTransfers
};
