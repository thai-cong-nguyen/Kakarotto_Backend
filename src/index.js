import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { connectMongoDBWithRetry } from "./databases/init.mongodb.js";
import { initialRoutes } from "./routes/index.route.js";

const app = express();
const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;
const ENDPOINT =
  env === "development"
    ? `${process.env.LOCAL_ENDPOINT}:${PORT}`
    : process.env.PRODUCTION_ENDPOINT;
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
    },
    servers: [
      {
        url: ENDPOINT,
      },
    ],
  },
  apis: ["./src/routes/*.route.js"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

connectMongoDBWithRetry();
initialRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
