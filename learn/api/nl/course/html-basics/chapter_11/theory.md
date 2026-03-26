# Divs & spans

We gebruiken een `<div>` om block-level content te groeperen, en een `<span>` om inline content te groeperen.
Gebruik:

- Een `<div>` is een block-level element dat andere elementen groepeert voor styling of scripting.
- Een `<span>` is een inline element dat inline content groepeert voor styling of scripting.

---

Voorbeeld van een div:

```html
<div class="container">
  <h2>Section Title</h2>
  <p>This is a section of content grouped in a div.</p>
</div>
```

Dit ziet er zo uit:

> ## Section Title
>
> This is a section of content grouped in a div.

---

Voorbeeld van een span:

```html
<style>
  .highlight {
    font-weight: bold;
    background-color: #fff3a3;
  }
</style>

<p>This is a <span class="highlight">highlighted</span> word in a paragraph.</p>
```

Dit ziet er zo uit:

> This is a highlighted word in a paragraph.

Opmerking: `<span class="highlight">` past enkel de `.highlight` CSS-selector toe. Zonder CSS verandert `<span>` op zichzelf niets aan het uiterlijk.
