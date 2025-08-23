require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    // Local development
    hardhat: {},
    
    // BlockDAG Testnet
    blockdag_testnet: {
      url: "https://rpc.primordial.bdagscan.com/", 
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1043, // Replace with actual BlockDAG testnet chain ID
    },
    
  },
  etherscan: {
    // Add BlockDAG explorer API key when available
    apiKey: {
      blockdag_testnet: "YOUR_BLOCKDAG_EXPLORER_API_KEY"
    }
  }
};