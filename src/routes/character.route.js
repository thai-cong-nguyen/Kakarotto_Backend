import express from "express";
const router = express.Router();

import {
  generateCharacterController,
  generateImageController,
  generateAttributeController,
  // generateMetadataController,
  mintNFTCharacterController,
  retrieveCharacterMetadataController,
  upLevelCharacterController,
} from "../controllers/character.controller.js";

router.get("/", retrieveCharacterMetadataController);
router.get("/image", generateImageController);
router.post("/attributes", generateAttributeController);
router.post("/generate", generateCharacterController);
router.post("/mint", mintNFTCharacterController);
router.put("/up_level", upLevelCharacterController);

export { router };
