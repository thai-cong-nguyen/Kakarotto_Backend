const factoryABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  { type: "fallback", stateMutability: "payable" },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "characterNFT",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "chargeFee",
    inputs: [{ name: "_fee", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createCharacter",
    inputs: [
      { name: "_tokenURI", type: "string", internalType: "string" },
      { name: "_creator", type: "address", internalType: "address" },
      { name: "_createNftSignature", type: "bytes", internalType: "bytes" },
      { name: "rarity", type: "uint256", internalType: "uint256" },
      { name: "power", type: "uint256", internalType: "uint256" },
      { name: "defend", type: "uint256", internalType: "uint256" },
      { name: "agility", type: "uint256", internalType: "uint256" },
      { name: "intelligence", type: "uint256", internalType: "uint256" },
      { name: "luck", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "_account", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createItem",
    inputs: [
      { name: "_creator", type: "address", internalType: "address" },
      { name: "_createNftSignature", type: "bytes", internalType: "bytes" },
      { name: "_tokenId", type: "uint256", internalType: "uint256" },
      { name: "_itemURI", type: "string", internalType: "string" },
      { name: "_value", type: "uint256", internalType: "uint256" },
      { name: "_rarity", type: "uint256", internalType: "uint256" },
      { name: "_attributeCount", type: "uint256", internalType: "uint256" },
      {
        name: "_attributes",
        type: "uint8[]",
        internalType: "enum NFTLibrary.Attribute[]",
      },
      { name: "_values", type: "uint256[]", internalType: "uint256[]" },
      { name: "_isIncreases", type: "bool[]", internalType: "bool[]" },
      { name: "_isPercentss", type: "bool[]", internalType: "bool[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createTreasure",
    inputs: [
      { name: "_creator", type: "address", internalType: "address" },
      { name: "_createNftSignature", type: "bytes", internalType: "bytes" },
      { name: "_tokenId", type: "uint256", internalType: "uint256" },
      { name: "_value", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "fee",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "feeSetter",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "feeToken",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      { name: "_characterNFT", type: "address", internalType: "address" },
      { name: "_itemNFT", type: "address", internalType: "address" },
      { name: "_treasureNFT", type: "address", internalType: "address" },
      { name: "_feeToken", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isInitialized",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "itemNFT",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setCharacterNFT",
    inputs: [
      { name: "_characterNFT", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFeeAddress",
    inputs: [{ name: "_fee", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFeeSetter",
    inputs: [{ name: "_feeSetter", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setItemNFT",
    inputs: [{ name: "_itemNFT", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTreasureNFT",
    inputs: [
      { name: "_treasureNFT", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "treasureNFT",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "NFTCreated",
    inputs: [
      {
        name: "_nftOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_nftAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressEmptyCode",
    inputs: [{ name: "target", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "AddressInsufficientBalance",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
  { type: "error", name: "EnforcedPause", inputs: [] },
  { type: "error", name: "ExpectedPause", inputs: [] },
  { type: "error", name: "FailedInnerCall", inputs: [] },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
  { type: "error", name: "ReentrancyGuardReentrantCall", inputs: [] },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
  },
];

export default factoryABI;
