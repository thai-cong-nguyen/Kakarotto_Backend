import express from "express";
import {
  mintItemNFTController,
  retrieveItemMetadataController,
} from "../controllers/item.controller.js";
const router = express.Router();

router.get("/", retrieveItemMetadataController);
router.post("/mint", mintItemNFTController);

export { router };
