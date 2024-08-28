import express from "express";
const router = express.Router();

import {
  uploadMetadataToSupabaseController,
  updateMetadataInBucketController,
} from "../controllers/metadata.controller.js";

router.post("/upload", uploadMetadataToSupabaseController);

router.patch("/update", updateMetadataInBucketController);

export { router };
