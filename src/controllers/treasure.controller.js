import {
  getTreasuresMetadata,
  getTreasureRarity,
  mintTreasureNFT,
  openTreasureNFT,
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
    const response = getTreasureRarity();
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
    const { creator, signature, value, data } = req.body;
    const response = await mintTreasureNFT({
      creator,
      signature,
      value,
      data,
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
    const { creator, signature, value } = req.body;
    const response = await openTreasureNFT({ creator, signature, value });
    return response.error
      ? res.status(response.error.code).json(response.error)
      : res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error opening treasure");
  }
};

export {
  getTreasuresMetadataController,
  getTreasureRarityController,
  mintTreasureController,
  openTreasureController,
};
