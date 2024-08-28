import {
  replaceExistingFileInBucket,
  uploadFileToBucket,
} from "./supabase.module.js";

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

export const updateMetadataSupabase = async ({
  fileName,
  bucket,
  fileContent,
}) => {
  try {
    const jsonFile = new Blob([JSON.stringify(fileContent)], {
      type: "application/json",
    });
    const updateResponse = await replaceExistingFileInBucket(
      fileName,
      bucket,
      jsonFile
    );
    if (updateResponse.error) {
      throw new Error(updateResponse.error);
    }
    return updateResponse.data;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error.message,
    };
  }
};
