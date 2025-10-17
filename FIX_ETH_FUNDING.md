# 🔧 Comment ajouter de l'ETH au contrat (Anvil local)

## Problème
Le contrat a reçu ta mise, mais quand tu gagnes, il ne peut pas payer car il n'a pas d'ETH dedans.

## Solution rapide : Envoyer de l'ETH depuis MetaMask

### Option 1 : Avec MetaMask (le plus simple)
1. Ouvre MetaMask
2. Assure-toi que tu es sur le réseau "Localhost 8545" (ou Anvil)
3. Vérifie ton solde (devrait être 10,000 ETH si c'est un compte Anvil)
4. Copie l'adresse du contrat : `0xA15BB66138824a1c7167f5E85b957d04Dd34E468`
5. Envoie-lui 50 ETH directement comme tu le ferais avec n'importe quel transfert
6. C'est tout ! 🎉

### Option 2 : Avec la ligne de commande (cast)
```bash
# D'abord, trouve quelle clé privée tu utilises dans MetaMask
# Puis remplace PRIVATE_KEY par la tienne (commence par 0x)

cast send 0xA15BB66138824a1c7167f5E85b957d04Dd34E468 \
    --private-key 0xYOUR_PRIVATE_KEY \
    --value 50ether \
    --rpc-url http://127.0.0.1:8545
```

### Option 3 : Utiliser le script automatique
```bash
cd packages/foundry
bash restart-anvil-and-fund.sh
```
(Attention : cela va redémarrer Anvil et peut perdre l'historique des transactions)

## Debugging

**Voir le solde du contrat :**
```bash
cast balance 0xA15BB66138824a1c7167f5E85b957d04Dd34E468 --rpc-url http://127.0.0.1:8545
```

**Voir les comptes Anvil disponibles :**
```bash
cast rpc eth_accounts --rpc-url http://127.0.0.1:8545
```

**Voir mon solde :**
```bash
# Remplace par ton adresse MetaMask
cast balance 0xYOUR_ADDRESS --rpc-url http://127.0.0.1:8545
```

## Explication technique

Ton compte MetaMask et l'Anvil utilisent probablement des mnémoniques différents.
- **Anvil** génère des comptes par défaut
- **MetaMask** utilise ta phrase secrète personnelle
- Ils ne sont donc pas les mêmes !

Le moyen le plus simple : envoie des ETH directement depuis MetaMask vers le contrat.
