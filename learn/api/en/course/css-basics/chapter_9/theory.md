# Box Sizing and Borders

`box-sizing` changes how width and height are calculated.

By default, CSS uses `content-box`.
Many developers switch to `border-box` because layout is easier.

```css
* {
  box-sizing: border-box;
}
```

With `border-box`, the width includes content, padding, and border.

```css
.box {
  border: 2px solid blue;
}
```

That border line is shorthand for width, style, and color.
