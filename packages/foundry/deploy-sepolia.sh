#!/bin/bash

# Script to deploy CoinFlip to Sepolia Testnet
# Usage: ./deploy-sepolia.sh

set -e

echo "🔗 Deploying CoinFlip to Sepolia Testnet..."
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "📝 Please create .env with:"
    echo "   INFURA_API_KEY=your_key"
    echo "   PRIVATE_KEY=your_private_key"
    echo "   DEPLOYER_ADDRESS=your_address"
    exit 1
fi

# Load env vars
source .env

# Validate
if [ -z "$INFURA_API_KEY" ]; then
    echo "❌ INFURA_API_KEY not set in .env"
    exit 1
fi

if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ PRIVATE_KEY not set in .env"
    exit 1
fi

echo "🚀 Starting deployment..."
echo "📋 RPC: https://sepolia.infura.io/v3/***"
echo ""

# Deploy with forge
forge create contracts/CoinFlip.sol:CoinFlip \
    --rpc-url "https://sepolia.infura.io/v3/$INFURA_API_KEY" \
    --private-key "$PRIVATE_KEY" \
    --verify \
    --verifier etherscan \
    --constructor-args ""

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Update your frontend config:"
echo "   NEXT_PUBLIC_CONTRACT_ADDRESS=<address from output above>"
echo "   NEXT_PUBLIC_CHAIN_ID=11155111"
echo ""
