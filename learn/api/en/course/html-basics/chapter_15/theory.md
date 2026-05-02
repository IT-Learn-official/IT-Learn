# Attributes

Attributes are extra pieces of info you can add to HTML elements. They go inside the opening tag and have a name and value, like `name="value"`. For example, `<a href="https://example.com">` has an `href` attribute that specifies the link's destination.

Some attributes are common across many elements, while others are specific to certain tags. For example, `class` and `id` can be used on almost any element, while `src` is specific to `<img>` tags.

Non-specific attributes:

- `class`: Used to apply CSS styles to elements. You can have multiple classes on an element, separated by spaces. For example: `<div class="container highlight">`.
- `id`: A unique identifier for an element. It should be unique within the page. For example: `<h1 id="main-title">`.

Example usage of class and id:

```html
<div class="container">
  <h1 id="main-title">Welcome to My Website</h1>
  <p>This is a paragraph inside a container div.</p>
</div>
```

We use classes and IDs to target elements with CSS for styling or with JavaScript for interactivity. For example, you could style the `container` class to have a background color, or use JavaScript to change the text of the element with id `main-title`.
