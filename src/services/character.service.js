import {
  rarityPicked,
  rarityNumbers,
  rarityWeight,
} from "../utils/rarity.util.js";
import "dotenv/config";
import apiReturn from "../utils/apiReturn.util.js";
import { createNFTCharacter } from "../contracts/character.contract.js";
import { fetchFile, uploadMetadata } from "./pinata.service.js";
import randomInteger from "random-int";
import {
  replaceExistingFileInBucket,
  retrieveTokenURIFromBucket,
  uploadFileToBucket,
} from "../modules/supabase.module.js";
import { generateCharacterAttributes } from "../modules/character.module.js";
import { characterAttributeWeight } from "../utils/attribute.util.js";
import axios from "axios";

const PINATA_KAKAROTTO_CHARACTER_GROUP_CID =
  process.env.PINATA_KAKAROTTO_CHARACTER_GROUP_CID;
const PINATA_CHARACTER_METADATA_GROUP_CID =
  process.env.PINATA_CHARACTER_METADATA_GROUP_CID;
let counter = 0;

const generateImage = async () => {
  try {
    const { data } = await fetchFile({
      groupId: PINATA_KAKAROTTO_CHARACTER_GROUP_CID,
    });
    const filteredData = data.rows.filter(
      (image) =>
        image.ipfs_pin_hash != "QmP9eF7oHBhP4hx2jLWiEoBzprExbKAicCUgEtzFoxH92W"
    );
    const characterImagesCount = filteredData.length;
    const randomNum = randomInteger(0, characterImagesCount - 1);
    const image = filteredData[randomNum];
    return apiReturn.success(200, "Image generated", image.ipfs_pin_hash);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error generating Image");
  }
};

const generateAttribute = async () => {
  try {
    // Generate Rarity & Attributes
    const rarity = rarityPicked({
      raritiesWeight: rarityWeight,
    });
    const rarityNumber = rarityNumbers[rarity];
    const seedValue = Math.floor(Math.random() * 100 * Date.now());
    const { power, defend, agility, intelligence, luck } =
      generateCharacterAttributes(characterAttributeWeight, rarity, seedValue);
    const attributesMetadata = [
      {
        trait_type: "Level",
        value: 0,
      },
      {
        trait_type: "Exp",
        value: 0,
      },
      {
        trait_type: "Rarity",
        value: rarity,
      },
      {
        display_type: "boost_number",
        trait_type: "Power",
        value: power,
      },
      {
        display_type: "boost_number",
        trait_type: "Defend",
        value: defend,
      },
      {
        display_type: "boost_number",
        trait_type: "Agility",
        value: agility,
      },
      {
        display_type: "boost_number",
        trait_type: "Intelligence",
        value: intelligence,
      },
      {
        display_type: "boost_number",
        trait_type: "Luck",
        value: luck,
      },
    ];
    return apiReturn.success(200, "Attribute generated", {
      rarityNumber,
      attributes: {
        power,
        defend,
        agility,
        intelligence,
        luck,
      },
      attributesMetadata,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error generating Attribute");
  }
};

const generateMetadata = async ({ name, description, image }) => {
  try {
    const { data: attributesData } = await generateAttribute();
    const metadata = {
      name,
      description,
      image,
      attributes: attributesData.attributesMetadata,
    };
    const jsonFile = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    const uploadMetadataToSupabase = await uploadFileToBucket(
      "character_" + Date.now(),
      "Character",
      jsonFile
    );
    if (uploadMetadataToSupabase.error) {
      throw new Error(uploadMetadataToSupabase.error.message);
    }
    return apiReturn.success(200, "Metadata generated", {
      supabase: uploadMetadataToSupabase.data,
      metadata,
      attributesData,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, error.message);
  }
};

const generateCharacter = async ({
  creator,
  createNFTSignature,
  rarityNumber,
  attributes,
  tokenURI,
  networkId,
}) => {
  try {
    const txResponse = await createNFTCharacter({
      tokenURI,
      creator,
      createNFTSignature,
      rarityNumber,
      attributes,
      networkId,
    });
    console.log(txResponse);
    const result = {
      tokenURI,
      status: txResponse.status,
      account: txResponse.logs[3].args[3],
      txHash: txResponse.hash,
      attributes,
      rarityNumber,
    };
    return apiReturn.success(200, "Character generated", result);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error generating Character");
  }
};

const mintCharacter = async ({
  name,
  description,
  image,
  creator,
  createNFTSignature,
  networkId,
}) => {
  try {
    const { data: metadataData, error: metadataError } = await generateMetadata(
      {
        name,
        description,
        image,
      }
    );
    if (metadataError) {
      throw new Error(metadataError.message);
    }
    const generateCharacterResponse = await generateCharacter({
      creator,
      createNFTSignature,
      rarityNumber: metadataData.attributesData.rarityNumber,
      attributes: metadataData.attributesData.attributes,
      tokenURI: metadataData.supabase.path,
      networkId,
    });
    if (generateCharacterResponse.error) {
      throw new Error(generateCharacterResponse.error.message);
    }
    return apiReturn.success(200, "Character minted", {
      metadata: metadataData,
      character: generateCharacterResponse.data,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, error.message);
  }
};

const retrieveMetadata = async ({ tokenURI }) => {
  try {
    const { data } = await retrieveTokenURIFromBucket(tokenURI, "Character");
    console.log(data);
    return apiReturn.success(200, "Metadata retrieved", data);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error retrieving metadata");
  }
};

const upLevelCharacter = async ({ tokenURI }) => {
  try {
    const { data } = await retrieveTokenURIFromBucket(tokenURI, "Character");
    const { data: metadata } = await axios.get(data.publicUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    metadata.attributes[0].value += 1;
    for (let i = 3; i < metadata.attributes.length; i++) {
      metadata.attributes[i].value += 1;
    }
    const jsonFile = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    const replaceMetadata = await replaceExistingFileInBucket(
      tokenURI,
      "Character",
      jsonFile
    );
    if (replaceMetadata.error) {
      throw new Error(replaceMetadata.error.message);
    }
    return apiReturn.success(200, "Metadata up level", {
      supabase: replaceMetadata.data,
      metadata,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error up level character");
  }
};

export {
  generateCharacter,
  generateImage,
  generateAttribute,
  generateMetadata,
  mintCharacter,
  retrieveMetadata,
  upLevelCharacter,
};
