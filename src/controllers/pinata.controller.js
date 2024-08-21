import {
  testConnection,
  fetchFile,
  uploadFiles,
  uploadMetadata,
} from "../services/pinata.service.js";
const testConnectionController = async (req, res) => {
  try {
    const response = await testConnection();
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const uploadFilesController = async (req, res) => {
  try {
    const files = req.files;
    const { groupId } = req.body;
    const response = await uploadFiles({
      files,
      groupId,
    });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const uploadMetadataController = async (req, res) => {
  try {
    const { groupId, metadata, fileName } = req.body;
    const response = await uploadMetadata({ groupId, metadata, fileName });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const fetchFileController = async (req, res) => {
  try {
    const { groupId, cid } = req.query;
    const response = await fetchFile({ groupId, cid });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export {
  testConnectionController,
  // fetchFileController,
  // updateMetadataController,
  uploadFilesController,
  uploadMetadataController,
  fetchFileController,
};
