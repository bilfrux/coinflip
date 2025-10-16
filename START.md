# 🚀 DÉMARRAGE IMMÉDIAT

> ⏱️ **5 minutes pour avoir l'app en marche**

---

## 🎯 RÉSUMÉ ULTRA-RAPIDE

```bash
# Terminal 1
cd packages/foundry && yarn chain

# Terminal 2 (une fois que Terminal 1 affiche "Listening on...")
cd packages/foundry && yarn deploy
node scripts-js/updateDeployedContracts.js

# Terminal 3 (une fois que Terminal 2 affiche "Deploying..." ou "✅")
cd packages/nextjs && yarn dev
```

Allez sur **http://localhost:3000** 🎉

---

## ❓ Pourquoi cette erreur ?

```
Error: The contract function "flipCoin" returned no data ("0x").
address: 0x0000000000000000000000000000000000000000
```

**Réponse**: L'adresse est zéro car le contrat n'a pas été déployé.

**Solution**: Lancez `yarn deploy` (Terminal 2) ✅

---

## 📋 CHECKLIST

- [ ] Terminal 1 : `yarn chain` lancé
- [ ] Terminal 1 affiche "Listening on 127.0.0.1:8545"
- [ ] Terminal 2 : `yarn deploy` lancé
- [ ] Terminal 2 affiche "CoinFlip deployed at: 0x..."
- [ ] Terminal 2 : `node scripts-js/updateDeployedContracts.js` lancé
- [ ] Terminal 2 affiche "✅ Updated deployedContracts.ts"
- [ ] Terminal 3 : `yarn dev` lancé
- [ ] Allez sur http://localhost:3000
- [ ] Cliquez "Connect Wallet"
- [ ] Cliquez "FLIP NOW"
- [ ] Pièce tourne ✅

---

## 📞 BESOIN D'AIDE ?

1. **L'app n'affiche pas**
   - Vérifiez Terminal 3 pour les erreurs
   - Allez sur http://localhost:3000

2. **"Contract not deployed" error**
   - Avez-vous lancé `node scripts-js/updateDeployedContracts.js` ?
   - Vérifiez que Terminal 1 est lancé

3. **MetaMask refuse de se connecter**
   - Vérifiez que vous êtes sur le réseau Anvil (31337)
   - Importez une clé privée Anvil

4. **Port 3000 déjà utilisé**
   - Next.js utilisera port 3001 automatiquement

---

## 📚 DOCUMENTATION

- [SOLUTION.md](./SOLUTION.md) - Version longue de ce document
- [QUICK_START.md](./QUICK_START.md) - Lancement rapide
- [FIX_CONTRACT_ERROR.md](./FIX_CONTRACT_ERROR.md) - Dépannage complet
- [INSTALL.md](./INSTALL.md) - Installation détaillée

---

**🎲 Prêt ? Lancez Terminal 1 maintenant !**

```bash
cd packages/foundry && yarn chain
```

Puis revenez ici pour les instructions du Terminal 2 et 3 ! ✨
