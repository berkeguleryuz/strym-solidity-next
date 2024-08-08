// require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-verify");

// const dotenv = require("dotenv");
// dotenv.config();

// function privateKey() {
//   return process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];
// }

// function apiKey() {
//   return process.env.API_KEY !== undefined ? [process.env.API_KEY] : [];
// }
// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   networks: {
//     mumbai: {
//       // url: "https://polygon-mumbai-pokt.nodies.app",
//       url: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
//       accounts: privateKey(),
//     },
//     sepolia: {
//       url: "https://rpc2.sepolia.org",
//       accounts: privateKey(),
//     },
//     scrollSepolia: {
//       url: "https://sepolia-rpc.scroll.io",
//       accounts: privateKey(),
//     },
//     base: {
//       url: "https://mainnet.base.org",
//       accounts: privateKey(),
//     },
//     baseSepolia: {
//       url: "https://sepolia.base.org",
//       accounts: privateKey(),
//     },
//     scroll: {
//       url: "https://rpc.scroll.io/",
//       accounts: privateKey(),
//     },
//   },
//   solidity: {
//     version: "0.8.24",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 1000,
//       },
//     },
//   },
//   etherscan: {
//     apiKey: {
//       scroll: apiKey(),
//     },

//     customChains: [
//       {
//         network: "sepolia",
//         chainId: 11155111,
//         urls: {
//           apiURL: "https://api-sepolia.etherscan.io/api",
//           browserURL: "https://sepolia.etherscan.io",
//         },
//       },
//       {
//         network: "scrollSepolia",
//         chainId: 534351,
//         urls: {
//           apiURL: "https://api-sepolia.scrollscan.com/api",
//           browserURL: "https://sepolia.scrollscan.com/",
//         },
//       },
//       {
//         network: "goerli",
//         chainId: 5,
//         urls: {
//           apiURL: "https://api-goerli.etherscan.io/api",
//           browserURL: "https://goerli.etherscan.io",
//         },
//       },
//       {
//         network: "scroll",
//         chainId: 534352,
//         urls: {
//           apiURL: "https://api.scrollscan.com/api",
//           browserURL: "https://scrollscan.com/",
//         },
//       },
//     ],
//   },
//   sourcify: {
//     enabled: true,
//   },
// };
