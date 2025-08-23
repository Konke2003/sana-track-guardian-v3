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
      url: "https://primordial.bdagscan.com", 
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1043, // Replace with actual BlockDAG testnet chain ID
      gas: 2100000,
      gasPrice: 8000000000
    },
    
    // BlockDAG Mainnet (for production)
    blockdag_mainnet: {
      url: "https://mainnet-rpc.blockdag.network",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1234, // Replace with actual BlockDAG mainnet chain ID
      gas: 2100000,
      gasPrice: 8000000000
    }
  },
  etherscan: {
    // Add BlockDAG explorer API key when available
    apiKey: {
      blockdag_testnet: "YOUR_BLOCKDAG_EXPLORER_API_KEY"
    }
  }
};