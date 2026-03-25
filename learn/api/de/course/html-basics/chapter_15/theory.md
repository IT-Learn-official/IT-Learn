# Attribute

Attribute sind zusätzliche Infos, die du HTML-Elementen geben kannst. Sie stehen im öffnenden Tag und haben einen Namen und einen Wert, z. B. `name="value"`. Beispiel: `<a href="https://example.com">` hat ein `href`-Attribut, das das Link-Ziel festlegt.

Manche Attribute sind bei vielen Elementen üblich, andere sind tag-spezifisch. `class` und `id` kannst du fast überall verwenden, `src` ist typisch für `<img>`.

Allgemeine Attribute:

- `class`: um CSS-Styles anzuwenden. Du kannst mehrere Klassen auf einem Element haben, getrennt durch Leerzeichen. Beispiel: `<div class="container highlight">`.
- `id`: eine eindeutige Kennung für ein Element. Sie sollte innerhalb der Seite einzigartig sein. Beispiel: `<h1 id="main-title">`.

Beispiel für class und id:

```html
<div class="container">
  <h1 id="main-title">Welcome to My Website</h1>
  <p>This is a paragraph inside a container div.</p>
</div>
```

Wir nutzen Klassen und IDs, um Elemente mit CSS zu stylen oder mit JavaScript interaktiv zu machen. Zum Beispiel könntest du die Klasse `container` mit einer Hintergrundfarbe gestalten oder mit JavaScript den Text des Elements mit der id `main-title` ändern.
