import express from "express";
import { mintItemNFTController } from "../controllers/item.controller.js";
const router = express.Router();

router.get("/:tokenId", async (req, res) => {
  res.send("Hello World");
});
router.post("/mint", mintItemNFTController);
export { router };
