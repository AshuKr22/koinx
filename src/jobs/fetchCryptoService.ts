import { fetchCoinData } from "../services/coingeckoService";
import CryptoPrice, { validateCryptoPrice } from "../models/CryptoPrice";

const COINS = ["bitcoin", "matic-network", "ethereum"];

export const fetchCryptoPrices = async () => {
  try {
    for (const coin of COINS) {
      const data = await fetchCoinData(coin);
      const validatedData = validateCryptoPrice({
        coin,
        price: data.price,
        marketCap: data.marketCap,
        change24h: data.change24h,
      });
      await CryptoPrice.create(validatedData);
      console.log(`Data for ${coin} fetched, validated, and stored.`);
    }
  } catch (error) {
    console.error("Error in fetchCryptoPrices job:", error);
  }
};
