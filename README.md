# � CoinFlip - Application Web3

![Status](https://img.shields.io/badge/status-working-brightgreen)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue)
![React](https://img.shields.io/badge/React-19-blue)

Une application décentralisée permettant de parier de l'ETH sur un lancer de pièce, avec gains 2x en cas de victoire.

## 🎮 Caractéristiques

- ✨ Interface moderne et professionnelle
- 💰 Logique de paris complète (2x gain)
- 📊 Statistiques en temps réel
- 🔗 Intégration Web3 (MetaMask)
- 🎨 Design responsive et élégant
- ⚡ Smart contract optimisé

## ⚡ Démarrage rapide

### 3 terminaux, 3 commandes

**Terminal 1** : Réseau local
```bash
cd packages/foundry && yarn chain
```

**Terminal 2** : Déployer le contrat
```bash
cd packages/foundry && yarn deploy
node scripts-js/updateDeployedContracts.js
```

**Terminal 3** : Lancer l'app
```bash
cd packages/nextjs && yarn dev
```

Allez sur **http://localhost:3000** 🎉

## 📚 Documentation

- [QUICK_START.md](./QUICK_START.md) - Lancement en 5 min
- [INSTALL.md](./INSTALL.md) - Installation détaillée
- [FIX_CONTRACT_ERROR.md](./FIX_CONTRACT_ERROR.md) - Dépannage

## 🛠 Stack Technique

**Frontend**: React 19 + Tailwind CSS + Wagmi
**Smart Contract**: Solidity 0.8.20 + Foundry
**Blockchain**: Anvil (local)

## 📋 Prérequis

```bash
node --version     # v18+
yarn --version     # v1.22+
forge --version    # Latest
```

## 🎮 Utilisation

1. Connectez votre wallet MetaMask
2. Sélectionnez un montant (0.01 - 0.5 ETH)
3. Choisissez Heads 👑 ou Tails 🌙
4. Cliquez "FLIP NOW"
5. Gagnez 2x ou perdez votre mise

## 🐛 Problème "Contract not deployed" ?

Voir [FIX_CONTRACT_ERROR.md](./FIX_CONTRACT_ERROR.md) pour la solution complète.

En résumé :
- ✅ Lancez `yarn chain`
- ✅ Lancez `yarn deploy`
- ✅ Lancez `node scripts-js/updateDeployedContracts.js`
- ✅ Lancez `yarn dev`

## 📄 Licence

MIT

---

**Bon jeu ! 🎲✨**

This command deploys a test smart contract to the local network. The contract is located in `packages/foundry/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/foundry/script` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn foundry:test`

- Edit your smart contracts in `packages/foundry/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/foundry/script`


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.