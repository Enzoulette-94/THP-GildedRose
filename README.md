# Gilded Rose — JavaScript / Jasmine

Refactoring du célèbre kata [Gilded Rose](https://github.com/emilybache/GildedRose-Refactoring-Kata) en JavaScript, avec une suite de tests unitaires Jasmine.

## Règles métier

| Item | Comportement |
|------|-------------|
| Item normal | Qualité -1/jour, -2/jour après péremption |
| **Aged Brie** | Qualité +1/jour, +2/jour après péremption |
| **Sulfuras** | Ne change jamais (qualité fixe à 80) |
| **Backstage passes** | +1/jour, +2 si ≤10 jours, +3 si ≤5 jours, 0 après le concert |
| **Conjured \*** | Qualité -2/jour, -4/jour après péremption |

Contraintes globales : qualité toujours entre **0** et **50** (sauf Sulfuras : 80).

## Installation

```bash
pnpm install
```

## Lancer les tests

```bash
pnpm test
```

## Structure

```
js-jasmine/
├── src/
│   └── gilded_rose.js   # Logique métier (Shop + Item)
└── spec/
    └── gilded_rose_spec.js  # Tests unitaires (11 specs)
```
