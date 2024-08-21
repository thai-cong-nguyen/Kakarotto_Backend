import { ethers } from "ethers";

export default function createWallet({ privateKey, provider }) {
  return new ethers.Wallet(privateKey, provider);
}
