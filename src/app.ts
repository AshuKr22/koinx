import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import cron from "node-cron";
import { fetchCryptoPrices } from "./jobs/fetchCryptoService";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDatabase();

app.use(express.json());
cron.schedule("0 */2 * * *", fetchCryptoPrices);
fetchCryptoPrices();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
