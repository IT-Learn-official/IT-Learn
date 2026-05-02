# Afbeeldingen

Afbeeldingen maken je website leuker om naar te kijken, en ze helpen je je doel te bereiken. Om een afbeelding toe te voegen, gebruik je de `<img>`-tag. Dit is een “void element”: er is dus geen aparte sluit-tag nodig zoals bij `<p>` of `<h1>`. Je schrijft gewoon `<img>` met de nodige attributen.

---

Attributen:

- `src`: dit is de bron van je afbeelding. Je kan 2 soorten paden gebruiken:
  - Relatief pad: verwijst naar een bestand in je projectmap. Bijvoorbeeld: als je een map `images` hebt met een bestand `photo.jpg`, dan schrijf je `<img src="images/photo.jpg">`.
  - Absolute URL: verwijst naar een afbeelding op het web. Bijvoorbeeld: `<img src="https://example.com/photo.jpg">`.
- `alt`: alternatieve tekst die de afbeelding beschrijft. Dit is belangrijk, omdat het blinde gebruikers helpt te begrijpen wat er op de afbeelding staat. Bijvoorbeeld: `<img src="photo.jpg" alt="Een mooie zonsondergang">`.

---

Voorbeeld:

```html
<img src="https://example.com/photo.jpg" alt="Een mooie zonsondergang" />
```

De output ziet er ongeveer zo uit:
![Een mooie zonsondergang.](https://cdn.shopify.com/s/files/1/0475/8513/2708/files/sebastien-gabriel--imlv9jlb24-unsplash-1.jpg?v=1734059829 "Dit is een voorbeeldafbeelding.")
