# Introductie tot CSS Grid

Grid is handig wanneer je tegelijk rijen én kolommen nodig hebt.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
```

Dit maakt 3 gelijke kolommen.
`gap` voegt ruimte toe tussen items.
