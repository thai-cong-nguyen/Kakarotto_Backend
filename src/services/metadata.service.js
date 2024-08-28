import {
  updateMetadataSupabase,
  uploadMetadataSupabase,
} from "../modules/metadata.module.js";
import apiReturn from "../utils/apiReturn.util.js";

export async function uploadMetadataToSupabase({
  name,
  description,
  image,
  attributes,
  fileName,
  bucket,
}) {
  try {
    const metadata = {
      name,
      description,
      image,
      attributes: attributes ? attributes : [],
    };
    const uploadMetadataResponse = await uploadMetadataSupabase({
      metadata,
      fileName,
      bucket,
    });
    if (uploadMetadataResponse.error) {
      throw new Error(uploadMetadataResponse.message);
    }
    return apiReturn.success(200, "Metadata uploaded", {
      metadata,
      jsonFile: uploadMetadataResponse.path,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, error.message);
  }
}

export async function updateMetadataInBucket({
  fileName,
  bucket,
  fileContent,
}) {
  try {
    const updateMetadata = await updateMetadataSupabase({
      fileContent,
      fileName,
      bucket,
    });
    if (updateMetadata.error) {
      throw new Error(updateMetadata.error);
    }
    return apiReturn.success(200, "Metadata uploaded", {
      jsonFile: updateMetadata.path,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, error.message);
  }
}
