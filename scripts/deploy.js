// scripts/deploy.js
import hre from "hardhat"; // Hardhat runtime environment

async function main() {
    console.log("🚀 Starting SanaTrack deployment...\n");

    // Get network info
    const network = await hre.ethers.provider.getNetwork();
    console.log("Network:", network.name, "Chain ID:", network.chainId.toString());

    // Get deployer account
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Check deployer balance
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");
    
    // Minimum balance check
    const minimumBalance = hre.ethers.parseEther("0.01");
    if (balance < minimumBalance) {
        console.log("\n❌ Insufficient balance for deployment!");
        console.log("💡 Get free testnet ETH from your faucet.");
        return;
    }

    console.log("\n📋 Deploying SanaTrack contract...");

    // Deploy contract
    const SanaTrack = await hre.ethers.getContractFactory("SanaTrack");
    const sanaTrack = await SanaTrack.deploy();
    
    console.log("⏳ Waiting for deployment...");
    await sanaTrack.waitForDeployment();

    const contractAddress = await sanaTrack.getAddress();
    console.log("\n✅ SanaTrack deployed successfully!");
    console.log("📍 Contract Address:", contractAddress);

    // Explorer link (replace if using BlockDAG testnet)
    console.log("🔗 BlockDAG Explorer (Testnet):", `https://testnet.bdagscan.com/address/${contractAddress}`);
    
    console.log("\n" + "=".repeat(60));
    console.log("🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!");
    console.log("=".repeat(60));
    
    return contractAddress;
}

// Handle deployment
main()
    .then(() => {
        console.log("\n🎯 Ready to integrate with your frontend!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("\n❌ Deployment failed:");
        console.error(error);
        process.exit(1);
    });
