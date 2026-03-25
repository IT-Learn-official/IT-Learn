# Links

Links maak je met een `<a>`-tag (van “anchor”). Het `href`-attribuut bepaalt waar je link naartoe gaat.

Zo werkt het:
```html
<a href="https://www.example.com">Visit Example</a>
```
In dit geval wordt er een link gemaakt met de tekst “Visit Example”. Wanneer de gebruiker erop klikt, gaat die naar https://www.example.com.

---

Wil je dat de link opent in een nieuw tabblad, dan kan je `target="_blank"` toevoegen:
```html
<a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Visit Example</a>
```
Dit opent de link in een nieuw tabblad. Dat is handig voor links die mensen wegsturen van je site, zodat ze makkelijk kunnen terugkeren.

Wanneer je `target="_blank"` gebruikt, is het best practice om ook `rel="noopener noreferrer"` toe te voegen. Zo vermijd je mogelijke beveiligingsproblemen (reverse tabnabbing). Voor educatieve voorbeelden is dat extra belangrijk.
