import { validationResult } from "express-validator";
import { badRequest } from "../middlewares/handleErrors.middleware.js";

const validateBodyData = (validationRules) => {
  return async (req, res, next) => {
    for (const rule of validationRules) {
      const result = await rule.run(req);
      if (!result.isEmpty()) {
        return badRequest("Invalid data", res, res);
      }
    }
    next();
  };
};

export { validateBodyData };
