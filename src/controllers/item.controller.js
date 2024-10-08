import { mintItem, retrieveItemMetadata } from "../services/item.service.js";

export const mintItemNFTController = async (req, res) => {
  try {
    const { name, description, image, creator, createNFTSignature, networkId } =
      req.body;
    const response = await mintItem({
      name,
      description,
      image,
      creator,
      createNFTSignature,
      networkId,
    });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const retrieveItemMetadataController = async (req, res) => {
  try {
    const { tokenURI } = req.body;
    const response = await retrieveItemMetadata({ tokenURI });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
