import { uploadFileToBucket } from "./supabase.module.js";

export const uploadMetadataSupabase = async ({
  metadata,
  fileName,
  bucket,
}) => {
  try {
    const jsonFile = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    const uploadMetadataToSupabase = await uploadFileToBucket(
      fileName,
      bucket,
      jsonFile
    );
    if (uploadMetadataToSupabase.error) {
      throw new Error(uploadMetadataToSupabase.error.message);
    }
    return uploadMetadataToSupabase.data;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error.message,
    };
  }
};
