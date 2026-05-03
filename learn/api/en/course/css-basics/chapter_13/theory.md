# Introduction to CSS Grid

Grid is great when you need rows and columns at the same time.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
```

This makes 3 equal columns.
`gap` adds space between items.
