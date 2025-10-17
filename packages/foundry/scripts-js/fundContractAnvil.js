#!/usr/bin/env node

const { createPublicClient, createWalletClient, http, parseEther } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");

// Anvil default private key
const ANVIL_PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb476c6b8d6c1f02ae1da1f97f5a0";

async function fundContract() {
  try {
    // Setup clients
    const publicClient = createPublicClient({
      chain: {
        id: 31337,
        name: "Anvil",
        network: "anvil",
        nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
        rpcUrls: {
          default: { http: ["http://127.0.0.1:8545"] },
        },
      },
      transport: http("http://127.0.0.1:8545"),
    });

    const account = privateKeyToAccount(ANVIL_PRIVATE_KEY);
    const walletClient = createWalletClient({
      chain: {
        id: 31337,
        name: "Anvil",
        network: "anvil",
        nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
        rpcUrls: {
          default: { http: ["http://127.0.0.1:8545"] },
        },
      },
      transport: http("http://127.0.0.1:8545"),
      account,
    });

    // Get contract address from deployedContracts.ts
    let contractAddress;
    try {
      const deployedContracts = require("../../nextjs/contracts/deployedContracts.ts");
      // This won't work directly, so we'll read it differently
    } catch (e) {
      console.log("Reading contract address from deployments file...");
    }

    // Read from deployments JSON file instead
    const fs = require("fs");
    const deploymentPath = "./deployments/31337.json";

    if (!fs.existsSync(deploymentPath)) {
      console.error("❌ Deployment file not found at:", deploymentPath);
      console.error("Please deploy the contract first with: yarn deploy --network localhost");
      process.exit(1);
    }

    const deploymentData = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
    contractAddress = deploymentData.CoinFlip;

    if (!contractAddress) {
      console.error("❌ CoinFlip contract address not found in deployment file");
      process.exit(1);
    }

    console.log("📋 Contract Address:", contractAddress);

    // Check current balance
    const currentBalance = await publicClient.getBalance({ address: contractAddress });
    console.log(`💰 Current contract balance: ${currentBalance / BigInt(10 ** 18)} ETH`);

    // Fund the contract with 10 ETH
    const fundAmount = parseEther("10");

    console.log(`\n💸 Sending 10 ETH to contract...`);

    const txHash = await walletClient.sendTransaction({
      account,
      to: contractAddress,
      value: fundAmount,
    });

    console.log("📤 Transaction hash:", txHash);

    // Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

    if (receipt.status === "success") {
      const newBalance = await publicClient.getBalance({ address: contractAddress });
      console.log(`\n✅ Contract funded successfully!`);
      console.log(`💰 New contract balance: ${newBalance / BigInt(10 ** 18)} ETH`);
    } else {
      console.error("❌ Transaction failed");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error funding contract:", error.message);
    process.exit(1);
  }
}

fundContract();
