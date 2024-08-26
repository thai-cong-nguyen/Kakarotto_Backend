import "dotenv/config";
import { ethers } from "ethers";
import createWallet from "./createWallet.contract.js";
import createContract from "./createContract.contract.js";
import getABI from "../utils/getABI.util.js";
import getAddress from "../utils/getAddress.util.js";
import getProvider from "../utils/getProvider.util.js";

const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;
const NFTTreasureABI = getABI("KakarottoTreasure");

const mintNFT = async ({
  creator,
  signature,
  tokenId,
  value,
  data,
  chainId,
}) => {
  try {
    const NFTTreasureAddress = getAddress("KakarottoTreasure", chainId);
    const provider = new ethers.JsonRpcProvider(getProvider(chainId));
    const wallet = createWallet({
      privateKey: `0x${OWNER_PRIVATE_KEY}`,
      provider,
    });
    const NFTTreasureContract = createContract({
      address: NFTTreasureAddress,
      ABI: NFTTreasureABI,
      runner: wallet,
    });
    const tx = await NFTTreasureContract.mint(
      creator,
      signature,
      tokenId,
      ethers.parseEther(value + ""),
      data
    );
    const txResponse = await tx.wait();
    return txResponse;
  } catch (error) {
    throw error;
  }
};

const openNFT = async ({
  creator,
  signature,
  tokenId,
  value,
  itemURI,
  itemRarity,
  itemAttributeCount,
  attributes,
  attributeValues,
  isIncreases,
  isPercentages,
}) => {
  try {
    const NFTFactoryAddress = getAddress("KakarottoFactory");
    const provider = new ethers.JsonRpcProvider(getProvider());
    const wallet = createWallet({
      privateKey: `0x${OWNER_PRIVATE_KEY}`,
      provider,
    });
    const NFTFactoryContract = createContract({
      address: NFTFactoryAddress,
      ABI: NFTFactoryABI,
      runner: wallet,
    });
    const tx = await NFTFactoryContract.openTreasure(
      creator,
      signature,
      tokenId,
      itemURI,
      value,
      itemRarity,
      itemAttributeCount,
      attributes,
      attributeValues,
      isIncreases,
      isPercentages
    );
    const txResponse = await tx.wait();
    return txResponse;
  } catch (error) {
    throw new Error(error);
  }
};

export { mintNFT, openNFT };
