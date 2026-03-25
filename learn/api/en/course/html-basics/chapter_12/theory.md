# Semantic HTML

Semantic HTML uses meaningful tags to structure content.
Types of semantic elements:

- `<header>`: Introductory content, often contains logo, site title, and navigation.
- `<nav>`: Navigation links.
- `<main>`: Main content of the page, unique per page.
- `<section>`: Thematic grouping of content, can be used multiple times.
- `<article>`: Self-contained composition, like a blog post or news article.
- `<footer>`: Footer content, often contains copyright and contact info.

How semantic HTML is used (example):

```html
<header>
  <h1>My Website</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <article>
    <h2>Blog Post Title</h2>
    <p>This is a blog post.</p>
  </article>
  <section>
    <h2>Related Articles</h2>
    <!-- more content -->
  </section>
</main>
<footer>
  <p>&copy; 2024 My Website</p>
</footer>
```

This would create a page with a header containing the site title and navigation, a main section with an article and a related section, and a footer with copyright info.
