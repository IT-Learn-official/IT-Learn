# CSS spiekbriefje

Dit spiekbriefje bundelt de belangrijkste CSS-concepten, properties en waarden. Gebruik het als je iets even kwijt bent.

## 1) Vorm van een CSS-regel

Elke CSS-regel volgt dit patroon:

```css
selector {
  property: value;
}
```

- selector = wat je target
- property = wat je verandert
- value = wat je instelt
- declaration = één property/value-regel

---

## 2) Soorten selectors

### Basis selectors
- `*` (alle elementen)
- `p`, `h1`, `button` (element selector)
- `.card`, `.menu-item` (class selector)
- `#header`, `#main` (id selector)

### Groeperen
- `h1, h2, h3`

### Relatie selectors
- `div p` (descendant)
- `ul > li` (direct child)
- `h2 + p` (next sibling)
- `h2 ~ p` (general sibling)

### Attribute selectors
- `[disabled]`
- `[type="text"]`
- `[href^="https"]`
- `[class*="btn"]`

### Pseudo-classes (toestand)
- `:hover`
- `:focus`
- `:active`
- `:visited`
- `:first-child`
- `:last-child`
- `:nth-child(n)`
- `:not(...)`

### Pseudo-elements (deel van een element)
- `::before`
- `::after`
- `::first-letter`
- `::first-line`
- `::selection`

---

## 3) Veelvoorkomende waardetypes

- Keywords: `block`, `none`, `auto`, `center`, `bold`
- Lengtes: `px`, `%`, `em`, `rem`, `vw`, `vh`
- Kleuren: `red`, `#ff0000`, `rgb(...)`, `hsl(...)`
- Tijd: `s`, `ms`
- Functies: `var()`, `calc()`, `url()`, `linear-gradient()`

---

## 4) Typography properties

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

## 5) Box model en spatiëring

- `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`
- `padding`, `padding-top/right/bottom/left`
- `margin`, `margin-top/right/bottom/left`
- `border`, `border-width`, `border-style`, `border-color`
- `border-radius`
- `box-sizing`
- `overflow`, `overflow-x`, `overflow-y`

---

## 6) Achtergrond en visuele stijl

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

## 7) Layout properties

### Display en position
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

## 8) Interactie en beweging

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
- Veelgebruikte breakpoints (`max-width: 768px`, `max-width: 1024px`)
- Vloeiende eenheden: `%`, `rem`, `vw`, `vh`
- `max-width: 100%` voor afbeeldingen

---

## 10) Hergebruik en organisatie

- CSS-variabelen: `--name` en `var(--name)`
- Sectiecomments: `/* Buttons */`
- Herbruikbare class names
- Houd bestanden gegroepeerd per component of sectie

---

## 11) Handige shortcuts (shorthand)

- `margin: 10px 20px;`
- `padding: 8px 12px;`
- `border: 1px solid #333;`
- `font: italic 700 16px/1.4 Arial, sans-serif;`
- `background: #111 url("img.jpg") center/cover no-repeat;`

---

## 12) Onthoud dit

Je hoeft niet alles vanbuiten te leren.

Een sterk pad is:
1. Leer selectors
2. Leer spatiëring en tekst
3. Leer layout (flexbox en grid)
4. Gebruik deze pagina als snelle lookup
