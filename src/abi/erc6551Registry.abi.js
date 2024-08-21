const erc6551RegistryABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_implementation", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "account",
    inputs: [
      { name: "_implementation", type: "address", internalType: "address" },
      { name: "_salt", type: "bytes32", internalType: "bytes32" },
      { name: "_chainId", type: "uint256", internalType: "uint256" },
      { name: "_tokenContract", type: "address", internalType: "address" },
      { name: "_tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "accounts",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createAccount",
    inputs: [
      { name: "_implementation", type: "address", internalType: "address" },
      { name: "_salt", type: "bytes32", internalType: "bytes32" },
      { name: "_chainId", type: "uint256", internalType: "uint256" },
      { name: "_tokenContract", type: "address", internalType: "address" },
      { name: "_tokenId", type: "uint256", internalType: "uint256" },
      { name: "_initData", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "implementation",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "ERC6551AccountCreated",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "implementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "salt",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "chainId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokenContract",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "AccountCreationFailed", inputs: [] },
  { type: "error", name: "Create2EmptyBytecode", inputs: [] },
  { type: "error", name: "Create2FailedDeployment", inputs: [] },
  {
    type: "error",
    name: "Create2InsufficientBalance",
    inputs: [
      { name: "balance", type: "uint256", internalType: "uint256" },
      { name: "needed", type: "uint256", internalType: "uint256" },
    ],
  },
];

export default erc6551RegistryABI;
