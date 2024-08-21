import "dotenv/config";
import characterABI from "../abi/character.abi.js";
import tokenABI from "../abi/token.abi.js";
import vaultABI from "../abi/vault.abi.js";
import factoryABI from "../abi/factory.abi.js";
import itemABI from "../abi/item.abi.js";
import treasureABI from "../abi/treasure.abi.js";
import marketplaceABI from "../abi/marketplace.abi.js";
import erc721BidABI from "../abi/erc721Bid.abi.js";
import erc6551RegistryABI from "../abi/erc6551Registry.abi.js";
import erc6551AccountABI from "../abi/erc6551Account.abi.js";

export const SMART_CONTRACT_ADDRESS = {
  KakarottoToken: {
    1802203764: "0x98a6d9963e9fe07df19cef754669bd422b0d9d49",
    11155111: "0x23ee389af3a10aee732224e5d6580a151f9cd0dd",
  },
  KakarottoERC6551Account: {
    1802203764: "0xf2d4c5b67966c3dcf6f52e244ead0e1c504819d9",
    11155111: "0x3536b9e171401624e8f9de9f5c8120090b81c3f8",
  },
  KakarottoERC6551Registry: {
    1802203764: "0x10fa405976028d804ea39bb4d4768eff101317cf",
    11155111: "0xa27f4979a9f1bd3ffb22fff0b367ca593534a472",
  },
  KakarottoVault: {
    1802203764: "0x4a40af76ba39e5a03aff6b4147de3e5efcaae941",
    11155111: "0x18712c00ea796d02726162c95ced1fb0150c8b22",
  },
  KakarottoFactory: {
    1802203764: "0xce046e33f9674b18d4645b8ab77a65c679c2dca8",
    11155111: "0xc38e79fac0ec2c3a4942b46cab725a179a7bcf8d",
  },
  KakarottoItem: {
    1802203764: "0x7dd77c6ad512f240bcdbeb1d502b4a051b25c65c",
    11155111: "0x20994a1b0f3aa64fdee575783ba4aa1daa7b14d4",
  },
  KakarottoTreasure: {
    1802203764: "0xbb859422541a58b31a15660b5e536ce156b9fc92",
    11155111: "0x89f34087da5805287d9e192ee3d260c5c44a3748",
  },
  KakarottoCharacter: {
    1802203764: "0xe2553f82a513ede6ec889b53a90a2ce9152c51a9",
    11155111: "0x297276a7d6f89467574c58ae34e34a8c5e15ac3c",
  },
  KakarottoMarketplace: {
    1802203764: "0xc43b9fc4f10c43b8211e7d78275a9a4856447228",
    11155111: "0x3a5fd464fa05da9388b0c0f5fac24ec5329ffe7e",
  },
  ERC721Bid: {
    1802203764: "0x91b41d09c6045c6b93c1477f7a05306f2572a8d8",
    11155111: "0x922ceb9c31cbb84f10826e324222e1d0b3e071d9",
  },
};

export const ABI_CONTRACT = {
  KakarottoToken: tokenABI,
  KakarottoERC6551Account: erc6551AccountABI,
  KakarottoERC6551Registry: erc6551RegistryABI,
  KakarottoVault: vaultABI,
  KakarottoFactory: factoryABI,
  KakarottoItem: itemABI,
  KakarottoTreasure: treasureABI,
  KakarottoCharacter: characterABI,
  KakarottoMarketplace: marketplaceABI,
  ERC721Bid: erc721BidABI,
};

export const PROVIDER = {
  1802203764: process.env.KAKAROT_RPC_URL,
  11155111: process.env.INFURA_RPC_URL,
};

export const NETWORK_ID = {
  KakarotzkEVM: "1802203764",
  Sepolia: "11155111",
};
