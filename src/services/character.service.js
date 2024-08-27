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
import {
  generateCharacterAttributes,
  generateCharacterMetadata,
  generateCharacterRarity,
} from "../modules/character.module.js";
import { characterAttributeWeight } from "../utils/attribute.util.js";
import axios from "axios";
import { uploadMetadataSupabase } from "../modules/metadata.module.js";
import { token } from "morgan";

const PINATA_KAKAROTTO_CHARACTER_GROUP_CID =
  process.env.PINATA_KAKAROTTO_CHARACTER_GROUP_CID;
const PINATA_CHARACTER_METADATA_GROUP_CID =
  process.env.PINATA_CHARACTER_METADATA_GROUP_CID;

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

const generateAttribute = async ({ rarity }) => {
  try {
    // Generate Attributes
    const seedValue = Math.floor(Math.random() * 100 * Date.now());
    const { power, defend, agility, intelligence, luck } =
      generateCharacterAttributes(characterAttributeWeight, rarity, seedValue);
    return apiReturn.success(200, "Attribute generated", {
      rarityNumber,
      attributes: {
        power,
        defend,
        agility,
        intelligence,
        luck,
      },
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error generating Attribute");
  }
};

const generateCharacter = async ({
  creator,
  createNFTSignature,
  rarityNumber,
  tokenURI,
  networkId,
  attributes,
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

// const generateMetadata = async ({ name, description, image, fileName }) => {
//   try {
//     // Generate Rarity
//     const rarity = generateCharacterRarity();
//     // Generate Attribute
//     const seedValue = Math.floor(Math.random() * 100 * Date.now());
//     const { power, defend, agility, intelligence, luck } =
//       generateCharacterAttributes(characterAttributeWeight, rarity, seedValue);
//     // Generate Metadata
//     const { jsonFile } = generateCharacterMetadata({
//       name,
//       description,
//       image,
//       level: 0,
//       exp: 0,
//       rarity,
//       power,
//       defend,
//       agility,
//       intelligence,
//       luck,
//     });

//     // Upload Metadata to Supabase
//     const uploadMetadataResponse = await uploadMetadataSupabase({
//       jsonFile,
//       fileName: fileName,
//       bucket: "Character",
//     });
//     if (uploadMetadataResponse.error) {
//       throw new Error(uploadMetadataResponse.message);
//     }

//     const tokenURI = uploadMetadataResponse.path;

//     return apiReturn.success(200, "Metadata generated", {
//       tokenURI,
//       traits: {
//         rarity,
//         attributes: {
//           power,
//           defend,
//           agility,
//           intelligence,
//           luck,
//         },
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     return apiReturn.error(400, error.message);
//   }
// };

const mintCharacter = async ({
  creator,
  createNFTSignature,
  networkId,
  tokenURI,
  image,
}) => {
  try {
    // Generate Rarity
    const rarity = generateCharacterRarity();
    // Generate Attribute
    const seedValue = Math.floor(Math.random() * 100 * Date.now());
    const { power, defend, agility, intelligence, luck } =
      generateCharacterAttributes(characterAttributeWeight, rarity, seedValue);
    const traits = {
      rarity,
      attributes: {
        power,
        defend,
        agility,
        intelligence,
        luck,
      },
    };
    // Generate Metadata
    const { jsonFile } = generateCharacterMetadata({
      name: "Kakarotto Character",
      description: "Kakarotto is comming to the world",
      image,
      level: 0,
      exp: 0,
      rarity,
      power,
      defend,
      agility,
      intelligence,
      luck,
    });
    // Upload Metadata to Supabase
    const uploadMetadataResponse = await uploadMetadataSupabase({
      jsonFile,
      fileName: tokenURI,
      bucket: "Character",
    });
    if (uploadMetadataResponse.error) {
      throw new Error(uploadMetadataResponse.message);
    }

    // Generate the Character NFT
    const generateCharacterResponse = await generateCharacter({
      creator,
      createNFTSignature,
      rarityNumber: rarity,
      attributes: traits.attributes,
      tokenURI,
      networkId,
    });
    if (generateCharacterResponse.error) {
      throw new Error(generateCharacterResponse.error.message);
    }

    return apiReturn.success(200, "Character minted", {
      traits,
      response: generateCharacterResponse.data,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, error.message);
  }
};

const retrieveCharacterMetadata = async ({ tokenURI }) => {
  try {
    const { data } = await retrieveTokenURIFromBucket(tokenURI, "Character");
    if (data.error) {
      throw new Error(data.message);
    }
    if (data.publicUrl == null || data.publicUrl == "") {
      throw new Error("Character metadata not found");
    }
    const { data: metadata } = await axios.get(data.publicUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return apiReturn.success(200, "Metadata retrieved", metadata);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error retrieving metadata");
  }
};

const upLevelCharacter = async ({ tokenURI }) => {
  try {
    // Retrieve Metadata
    const { data } = await retrieveTokenURIFromBucket(tokenURI, "Character");
    const { data: metadata } = await axios.get(data.publicUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Update the metadata
    [0, 3, 4, 5, 6, 7].forEach((index) => {
      metadata.attributes[index].value += 1;
    });

    // Replace the existing metadata
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
  mintCharacter,
  retrieveCharacterMetadata,
  upLevelCharacter,
  // generateMetadata,
};
