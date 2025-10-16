#!/bin/bash

# 🚀 Script de déploiement complet pour CoinFlip
# Ce script :
# 1. Compile les contrats
# 2. Génère les ABIs TypeScript
# 3. Met à jour les adresses dans deployedContracts.ts

set -e  # Exit on error

echo "🎲 CoinFlip Deployment Script"
echo "=============================="
echo ""

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "foundry.toml" ]; then
  echo "❌ Error: foundry.toml not found. Are you in the packages/foundry directory?"
  exit 1
fi

# Étape 1 : Compiler
echo "📦 Step 1: Compiling contracts..."
make compile
echo "✅ Contracts compiled"
echo ""

# Étape 2 : Déployer
echo "🚀 Step 2: Deploying contracts..."
echo "⏳ Make sure 'yarn chain' is running in another terminal..."
sleep 2

make deploy
echo "✅ Contracts deployed"
echo ""

# Étape 3 : Générer les ABIs
echo "🔧 Step 3: Generating TypeScript ABIs..."
make generate-abis
echo "✅ ABIs generated"
echo ""

# Étape 4 : Mettre à jour les adresses
echo "🔄 Step 4: Updating deployed contract addresses..."
node scripts-js/updateDeployedContracts.js
echo "✅ Addresses updated"
echo ""

echo "🎉 Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Open a new terminal"
echo "2. cd packages/nextjs"
echo "3. yarn dev"
echo ""
echo "Your app will be ready at http://localhost:3000 🚀"
