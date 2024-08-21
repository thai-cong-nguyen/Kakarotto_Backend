import apiReturn from "../utils/apiReturn.util.js";
import FaucetModel from "../models/Faucet.model.js";

const faucetToken = async ({ address, ip, quantity }) => {
  try {
    const faucetLatest = await FaucetModel.find({
      network: ip,
    })
      .sort({ $latestFaucet: -1 })
      .limit(1);
    if (faucetLatest.length > 0) {
      const latestFaucet = faucetLatest[0];
      const latestFaucetTime = latestFaucet.latestFaucet;
      const currentTime = new Date();
      const diffTime = Math.abs(currentTime - latestFaucetTime);
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      if (diffHours < 24) {
        return apiReturn.error(
          400,
          "You have to wait 24 hours to get another Faucet Token"
        );
      }
    }
    const newFaucet = new FaucetModel({
      network: ip,
      quantity,
      address,
      block: false,
    });
    await newFaucet.save();
    // sendToken();
    return apiReturn.success(200, "Faucet Token Sent Successfully");
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error sending Faucet Token");
  }
};

export { faucetToken };
