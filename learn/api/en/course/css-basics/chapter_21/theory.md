# CSS Cheat Sheet

This cheat sheet covers the most important CSS concepts, properties, and values. Use this when you forget stuff.

## 1) CSS Rule Shape

Every CSS rule uses this pattern:

```css
selector {
  property: value;
}
```

- selector = what you target
- property = what you change
- value = what you set
- declaration = one property/value line

---

## 2) Selector Types

### Basic selectors

- `*` (all elements)
- `p`, `h1`, `button` (element selector)
- `.card`, `.menu-item` (class selector)
- `#header`, `#main` (id selector)

### Grouping selector

- `h1, h2, h3`

### Relationship selectors

- `div p` (descendant)
- `ul > li` (direct child)
- `h2 + p` (next sibling)
- `h2 ~ p` (general sibling)

### Attribute selectors

- `[disabled]`
- `[type="text"]`
- `[href^="https"]`
- `[class*="btn"]`

### Pseudo-classes (state)

- `:hover`
- `:focus`
- `:active`
- `:visited`
- `:first-child`
- `:last-child`
- `:nth-child(n)`
- `:not(...)`

### Pseudo-elements (part of element)

- `::before`
- `::after`
- `::first-letter`
- `::first-line`
- `::selection`

---

## 3) Common Value Types

- Keywords: `block`, `none`, `auto`, `center`, `bold`
- Lengths: `px`, `%`, `em`, `rem`, `vw`, `vh`
- Colors: `red`, `#ff0000`, `rgb(...)`, `hsl(...)`
- Time: `s`, `ms`
- Functions: `var()`, `calc()`, `url()`, `linear-gradient()`

---

## 4) Typography Properties

- `font-family`
- `font-size`
- `font-weight`
- `font-style`
- `line-height`
- `letter-spacing`
- `text-align`
- `text-transform`
- `text-decoration`
- `white-space`

---

## 5) Box Model and Spacing

- `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`
- `padding`, `padding-top/right/bottom/left`
- `margin`, `margin-top/right/bottom/left`
- `border`, `border-width`, `border-style`, `border-color`
- `border-radius`
- `box-sizing`
- `overflow`, `overflow-x`, `overflow-y`

---

## 6) Background and Visual Style

- `background`
- `background-color`
- `background-image`
- `background-size`
- `background-position`
- `background-repeat`
- `opacity`
- `box-shadow`
- `filter`

---

## 7) Layout Properties

### Display and position

- `display`
- `position`
- `top`, `right`, `bottom`, `left`
- `z-index`

### Flexbox

- `display: flex`
- `flex-direction`
- `flex-wrap`
- `justify-content`
- `align-items`
- `align-content`
- `gap`
- `flex-grow`, `flex-shrink`, `flex-basis`

### Grid

- `display: grid`
- `grid-template-columns`
- `grid-template-rows`
- `grid-column`
- `grid-row`
- `grid-area`
- `gap`

---

## 8) Interaction and Motion

- `cursor`
- `pointer-events`
- `transition`
- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `animation`
- `@keyframes`
- `transform` (`translate`, `scale`, `rotate`)

---

## 9) Responsive CSS

- `@media` queries
- Common breakpoints (`max-width: 768px`, `max-width: 1024px`)
- Fluid units: `%`, `rem`, `vw`, `vh`
- `max-width: 100%` for images

---

## 10) Reuse and Organization

- CSS variables: `--name` and `var(--name)`
- Section comments: `/* Buttons */`
- Reusable class names
- Keep files grouped by component or section

---

## 11) Useful Shortcuts (Shorthand)

- `margin: 10px 20px;`
- `padding: 8px 12px;`
- `border: 1px solid #333;`
- `font: italic 700 16px/1.4 Arial, sans-serif;`
- `background: #111 url("img.jpg") center/cover no-repeat;`

---

## 12) Keep This in Mind

You do not need to memorize everything.

A strong path is:

1. Learn selectors
2. Learn spacing and text
3. Learn layout (flexbox and grid)
4. Use this page as your quick lookup
