import "dotenv/config";

import { fetchFile } from "./pinata.service.js";
import apiReturn from "../utils/apiReturn.util.js";
import { mintNFT, openNFT } from "../contracts/treasure.contract.js";
import {
  generateItemRarityTreasureOpening,
  generateItemAttributeTreasureOpening,
  generateTreasureRarity,
} from "../modules/treasure.module.js";
import { itemAttributeWeight } from "../utils/attribute.util.js";
import {
  generateItemCategoryAndCollection,
  generateItemMetadata,
} from "../modules/item.module.js";
import { uploadMetadataSupabase } from "../modules/metadata.module.js";

const PINATA_TREASURE_METADATA_GROUP_CID =
  process.env.PINATA_TREASURE_METADATA_GROUP_CID;

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
    const result = generateTreasureRarity();
    return apiReturn.success(200, "Treasure rarity fetched", result);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error fetching treasure rarity");
  }
};

const mintTreasureNFT = async ({ creator, signature, value, data }) => {
  try {
    const tokenId = generateTreasureRarity();
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

const openTreasureNFT = async ({
  creator,
  signature,
  value,
  treasureRarity,
}) => {
  let path = "";
  try {
    // Generate Item rarity and attributes when opening treasure
    const itemRarity = generateItemRarityTreasureOpening(treasureRarity);
    const {
      count,
      _attributes: attributes,
      _values: values,
      _isIncreases: isIncreases,
      _isPercentages: isPercentages,
      rarityNumber: rarity,
    } = generateItemAttributeTreasureOpening(itemRarity, itemAttributeWeight);

    // Generate Item Category and Collection
    const { dataResult, collection, category } =
      generateItemCategoryAndCollection();

    // Generate Item Metadata
    const { metadata } = generateItemMetadata({
      name: dataResult.name,
      description: dataResult.description,
      image: PINATA_GATEWAY_URL + "/ipfs/" + dataResult.tokenURI,
      collection,
      category,
      rarity,
      count,
      attributes,
      isPercentages,
      isIncreases,
      values,
    });
    console.log(metadata);

    // Upload the Metadata to Supabase
    const uploadMetadataToSupabase = await uploadMetadataSupabase({
      metadata,
      fileName: "item_" + Date.now(),
      bucket: "Item",
    });
    if (uploadMetadataToSupabase.error) {
      throw new Error(uploadMetadataToSupabase.error.message);
    }
    path = uploadMetadataToSupabase.data.path;

    // Open the Treasure NFT
    const txResponse = await openNFT({
      creator,
      signature,
      value,
      itemURI,
      rarityNumber,
      count,
      attributes,
      values,
      isIncreases,
      isPercentages,
    });
    console.log("Open NFT response: ", txResponse);
    const result = {
      transactionHash: txResponse.transactionHash,
      itemURI: itemURI,
      itemRarity: rarityNumber,
      itemAttributeCount: count,
      attributes: attributes,
      attributeValues: values,
      isIncreases: isIncreases,
      isPercentages: isPercentages,
    };

    return apiReturn.success(200, "Treasure NFT opened", result);
  } catch (error) {
    console.log(error);
    if (path) {
      await deleteFileFromBucket([path], "Item");
    }
    return apiReturn.error(400, "Error opening treasure");
  }
};

const retrieveTreasureMetadata = async ({ tokenURI }) => {
  try {
    const { data } = await retrieveTokenURIFromBucket(tokenURI, "Treasure");
    if (data.error) {
      throw new Error(data.message);
    }
    if (data.publicUrl == null || data.publicUrl == "") {
      throw new Error("Character metadata not found");
    }
    const { data: metadata } = await axios.get(data.publicUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return apiReturn.success(200, "Metadata retrieved", metadata);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error retrieving treasure metadata");
  }
};

export {
  getTreasuresMetadata,
  getTreasureRarity,
  mintTreasureNFT,
  openTreasureNFT,
  retrieveTreasureMetadata,
};
