import {
  getTreasuresMetadata,
  getTreasureRarity,
  mintTreasureNFT,
  openTreasureNFT,
  retrieveTreasureMetadata,
} from "../services/treasure.service.js";

const getTreasuresMetadataController = async (req, res) => {
  try {
    const { rarityNumber } = req.query;
    const response = await getTreasuresMetadata({ rarityNumber });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getTreasureRarityController = async (req, res) => {
  try {
    const response = await getTreasureRarity();
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500, "Error fetching treasure rarity");
  }
};

const mintTreasureController = async (req, res) => {
  try {
    const { creator, signature, value, data, tokenId, chainId } = req.body;
    const response = await mintTreasureNFT({
      creator,
      signature,
      value,
      data,
      tokenId,
      chainId,
    });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error minting treasure NFT");
  }
};

const openTreasureController = async (req, res) => {
  try {
    const { creator, signature, value, treasureRarity } = req.body;
    const response = await openTreasureNFT({
      creator,
      signature,
      value,
      treasureRarity,
    });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error opening treasure");
  }
};

const retrieveTreasureMetadataController = async (req, res) => {
  try {
    const { tokenURI } = req.query;
    console.log(tokenURI);
    const response = await retrieveTreasureMetadata({ tokenURI });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export {
  getTreasuresMetadataController,
  getTreasureRarityController,
  mintTreasureController,
  openTreasureController,
  retrieveTreasureMetadataController,
};
