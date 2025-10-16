# 🎲 CoinFlip - Lancement Rapide

## ⚡ 3 commandes pour démarrer

### 1️⃣ **Terminal 1** - Démarrer le réseau local
```bash
cd packages/foundry
yarn chain
```

Vous verrez :
```
Starting JSON-RPC server at http://127.0.0.1:8545
Account #0: 0x1234...
```

**⚠️ Gardez ce terminal OUVERT !**

---

### 2️⃣ **Terminal 2** - Déployer le contrat
```bash
cd packages/foundry
yarn deploy
```

Vous verrez quelque chose comme :
```
Deploying script...
Transactions saved to: broadcast/Deploy.s.sol/31337
YourContract deployed at: 0xabc123...
CoinFlip deployed at: 0xdef456...
```

**📝 IMPORTANT** : Notez l'adresse CoinFlip qui s'affiche !

---

### 3️⃣ **Terminal 3** - Lancer l'app web
```bash
cd packages/nextjs
yarn dev
```

Allez sur : **http://localhost:3000** 🎉

---

## ✅ Si ça fonctionne

Vous devriez pouvoir :
1. ✅ Connecter un wallet
2. ✅ Mettre un pari
3. ✅ Voir la pièce tourner
4. ✅ Gagner ou perdre

---

## ❌ Si vous avez l'erreur "Contract not deployed"

### Solution 1 : Mise à jour manuelle

1. Allez dans `packages/nextjs/contracts/deployedContracts.ts`
2. Trouvez la ligne `address: "0x0000000000000000000000000000000000000000",`
3. Remplacez par l'adresse affichée au Terminal 2

Avant :
```typescript
CoinFlip: {
  address: "0x0000000000000000000000000000000000000000",
  abi: [...]
}
```

Après :
```typescript
CoinFlip: {
  address: "0xdef456...",  // ← Votre adresse du Terminal 2
  abi: [...]
}
```

### Solution 2 : Automatique (mieux)

Lancez ce script après le déploiement :
```bash
cd packages/foundry
node scripts-js/updateDeployedContracts.js
```

---

## 🔍 Troubleshooting

| Erreur | Solution |
|--------|----------|
| Connection refused | `yarn chain` n'est pas lancé (Terminal 1) |
| Contract not deployed | L'adresse est 0x000... → Mise à jour manuelle |
| Wrong network | MetaMask connecté au mauvais réseau |
| No module found | Lancez `yarn install` dans le dossier |

---

## 💡 Architecture

```
Terminal 1: Anvil (réseau local)
    ↓
Terminal 2: Déploie les contrats (génère adresse)
    ↓
Terminal 3: React app (utilise l'adresse)
```

---

**C'est tout ! Bon jeu ! 🎲✨**
