import express from "express";
const router = express.Router();
import {
  getTreasuresMetadataController,
  getTreasureRarityController,
  mintTreasureController,
  openTreasureController,
} from "../controllers/treasure.controller.js";

import {
  mintTreasureValidation,
  openTreasureValidation,
} from "../middlewares/treasureValidation.middleware.js";

router.get("/:tokenId", async (req, res) => {
  res.send("Hello World");
});
router.get("/rarity", getTreasureRarityController);
router.get("/metadata", getTreasuresMetadataController);
router.post("/mint", mintTreasureValidation, mintTreasureController);
router.post("/open", openTreasureValidation, openTreasureController);

export { router };
