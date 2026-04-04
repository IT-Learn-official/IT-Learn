# Stijlen hergebruiken met CSS-variabelen

CSS-variabelen helpen je om waarden zoals kleuren en spatiëring te hergebruiken.

```css
:root {
  --primary-color: #2d7ff9;
}

.button {
  background: var(--primary-color);
}
```

Als je de variabele één keer aanpast, verandert elke plek die ze gebruikt mee.
