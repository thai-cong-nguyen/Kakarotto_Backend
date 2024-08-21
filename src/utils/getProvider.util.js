import { PROVIDER } from "./common.util.js";

export default function getProvider(networkId) {
  return PROVIDER[networkId];
}
