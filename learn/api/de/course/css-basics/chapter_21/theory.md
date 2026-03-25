# CSS-Spickzettel

Dieser Spickzettel deckt die wichtigsten CSS-Konzepte, Properties und Values ab. Verwende ihn, wenn du etwas kurz nachschlagen willst.

## 1) Form einer CSS-Regel

Jede CSS-Regel folgt diesem Muster:

```css
selector {
  property: value;
}
```

- selector = worauf du zielst
- property = was du änderst
- value = was du setzt
- declaration = eine Property/Value-Zeile

---

## 2) Selektor-Typen

### Basis-Selektoren
- `*` (alle Elemente)
- `p`, `h1`, `button` (Element-Selektor)
- `.card`, `.menu-item` (Class-Selektor)
- `#header`, `#main` (ID-Selektor)

### Gruppieren
- `h1, h2, h3`

### Beziehungs-Selektoren
- `div p` (descendant)
- `ul > li` (direct child)
- `h2 + p` (next sibling)
- `h2 ~ p` (general sibling)

### Attribute-Selektoren
- `[disabled]`
- `[type="text"]`
- `[href^="https"]`
- `[class*="btn"]`

### Pseudo-Classes (Zustand)
- `:hover`
- `:focus`
- `:active`
- `:visited`
- `:first-child`
- `:last-child`
- `:nth-child(n)`
- `:not(...)`

### Pseudo-Elements (Teil eines Elements)
- `::before`
- `::after`
- `::first-letter`
- `::first-line`
- `::selection`

---

## 3) Häufige Value-Typen

- Keywords: `block`, `none`, `auto`, `center`, `bold`
- Längen: `px`, `%`, `em`, `rem`, `vw`, `vh`
- Farben: `red`, `#ff0000`, `rgb(...)`, `hsl(...)`
- Zeit: `s`, `ms`
- Funktionen: `var()`, `calc()`, `url()`, `linear-gradient()`

---

## 4) Typografie-Properties

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

## 5) Box-Model und Abstände

- `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`
- `padding`, `padding-top/right/bottom/left`
- `margin`, `margin-top/right/bottom/left`
- `border`, `border-width`, `border-style`, `border-color`
- `border-radius`
- `box-sizing`
- `overflow`, `overflow-x`, `overflow-y`

---

## 6) Hintergrund und visueller Stil

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

## 7) Layout-Properties

### Display und Position
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

## 8) Interaktion und Bewegung

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

- `@media` Queries
- Häufige Breakpoints (`max-width: 768px`, `max-width: 1024px`)
- Fluid Units: `%`, `rem`, `vw`, `vh`
- `max-width: 100%` für Bilder

---

## 10) Wiederverwendung und Organisation

- CSS-Variablen: `--name` und `var(--name)`
- Abschnitts-Kommentare: `/* Buttons */`
- Wiederverwendbare Class Names
- Dateien nach Komponente oder Abschnitt gruppieren

---

## 11) Nützliche Kurzschreibweisen (Shorthand)

- `margin: 10px 20px;`
- `padding: 8px 12px;`
- `border: 1px solid #333;`
- `font: italic 700 16px/1.4 Arial, sans-serif;`
- `background: #111 url("img.jpg") center/cover no-repeat;`

---

## 12) Merke dir das

Du musst nicht alles auswendig können.

Ein guter Weg ist:
1. Selektoren lernen
2. Abstände und Text lernen
3. Layout lernen (Flexbox und Grid)
4. Diese Seite als schnellen Lookup verwenden
