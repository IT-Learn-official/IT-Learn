# CSS zu deinem HTML hinzufügen

Du kannst CSS auf drei Arten mit HTML verbinden.

Die erste ist Inline-CSS. Das heißt, du schreibst den Stil direkt in ein einzelnes Tag.

```html
<p style="color: red;">Hi</p>
```

Die zweite ist internes CSS. Du schreibst Styles in ein `<style>`-Tag in derselben Datei.

```html
<style>
  p {
    color: green;
  }
</style>
```

Die dritte ist externes CSS. Du legst Styles in eine separate Datei, z. B. `styles.css`.

```html
<link rel="stylesheet" href="styles.css">
```

Für echte Projekte ist externes CSS meistens die beste Wahl, weil dein HTML dadurch sauber und übersichtlich bleibt.
