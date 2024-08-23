import { rarityPicked, rarityNumbers } from "../utils/rarity.util.js";
import { generateItemAttribute } from "./item.module.js";

const rarityWeights = [
  ["Bronze", 700],
  ["Silver", 500],
  ["Gold", 150],
  ["Platinum", 100],
  ["Diamond", 50],
];

const generateTreasureRarity = () => {
  const rarity = rarityPicked(rarityWeights);
  return rarityNumbers[rarity];
};

const generateItemRarityTreasureOpening = (treasureRarity) => {
  console.log(treasureRarity);
  if (treasureRarity > 4 || treasureRarity == 0) return 0;
  let itemRarity;
  let rarityWeights = [];
  switch (treasureRarity) {
    case 1:
      rarityWeights = [
        ["Bronze", 50],
        ["Silver", 45],
        ["Gold", 5],
      ];
      break;
    case 2:
      rarityWeights = [
        ["Bronze", 10],
        ["Silver", 30],
        ["Gold", 55],
        ["Platinum", 5],
      ];
      break;
    case 3:
      rarityWeights = [
        ["Bronze", 5],
        ["Silver", 15],
        ["Gold", 35],
        ["Platinum", 45],
        ["Diamond", 5],
      ];
      break;
    case 4:
      rarityWeights = [
        ["Bronze", 5],
        ["Silver", 10],
        ["Gold", 25],
        ["Platinum", 35],
        ["Diamond", 25],
      ];
      break;
  }
  itemRarity = rarityPicked(rarityWeights);
  console.log(itemRarity);
  return rarityNumbers[itemRarity];
};

const generateItemAttributeTreasureOpening = (
  itemRarity,
  itemAttributeWeight
) => {
  return generateItemAttribute(itemRarity, itemAttributeWeight);
};

export {
  generateTreasureRarity,
  generateItemRarityTreasureOpening,
  generateItemAttributeTreasureOpening,
};
