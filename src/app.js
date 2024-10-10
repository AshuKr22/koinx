import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import cron from "node-cron";
import statsRouter from "./routes/stats.js";
import deviationRouter from "./routes/deviation.js";
import { fetchCryptoPrices } from "./jobs/fetchCryptoService.js";
import { keepAlive } from "./utils/keepAlive.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDatabase();

app.use(express.json());
cron.schedule("0 */2 * * *", fetchCryptoPrices);
app.use("/stats", statsRouter);
app.use("/deviation", deviationRouter);
app.get("/ping", (req, res) => {
  res.send("Server is alive")
})
fetchCryptoPrices();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  keepAlive();
});
