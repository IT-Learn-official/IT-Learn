# Links

Links are created with an `<a>` tag, which stands for "anchor". The `href` attribute specifies the destination of your link. 

It works like this:
```html
<a href="https://www.example.com">Visit Example</a>
```
In this case, a link is created that says "Visit Example". When the user clicks it, they will visit the website at https://www.example.com.

---

If you want the link to open in a new tab, you can add the `target="_blank"` attribute:
```html
<a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Visit Example</a>
```
This will open the link in a new tab. This is useful for links that take users away from your site, so they can easily return.

When using target="_blank", it's a best practice to also add `rel="noopener noreferrer"` to prevent potential security issues (reverse tabnabbing). This is especially important for educational content.