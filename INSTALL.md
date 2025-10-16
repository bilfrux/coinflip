# 🎲 CoinFlip - Configuration complète

## 📋 Prérequis

```bash
# Node.js 18+
node --version

# Yarn
yarn --version

# Foundry (anvil + forge)
forge --version
```

Si Foundry n'est pas installé :
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

---

## 🚀 Installation

### 1. Cloner et installer les dépendances

```bash
# Cloner le repo (si ce n'est pas déjà fait)
git clone <repo-url> coinflip
cd coinflip

# Installer les dépendances
yarn install

# Installer les dépendances Foundry
cd packages/foundry && yarn install && cd ../..
```

### 2. Setup des clés Anvil

```bash
cd packages/foundry
make setup-anvil-wallet
```

---

## ⚡ Lancement (3 terminaux)

### Terminal 1 - Réseau local
```bash
cd packages/foundry
yarn chain
```

Sortie attendue :
```
Starting JSON-RPC server at http://127.0.0.1:8545
Listening on 127.0.0.1:8545
Account #0: 0x1234567890123456789012345678901234567890 (10000 ETH)
```

**⚠️ NE PAS FERMER CE TERMINAL !**

---

### Terminal 2 - Déploiement

```bash
cd packages/foundry
yarn deploy
```

**Attendez que le Terminal 1 affiche "Listening" avant cette étape !**

Sortie attendue :
```
Deploying script...
[⠢] Compiling...
Solc 0.8.30 finished in 200ms
[⠢] Simulating transaction...
[✓] Transaction simulated

Cast the following transactions to deploy your contract:
YourContract deployed at: 0xabc123...
CoinFlip deployed at: 0xdef456...
```

**📌 NOTEZ L'ADRESSE CoinFlip !**

Ensuite, mettez à jour l'adresse automatiquement :
```bash
node scripts-js/updateDeployedContracts.js
```

---

### Terminal 3 - Application web

```bash
cd packages/nextjs
yarn dev
```

Accédez à : **http://localhost:3000** 🎉

---

## 🔗 Connexion du Wallet

### Option 1 : MetaMask (recommandé)

1. Installez l'extension MetaMask
2. Cliquez sur le coin en haut à droite
3. **Add Network** avec ces paramètres :
   - Network Name: `Anvil`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency: `ETH`
4. Importez une clé privée Anvil (affichée dans Terminal 1)

### Option 2 : WalletConnect

Scannez avec un wallet mobile supportant WalletConnect

---

## 🎮 Utilisation

1. Connectez votre wallet
2. Sélectionnez un montant (0.01, 0.05, 0.1, 0.5 ETH)
3. Choisissez Heads (👑) ou Tails (🌙)
4. Cliquez "FLIP NOW"
5. Attendez 2 secondes pour le résultat

**Gagnez 2x votre mise ou perdez celle-ci !**

---

## 📝 Fichiers importants

```
coinflip/
├── packages/
│   ├── foundry/
│   │   ├── contracts/
│   │   │   ├── CoinFlip.sol          ← Smart contract
│   │   │   └── YourContract.sol
│   │   └── script/
│   │       ├── Deploy.s.sol           ← Script principal
│   │       └── DeployCoinFlip.s.sol   ← Script CoinFlip
│   │
│   └── nextjs/
│       ├── app/
│       │   └── page.tsx               ← Interface React
│       └── contracts/
│           └── deployedContracts.ts   ← Adresses ABIs
```

---

## 🐛 Troubleshooting

### "Connection refused"
```bash
# Vérifiez que Terminal 1 tourne
# Allez voir http://127.0.0.1:8545 dans navigateur
```

### "The contract function "flipCoin" returned no data"
```bash
# L'adresse du contrat n'est pas à jour
cd packages/foundry
node scripts-js/updateDeployedContracts.js
```

### "Wallet not connected"
```bash
# Cliquez sur Connect Wallet
# Vérifiez MetaMask sur le bon réseau (Anvil)
```

### Port 3000 déjà utilisé
```bash
# Yarn utilisera automatiquement le port suivant
# Allez sur http://localhost:3001
```

---

## 🧹 Nettoyage

```bash
# Arrêtez tous les terminals (Ctrl+C)

# Réinitialiser le réseau
cd packages/foundry
yarn clean
make setup-anvil-wallet

# Puis recommencez à partir de Terminal 1
```

---

## 📊 Architecture

```
Anvil (Terminal 1)
  ├─ Port 8545 (JSON-RPC)
  └─ Comptes avec 10000 ETH chacun

Foundry Deploy (Terminal 2)
  ├─ Compile les contrats
  ├─ Déploie sur Anvil
  └─ Génère les ABIs

React App (Terminal 3)
  ├─ http://localhost:3000
  ├─ Connexion MetaMask
  └─ Appelle les contrats via ABI
```

---

## 🎯 Prochaines étapes

- ✅ Tester localement
- [ ] Déployer sur testnet (Sepolia, Mumbai)
- [ ] Ajouter Chainlink VRF pour vraie randomness
- [ ] Ajouter leaderboard on-chain
- [ ] Deployer en production

---

**Prêt ? Lancez Terminal 1 maintenant ! 🚀**
