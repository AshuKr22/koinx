import mongoose, { Document, Schema } from "mongoose";
import { z } from "zod";

const CryptoPriceSchema = z.object({
  coin: z.string(),
  price: z.number().positive(),
  marketCap: z.number().positive(),
  change24h: z.number(),
  timestamp: z.date().default(() => new Date()),
});

export type CryptoPriceType = z.infer<typeof CryptoPriceSchema>;

export interface ICryptoPrice extends CryptoPriceType, Document {}

const mongooseSchema: Schema = new Schema({
  coin: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const validateCryptoPrice = (data: unknown) =>
  CryptoPriceSchema.parse(data);

export default mongoose.model<ICryptoPrice>("CryptoPrice", mongooseSchema);
