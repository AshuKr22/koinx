import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDatabase();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
