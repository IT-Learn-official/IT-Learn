# Einführung in CSS Grid

Grid ist super, wenn du gleichzeitig Zeilen und Spalten brauchst.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
```

Das erzeugt 3 gleich breite Spalten.
`gap` fügt Abstand zwischen den Items hinzu.
