# Bilder

Bilder machen deine Website interessanter und helfen, Ziele zu erreichen. Um ein Bild einzubinden, verwendest du das `<img>`-Tag. Das ist ein „void element“: Es braucht kein extra schließendes Tag wie `<p>` oder `<h1>`. Du schreibst einfach `<img>` und gibst die nötigen Attribute an.

---

Attribute:

- `src`: Das ist die Quelle des Bildes. Du kannst 2 Arten von Pfaden nutzen:
  - Relativer Pfad: zeigt auf eine Bilddatei in deinem Projektordner. Beispiel: Wenn du einen Ordner `images` mit der Datei `photo.jpg` hast, schreibst du `<img src="images/photo.jpg">`.
  - Absolute URL: zeigt auf ein Bild im Web. Beispiel: `<img src="https://example.com/photo.jpg">`.
- `alt`: Alternativtext, der das Bild beschreibt. Das ist wichtig, weil es blinden Nutzern hilft zu verstehen, worum es im Bild geht. Beispiel: `<img src="photo.jpg" alt="Ein schöner Sonnenuntergang">`.

---

Beispiel:

```html
<img src="https://example.com/photo.jpg" alt="Ein schöner Sonnenuntergang" />
```

Die Ausgabe sieht ungefähr so aus:
![Ein schöner Sonnenuntergang.](https://cdn.shopify.com/s/files/1/0475/8513/2708/files/sebastien-gabriel--imlv9jlb24-unsplash-1.jpg?v=1734059829 "Das ist ein Beispielbild.")
