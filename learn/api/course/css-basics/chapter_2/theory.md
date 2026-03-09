# Adding CSS to Your HTML

You can connect CSS to HTML in three ways.

The first is inline CSS. This means you place style directly inside one tag.

```html
<p style="color: red;">Hi</p>
```

The second is internal CSS. You write styles in a `<style>` tag in the same file.

```html
<style>
  p {
    color: green;
  }
</style>
```

The third is external CSS. You put styles in a separate file like `styles.css`.

```html
<link rel="stylesheet" href="styles.css">
```

For real projects, external CSS is usually the best choice because it keeps your HTML clean.
