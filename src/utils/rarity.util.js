import { Picker } from "pick-random-weighted";

const picker = new Picker();

const rarityNumbers = {
  Bronze: 0,
  Silver: 1,
  Gold: 2,
  Platinum: 3,
  Diamond: 4,
};

const rarityWeight = [
  ["Bronze", 500],
  ["Silver", 300],
  ["Gold", 150],
  ["Platinum", 50],
  ["Diamond", 10],
];

const rarityPicked = ({ raritiesWeight }) => {
  const rarities = picker.pick(raritiesWeight);
  return rarities ? rarities : "bronze";
};

export { rarityPicked, rarityNumbers, rarityWeight };
