import express, { Router } from 'express';
import CryptoPrice from '../models/CryptoPrice.js';
import { calculateStandardDeviation } from '../utils/calculateStandardDeviation.js';
import { z } from 'zod';

const router = Router();

const querySchema = z.object({
  coin: z.string(),
});

router.get('/', async (req, res) => {
  try {
    const { coin } = querySchema.parse(req.query);

    // Fetch the last 100 records with help of the timestamp field
    const lastHundredRecords = await CryptoPrice.find({ coin })
      .sort({ timestamp: -1 }) // Sort by timestamp, newest first
      .limit(100) // Limit to 100 records
      .exec();

    if (lastHundredRecords.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified coin' });
    }

    const prices = lastHundredRecords.map(record => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation });
  } catch (error) {
    console.error('Error in /deviation route:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;