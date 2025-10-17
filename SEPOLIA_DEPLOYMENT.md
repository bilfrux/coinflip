# 🚀 Guide de Déploiement sur Sepolia Testnet

## Étape 1 : Obtenir les API Keys gratuits

### Infura API Key
1. Va sur https://infura.io
2. Crée un compte gratuit
3. Crée un nouveau projet
4. Copie ton Infura API Key

### MetaMask
- Installe MetaMask si ce n'est pas fait
- Ajoute Sepolia à tes réseaux (settings → Networks → Add Network)
- Obtiens des tokens Sepolia gratuits sur https://sepoliafaucet.com

## Étape 2 : Déployer le contrat sur Sepolia

```bash
cd packages/foundry

# Configure ton déploiement pour Sepolia
export SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_INFURA_KEY"
export PRIVATE_KEY="YOUR_PRIVATE_KEY"

# Déploie le contrat
forge create contracts/CoinFlip.sol:CoinFlip \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY
```

**Important** : Sauvegarde l'adresse du contrat déployée (ex: `0x...`)

## Étape 3 : Mettre à jour les configs

### Local (.env.local)
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Ton adresse Sepolia
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_NETWORK_NAME=sepolia
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

### Production (.env.production)
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Ton adresse Sepolia
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_NETWORK_NAME=sepolia
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

### scaffold.config.ts
Déjà configuré pour détecter l'environnement automatiquement ✅

## Étape 4 : Tester localement

```bash
cd packages/nextjs
yarn dev
# Visite http://localhost:3000
# Connecte ton MetaMask à Sepolia
# Teste un flip avec quelques tokens Sepolia
```

## Étape 5 : Déployer sur Vercel

1. Git commit et push :
```bash
git add .
git commit -m "Deploy to Sepolia"
git push origin main
```

2. Va sur https://vercel.com/dashboard
3. Vercel va auto-détecter les changements
4. Ajoute les env vars dans les settings de Vercel:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_INFURA_API_KEY`
5. Vercel redéploie automatiquement

## 🎉 Voilà !

Ton app est maintenant sur Sepolia (testnet gratuit) et déployée sur Vercel !

### Prochaines étapes (optionnel)
- Déployer sur Mainnet (coûte en gas réel)
- Ajouter une UI pour afficher les transactions
- Ajouter un leaderboard

## 🆘 Troubleshooting

**"Cannot connect to provider"**
→ Vérifie que `NEXT_PUBLIC_INFURA_API_KEY` est configuré

**"Contract not found"**
→ Vérifie que `NEXT_PUBLIC_CONTRACT_ADDRESS` est la bonne adresse Sepolia

**"Transaction failed: insufficient balance"**
→ Obtiens plus de tokens Sepolia sur https://sepoliafaucet.com

**"MetaMask: Network is not added"**
→ Ajoute Sepolia manuellement dans MetaMask (ID: 11155111)
