# Flexbox für Anfänger

Flexbox ist ein einfacher Weg, Elemente sauber auszurichten.

Aktiviere zuerst Flexbox am Parent:

```css
.container {
  display: flex;
}
```

Dann nutzt du Properties wie `justify-content`, `align-items` und `gap`.

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
```

Das ist eines der nützlichsten Layout-Tools in CSS.
