import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { router as PinataRouter } from "./pinata.route.js";
import { router as FaucetRouter } from "./faucet.route.js";
import { router as CharacterRouter } from "./character.route.js";
import { router as TreasureRouter } from "./treasure.route.js";
import { router as ItemRouter } from "./item.route.js";
import { router as MetadataRouter } from "./metadata.route.js";

const initialRoutes = (app) => {
  app.use("/api/pinata", PinataRouter);
  app.use("/api/faucet", FaucetRouter);
  app.use("/api/character", CharacterRouter);
  app.use("/api/treasure", TreasureRouter);
  app.use("/api/item", ItemRouter);
  app.use("/api/metadata", MetadataRouter);

  return app.use((req, res) => {
    res.status(404).send("404 not found");
  });
};

export { initialRoutes };
