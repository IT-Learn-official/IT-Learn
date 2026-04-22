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

> ## Section Title
>
> This is a section of content grouped in a div.

---

Example of a span:

```html
<style>
  .highlight {
    font-weight: bold;
    background-color: #fff3a3;
  }
</style>

<p>This is a <span class="highlight">highlighted</span> word in a paragraph.</p>
```

This will look like this:

> This is a highlighted word in a paragraph.

Note: `<span class="highlight">` only applies the `.highlight` CSS selector. Without CSS, `<span>` does not change the appearance by itself.
