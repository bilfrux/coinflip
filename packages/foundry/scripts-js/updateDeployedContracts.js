#!/usr/bin/env node

/**
 * Script to update deployedContracts.ts with deployed contract addresses
 * Reads from packages/foundry/deployments/31337.json and updates packages/nextjs/contracts/deployedContracts.ts
 */

const fs = require('fs');
const path = require('path');

const deploymentsPath = path.join(
  __dirname,
  '..',
  'foundry',
  'deployments',
  '31337.json'
);

const deployedContractsPath = path.join(
  __dirname,
  '..',
  'nextjs',
  'contracts',
  'deployedContracts.ts'
);

try {
  // Read the deployments file
  if (!fs.existsSync(deploymentsPath)) {
    console.error(`❌ Deployments file not found at: ${deploymentsPath}`);
    console.error('Make sure you ran "yarn deploy" first!');
    process.exit(1);
  }

  const deployments = JSON.parse(fs.readFileSync(deploymentsPath, 'utf8'));
  console.log('✅ Found deployments file');
  console.log('Deployed contracts:', Object.keys(deployments));

  // Read the current deployedContracts.ts
  let deployedContractsContent = fs.readFileSync(deployedContractsPath, 'utf8');

  // Update CoinFlip address if it exists in deployments
  if (deployments.CoinFlip) {
    const coinflipAddress = deployments.CoinFlip;
    console.log(`✅ Found CoinFlip at: ${coinflipAddress}`);

    // Replace the address using a regex
    const addressRegex = /CoinFlip:\s*\{\s*address:\s*"0x[a-fA-F0-9]*"/;
    const replacement = `CoinFlip: {\n      address: "${coinflipAddress}"`;

    if (addressRegex.test(deployedContractsContent)) {
      deployedContractsContent = deployedContractsContent.replace(
        addressRegex,
        replacement
      );
      console.log(`✅ Updated CoinFlip address in deployedContracts.ts`);
    } else {
      console.warn('⚠️  Could not find CoinFlip address pattern to update');
    }
  } else {
    console.warn('⚠️  CoinFlip not found in deployments');
  }

  // Also update YourContract if needed
  if (deployments.YourContract) {
    const yourContractAddress = deployments.YourContract;
    console.log(`✅ Found YourContract at: ${yourContractAddress}`);

    const addressRegex = /YourContract:\s*\{\s*address:\s*"0x[a-fA-F0-9]*"/;
    const replacement = `YourContract: {\n      address: "${yourContractAddress}"`;

    if (addressRegex.test(deployedContractsContent)) {
      deployedContractsContent = deployedContractsContent.replace(
        addressRegex,
        replacement
      );
      console.log(`✅ Updated YourContract address in deployedContracts.ts`);
    }
  }

  // Write back the updated content
  fs.writeFileSync(deployedContractsPath, deployedContractsContent, 'utf8');
  console.log(`✅ Updated deployedContracts.ts`);
  console.log(`\n📝 You can now run: cd packages/nextjs && yarn dev\n`);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
