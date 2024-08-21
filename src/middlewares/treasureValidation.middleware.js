import { body } from "express-validator";
import { ethers } from "ethers";
import { validateBodyData } from "../helpers/validate.helper.js";

const mintTreasureValidation = async (req, res, next) => {
  const validationRules = [
    body("creator")
      .notEmpty()
      .trim()
      .isString()
      .custom(() => {
        if (!ethers.isAddress(req.body.creator)) {
          throw new Error("Invalid address");
        }
      }),
    body("signature").notEmpty().isString(),
    body("tokenId").notEmpty().isInt().isIn([0, 1, 2, 3, 4]),
    body("value")
      .notEmpty()
      .isInt()
      .custom((value) => {
        if (value <= 0) {
          throw new Error("Value must be greater than 0");
        }
      }),
  ];
  await validateBodyData(validationRules)(req, res, next);
};

const openTreasureValidation = async (req, res, next) => {
  const validationRules = [
    body("creator")
      .notEmpty()
      .trim()
      .isString()
      .custom(() => {
        if (!ethers.isAddress(req.body.creator)) {
          throw new Error("Invalid address");
        }
      }),
    body("signature").notEmpty().isString(),
    body("tokenId").notEmpty().isInt().isIn([0, 1, 2, 3, 4]),
    body("value")
      .notEmpty()
      .isInt()
      .custom((value) => {
        if (value <= 0) {
          throw new Error("Value must be greater than 0");
        }
      }),
  ];
  await validateBodyData(validationRules)(req, res, next);
};

export { mintTreasureValidation, openTreasureValidation };
