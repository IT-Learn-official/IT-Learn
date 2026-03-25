# Divs & Spans

Mit `<div>` gruppierst du Block-Inhalt, und mit `<span>` gruppierst du Inline-Inhalt.
Verwendung:

- Ein `<div>` ist ein Block-Element, das andere Elemente für Styling oder Scripting zusammenfasst.
- Ein `<span>` ist ein Inline-Element, das Inline-Inhalt für Styling oder Scripting zusammenfasst.

---

Beispiel für ein div:

```html
<div class="container">
  <h2>Section Title</h2>
  <p>This is a section of content grouped in a div.</p>
</div>
```

Das sieht so aus:

> ## Section Title
>
> This is a section of content grouped in a div.

---

Beispiel für ein span:

```html
<style>
  .highlight {
    font-weight: bold;
    background-color: #fff3a3;
  }
</style>

<p>This is a <span class="highlight">highlighted</span> word in a paragraph.</p>
```

Das sieht so aus:

> This is a highlighted word in a paragraph.

Hinweis: `<span class="highlight">` wendet nur den `.highlight` CSS-Selektor an. Ohne CSS ändert `<span>` das Aussehen nicht von selbst.
