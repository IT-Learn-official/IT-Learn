# Images

Images make your website more fun to look at, and they help you reach your goals. To add an image, we use the `<img>` tag. This tag is self-closing, which means it doesn't need a separate closing tag like `<p>` or `<h1>`. You just write `<img>` and include the necessary attributes inside.

---

Attributes:
- `src`: This is the source of your image. You can use 2 types of paths:
  - Relative path: This points to an image file in your project folder. For example, if you have an `images` folder with a file named `photo.jpg`, you would write `<img src="images/photo.jpg">`.
  - Absolute URL: This points to an image hosted on the web. For example: `<img src="https://example.com/photo.jpg">`.
- `alt`: This is the alternative text that describes the image. It’s important, since it helps blind users understand what the image is about. For example: `<img src="photo.jpg" alt="A beautiful sunset">`.

---

Example:
```html
<img src="https://example.com/photo.jpg" alt="A beautiful sunset">
```
The output would be something like this:
![A beautiful sunset.](https://cdn.shopify.com/s/files/1/0475/8513/2708/files/sebastien-gabriel--imlv9jlb24-unsplash-1.jpg?v=1734059829 "This is a sample image.")