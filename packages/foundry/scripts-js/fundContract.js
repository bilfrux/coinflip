import { createPublicClient, createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { foundry } from "viem/chains";
import fs from "fs";

const DEPLOYER_PK =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb476cac3f42f3389f3920d0f0fb0"; // Anvil default account
const CONTRACT_ADDRESS = "0xeD1DB453C3156Ff3155a97AD217b3087D5Dc5f6E"; // CoinFlip contract
const FUND_AMOUNT = "1"; // ETH

const account = privateKeyToAccount(DEPLOYER_PK);

const client = createPublicClient({
  chain: foundry,
  transport: http("http://127.0.0.1:8545"),
});

const walletClient = createWalletClient({
  chain: foundry,
  transport: http("http://127.0.0.1:8545"),
  account,
});

async function fundContract() {
  try {
    console.log(`\n💰 Funding CoinFlip contract with ${FUND_AMOUNT} ETH...`);
    console.log(`📍 Contract: ${CONTRACT_ADDRESS}`);
    console.log(`🔑 From: ${account.address}`);

    const hash = await walletClient.sendTransaction({
      to: CONTRACT_ADDRESS,
      value: parseEther(FUND_AMOUNT),
    });

    console.log(`\n⏳ Waiting for transaction confirmation...`);
    const receipt = await client.waitForTransactionReceipt({ hash });

    console.log(`\n✅ Contract funded successfully!`);
    console.log(`📦 Transaction Hash: ${receipt.transactionHash}`);
    console.log(`⛽ Gas Used: ${receipt.gasUsed}`);
    console.log(`\n💵 Contract Balance: ${FUND_AMOUNT} ETH`);
    console.log(`\n✨ Players can now win real ETH!`);
  } catch (error) {
    console.error("❌ Error funding contract:", error.message);
    process.exit(1);
  }
}

fundContract();
