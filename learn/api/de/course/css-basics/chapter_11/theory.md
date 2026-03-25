# Display und Positionierung

`display` steuert, wie sich ein Element im Layout verhält.
`position` steuert, wo es platziert wird.

Häufige display-Werte: `block`, `inline`, `inline-block`.
Häufige position-Werte: `static`, `relative`, `absolute`, `fixed`.

```css
.card {
  position: relative;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}
```

Damit sitzt das Badge in der rechten oberen Ecke der Card.
