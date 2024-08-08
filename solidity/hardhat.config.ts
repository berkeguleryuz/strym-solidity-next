require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const privateKey = fs.readFileSync("secrete.txt").toString();
const apiKey = fs.readFileSync("apiKey.txt").toString();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 4202,
    },
    sepolia: {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [privateKey],
      gasPrice: 1000000000,
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: [privateKey],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey],
    },
    matic: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/2bGIFu-iEnl9RvAOTe1ddZI2gBnuYQGS",
      accounts: [privateKey],
    },
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: [apiKey],
    },

    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
      {
        network: "goerli",
        chainId: 5,
        urls: {
          apiURL: "https://api-goerli.etherscan.io/api",
          browserURL: "https://goerli.etherscan.io",
        },
      },
      {
        network: "scroll",
        chainId: 534352,
        urls: {
          apiURL: "https://api.scrollscan.com/api",
          browserURL: "https://scrollscan.com/",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};