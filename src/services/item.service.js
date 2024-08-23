import "dotenv/config";
import {
  generateItemMetadata,
  generateItemCategoryAndCollection,
  generateItemRarity,
  generateItemAttribute,
} from "../modules/item.module.js";
import apiReturn from "../utils/apiReturn.util.js";
import { createItemNFT } from "../contracts/item.contract.js";
import {
  retrieveTokenURIFromBucket,
  uploadFileToBucket,
} from "../modules/supabase.module.js";
import { uploadMetadataSupabase } from "../modules/metadata.module.js";
import { itemAttributeWeight } from "../utils/attribute.util.js";

const PINATA_GATEWAY_URL = process.env.PINATA_GATEWAY_URL;

export async function mintItem({ creator, createNFTSignature, networkId }) {
  let path = "";
  try {
    // Generate the Item Category and Collection
    const { dataResult, collection, category } =
      generateItemCategoryAndCollection();

    // Generate the Rarity Number and Attributes
    const rarityNumber = generateItemRarity();
    const {
      count,
      _attributes: attributes,
      _isPercentages: isPercentages,
      _isIncreases: isIncreases,
      _values: values,
      rarityNumber: rarity,
    } = generateItemAttribute(rarityNumber, itemAttributeWeight);

    // Generate the Item Metadata
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
      throw new Error(uploadMetadataToSupabase.message);
    }
    path = uploadMetadataToSupabase.path;

    // Create the Item NFT
    const txResponse = await createItemNFT({
      tokenURI: uploadMetadataToSupabase.path,
      creator,
      createNFTSignature,
      rarityNumber: rarity,
      attributeCount: count,
      attributes: attributes,
      networkId,
    });
    console.log("Mint item NFT Response: ", txResponse);
    const result = {
      tokenURI: uploadMetadataToSupabase.path,
      status: txResponse.status,
      txHash: txResponse.hash,
      attributesData: attributes,
    };

    return apiReturn.success(200, "Item generated", result);
  } catch (error) {
    console.log(error);
    if (path) {
      await deleteFileFromBucket([path], "Item");
    }
    return apiReturn.error(400, error.message);
  }
}

export async function retrieveItemMetadata({ tokenURI }) {
  try {
    const { data } = await retrieveTokenURIFromBucket(tokenURI, "Item");
    if (data.error) {
      throw new Error(data.message);
    }
    if (data.publicUrl == null || data.publicUrl == "") {
      throw new Error("Item metadata not found");
    }
    const { data: metadata } = await axios.get(data.publicUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return apiReturn.success(200, "Metadata retrieved", metadata);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error retrieving metadata");
  }
}
