import "dotenv/config";
import characterABI from "../abi/character.abi.js";
import tokenABI from "../abi/token.abi.js";
import vaultABI from "../abi/vault.abi.js";
import itemABI from "../abi/item.abi.js";
import treasureABI from "../abi/treasure.abi.js";
import marketplaceABI from "../abi/marketplace.abi.js";
import erc721BidABI from "../abi/erc721Bid.abi.js";
import erc6551RegistryABI from "../abi/erc6551Registry.abi.js";
import erc6551AccountABI from "../abi/erc6551Account.abi.js";

export const SMART_CONTRACT_ADDRESS = {
  KakarottoToken: {
    1802203764: "0x98a6d9963e9fe07df19cef754669bd422b0d9d49",
    11155111: "0xf81388e8f3fbee04ae95e597f51ffb31aabd92b4",
  },
  KakarottoERC6551Account: {
    1802203764: "0xf2d4c5b67966c3dcf6f52e244ead0e1c504819d9",
    11155111: "0x76cc168987ff4fc3382b3ac8a76864ecb0800b85",
  },
  KakarottoERC6551Registry: {
    1802203764: "0x10fa405976028d804ea39bb4d4768eff101317cf",
    11155111: "0xbd1344242940d08bc23e71adcab5e7c6e9fb300c",
  },
  KakarottoVault: {
    1802203764: "0x4a40af76ba39e5a03aff6b4147de3e5efcaae941",
    11155111: "0xb054a3fa055c5a4df4255c15d18a28008f88d9ba",
  },
  KakarottoItem: {
    1802203764: "0x7dd77c6ad512f240bcdbeb1d502b4a051b25c65c",
    11155111: "0x5d3b399b58aa37bae80dbf7303e46c10e80529a7",
  },
  KakarottoTreasure: {
    1802203764: "0xbb859422541a58b31a15660b5e536ce156b9fc92",
    11155111: "0xCF2CFF39E29Da4C0210b16be7e3E717d04ED9A7E",
  },
  KakarottoCharacter: {
    1802203764: "0xe2553f82a513ede6ec889b53a90a2ce9152c51a9",
    11155111: "0xed4f50ad8898853095203d49b63878d81bfee4d5",
  },
  KakarottoMarketplace: {
    1802203764: "0xc43b9fc4f10c43b8211e7d78275a9a4856447228",
    11155111: "0x50b7210384431eebd54d1b94dbd14a4c13763247",
  },
  ERC721Bid: {
    1802203764: "0x91b41d09c6045c6b93c1477f7a05306f2572a8d8",
    11155111: "0x3713b9a513d62a10686c5af6cb8e4b7c8c36bd5b",
  },
};

export const ABI_CONTRACT = {
  KakarottoToken: tokenABI,
  KakarottoERC6551Account: erc6551AccountABI,
  KakarottoERC6551Registry: erc6551RegistryABI,
  KakarottoVault: vaultABI,
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
