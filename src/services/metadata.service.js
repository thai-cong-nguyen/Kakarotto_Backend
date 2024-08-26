import { uploadMetadataSupabase } from "../modules/metadata.module.js";
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
