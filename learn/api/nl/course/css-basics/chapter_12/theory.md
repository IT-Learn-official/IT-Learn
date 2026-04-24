# Flexbox voor beginners

Flexbox is een eenvoudige manier om items netjes uit te lijnen.

Zet eerst flexbox aan op de parent:

```css
.container {
  display: flex;
}
```

Gebruik daarna properties zoals `justify-content`, `align-items` en `gap`.

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
```

Het is één van de meest bruikbare layout-tools in CSS.
