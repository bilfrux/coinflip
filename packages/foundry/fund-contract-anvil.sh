#!/bin/bash

# Anvil default account (first pre-funded account - has 10,000 ETH)
ANVIL_PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb476c6b8d6c1f02ae1da1f97f5a0"

# Get contract address from deployments
if [ ! -f "deployments/31337.json" ]; then
    echo "❌ Deployment file not found. Please deploy first with: yarn deploy --network localhost"
    exit 1
fi

CONTRACT_ADDRESS=$(jq -r 'to_entries[] | select(.value == "CoinFlip") | .key' deployments/31337.json)

if [ -z "$CONTRACT_ADDRESS" ] || [ "$CONTRACT_ADDRESS" == "null" ]; then
    echo "❌ CoinFlip address not found in deployments/31337.json"
    exit 1
fi

echo "📋 Contract Address: $CONTRACT_ADDRESS"

# Check current balance using cast
echo "💰 Current contract balance..."
CURRENT_BALANCE=$(cast balance $CONTRACT_ADDRESS --rpc-url http://127.0.0.1:8545)
echo "   Balance: $(cast to-dec $CURRENT_BALANCE) Wei = $(echo "scale=4; $CURRENT_BALANCE / 1000000000000000000" | bc) ETH"

# Send 50 ETH to contract using cast send
echo ""
echo "💸 Sending 50 ETH to contract..."

cast send $CONTRACT_ADDRESS \
    --private-key $ANVIL_PRIVATE_KEY \
    --value 50ether \
    --rpc-url http://127.0.0.1:8545

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Funding successful!"
    
    # Check new balance
    echo "💰 New contract balance..."
    NEW_BALANCE=$(cast balance $CONTRACT_ADDRESS --rpc-url http://127.0.0.1:8545)
    echo "   Balance: $(echo "scale=4; $NEW_BALANCE / 1000000000000000000" | bc) ETH"
else
    echo "❌ Funding failed"
    exit 1
fi
