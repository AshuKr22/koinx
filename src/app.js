import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import cron from "node-cron";
import statsRouter from "./routes/stats.js";
import { fetchCryptoPrices } from "./jobs/fetchCryptoService.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDatabase();

app.use(express.json());
cron.schedule("0 */2 * * *", fetchCryptoPrices);
app.use("/stats", statsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
