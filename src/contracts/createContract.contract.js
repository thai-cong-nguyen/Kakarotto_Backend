import { ethers } from "ethers";

export default function createContract({ address, ABI, runner }) {
  return new ethers.BaseContract(address, ABI, runner);
}
