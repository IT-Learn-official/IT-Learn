# Formulieren: basis

Om een invoerformulier te maken in HTML, gebruik je het `<form>`-element. Dat element is een container voor verschillende soorten inputs, zoals:

- `<input>`: het meest gebruikte form-element. Je kan het gebruiken voor tekstvelden, checkboxes, radio buttons, en meer, afhankelijk van het `type`-attribuut.
- `<textarea>`: voor tekst over meerdere lijnen.
- `<select>`: maakt een dropdown met opties.
- `<button>`: een klikbare knop die het formulier kan verzenden of andere acties kan uitvoeren.
  Er zijn nog veel meer form-elementen, maar dit zijn de basics om te starten.

Voorbeelden van verschillende input types:

```html
<form>
  <label for="name">Naam:</label>
  <input type="text" id="name" name="name" /><br /><br />

  <label for="email">E-mail:</label>
  <input type="email" id="email" name="email" /><br /><br />

  <label for="message">Bericht:</label><br />
  <textarea id="message" name="message"></textarea><br /><br />

  <label for="options">Kies een optie:</label>
  <select id="options" name="options">
    <option value="option1">Optie 1</option>
    <option value="option2">Optie 2</option>
    <option value="option3">Optie 3</option></select
  ><br /><br />

  <button type="submit">Verzenden</button>
</form>
```

Dit formulier vraagt de gebruiker om:

1. Een naam in te vullen in een tekstveld.
2. Een e-mailadres in te vullen in een e-mailveld.
3. Een bericht te schrijven in een textarea.
4. Een optie te kiezen uit een dropdown.
5. Op de verzendknop te klikken om de form data te versturen.

Formulieren kunnen op zichzelf werken of samen met JavaScript. Wanneer de gebruiker het formulier verstuurt, kan de browser de data naar een server sturen om te verwerken. JavaScript kan ook input valideren of de pagina dynamisch aanpassen.
