import { z } from "zod";
import CryptoPrice from "../models/CryptoPrice.js";

const querySchema = z.object({
  coin: z.string(),
});

export const statsFn = async (req, res) => {
  try {
    const { coin } = querySchema.parse(req.query);

    const latestData = await CryptoPrice.findOne({ coin })
      .sort({ timestamp: -1 })
      .exec();

    if (!latestData) {
      return res
        .status(404)
        .json({ error: "No data found for the specified coin" });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
    // No need to call res.end() after res.json()
  } catch (error) {
    console.error(error);
    // Pass the error to Express error handler
  }
};
