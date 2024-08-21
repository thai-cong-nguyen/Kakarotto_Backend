import express from "express";
const router = express.Router();
import { uploadFileMiddleware } from "../middlewares/uploadFile.middleware.js";
import {
  testConnectionController,
  uploadFilesController,
  uploadMetadataController,
  fetchFileController,
} from "../controllers/pinata.controller.js";

/**
 * @swagger
 * /api/pinata/testConnection:
 *   get:
 *     summary: Test connection
 *     description: Test the connection to the API
 *     responses:
 *       200:
 *         description: Connection tested successfully
 */
router.get("/testConnection", testConnectionController);

/**
 * @swagger
 * /api/pinata/fetch:
 *   get:
 *     summary: Fetch a file
 *     description: Retrieve a file from the server
 *     responses:
 *       200:
 *         description: File fetched successfully
 */
router.get("/fetch", fetchFileController);

/**
 * @swagger
 * /api/pinata/upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file to the server
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */
router.post("/upload", uploadFileMiddleware, uploadFilesController);

/**
 * @swagger
 * /api/pinata/uploadMetadata:
 *   post:
 *     summary: Upload metadata
 *     description: Upload metadata associated with a file
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               metadata:
 *                 type: object
 *     responses:
 *       200:
 *         description: Metadata uploaded successfully
 */
router.post("/uploadMetadata", uploadMetadataController);

export { router };
