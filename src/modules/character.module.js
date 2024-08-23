import { rarityPicked, rarityNumbers } from "../utils/rarity.util.js";
import { getRandomValueInRange } from "../utils/attribute.util.js";

export const generateCharacterAttributes = (
  attributeWeight,
  rarity,
  seedValue
) => {
  const power = getRandomValueInRange(
    attributeWeight[rarity].power.range[0],
    attributeWeight[rarity].power.range[1],
    attributeWeight[rarity].power.numOfSegments,
    attributeWeight[rarity].power.probabilities,
    seedValue
  );
  const defend = getRandomValueInRange(
    attributeWeight[rarity].defend.range[0],
    attributeWeight[rarity].defend.range[1],
    attributeWeight[rarity].defend.numOfSegments,
    attributeWeight[rarity].defend.probabilities,
    Math.floor(Math.random() * 100 * Date.now())
  );
  const agility = getRandomValueInRange(
    attributeWeight[rarity].agility.range[0],
    attributeWeight[rarity].agility.range[1],
    attributeWeight[rarity].agility.numOfSegments,
    attributeWeight[rarity].agility.probabilities,
    Math.floor(Math.random() * 100 * Date.now())
  );
  const intelligence = getRandomValueInRange(
    attributeWeight[rarity].intelligence.range[0],
    attributeWeight[rarity].intelligence.range[1],
    attributeWeight[rarity].intelligence.numOfSegments,
    attributeWeight[rarity].intelligence.probabilities,
    Math.floor(Math.random() * 100 * Date.now())
  );
  const luck = getRandomValueInRange(
    attributeWeight[rarity].luck.range[0],
    attributeWeight[rarity].luck.range[1],
    attributeWeight[rarity].luck.numOfSegments,
    attributeWeight[rarity].luck.probabilities,
    Math.floor(Math.random() * 100 * Date.now())
  );
  return {
    power,
    defend,
    agility,
    intelligence,
    luck,
  };
};

export const generateCharacterRarity = (characterRarityWeight) => {
  const rarity = rarityPicked(characterRarityWeight);
  const rarityNumber = rarityNumbers[rarity];
  return rarityNumber;
};

export const generateCharacterMetadata = ({
  name,
  description,
  image,
  level,
  exp,
  rarity,
  power,
  defend,
  agility,
  intelligence,
  luck,
}) => {
  const metadata = {
    name,
    description,
    image,
  };
  metadata.attribute = [
    {
      trait_type: "Level",
      value: level,
    },
    {
      trait_type: "Exp",
      value: exp,
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
  const jsonFile = new Blob([JSON.stringify(metadata)], {
    type: "application/json",
  });

  return {
    metadata,
    jsonFile,
  };
};
