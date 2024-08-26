import { uploadMetadataToSupabase } from "../services/metadata.service.js";

export async function uploadMetadataToSupabaseController(req, res) {
  try {
    const { name, description, image, attributes, fileName, bucket } = req.body;
    const response = await uploadMetadataToSupabase({
      name,
      description,
      image,
      attributes,
      fileName,
      bucket,
    });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response.data);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, error.message);
  }
}
