import express from "express";
const router = express.Router();

import { faucetTokenController } from "../controllers/faucet.controller.js";
import { faucetTokenValidation } from "../middlewares/faucetTokenValidation.middleware.js";

/**
 * @swagger
 * /api/faucet:
 *   post:
 *     summary: Faucet token
 *     description: Faucet token
 *     responses:
 *       200:
 *         description: Faucet token successfully
 */
router.post("/", faucetTokenValidation, faucetTokenController);

export { router };
