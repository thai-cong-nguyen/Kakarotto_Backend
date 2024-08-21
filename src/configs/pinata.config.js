import PinataSDK from "@pinata/sdk";
import "dotenv/config";

const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_GATEWAY_URL = process.env.PINATA_GATEWAY_URL;

const pinata = new PinataSDK({
  pinataJWTKey: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY_URL,
});

export default pinata;
