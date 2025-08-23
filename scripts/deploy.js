// scripts/deploy.js
import pkg from "ethers";
const { ethers } = pkg;

async function main() {
    console.log("🚀 Starting SanaTrack deployment to Ethereum Sepolia testnet...\n");

    // Get network info
    const network = await ethers.provider.getNetwork();
    console.log("Network:", network.name, "Chain ID:", network.chainId.toString());

    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Check deployer balance
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH");
    
    // Check if we have enough ETH for deployment
    const minimumBalance = ethers.parseEther("0.01"); // 0.01 ETH minimum
    if (balance < minimumBalance) {
        console.log("\n❌ Insufficient balance for deployment!");
        console.log("💡 Get free testnet ETH from: https://sepoliafaucet.com");
        console.log("💡 Or try: https://faucet.sepolia.dev");
        return;
    }

    console.log("\n📋 Deploying SanaTrack contract...");
    
    // Deploy the SanaTrack contract
    const SanaTrack = await ethers.getContractFactory("SanaTrack");
    const sanaTrack = await SanaTrack.deploy();
    
    console.log("⏳ Waiting for deployment...");
    await sanaTrack.waitForDeployment();
    const contractAddress = await sanaTrack.getAddress();

    console.log("\n✅ SanaTrack deployed successfully!");
    console.log("📍 Contract Address:", contractAddress);
    console.log("🔗 Sepolia Etherscan:", `https://sepolia.etherscan.io/address/${contractAddress}`);
    
    console.log("\n" + "=".repeat(60));
    console.log("🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!");
    console.log("=".repeat(60));
    
    return contractAddress;
}

// Handle deployment
main()
    .then((result) => {
        console.log("\n🎯 Ready to integrate with your frontend!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("\n❌ Deployment failed:");
        console.error(error);
        process.exit(1);
    });