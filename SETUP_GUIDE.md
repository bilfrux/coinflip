# 🔧 Guide de déploiement du contrat CoinFlip

## ⚠️ Problème actuel
L'adresse du contrat dans `deployedContracts.ts` est `0x0000000000000000000000000000000000000000` (zéro).
Cela signifie que vous devez **déployer le contrat** d'abord.

---

## 🚀 Solution en 3 étapes

### ✅ Étape 1 : Démarrer le réseau local Anvil

**Terminal 1** :
```bash
cd packages/foundry
yarn chain
```

Vous devriez voir :
```
Starting JSON-RPC server at http://127.0.0.1:8545
Listening on 127.0.0.1:8545
```

**⚠️ IMPORTANT : Gardez ce terminal OUVERT !**

---

### ✅ Étape 2 : Déployer le contrat

**Terminal 2** (nouveau terminal) :
```bash
cd packages/foundry
yarn deploy
```

Vous allez voir quelque chose comme :
```
Deploying script...
YourContract deployed at: 0x1234...
CoinFlip deployed at: 0x5678...  <-- NOTEZ CETTE ADRESSE !
```

---

### 🔑 Étape 3 : Mettre à jour l'adresse du contrat

Une fois le déploiement terminé, allez dans :

**File**: `packages/nextjs/contracts/deployedContracts.ts`

Trouvez la section `CoinFlip` et remplacez `0x0000000000000000000000000000000000000000` par l'adresse affichée :

```typescript
CoinFlip: {
  address: "0x5678abc...",  // ← Remplacez par votre adresse !
  abi: [...]
}
```

---

### ✅ Étape 4 : Lancer l'app

**Terminal 3** (nouveau terminal) :
```bash
cd packages/nextjs
yarn dev
```

L'app sera accessible sur **http://localhost:3000** ! 🎉

---

## 🔍 Alternative : Le script devrait le faire automatiquement

Le script `yarn deploy` devrait générer automatiquement `deployments/31337.json` avec les adresses.

Si ce fichier n'existe pas, lancez :
```bash
cd packages/foundry
yarn deploy
```

Puis le fichier généré sera importé automatiquement.

---

## ❓ Si ça ne marche toujours pas

1. **Vérifiez que Anvil tourne** : Visitez http://127.0.0.1:8545 dans votre navigateur (doit afficher une erreur JSON-RPC, c'est normal)

2. **Vérifiez que le déploiement a réussi** :
   ```bash
   cat packages/foundry/deployments/31337.json
   ```
   Vous devriez voir les adresses du contrat

3. **Redémarrez tout** :
   ```bash
   # Arrêtez tous les terminals (Ctrl+C)
   # Puis recommencez à partir de l'étape 1
   ```

---

## 📝 Structure attendue après déploiement

```
deployedContracts.ts
├── 31337
│   ├── YourContract
│   │   ├── address: "0x..."
│   │   └── abi: [...]
│   └── CoinFlip          <-- DOIT AVOIR UNE VRAIE ADRESSE
│       ├── address: "0x..." <-- PAS 0x000...
│       └── abi: [...]
```

---

**Lancez `yarn deploy` maintenant et mettez à jour l'adresse ! 🚀**
