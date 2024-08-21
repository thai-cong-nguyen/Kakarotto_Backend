import { ABI_CONTRACT } from "./common.util.js";

export default function getABI(contractName) {
  return ABI_CONTRACT[contractName];
}
