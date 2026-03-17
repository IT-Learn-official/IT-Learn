# Reusing Styles with CSS Variables

CSS variables help you reuse values like colors and spacing.

```css
:root {
  --primary-color: #2d7ff9;
}

.button {
  background: var(--primary-color);
}
```

If you change the variable once, every place using it updates.
