# JS Rekenmachine

Bouw een volledig functionele rekenmachine. Dit project richt zich op DOM-manipulatie, event listeners en basisrekenkunde in JavaScript.

## Doel

- Een scherm om de huidige invoer/resultaat te tonen
- Cijfertoetsen (0-9)
- Operator-knoppen (+, -, *, /)
- Een wisknop (C)
- Een is-gelijk-teken (=)

## Stappen

- [ ] Maak de HTML-lay-out voor het rekenmachinegrid in `index.html`.
- [ ] Voeg een display-element toe om getallen te tonen.
- [ ] Style de rekenmachine met CSS (probeer het te laten lijken op een iPhone- of Android-rekenmachine).
- [ ] Selecteer in `script.js` alle knoppen en het display.
- [ ] Voeg click event listeners toe aan de knoppen.
- [ ] Implementeer de logica om het display bij te werken wanneer op een cijfer wordt geklikt.
- [ ] Verwerk operatoren en bereken het resultaat wanneer op `=` wordt gedrukt.
- [ ] Implementeer de wisfunctionaliteit (Clear).

## Hints

- Gebruik `eval()` voor eenvoudige berekeningen (let op: alleen in kleine projecten zoals deze!).
- Beter: Houd `previousValue`, `currentValue` en `operator` bij in variabelen.
- Gebruik `grid-template-columns: repeat(4, 1fr)` voor de lay-out van de knoppen.
