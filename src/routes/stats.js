import { Router } from "express";
import { z } from "zod";
import { statsFn } from "../controllers/statsController.js";
const router = Router();
router.get("/", statsFn);
export default router;
