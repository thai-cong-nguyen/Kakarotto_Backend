import "dotenv/config";
import { ethers } from "ethers";
import createWallet from "./createWallet.contract.js";
import createContract from "./createContract.contract.js";
import getABI from "../utils/getABI.util.js";
import getAddress from "../utils/getAddress.util.js";
import getProvider from "../utils/getProvider.util.js";

const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;
const itemNFTABI = getABI("KakarottoItem");

const createItemNFT = async ({
  tokenURI,
  creator,
  createNFTSignature,
  rarityNumber,
  attributeCount,
  attributes,
  networkId,
}) => {
  try {
    const itemNFTAddress = getAddress("KakarottoItem", networkId);
    const provider = new ethers.JsonRpcProvider(getProvider(networkId));
    const wallet = createWallet({
      privateKey: `0x${OWNER_PRIVATE_KEY}`,
      provider,
    });
    const itemNFTContract = createContract({
      address: itemNFTAddress,
      ABI: itemNFTABI,
      runner: wallet,
    });
    const tx = await itemNFTContract.createNFT(
      creator,
      createNFTSignature,
      tokenURI,
      rarityNumber,
      attributeCount,
      attributes._attributes,
      attributes._values,
      attributes._isIncreases,
      attributes._isPercentages
    );
    const txResponse = await tx.wait();
    return txResponse;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export { createItemNFT };
