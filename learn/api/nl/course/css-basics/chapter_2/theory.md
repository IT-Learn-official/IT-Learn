# CSS toevoegen aan je HTML

Je kan CSS op drie manieren koppelen aan HTML.

De eerste is inline CSS. Dat betekent dat je de stijl rechtstreeks in één tag zet.

```html
<p style="color: red;">Hi</p>
```

De tweede is interne CSS. Je schrijft stijlen in een `<style>`-tag in hetzelfde bestand.

```html
<style>
  p {
    color: green;
  }
</style>
```

De derde is externe CSS. Je zet stijlen in een apart bestand, zoals `styles.css`.

```html
<link rel="stylesheet" href="styles.css">
```

Voor echte projecten is externe CSS meestal de beste keuze, omdat je HTML zo netjes en overzichtelijk blijft.
