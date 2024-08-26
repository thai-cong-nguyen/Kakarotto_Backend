import express from "express";
const router = express.Router();

import { uploadMetadataToSupabaseController } from "../controllers/metadata.controller.js";

router.post("/upload", uploadMetadataToSupabaseController);

export { router };
