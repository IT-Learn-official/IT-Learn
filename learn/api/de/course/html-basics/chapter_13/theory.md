# Formulare: Basics

Um ein Eingabeformular in HTML zu erstellen, verwenden wir das `<form>`-Element. Es ist ein Container für verschiedene Arten von Eingabeelementen, zum Beispiel:

- `<input>`: das häufigste Form-Element. Je nach `type`-Attribut für Textfelder, Checkboxes, Radio Buttons und mehr.
- `<textarea>`: für mehrzeiligen Text.
- `<select>`: erstellt eine Dropdown-Liste mit Optionen.
- `<button>`: ein klickbarer Button, der das Formular senden oder andere Aktionen ausführen kann.
  Es gibt noch viele weitere Form-Elemente, aber das sind die wichtigsten Basics zum Start.

Beispiele für verschiedene Input-Typen:

```html
<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" /><br /><br />

  <label for="email">E-Mail:</label>
  <input type="email" id="email" name="email" /><br /><br />

  <label for="message">Nachricht:</label><br />
  <textarea id="message" name="message"></textarea><br /><br />

  <label for="options">Wähle eine Option:</label>
  <select id="options" name="options">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option></select
  ><br /><br />

  <button type="submit">Senden</button>
</form>
```

Dieses Formular bittet den User:

1. Den Namen in ein Textfeld einzugeben.
2. Eine E-Mail-Adresse in ein E-Mail-Feld einzugeben.
3. Eine Nachricht in ein Textarea zu schreiben.
4. Eine Option aus einem Dropdown auszuwählen.
5. Auf den Senden-Button zu klicken, um die Formulardaten zu schicken.

Formulare können alleine funktionieren oder zusammen mit JavaScript. Wenn der User das Formular abschickt, kann der Browser die Daten an einen Server senden. JavaScript kann zusätzlich Eingaben validieren oder die Seite dynamisch aktualisieren.
