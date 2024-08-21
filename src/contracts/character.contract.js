import "dotenv/config";
import { ethers } from "ethers";
import createWallet from "./createWallet.contract.js";
import createContract from "./createContract.contract.js";
import getABI from "../utils/getABI.util.js";
import getAddress from "../utils/getAddress.util.js";
import getProvider from "../utils/getProvider.util.js";

const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;
const NFTCharacterABI = getABI("KakarottoCharacter");

const getTokenId = async (networkId) => {
  try {
    const provider = new ethers.JsonRpcProvider(getProvider(networkId));
    const NFTCharacterAddress = getAddress("Character", networkId);
    const wallet = createWallet({
      privateKey: `0x${OWNER_PRIVATE_KEY}`,
      provider,
    });
    const NFTCharacterContract = createContract({
      address: NFTCharacterAddress,
      ABI: NFTCharacterABI,
      runner: wallet,
    });
    const tokenId = await NFTCharacterContract.tokenIdCounter();
    return ethers.formatEther(tokenId);
  } catch (error) {
    throw new Error(error);
  }
};

const createNFTCharacter = async ({
  tokenURI,
  creator,
  createNFTSignature,
  rarityNumber,
  attributes,
  networkId,
}) => {
  try {
    const NFTCharacterAddress = getAddress("KakarottoCharacter", networkId);
    const provider = new ethers.JsonRpcProvider(getProvider(networkId));
    const wallet = createWallet({
      privateKey: `0x${OWNER_PRIVATE_KEY}`,
      provider,
    });
    const NFTCharacterContract = createContract({
      address: NFTCharacterAddress,
      ABI: NFTCharacterABI,
      runner: wallet,
    });
    const tx = await NFTCharacterContract.createNFT(
      tokenURI,
      creator,
      createNFTSignature,
      rarityNumber,
      attributes.power,
      attributes.defend,
      attributes.agility,
      attributes.intelligence,
      attributes.luck
    );
    const txResponse = await tx.wait();
    return txResponse;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export { createNFTCharacter, getTokenId };
