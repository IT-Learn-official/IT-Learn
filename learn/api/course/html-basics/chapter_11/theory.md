# Divs & Spans

We use a `<div>` to group block-level content, and a `<span>` to group inline content.
Usage:
- A `<div>` is a block-level element that groups other elements together for styling or scripting purposes.
- A `<span>` is an inline element that groups inline content for styling or scripting purposes.

---

Example of a div:
```html
<div class="container">
  <h2>Section Title</h2>
    <p>This is a section of content grouped in a div.</p>
</div>
```
This will look like this:
>## Section Title
>This is a section of content grouped in a div.

---

Example of a span:
```html
<p>This is a <span class="highlight">highlighted</span> word in a paragraph.</p>
```
This will look like this:
>This is a **highlighted** word in a paragraph.