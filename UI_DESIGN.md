# 🎨 Design de CoinFlip Elite

## Vue d'ensemble de l'interface

```
┌─────────────────────────────────────────────────────────────────────┐
│  🎲 CoinFlip Elite                    0x7E5F43d29A9C...9E2b (Top)   │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│   STATISTICS         │  │                      │  │  BET AMOUNT (ETH)    │
├──────────────────────┤  │                      │  ├──────────────────────┤
│ Total Bets : 5       │  │     Animation        │  │ [0.01               │
│ Wins       : 3       │  │      de la           │  │                 ▼   │
│ Win Rate   : 60%     │  │      pièce           │  │ ┌─────────────────┐ │
└──────────────────────┘  │      🪙              │  │ │ 0.01 0.05 0.1   │ │
                          │                      │  │ └─────────────────┘ │
                          │  (Tourne pendant     │  │                     │
                          │   le flip)           │  │ YOUR CHOICE         │
                          │                      │  ├─────────────────────┤
                          │   ┌──────────────┐   │  │ [Heads👑] [Tails🌙] │
                          │   │🎉 You Won!   │   │  ├─────────────────────┤
                          │   │ 0.02 ETH     │   │  │ [🎲 FLIP NOW]      │
                          │   └──────────────┘   │  ├─────────────────────┤
                          │                      │  │ 💡 How it works     │
                          │  Ready to play       │  │ • Set bet amount    │
                          │                      │  │ • Choose sides      │
                          │                      │  │ • Win 2x or lose it │
                          │                      │  └─────────────────────┘
└──────────────────────┘  └──────────────────────┘
```

## 🎨 Palette de couleurs

| Élément | Couleur | Hex |
|---------|---------|-----|
| Arrière-plan | Slate-900 | #0f172a |
| Cartes | Slate-800/50 | #1e293b/50% |
| Texte primaire | Blanc | #ffffff |
| Texte secondaire | Slate-400 | #78716c |
| Accents | Bleu/Violet | #3b82f6/#a855f7 |
| Succès | Vert | #22c55e |
| Erreur | Rouge | #ef4444 |

## 🎭 États de la pièce

1. **État repos** :
   ```
   - Rotation : 0deg
   - Emoji : 🪙 (neutre) ou 👑 (précédent résultat)
   - Durée transition : 0.3s
   ```

2. **État flip** :
   ```
   - Rotation : 1440deg sur Y axis + 360deg sur X axis
   - Durée : 2s
   - Easing : cubic-bezier(0.25, 0.46, 0.45, 0.94)
   - Effect : Glow jaune
   ```

3. **État résultat** :
   ```
   - Heads (👑) : Couleur or/jaune
   - Tails (🌙) : Couleur argentée/lune
   - Card victoire : Vert clair avec bordure verte
   - Card défaite : Rouge clair avec bordure rouge
   ```

## 📱 Responsive Design

- **Desktop** (1024px+) : Layout 3 colonnes
- **Tablet** (768px-1023px) : Layout 2 colonnes
- **Mobile** (<768px) : Layout 1 colonne (stacked)

## 🎬 Animations

### Pièce
```css
@keyframes flip {
  0% { transform: rotateY(0deg) rotateX(0deg); }
  100% { transform: rotateY(1440deg) rotateX(360deg); }
}
duration: 2s;
easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Résultat
```css
appearance: fade-in + slide-up
duration: 300ms
easing: ease-in-out
```

### Bouton
```css
hover: scale(1.02) + glow shadow
transition: all 300ms smooth
```

## 🌙 Mode sombre

L'application utilise exclusivement un theme sombre pour un look professionnel et réduire la fatigue oculaire.

```
Background: linear-gradient(to bottom-right, slate-900, slate-800)
Overlay: backdrop-blur pour effet de verre
Cards: semi-transparent dark (slate-800/50%)
```

---

**Note** : L'UI utilise Tailwind CSS pour une personnalisation facile et un bundle optimisé.
