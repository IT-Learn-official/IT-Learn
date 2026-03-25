# Semantische HTML

Semantische HTML gebruikt betekenisvolle tags om content te structureren.
Soorten semantische elementen:
- `<header>`: inleidende content, vaak met logo, sitetitel en navigatie.
- `<nav>`: navigatielinks.
- `<main>`: hoofdinhoud van de pagina, uniek per pagina.
- `<section>`: thematische groepering van content, kan meerdere keren voorkomen.
- `<article>`: op zichzelf staand stuk content, zoals een blogpost of nieuwsartikel.
- `<footer>`: footer-inhoud, vaak met copyright en contactinfo.

Hoe semantische HTML gebruikt wordt (voorbeeld):
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

Dit maakt een pagina met een header (met titel en navigatie), een main met een article en een gerelateerde section, en een footer met copyright-info.
