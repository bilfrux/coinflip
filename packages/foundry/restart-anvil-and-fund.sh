#!/bin/bash

# Script to restart Anvil and fund the contract

echo "🔄 Restarting Anvil with proper mnemonic..."

# Kill any existing Anvil process
pkill -f "anvil" || true

sleep 1

# Start Anvil with Scaffold-ETH mnemonic (same as used in deployment)
# This ensures the deployer account has funds
MNEMONIC="test test test test test test test test test test test junk"

anvil \
    --mnemonic "$MNEMONIC" \
    --accounts 10 \
    --balance 10000 \
    --port 8545 &

ANVIL_PID=$!
echo "✅ Anvil started with PID: $ANVIL_PID"

# Wait for Anvil to start
sleep 2

echo ""
echo "💰 Funding contract..."

# Get contract address
if [ ! -f "deployments/31337.json" ]; then
    echo "❌ Deployment file not found. Please deploy first."
    kill $ANVIL_PID
    exit 1
fi

CONTRACT_ADDRESS=$(jq -r 'to_entries[] | select(.value == "CoinFlip") | .key' deployments/31337.json)

if [ -z "$CONTRACT_ADDRESS" ] || [ "$CONTRACT_ADDRESS" == "null" ]; then
    echo "❌ CoinFlip address not found"
    kill $ANVIL_PID
    exit 1
fi

echo "📋 Contract: $CONTRACT_ADDRESS"

# Fund with the first Anvil account
ANVIL_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb476c6b8d6c1f02ae1da1f97f5a0"

# Simple transfer using cast
cast send $CONTRACT_ADDRESS \
    --private-key $ANVIL_KEY \
    --value 100ether \
    --rpc-url http://127.0.0.1:8545

echo ""
echo "✅ Done! Anvil is running on port 8545"
echo "📋 Contract funded with 100 ETH"
echo ""
echo "To stop: pkill -f anvil"
