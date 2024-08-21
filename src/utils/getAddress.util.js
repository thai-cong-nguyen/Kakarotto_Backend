import { SMART_CONTRACT_ADDRESS } from "./common.util.js";

export default function getAddress(contractName, networkId) {
  return SMART_CONTRACT_ADDRESS[contractName][networkId];
}
