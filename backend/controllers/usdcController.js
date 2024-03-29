/**
 * Controller for managing USDC transfers endpoints.
 * @module controllers/usdcController
 */

const express = require('express');
const router = express.Router();
const usdcService = require('../services/usdcService');

/** Number of blocks to fetch for USDC transfers. */
const numberOfBlocksToFetch = 100;

/**
 * Route for retrieving USDC transfers.
 * @name GET/usdc-transfers
 * @function
 * @memberof module:controllers/usdcController
 */
router.get('/usdc-transfers', async (req, res, next) => {
  try {
    const usdcTransfers = await usdcService.getUsdcTransfers('0xa7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', numberOfBlocksToFetch);

    const sanitizedTransfers = usdcTransfers.map(event => ({
      ...event,
      blockNumber: Number(event.blockNumber.toString()),
      transactionIndex: Number(event.transactionIndex.toString()),
      logIndex: Number(event.logIndex.toString()),
      returnValues: Object.fromEntries(
        Object.entries(event.returnValues).map(([key, value]) => [key, Number(value.toString())])
      )
    }));

    res.json(sanitizedTransfers);
  } catch (error) {
    next(error);
  }
});

/**
 * Route for retrieving aggregated USDC transfers.
 * @name GET/usdc-transfers/aggregated
 * @function
 * @memberof module:controllers/usdcController
 */
router.get('/usdc-transfers/aggregated', async (req, res, next) => {
  try {
    const usdcTransfers = await usdcService.getUsdcTransfers('0xa7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', numberOfBlocksToFetch); 
    
    const aggregatedData = usdcService.aggregateUsdcTransfers(usdcTransfers);    

    res.json(aggregatedData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
