# Weer Dashboard

Bouw een weersapplicatie waarmee gebruikers een stad kunnen zoeken en de huidige weersomstandigheden kunnen zien. Je leert over `fetch`, API's en het werken met JSON-gegevens.

## Doel

- Een zoekbalk om plaatsnamen in te voeren
- Toon de huidige temperatuur, vochtigheid en weersbeschrijving
- Toon een weericoon (zonnig, bewolkt, regenachtig, enz.)
- Behandel fouten (bijv. stad niet gevonden)

## Stappen

- [ ] Vraag een gratis API-sleutel aan bij [OpenWeatherMap](https://openweathermap.org/api).
- [ ] Bouw de HTML-lay-out met een zoekinvoer, knop en een container voor resultaten.
- [ ] Style de app om hem er modern uit te laten zien.
- [ ] Voeg in `script.js` een event listener toe aan de zoekknop.
- [ ] Gebruik `fetch()` om de OpenWeatherMap API aan te roepen met de stadsnaam.
- [ ] Parse het JSON-antwoord en extraheer de gegevens die je nodig hebt.
- [ ] Werk de DOM bij met de weerinformatie.
- [ ] Voeg foutafhandeling toe als de API-aanroep mislukt of de stad ongeldig is.

## Hints

- Gebruik `async/await` voor je fetch-aanroep.
- Vergeet niet je API-sleutel in de URL te gebruiken: `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric`.
- Je kunt iconen ophalen via `http://openweathermap.org/img/wn/{icon_code}@2x.png`.
