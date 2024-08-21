import "dotenv/config";
import { ethers } from "ethers";
import createWallet from "./createWallet.contract.js";
import createContract from "./createContract.contract.js";
import getABI from "../utils/getABI.util.js";
import getAddress from "../utils/getAddress.util.js";
import getProvider from "../utils/getProvider.util.js";

const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;
const NFTAccountABI = getABI("KakarottoERC6551Account");
// const testABI = [
//   "function token() public view returns (uint256, address, uint256)",
// ];

const getOwner = async ({ accountAddress, networkId }) => {
  try {
    const provider = new ethers.JsonRpcProvider(getProvider(networkId));
    const wallet = createWallet({
      privateKey: `0x${OWNER_PRIVATE_KEY}`,
      provider,
    });
    const accountContract = createContract({
      address: accountAddress,
      ABI: NFTAccountABI,
      runner: wallet,
    });
    const result = await accountContract.token();
    const formatResult = result.map((item) => item.toString());
    return formatResult;
  } catch (error) {
    throw new Error(error);
  }
};

export { getOwner };
