import {
  generateCharacter,
  generateImage,
  generateAttribute,
  generateMetadata,
  mintCharacter,
  retrieveMetadata,
  upLevelCharacter,
} from "../services/character.service.js";

const generateCharacterController = async (req, res) => {
  try {
    const {
      creator,
      createNFTSignature,
      rarityNumber,
      attributes,
      tokenURI,
      networkId,
    } = req.body;
    const response = await generateCharacter({
      creator,
      createNFTSignature,
      rarityNumber,
      attributes,
      tokenURI,
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

const generateImageController = async (req, res) => {
  try {
    const response = await generateImage();
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const generateAttributeController = async (req, res) => {
  try {
    const response = await generateAttribute();
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const generateMetadataController = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const response = await generateMetadata({
      name,
      description,
      image,
    });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const mintNFTCharacterController = async (req, res) => {
  try {
    const { name, description, image, creator, createNFTSignature, networkId } =
      req.body;
    const response = await mintCharacter({
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

const retrieveMetadataController = async (req, res) => {
  try {
    const { tokenURI } = req.query;
    const response = await retrieveMetadata({ tokenURI });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const upLevelCharacterController = async (req, res) => {
  try {
    const { tokenURI } = req.query;
    const response = await upLevelCharacter({ tokenURI });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export {
  generateCharacterController,
  generateImageController,
  generateAttributeController,
  generateMetadataController,
  mintNFTCharacterController,
  retrieveMetadataController,
  upLevelCharacterController,
};
