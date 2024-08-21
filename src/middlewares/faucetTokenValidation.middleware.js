import { body } from "express-validator";
import { ethers } from "ethers";
import { validateBodyData } from "../helpers/validate.helper.js";

const faucetTokenValidation = async (req, res, next) => {
  const validationRules = [
    body("address").notEmpty().trim().isString(),
    body("address")
      .trim()
      .custom(async (value) => {
        if (!ethers.isAddress(value)) {
          throw new Error("Invalid address");
        }
      }),
    body("quantity").notEmpty().isInt(),
  ];
  await validateBodyData(validationRules)(req, res, next);
};

export { faucetTokenValidation };
