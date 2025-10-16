# 🎲 CoinFlip Elite - Web3 DApp

Un jeu de pile ou face décentralisé sur blockchain utilisant **Solidity** et **React**.

## ✨ Fonctionnalités

- 🎰 **Jeu de pièce** : Pariez sur Heads ou Tails
- 🏆 **Gains 2x** : Doublez votre mise si vous gagnez
- 📊 **Statistiques en temps réel** : Tracez vos victoires et taux de succès
- 💰 **Support Anvil** : Testez localement avec Anvil (ou Sepolia)
- 🎨 **UI Professional** : Dark theme moderne avec animations 3D

## 🏗️ Architecture

```
coinflip/
├── packages/
│   ├── foundry/          # Contrats Solidity + Scripts de déploiement
│   │   ├── contracts/
│   │   │   └── CoinFlip.sol
│   │   └── scripts/
│   │       └── Deploy.s.sol
│   └── nextjs/           # Frontend React
│       ├── app/
│       │   └── page.tsx  (Interface principale)
│       ├── components/   (Composants réutilisables)
│       └── contracts/
│           └── deployedContracts.ts (Métadonnées)
```

## 🚀 Démarrage Rapide

### Prérequis
- Node.js v18+
- Yarn ou npm
- Foundry (forge)
- MetaMask (optionnel, pour Sepolia)

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/VOTRE_USERNAME/coinflip.git
cd coinflip

# 2. Installer les dépendances
yarn install

# 3. Compiler les contrats
cd packages/foundry
forge build
cd ../..

# 4. Lancer les 3 terminaux
# Terminal 1 : Blockchain locale
cd packages/foundry && yarn chain

# Terminal 2 : Déployer le contrat
cd packages/foundry && yarn deploy --keystore scaffold-eth-default --network localhost

# Terminal 3 : Frontend
cd packages/nextjs && yarn dev
```

### Accéder à l'application
- 🌐 http://localhost:3000
- RPC Anvil : http://127.0.0.1:8545
- Chain ID : 31337

### Ajouter Anvil dans MetaMask
1. Ouvrez MetaMask → Réseaux
2. **Ajouter un réseau personnalisé** :
   - **Network Name** : Anvil
   - **RPC URL** : http://127.0.0.1:8545
   - **Chain ID** : 31337
   - **Currency** : ETH

## 📋 Smart Contract

### CoinFlip.sol
**Adresse déployée** (local) : Voir `packages/nextjs/contracts/deployedContracts.ts`

**Fonctions principales** :
```solidity
// Lancer un pari
function flipCoin(bool playerChoice) external payable returns (uint256 requestId)

// Récupérer les informations du pari
function getBetInfo(uint256 requestId) external view returns (BetInfo memory)

// Récupérer le résultat du dernier pari
function getResult(address player) external view returns (bool, bool, bool, uint256)
```

**Mécaniques** :
- Randomness on-chain via `keccak256(abi.encodePacked(...))`
- Stockage des paris en mapping
- Émission d'événements pour tracking front-end

## 🎮 Utilisation

1. **Connectez votre portefeuille** dans MetaMask
2. **Entrez un montant** (ex: 0.01 ETH)
3. **Choisissez** Heads (👑) ou Tails (🌙)
4. **Cliquez** "FLIP NOW"
5. **Attendez** le résultat (2 sec d'animation)
6. **Consultez** vos statistiques

## 📦 Stack Technologique

### Frontend
- React 19
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + daisyUI
- Wagmi v2 (Web3)
- Viem (Ethereum Library)

### Smart Contract
- Solidity ^0.8.20
- Foundry (forge)
- OpenZeppelin Libraries

### Local Development
- Anvil (Foundry's EVM)
- Hardhat (optional)

## 🧪 Tests

```bash
# Compiler les contrats
cd packages/foundry && forge build

# Lancer les tests (si implémentés)
forge test

# Lancer le linter Solidity
forge fmt --check
```

## 📚 Documentation

- [START.md](./START.md) - Guide de démarrage ultra-rapide (5 min)
- [INSTALL.md](./INSTALL.md) - Installation complète pas à pas
- [SOLUTION.md](./SOLUTION.md) - Architecture et solutions techniques
- [DEPLOYMENT.md](./packages/foundry/DEPLOYMENT.md) - Guide de déploiement

## 🐛 Troubleshooting

### ❌ "Contract not deployed"
**Solution** : Assurez-vous que le Terminal 2 (yarn deploy) a été exécuté

### ❌ "Connection refused (port 3000)"
**Solution** : Lancez `yarn dev` dans `packages/nextjs`

### ❌ "Address already in use (8545)"
**Solution** : Anvil tourne déjà → Tuez le processus `lsof -ti:8545 | xargs kill -9`

Voir [FIX_CONTRACT_ERROR.md](./FIX_CONTRACT_ERROR.md) pour plus de détails.

## 🚀 Déploiement en Production

### Sur Sepolia Testnet
```bash
cd packages/foundry
yarn deploy --network sepolia
```

### Sur Mainnet (⚠️ Réel)
```bash
yarn deploy --network mainnet  # ⚠️ ATTENTION: Gas réel!
```

## 📄 License

MIT - Libre d'utilisation

## 👤 Auteur

**Florian** - ESILV A3

## 🙏 Remerciements

- [Scaffold-ETH](https://scaffoldeth.io/) - Framework de base
- [Foundry](https://book.getfoundry.sh/) - Outils Solidity
- [OpenZeppelin](https://docs.openzeppelin.com/) - Librairies de contrats

---

**Questions ?** Ouvrez une issue GitHub 👉
