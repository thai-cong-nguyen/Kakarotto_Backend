import "dotenv/config";
import { rarityPicked } from "../utils/rarity.util.js";
import { fetchFile } from "./pinata.service.js";
import apiReturn from "../utils/apiReturn.util.js";
import { mintNFT, openNFT } from "../contracts/treasure.contract.js";

const PINATA_TREASURE_METADATA_GROUP_CID =
  process.env.PINATA_TREASURE_METADATA_GROUP_CID;

const rarityWeight = [
  ["Bronze", 700],
  ["Silver", 500],
  ["Gold", 150],
  ["Platinum", 100],
  ["Diamond", 50],
];

const getTreasuresMetadata = async ({ rarityNumber }) => {
  try {
    let cidTreasure = "";
    if (rarityNumber > 4) return apiReturn.error(400, "Invalid rarity number");
    switch (rarityNumber) {
      case 0:
        cidTreasure = "QmRCBXd7CX4m1RCZhGfzCqpcuLGmbC2YEjFZGn63ruBhtt";
        break;
      case 1:
        cidTreasure = "QmPAZidSxCEmcLHpBsfTup4ZCtATc4ubaAby8uwoPHiNjW";
        break;
      case 2:
        cidTreasure = "QmSCAZsJfdjxgAnga7WNw1yExzAnFXjHEPcB35BsaWdZ7w";
        break;
      case 3:
        cidTreasure = "QmcPHoeDwCKKuXEif5b5tHbVJvmKjCjH3RFepoHaY5ANgn";
        break;
      case 4:
        cidTreasure = "QmW8ej2k4T9DznxgVZwCPjHAAUXxuva2vJZK2XycRBMJVL";
        break;
      default:
        cidTreasure = "QmRCBXd7CX4m1RCZhGfzCqpcuLGmbC2YEjFZGn63ruBhtt";
        break;
    }
    const metadata = await fetchFile({
      cid: cidTreasure,
      groupId: PINATA_TREASURE_METADATA_GROUP_CID,
    });
    const metadataData = metadata.data;
    if (metadataData.count > 1) {
      return apiReturn.error(400, "Invalid metadata");
    }
    return apiReturn.success(
      200,
      "Treasure metadata fetched",
      metadataData.rows[0].ipfs_pin_hash
    );
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error fetching treasure metadata");
  }
};

const getTreasureRarity = async () => {
  try {
    const rarity = rarityPicked({
      raritiesWeight: rarityWeight,
    });
    const result = rarityWeight.findIndex(
      (rarityItem) => rarityItem[0] === rarity
    );
    console.log(result);
    return apiReturn.success(200, "Treasure rarity fetched", result);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error fetching treasure rarity");
  }
};

const mintTreasureNFT = async ({ creator, signature, value, data }) => {
  try {
    // TODO: Implement randomization of tokenId
    const tokenId = "0";
    const txResponse = await mintNFT({
      creator,
      signature,
      tokenId,
      value,
      data: data ? data : "",
    });
    console.log("Mint NFT response: ", txResponse);
    const result = {
      transactionHash: txResponse.transactionHash,
      tokenId: tokenId,
      value: value,
    };
    return apiReturn.success(200, "Treasure NFT minted", result);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error minting treasure NFT");
  }
};

const openTreasureNFT = async ({ creator, signature, value }) => {
  try {
    // TODO: Implement randomization of some attributes
    const itemURI = "";
    const itemRarity = "";
    const itemAttributeCount = "";
    const attributes = "";
    const attributeValues = "";
    const isIncreases = "";
    const isPercentages = "";
    const txResponse = await openNFT({
      creator,
      signature,
      value,
      itemURI,
      itemRarity,
      itemAttributeCount,
      attributes,
      attributeValues,
      isIncreases,
      isPercentages,
    });
    console.log("Open NFT response: ", txResponse);
    const result = {
      transactionHash: txResponse.transactionHash,
      itemURI: itemURI,
      itemRarity: itemRarity,
      itemAttributeCount: itemAttributeCount,
      attributes: attributes,
      attributeValues: attributeValues,
      isIncreases: isIncreases,
      isPercentages: isPercentages,
    };
    return apiReturn.success(200, "Treasure NFT opened", result);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error opening treasure");
  }
};

export {
  getTreasuresMetadata,
  getTreasureRarity,
  mintTreasureNFT,
  openTreasureNFT,
};
