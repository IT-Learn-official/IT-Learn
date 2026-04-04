# Box sizing en borders

`box-sizing` verandert hoe breedte en hoogte berekend worden.

Standaard gebruikt CSS `content-box`.
Veel developers schakelen over naar `border-box`, omdat layout dan eenvoudiger wordt.

```css
* {
  box-sizing: border-box;
}
```

Met `border-box` zit de breedte inclusief content, padding en border.

```css
.box {
  border: 2px solid blue;
}
```

Die border-regel is shorthand voor breedte, stijl en kleur.
