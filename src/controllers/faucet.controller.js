import { faucetToken } from "../services/faucet.service.js";
import { validationResult } from "express-validator";

const faucetTokenController = async (req, res) => {
  try {
    const ip = "";
    const { address, quantity } = req.body;
    const response = await faucetToken({ address, ip, quantity });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export { faucetTokenController };
