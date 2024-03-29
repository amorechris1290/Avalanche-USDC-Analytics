const request = require('supertest');
const express = require('express');
const usdcController = require('../controllers/usdcController');
const usdcService = require('../services/usdcService');

jest.mock('../services/usdcService');

const app = express();
app.use('/api', usdcController);

describe('GET /api/usdc-transfers', () => {
  it('should return usdc transfers', async () => {
    const response = await request(app).get('/api/usdc-transfers');
    console.log('Response Body:', response.body); 
  });

  it('should handle errors', async () => {
    const errorMessage = 'Something broke!';
    usdcService.getUsdcTransfers.mockRejectedValueOnce(new Error(errorMessage));

    const response = await request(app).get('/api/usdc-transfers/aggregated');

    expect(response.statusCode).toBe(500);
    expect(response.text).toContain(errorMessage);
  });
});

describe('GET /api/usdc-transfers/aggregated', () => {
  it('should return aggregated usdc transfers', async () => {
    const aggregatedData = {
      totalUsdcTransferred: 300,
      topAccountsByVolume: [
        { account: '0x123', volume: 100 },
        { account: '0x456', volume: 200 }
      ]
    };
    const usdcTransfers = [
      { returnValues: { from: '0x123', to: '0x456', value: '100' } },
      { returnValues: { from: '0x456', to: '0x789', value: '200' } }
    ];
    usdcService.getUsdcTransfers.mockResolvedValueOnce(usdcTransfers);
    usdcService.aggregateUsdcTransfers.mockReturnValueOnce(aggregatedData);

    const response = await request(app).get('/api/usdc-transfers/aggregated');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(aggregatedData);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Something broke!';
    usdcService.getUsdcTransfers.mockRejectedValueOnce(new Error(errorMessage));

    const response = await request(app).get('/api/usdc-transfers/aggregated');

    expect(response.statusCode).toBe(500);
    expect(response.text).toContain(errorMessage);
  });
});
