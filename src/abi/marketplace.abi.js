const marketplaceABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_feeToken", type: "address", internalType: "address" },
      { name: "_feePercentage", type: "uint256", internalType: "uint256" },
      {
        name: "_publicationFeeInWei",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ERC721_Interface",
    inputs: [],
    outputs: [{ name: "", type: "bytes4", internalType: "bytes4" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "IS_CONTRACT",
    inputs: [],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "PRECISION",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "THRESHOLD_ORDER",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "cancelOrder",
    inputs: [
      { name: "_nftAddress", type: "address", internalType: "address" },
      { name: "_assetId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct MarketplaceLibrary.Order",
        components: [
          { name: "id", type: "bytes32", internalType: "bytes32" },
          { name: "seller", type: "address", internalType: "address" },
          { name: "nftAddress", type: "address", internalType: "address" },
          { name: "priceInWei", type: "uint256", internalType: "uint256" },
          { name: "expiresAt", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createOrder",
    inputs: [
      { name: "_nftAddress", type: "address", internalType: "address" },
      { name: "_assetId", type: "uint256", internalType: "uint256" },
      { name: "priceInWei", type: "uint256", internalType: "uint256" },
      { name: "expiresAt", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "executeOrder",
    inputs: [
      { name: "_nftAddress", type: "address", internalType: "address" },
      { name: "_assetId", type: "uint256", internalType: "uint256" },
      { name: "_price", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct MarketplaceLibrary.Order",
        components: [
          { name: "id", type: "bytes32", internalType: "bytes32" },
          { name: "seller", type: "address", internalType: "address" },
          { name: "nftAddress", type: "address", internalType: "address" },
          { name: "priceInWei", type: "uint256", internalType: "uint256" },
          { name: "expiresAt", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "feeCollector",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "feePercentage",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "feeToken",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IERC20" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "orderByAssetId",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "id", type: "bytes32", internalType: "bytes32" },
      { name: "seller", type: "address", internalType: "address" },
      { name: "nftAddress", type: "address", internalType: "address" },
      { name: "priceInWei", type: "uint256", internalType: "uint256" },
      { name: "expiresAt", type: "uint256", internalType: "uint256" },
    ],
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
    name: "publicationFeeInWei",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
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
    name: "setFeeCollector",
    inputs: [
      { name: "_feeCollector", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFeePercentage",
    inputs: [
      { name: "_feePercentage", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPublicationFee",
    inputs: [
      { name: "_publicationFee", type: "uint256", internalType: "uint256" },
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
    type: "event",
    name: "ChangeFeeCollector",
    inputs: [
      {
        name: "feeCollector",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ChangeFeePercentage",
    inputs: [
      {
        name: "feePercentage",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ChangePublicationFee",
    inputs: [
      {
        name: "publicationFeeInWei",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OrderCancelled",
    inputs: [
      { name: "id", type: "bytes32", indexed: false, internalType: "bytes32" },
      {
        name: "assetId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "seller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nftAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OrderCreated",
    inputs: [
      { name: "id", type: "bytes32", indexed: false, internalType: "bytes32" },
      {
        name: "assetId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "seller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nftAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "priceInWei",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "expiresAt",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OrderSuccessful",
    inputs: [
      { name: "id", type: "bytes32", indexed: false, internalType: "bytes32" },
      {
        name: "assetId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "seller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "buyer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nftAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "totalPrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
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
  { type: "error", name: "EnforcedPause", inputs: [] },
  { type: "error", name: "ExpectedPause", inputs: [] },
  { type: "error", name: "FailedInnerCall", inputs: [] },
  { type: "error", name: "MathOverflowedMulDiv", inputs: [] },
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
];

export default marketplaceABI;
