import { generateItemMetadata } from "../modules/item.module.js";
import apiReturn from "../utils/apiReturn.util.js";
import { createItemNFT } from "../contracts/item.contract.js";
import { uploadFileToBucket } from "../modules/supabase.module.js";

export async function mintItem({
  name,
  description,
  image,
  creator,
  createNFTSignature,
  networkId,
}) {
  try {
    const { metadata: metadata, attributesData: attributesData } =
      generateItemMetadata({
        name,
        description,
        image,
      });
    const jsonFile = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    const uploadMetadataToSupabase = await uploadFileToBucket(
      "item_" + Date.now(),
      "Item",
      jsonFile
    );
    if (uploadMetadataToSupabase.error) {
      throw new Error(uploadMetadataToSupabase.error.message);
    }
    const txResponse = await createItemNFT({
      tokenURI: uploadMetadataToSupabase.data.path,
      creator,
      createNFTSignature,
      rarityNumber: attributesData.rarityNumber,
      attributeCount: attributesData.count,
      attributes: attributesData._attributes,
      networkId,
    });
    console.log(txResponse);
    const result = {
      tokenURI: uploadMetadataToSupabase.data.path,
      status: txResponse.status,
      txHash: txResponse.hash,
      attributesData,
    };
    return apiReturn.success(200, "Item generated", result);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, error.message);
  }
}
