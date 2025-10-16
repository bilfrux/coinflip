# 🎲 CoinFlip - Application Complète

## 📋 Vue d'ensemble

CoinFlip est une application Web3 décentralisée permettant à l'utilisateur de parier de l'ETH sur un lancer de pièce. 

**Mécanique du jeu** :
- 💰 Mettez en place un montant en ETH
- 🎲 Choisissez Heads (👑) ou Tails (🌙)
- 🏆 Gagnez 2x votre mise si vous avez raison, perdez votre mise sinon

---

## 🏗️ Architecture

```
coinflip/
├── packages/
│   ├── foundry/          ← Contrats Solidity & scripts de déploiement
│   │   ├── contracts/
│   │   │   └── CoinFlip.sol
│   │   └── script/
│   │       ├── DeployCoinFlip.s.sol
│   │       └── Deploy.s.sol
│   │
│   └── nextjs/           ← Application web (React + Tailwind)
│       ├── app/
│       │   └── page.tsx   ← Interface CoinFlip
│       └── contracts/
│           ├── CoinFlip.sol
│           └── deployedContracts.ts
```

---

## 🚀 Démarrage rapide

### Prérequis
```bash
# Node.js & Yarn
node --version  # v18+
yarn --version

# Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 3 étapes pour lancer

**Terminal 1** - Démarrer le réseau local
```bash
cd packages/foundry
yarn chain
```

**Terminal 2** - Déployer les contrats
```bash
cd packages/foundry
yarn deploy
```

**Terminal 3** - Lancer l'app web
```bash
cd packages/nextjs
yarn dev
```

Allez sur **http://localhost:3000** 🎉

---

## 📱 Utilisation de l'app

### 1️⃣ Connexion du wallet
- Cliquez sur "Connect Wallet" en haut
- Utilisez MetaMask ou importez une clé Anvil

### 2️⃣ Configuration du pari
```
Montant de pari : [0.01, 0.05, 0.1, 0.5] ETH
Votre choix     : [Heads👑] ou [Tails🌙]
```

### 3️⃣ Lancez !
- Cliquez sur **"🎲 FLIP NOW"**
- La pièce tourne (2 secondes)
- Résultat s'affiche
  - ✅ Victoire = Vous recevez 2x votre mise
  - ❌ Défaite = Vous perdez votre mise

### 📊 Suivi des stats
- **Total Bets** : Nombre total de flips
- **Wins** : Nombre de victoires
- **Win Rate** : Pourcentage de victoires

---

## 🧠 Technologie

### Frontend
- ⚛️ **React 19** + TypeScript
- 🎨 **Tailwind CSS** + daisyUI
- 🔗 **Wagmi** pour l'intégration Web3
- 🪟 **Next.js 15** (Server Components + App Router)

### Backend / Contrats
- 🔷 **Solidity 0.8.20**
- 🔨 **Foundry** pour la compilation et déploiement
- 📦 **Deployed Contracts** pour exposer les ABIs au frontend

### Randomness
- On-chain randomness utilisant `keccak256(abi.encodePacked(...))`
- Suffisant pour le développement (pas recommandé pour la production)
- En production, utiliseriez Chainlink VRF

---

## 💡 Fonctionnalités clés

✅ Interface profesionnelle et responsive
✅ Animations fluides (rotation de pièce)
✅ Gestion des erreurs avec feedback utilisateur
✅ Wallet connect avec support multi-chaîne
✅ Suivi en temps réel des statistiques
✅ Support des montants de pari variables
✅ Design sombre élégant (slate-900 → slate-800)

---

## 🐛 Troubleshooting

| Problème | Solution |
|----------|----------|
| "Contract not deployed" | Lancez `yarn deploy` dans terminal 2 |
| "Connection refused" | Vérifiez que `yarn chain` est actif |
| "Wrong network" | Connectez MetaMask à localhost:8545 |
| Pièce ne tourne pas | Vérifiez la console pour les erreurs |
| Pas de résultat | Attendez 2-3 secondes après le flip |

---

## 📝 Fichiers principaux

- **CoinFlip.sol** - Logique du contrat (randomness on-chain, gestion des paris)
- **page.tsx** - Interface React (animations, formulaire, stats)
- **deployedContracts.ts** - ABI et adresses des contrats
- **DeployCoinFlip.s.sol** - Script Foundry pour déployer

---

## 🎮 Prochaines améliorations

- [ ] Historique des paris (pagination)
- [ ] Classement des joueurs
- [ ] Bonus multiplicateurs
- [ ] Modes de jeu additionnels (Dés, Roulette)
- [ ] Leaderboard on-chain
- [ ] Notifications push

---

## 📄 Licence

MIT

---

**Amusez-vous bien et bonne chance ! 🎲✨**
