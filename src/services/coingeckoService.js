import axios from "axios";

const API_BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = process.env.COINGECKO_API_KEY;

// type of repsonse  {
//   id: string;
//   symbol: string;
//   name: string;
//   market_data: {
//     current_price: { usd: number };
//     market_cap: { usd: number };
//     price_change_24h: number;
//   };
// }

export const fetchCoinData = async (coinId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/coins/${coinId}`,
      {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
          x_cg_demo_api_key: API_KEY,
        },
      }
    );

    const { market_data } = response.data;
    return {
      price: market_data.current_price.usd,
      marketCap: market_data.market_cap.usd,
      change24h: market_data.price_change_24h,
    };
  } catch (error) {
    console.error(`Error fetching data for ${coinId}:`, error);
    throw error;
  }
};
