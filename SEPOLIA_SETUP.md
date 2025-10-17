# 🔗 Déployer sur Sepolia Testnet (Gratuit, sans ETH réel)

## Étape 1 : Obtenir des tokens Sepolia gratuits

### Faucets gratuits (choisis un) :
1. **Infura Faucet** : https://www.infura.io/faucet/sepolia
   - Rapide et fiable
   
2. **Alchemy Faucet** : https://www.alchemy.com/faucets/ethereum-sepolia
   - Besoin d'un compte Alchemy (gratuit)
   
3. **QuickNode Faucet** : https://faucet.quicknode.com/drip
   - Alternative rapide

### Combien demander ?
- **0.5 Sepolia ETH** minimum pour tester
- Les faucets donnent souvent 0.25-1 ETH par jour

**Laisse-toi guider par le faucet et confirme ta transaction !**

---

## Étape 2 : Configurer Foundry pour Sepolia

### Créer un fichier `.env` dans `packages/foundry/`

```bash
# Ton adresse MetaMask
DEPLOYER_ADDRESS=0xTA_ADRESSE_METAMASK

# Ta clé privée MetaMask (⚠️ SÉCURITÉ: jamais partager cette clé!)
# Pour l'avoir: MetaMask → Settings → Security & Privacy → Reveal Private Key
PRIVATE_KEY=0xTA_CLE_PRIVEE

# Infura ou Alchemy API key (gratuit)
# Choisis un et crée un compte gratuit :
# - Infura: https://infura.io
# - Alchemy: https://www.alchemy.com
INFURA_API_KEY=YOUR_INFURA_KEY
```

---

## Étape 3 : Déployer sur Sepolia

```bash
cd packages/foundry

# Option A: Avec Infura
forge create contracts/CoinFlip.sol:CoinFlip \
    --rpc-url "https://sepolia.infura.io/v3/$INFURA_API_KEY" \
    --private-key $PRIVATE_KEY \
    --verify \
    --verifier etherscan

# Option B: Avec Alchemy (remplace ALCHEMY_API_KEY par ta clé)
forge create contracts/CoinFlip.sol:CoinFlip \
    --rpc-url "https://eth-sepolia.g.alchemy.com/v2/ALCHEMY_API_KEY" \
    --private-key $PRIVATE_KEY
```

**Sauvegarde l'adresse du contrat que tu reçois !** (ex: `0x...`)

---

## Étape 4 : Mettre à jour les configs

### `.env.local` (développement)
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xADDRESSE_DU_CONTRAT_SEPOLIA
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_NETWORK_NAME=sepolia
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

### `.env.production` (Vercel)
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xADDRESSE_DU_CONTRAT_SEPOLIA
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_NETWORK_NAME=sepolia
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

### `packages/nextjs/scaffold.config.ts`
Déjà configuré ! ✅ Il détecte automatiquement Sepolia sur production.

---

## Étape 5 : Tester localement avec Sepolia

```bash
cd packages/nextjs
yarn dev
```

1. Visite http://localhost:3000
2. **Connecte MetaMask** (assure-toi d'être sur Sepolia)
3. **Teste un flip** avec quelques Sepolia ETH
4. Si ça gagne, l'ETH te sera envoyé ! 🎉

---

## Étape 6 : Déployer sur Vercel

1. **Push sur GitHub** :
```bash
git add .
git commit -m "Deploy CoinFlip to Sepolia testnet"
git push origin main
```

2. **Va sur https://vercel.com**
3. **Ajoute les env vars** dans Project Settings → Environment Variables:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_INFURA_API_KEY`

4. **Vercel redéploiera automatiquement**

---

## 🆘 Troubleshooting

| Erreur | Solution |
|--------|----------|
| `account does not have funds` | Tu n'as pas assez de Sepolia ETH. Demande plus sur les faucets |
| `Contract not found` | L'adresse du contrat est mauvaise ou le RPC est down |
| `MetaMask: Network is not added` | Ajoute Sepolia : [voir en bas](#ajouter-sepolia-à-metamask) |
| `Transaction pending forever` | Le RPC peut être lent. Attends 1-2 min ou utilise Alchemy |

---

## Ajouter Sepolia à MetaMask

Si tu n'as pas Sepolia dans tes réseaux :

1. **MetaMask** → Settings → Networks → Add Network
2. Remplis avec :
   - **Network Name** : Sepolia
   - **RPC URL** : `https://sepolia.infura.io/v3/YOUR_INFURA_KEY`
   - **Chain ID** : 11155111
   - **Currency** : ETH
   - **Block Explorer** : `https://sepolia.etherscan.io`

---

## Liens utiles

- 📍 **Sepolia Faucet** : https://sepoliafaucet.com
- 🔍 **Block Explorer** : https://sepolia.etherscan.io
- 📚 **Infura** : https://infura.io
- 🪓 **Alchemy** : https://www.alchemy.com
- 💎 **QuickNode Faucet** : https://faucet.quicknode.com

---

## Prochaines étapes

Quand tu te sentiras prêt :
- ✅ Teste sur Sepolia → Ok
- ✅ Déploie sur Vercel → Ok
- 📱 (Futur) Déployer sur mainnet avec vrais ETH (coûte du gas!)
