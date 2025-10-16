# 🎲 CoinFlip - Guide de déploiement et lancement

## Prérequis
- Node.js et Yarn installés
- Foundry installé (`curl -L https://foundry.paradigm.xyz | bash` puis `foundryup`)

## 🚀 Déploiement et lancement en 3 étapes

### Étape 1 : Démarrer un réseau local Anvil

Ouvrez un terminal et lancez :

```bash
cd packages/foundry
yarn chain
```

Vous devriez voir quelque chose comme :
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545
```

**Gardez ce terminal ouvert !** C'est votre réseau blockchain local.

---

### Étape 2 : Déployer les contrats

Ouvrez un **nouveau terminal** et lancez :

```bash
cd packages/foundry
yarn deploy
```

Cela va :
1. Compiler les contrats Solidity
2. Déployer `YourContract` et `CoinFlip` sur le réseau local
3. Générer les ABIs et exporter les adresses dans `packages/nextjs/contracts/deployedContracts.ts`

Notez l'adresse du contrat `CoinFlip` affichée dans la console.

---

### Étape 3 : Lancer l'interface web

Ouvrez un **troisième terminal** et lancez :

```bash
cd packages/nextjs
yarn dev
```

L'application sera accessible sur **http://localhost:3000** 🎉

---

## 🎮 Utilisation

1. **Connectez votre wallet** (utilisez le bouton "Connect" en haut)
   - Importez une clé privée Anvil du terminal de l'étape 1
   - Ou utilisez MetaMask avec le réseau local

2. **Configurez votre pari**
   - Sélectionnez le montant en ETH
   - Choisissez Heads (👑) ou Tails (🌙)

3. **Lancez le flip** 🎲
   - Cliquez sur "FLIP NOW"
   - La pièce va tourner
   - Vous gagnez 2x votre mise en cas de victoire !

---

## 💡 Notes importantes

- Le réseau local se réinitialise chaque fois que vous arrêtez/relancez `yarn chain`
- Vos fonds sont de l'ETH simulé sans valeur réelle
- Le contrat utilise une randomness simple (ok pour le dev, pas pour la production)

---

## 🐛 Troubleshooting

### "Contract not deployed"
→ Assurez-vous d'avoir lancé `yarn deploy` dans le terminal 2

### "Connection refused"
→ Vérifiez que `yarn chain` est toujours en cours d'exécution dans le terminal 1

### "Wrong network"
→ MetaMask doit être connecté au réseau local (localhost:8545)

---

Bon jeu ! 🎲✨
