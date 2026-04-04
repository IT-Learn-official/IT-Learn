# Box-Sizing und Borders

`box-sizing` ändert, wie Breite und Höhe berechnet werden.

Standardmäßig verwendet CSS `content-box`.
Viele Entwickler wechseln zu `border-box`, weil Layout damit einfacher wird.

```css
* {
  box-sizing: border-box;
}
```

Mit `border-box` umfasst die Breite content, padding und border.

```css
.box {
  border: 2px solid blue;
}
```

Diese border-Zeile ist eine Kurzschreibweise für Breite, Stil und Farbe.
