import { getRandomValueInRange } from "../utils/attribute.util.js";

function generateCharacterAttributes(attributeWeight, rarity, seedValue) {
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
}

export { generateCharacterAttributes };
