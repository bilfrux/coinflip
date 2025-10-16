# 🚀 Déploiement sur Vercel

## Prérequis
- Compte GitHub avec le repo `coinflip` pushé
- Compte Vercel (https://vercel.com)
- Node.js 18+ installé localement

## Étapes de déploiement

### 1. Push les derniers changements sur GitHub
```bash
git add .
git commit -m "feat: Add 3D coin visual, real ETH transfers, and Vercel config"
git push origin main
```

### 2. Connecter Vercel à GitHub
1. Accède à https://vercel.com/dashboard
2. Clique sur "Add New" → "Project"
3. Sélectionne "Import Git Repository"
4. Cherche et sélectionne `coinflip`
5. Clique sur "Import"

### 3. Configurer le projet Vercel

#### Paramètres du Build
- **Framework**: Next.js
- **Build Command**: `cd packages/nextjs && yarn build`
- **Output Directory**: `packages/nextjs/.next`
- **Install Command**: `yarn install`

#### Variables d'environnement
Ajoute ces variables dans "Environment Variables":

```
NEXT_PUBLIC_CONTRACT_ADDRESS=0xeD1DB453C3156Ff3155a97AD217b3087D5Dc5f6E
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

### 4. Déployer
Clique sur "Deploy" - Vercel construira et hébergera automatiquement

## Pour déployer sur Sepolia Testnet (recommandé avant mainnet)

1. Crée un nouveau contrat sur Sepolia
2. Mets à jour `NEXT_PUBLIC_CONTRACT_ADDRESS` avec la nouvelle adresse
3. Ajoute `NEXT_PUBLIC_CHAIN_ID=11155111` pour Sepolia
4. Re-déploie sur Vercel

## Pour le mainnet (production)
- Utilise Infura ou Alchemy pour l'accès RPC
- Mets à jour `NEXT_PUBLIC_CHAIN_ID=1`
- Teste d'abord sur Sepolia !

## Troubleshooting

**Build échoue?**
- Vérifie que `yarn install` marche localement
- Vérifie les variables d'environnement

**Application ne se connecte pas au contrat?**
- Confirme que `NEXT_PUBLIC_CONTRACT_ADDRESS` est correct
- Vérifie que le RPC endpoint est accessible
- Teste localement d'abord avec Anvil
