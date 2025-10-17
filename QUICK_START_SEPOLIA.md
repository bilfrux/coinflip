# 🎯 Quick Start - Sepolia Testnet

## TL;DR (5 minutes)

### 1. Obtenir Sepolia ETH gratuit (2 min)
```
Va sur: https://sepoliafaucet.com
Entre ton adresse MetaMask
Valide le captcha
Tu reçois 0.5 Sepolia ETH gratuit! 🎉
```

### 2. Créer une clé API (1 min)
```
Va sur: https://infura.io
Crée un compte (gratuit)
Crée un projet
Copie la clé API
```

### 3. Déployer le contrat (1 min)
```bash
cd packages/foundry

# Crée .env
cat > .env << EOF
INFURA_API_KEY=TA_CLE_INFURA
PRIVATE_KEY=0xTA_CLE_PRIVEE_METAMASK
EOF

# Déploie
bash deploy-sepolia.sh
```

### 4. Configurer le frontend (30 sec)
```bash
# Update .env.local
NEXT_PUBLIC_CONTRACT_ADDRESS=0xADDRESSE_DU_CONTRAT
NEXT_PUBLIC_INFURA_API_KEY=TA_CLE_INFURA
```

### 5. Tester
```bash
cd packages/nextjs
yarn dev
# Visite http://localhost:3000
```

---

## Questions/Réponses

**Q: Comment je récupère ma clé privée MetaMask?**
```
MetaMask → Settings → Security & Privacy → Reveal Private Key
⚠️ Ne la partage JAMAIS avec quelqu'un d'autre!
```

**Q: Le contrat me dit "Payout transfer failed"?**
```
Le contrat n'a pas assez d'ETH pour payer les gagnants.
Envoie-lui 10 ETH depuis MetaMask vers son adresse.
```

**Q: Sepolia ETH n'a pas de valeur, c'est safe?**
```
✅ OUI! C'est juste du testnet.
Ça ne coûte RIEN, c'est libre et gratuit.
```

**Q: Je veux déployer sur Vercel aussi?**
```
1. git commit && git push
2. Va sur Vercel, ajoute les env vars
3. C'est auto-déployé!
```

---

## Liens rapides

- 🚰 Faucet : https://sepoliafaucet.com
- 📊 Explorer : https://sepolia.etherscan.io
- 🔑 Infura : https://infura.io
- 📖 Full Guide : Vois SEPOLIA_SETUP.md

---

## Next Steps

✅ Tout marche sur Sepolia testnet?
→ Passe à Vercel! (vois VERCEL_DEPLOYMENT.md)
