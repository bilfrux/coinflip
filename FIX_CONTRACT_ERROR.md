# 🔴 Erreur "Contract not deployed" - Solution Complète

## Le problème

```
Error: The contract function "flipCoin" returned no data ("0x").

Contract Call:
  address:   0x0000000000000000000000000000000000000000  <-- ZÉRO !
  function:  flipCoin(bool playerChoice)
  args:              (true)
```

L'adresse du contrat est `0x0000000000000000000000000000000000000000` (tous les zéros).

Cela signifie : **Le contrat n'a pas été déployé OU l'adresse n'est pas à jour.**

---

## Pourquoi ?

L'application récupère l'adresse du contrat depuis le fichier `deployedContracts.ts` :

```typescript
// packages/nextjs/contracts/deployedContracts.ts
CoinFlip: {
  address: "0x0000000000000000000000000000000000000000",  // ← ZÉRO = PAS DÉPLOYÉ
  abi: [...]
}
```

Cette adresse placeholder doit être remplacée par l'adresse réelle du contrat déployé.

---

## La solution : 3 étapes simples

### ✅ Étape 1 : Démarrer le réseau local

```bash
cd packages/foundry
yarn chain
```

Attendez de voir :
```
Starting JSON-RPC server at http://127.0.0.1:8545
```

**Gardez ce terminal OUVERT !**

---

### ✅ Étape 2 : Déployer le contrat

Dans un **nouveau terminal** :

```bash
cd packages/foundry
yarn deploy
```

Cela va :
1. Compiler les contrats
2. Déployer sur Anvil
3. Afficher l'adresse du contrat

Vous verrez quelque chose comme :
```
CoinFlip deployed at: 0x5FbDB2315678afccb333f8a9c6122671...  ← COPIEZ CETTE ADRESSE
```

---

### ✅ Étape 3 : Mettre à jour l'adresse

Lancez cette commande dans le terminal 2 :

```bash
node scripts-js/updateDeployedContracts.js
```

Cela va automatiquement :
1. Lire l'adresse depuis le fichier de déploiement
2. Mettre à jour `packages/nextjs/contracts/deployedContracts.ts`
3. Afficher un message de succès

---

## Alternative : Mise à jour manuelle

Si le script ne fonctionne pas :

1. Ouvrez `packages/nextjs/contracts/deployedContracts.ts`
2. Trouvez la section CoinFlip
3. Remplacez cette ligne :
   ```typescript
   address: "0x0000000000000000000000000000000000000000",
   ```
   Par :
   ```typescript
   address: "0x5FbDB2315678afccb333f8a9c6122671...",  // Votre adresse
   ```

---

## ✅ Vérifier que ça fonctionne

### Terminal 3 : Lancer l'app

```bash
cd packages/nextjs
yarn dev
```

Allez sur http://localhost:3000

Vous devriez pouvoir :
1. ✅ Connecter un wallet
2. ✅ Voir les statistiques
3. ✅ Lancer un flip sans erreur
4. ✅ Voir la pièce tourner

---

## 🔍 Si ça ne marche toujours pas

### Vérification 1 : Anvil tourne-t-il ?

```bash
# Terminal 1 doit montrer :
Starting JSON-RPC server at http://127.0.0.1:8545
Listening on 127.0.0.1:8545

# Si rien n'apparaît, redémarrez Terminal 1
```

### Vérification 2 : Le déploiement a-t-il réussi ?

```bash
# Vérifiez que Terminal 2 affiche "CoinFlip deployed at"
# Sinon, il y a eu une erreur de compilation
```

### Vérification 3 : L'adresse est-elle bien mise à jour ?

```bash
# Ouvrez packages/nextjs/contracts/deployedContracts.ts
# Cherchez "CoinFlip"
# L'address ne doit PAS être 0x000...0000
```

### Vérification 4 : Redémarrer tout

```bash
# Terminal 1 & 2 : Ctrl+C
# Terminal 3 : Ctrl+C

# Puis recommencez en ordre :
# 1. Terminal 1 : yarn chain
# 2. Terminal 2 : yarn deploy
# 3. Terminal 3 : yarn dev
```

---

## 📋 Checklist

- [ ] Anvil tourne (Terminal 1)
- [ ] Contrat déployé (Terminal 2 affiche l'adresse)
- [ ] Adresse mise à jour dans deployedContracts.ts
- [ ] App lancée (Terminal 3)
- [ ] Wallet connecté
- [ ] Pas d'erreur dans la console du navigateur

---

## 💡 Conseil

Si tout s'est bien déployé, vous devriez avoir dans Terminal 2 :

```
YourContract deployed at: 0xabc...
CoinFlip deployed at: 0xdef...
✅ Updated deployedContracts.ts
```

Et la variable `CoinFlip.address` dans `deployedContracts.ts` doit contenir `0xdef...`, pas `0x000...`

---

**Vous êtes prêt ! Lancez Terminal 1 maintenant 🚀**
