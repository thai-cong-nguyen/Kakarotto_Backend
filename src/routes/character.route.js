import express from "express";
const router = express.Router();
import {
  generateCharacterController,
  generateImageController,
  generateAttributeController,
  generateMetadataController,
  mintNFTCharacterController,
  retrieveMetadataController,
  upLevelCharacterController,
} from "../controllers/character.controller.js";

router.get("/", retrieveMetadataController);
router.get("/image", generateImageController);
router.post("/attributes", generateAttributeController);
router.post("/generate", generateCharacterController);
router.post("/generate_metadata", generateMetadataController);
router.post("/mint", mintNFTCharacterController);
router.put("/up_level", upLevelCharacterController);

export { router };
