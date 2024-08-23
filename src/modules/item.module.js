import {
  getRandomValueInRange,
  itemAttributeWeight,
} from "../utils/attribute.util.js";
import { itemCategories, itemCollections } from "../utils/collections.util.js";
import { rarityNumbers, rarityPicked } from "../utils/rarity.util.js";
import { capitalizeFirstLetter } from "../utils/string.util.js";

const attributeNumber = ["Power", "Defend", "Agility", "Intelligence", "Luck"];

const categoryNumber = [
  "weapon",
  "head",
  "body",
  "long",
  "shoes",
  "shield",
  "ring",
  "necklace",
];

const rarityWeights = [
  ["Bronze", 700],
  ["Silver", 500],
  ["Gold", 150],
  ["Platinum", 100],
  ["Diamond", 50],
];

function generateItemRarity() {
  const rarity = rarityPicked(rarityWeights);
  return rarityNumbers[rarity];
}

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

function getRandomItemAttributeValue(count, isPercentages, attributeWeight) {
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
      result._values = getRandomItemAttributeValue(
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
      result._values = getRandomItemAttributeValue(
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
      result._values = getRandomItemAttributeValue(
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
      result._values = getRandomItemAttributeValue(
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
      result._values = getRandomItemAttributeValue(
        result.count,
        result._isPercentages,
        attributeWeights["Diamond"]
      );
      break;
  }
  return result;
}

function generateItemCategoryAndCollection() {
  const categoryRandom = Math.floor(Math.random() * categoryNumber.length);
  const collectionRandom = Math.floor(
    Math.random() * (itemCollections[categoryNumber[categoryRandom]] + 1)
  );
  let dataResult = { name: "", description: "", tokenURI: "" };
  switch (categoryRandom) {
    case 0:
      const weaponRandom = Math.floor(Math.random() * 1);
      const weaponData = itemCategories.weapon[weaponRandom];
      dataResult.name = weaponData.name;
      dataResult.description = weaponData.description;
      dataResult.tokenURI =
        weaponData.tokenURI +
        (weaponRandom == 0
          ? `Melee_${collectionRandom}.png`
          : weaponRandom == 1
          ? `Bow_${collectionRandom}.png`
          : `Melee_${collectionRandom}.png`);
      break;
    case 6:
      const ringData = itemCategories.ring[0];
      dataResult.name = ringData.name;
      dataResult.description = ringData.description;
      dataResult.tokenURI = ringData.tokenURI + `Ring_${collectionRandom}.png`;
      break;
    case 7:
      const neckLace = itemCategories.necklace[0];
      dataResult.name = neckLace.name;
      dataResult.description = neckLace.description;
      dataResult.tokenURI =
        neckLace.tokenURI + `Necklace_${collectionRandom}.png`;
      break;
    default:
      const defaultData = itemCategories[categoryNumber[categoryRandom]][0];
      dataResult.name = defaultData.name;
      dataResult.description = defaultData.description;
      dataResult.tokenURI =
        defaultData.tokenURI +
        `${capitalizeFirstLetter(
          categoryNumber[categoryRandom]
        )}_${collectionRandom}.png`;
      break;
  }
  return {
    dataResult,
    collection: collectionRandom,
    category: capitalizeFirstLetter(categoryNumber[categoryRandom]),
  };
}

function generateItemMetadata({
  name,
  description,
  image,
  collection,
  category,
  rarity,
  count,
  attributes,
  isPercentages,
  isIncreases,
  values,
}) {
  // Attributes Metadata
  let attributesMetadata = [
    {
      trait_type: "Category",
      value: category,
    },
    {
      trait_type: "Collection",
      value: collection,
    },
    {
      trait_type: "Rarity",
      value: rarity,
    },
  ];

  Array.from({ length: count }, (_, i) => {
    attributesMetadata.push({
      display_type: isPercentages[i] ? "boost_percentage" : "boost_number",
      trait_type: attributes[i],
      value: isIncreases[i] ? values[i] : -values[i],
    });
  });

  const metadata = {
    name,
    description,
    image,
    attributes: attributesMetadata,
  };

  const jsonFile = new Blob([JSON.stringify(metadata)], {
    type: "application/json",
  });

  return {
    metadata,
    jsonFile,
  };
}

export {
  generateItemAttribute,
  generateItemMetadata,
  generateItemCategoryAndCollection,
  generateItemRarity,
};
