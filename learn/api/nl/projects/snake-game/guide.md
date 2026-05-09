# Retro Snake Spel

Maak het klassieke Snake-spel met JavaScript en de HTML5 Canvas API. Dit project is geavanceerder en test je logica, arrays en timing-vaardigheden.

## Doel

- Een canvas waarop de slang beweegt
- Toetsenbordbediening (pijltjestoetsen) om van richting te veranderen
- Voedsel dat willekeurig verschijnt
- Score-teller
- Game-over logica als de slang een muur of zichzelf raakt

## Stappen

- [ ] Maak een `<canvas>` element in `index.html`.
- [ ] Stel de canvas-context en spelvariabelen in in `script.js`.
- [ ] Implementeer een game loop (met `setInterval` of `requestAnimationFrame`).
- [ ] Maak een array om de lichaamsdelen van de slang op te slaan.
- [ ] Schrijf een functie om de slang en het voedsel op het canvas te tekenen.
- [ ] Voeg event listeners toe voor toetsenbordinvoer om de slang te bewegen.
- [ ] Implementeer de logica voor de slang om voedsel te "eten" en langer te worden.
- [ ] Controleer op botsingen met muren of het eigen lichaam van de slang om "Game Over" te triggeren.

## Hints

- Gebruik `ctx.fillRect()` om vierkanten te tekenen voor de slang en het voedsel.
- Het lichaam van de slang is in feite een array van `{x, y}` coördinaten.
- Om de slang te "bewegen", voeg je een nieuw hoofd toe aan de voorkant van de array en verwijder je de staart (tenzij hij net voedsel heeft gegeten).
