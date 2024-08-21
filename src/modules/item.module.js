import {
  getRandomValueInRange,
  itemAttributeWeight,
} from "../utils/attribute.util.js";
import { rarityNumbers } from "../utils/rarity.util.js";

const attributeNumber = ["Power", "Defend", "Agility", "Intelligence", "Luck"];

function getRandomAttributeNumber(quantity) {
  let attributes = [];
  while (attributes.length < quantity) {
    let randomNum = Math.floor(Math.random() * attributeNumber.length);
    if (!attributes.includes(attributeNumber[randomNum])) {
      attributes.push(attributeNumber[randomNum]);
    }
  }
  return attributes;
}

function getRandomIsPercentage(quantity) {
  let result = [];
  while (result.length < quantity) {
    let random = Math.floor(Math.random() * 2);
    result.push(random == 1 ? true : false);
  }
  return result;
}

function getRandomIsIncreases(quantity) {
  let result = [];
  while (result.length < quantity) {
    let random = getRandomValueInRange(0, 2, 2, [0.95, 0.05], Date.now());
    result.push(random == 0 ? false : true);
  }
  return result;
}

function getRandomCharacterAttributeValue(
  count,
  isPercentages,
  attributeWeight
) {
  let result = [];
  for (let i = 0; i < count; i++) {
    if (isPercentages[i]) {
      result.push(
        getRandomValueInRange(
          attributeWeight.percentage.range[0],
          attributeWeight.percentage.range[1],
          attributeWeight.percentage.numOfSegments,
          attributeWeight.percentage.probabilities,
          Math.floor(Math.random() * 100 * Date.now())
        )
      );
    } else {
      result.push(
        getRandomValueInRange(
          attributeWeight.value.range[0],
          attributeWeight.value.range[1],
          attributeWeight.value.numOfSegments,
          attributeWeight.value.probabilities,
          Math.floor(Math.random() * 100 * Date.now())
        )
      );
    }
  }
  return result;
}

function generateItemAttribute(rarity, attributeWeights) {
  let result = {
    count: 0,
    _attributes: [],
    _values: [],
    _isIncreases: [],
    _isPercentages: [],
    rarityNumber: rarity,
  };
  switch (rarity) {
    case 0:
      result.count = 1;
      result._attributes = getRandomAttributeNumber(1);
      result._isPercentages = getRandomIsPercentage(1);
      result._isIncreases = getRandomIsIncreases(1);
      result._values = getRandomCharacterAttributeValue(
        result.count,
        result._isPercentages,
        attributeWeights["Bronze"]
      );
      break;
    case 1:
      result.count = 2;
      result._attributes = getRandomAttributeNumber(2);
      result._isPercentages = getRandomIsPercentage(2);
      result._isIncreases = getRandomIsPercentage(2);
      result._values = getRandomCharacterAttributeValue(
        result.count,
        result._isPercentages,
        attributeWeights["Silver"]
      );
      break;
    case 2:
      result.count = 2;
      result._attributes = getRandomAttributeNumber(2);
      result._isPercentages = getRandomIsPercentage(2);
      result._isIncreases = getRandomIsPercentage(2);
      result._values = getRandomCharacterAttributeValue(
        result.count,
        result._isPercentages,
        attributeWeights["Gold"]
      );
      break;
    case 3:
      result.count = 3;
      result._attributes = getRandomAttributeNumber(3);
      result._isPercentages = getRandomIsPercentage(3);
      result._isIncreases = getRandomIsPercentage(3);
      result._values = getRandomCharacterAttributeValue(
        result.count,
        result._isPercentages,
        attributeWeights["Platinum"]
      );
      break;
    case 4:
      result.count = 4;
      result._attributes = getRandomAttributeNumber(4);
      result._isPercentages = getRandomIsPercentage(4);
      result._isIncreases = getRandomIsPercentage(4);
      result._values = getRandomCharacterAttributeValue(
        result.count,
        result._isPercentages,
        attributeWeights["Diamond"]
      );
      break;
  }
  return result;
}

function generateItemMetadata({ name, description, image }) {
  try {
    // Generate Rarity & Attributes
    const rarity = rarityPicked({
      raritiesWeight: rarityWeight,
    });
    const rarityNumber = rarityNumbers[rarity];
    const attributesData = generateItemAttribute(
      rarityNumber,
      itemAttributeWeight
    );
    let attributesMetadata = [
      {
        trait_type: "Rarity",
        value: rarity,
      },
    ];
    for (let i = 0; i < attributesData.count; i++) {
      attributesMetadata.push({
        display_type: attributesData._isPercentages[i]
          ? "boost_percentage"
          : "boost_number",
        trait_type: attributesData._attributes[i],
        value: attributesData._isIncreases[i]
          ? attributesData._values[i]
          : -attributesData._values[i],
      });
    }
    const metadata = {
      name,
      description,
      image,
      attributes: attributesMetadata,
    };
    return {
      metadata,
      attributesData,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { generateItemAttribute, generateItemMetadata };
