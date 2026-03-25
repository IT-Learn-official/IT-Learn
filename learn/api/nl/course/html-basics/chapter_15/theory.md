# Attributen

Attributen zijn extra stukjes info die je aan HTML-elementen kan toevoegen. Ze staan in de opening tag en hebben een naam en waarde, zoals `name="value"`. Bijvoorbeeld: `<a href="https://example.com">` heeft een `href`-attribuut dat de bestemming van de link bepaalt.

Sommige attributen komen vaak voor bij veel elementen, terwijl andere specifiek zijn voor bepaalde tags. `class` en `id` kan je bijna overal gebruiken, terwijl `src` typisch bij `<img>` hoort.

Algemene attributen:
- `class`: om CSS-stijlen toe te passen. Je kan meerdere classes op één element hebben, gescheiden door spaties. Bijvoorbeeld: `<div class="container highlight">`.
- `id`: een unieke identifier voor een element. Die hoort uniek te zijn binnen de pagina. Bijvoorbeeld: `<h1 id="main-title">`.

Voorbeeld van class en id:
```html
<div class="container">
  <h1 id="main-title">Welcome to My Website</h1>
  <p>This is a paragraph inside a container div.</p>
</div>
```

We gebruiken classes en IDs om elementen te targeten met CSS (styling) of met JavaScript (interactie). Bijvoorbeeld: je kan de `container`-class een achtergrondkleur geven, of met JavaScript de tekst veranderen van het element met id `main-title`.
