# Styles mit CSS-Variablen wiederverwenden

CSS-Variablen helfen dir, Werte wie Farben und Abstände wiederzuverwenden.

```css
:root {
  --primary-color: #2d7ff9;
}

.button {
  background: var(--primary-color);
}
```

Wenn du die Variable einmal änderst, aktualisiert sich jede Stelle, die sie nutzt.
