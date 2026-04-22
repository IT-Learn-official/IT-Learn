# Semantisches HTML

Semantisches HTML verwendet aussagekräftige Tags, um Inhalte zu strukturieren.
Arten semantischer Elemente:

- `<header>`: Einleitender Inhalt, oft mit Logo, Seitentitel und Navigation.
- `<nav>`: Navigationslinks.
- `<main>`: Hauptinhalt der Seite, pro Seite einzigartig.
- `<section>`: Thematische Gruppierung von Inhalt, kann mehrfach vorkommen.
- `<article>`: In sich geschlossener Inhalt, z. B. ein Blogpost oder News-Artikel.
- `<footer>`: Footer-Inhalt, oft mit Copyright und Kontaktinfos.

So wird semantisches HTML verwendet (Beispiel):

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

Das ergibt eine Seite mit einem Header (Titel + Navigation), einem Main-Bereich mit einem Article und einer verwandten Section sowie einem Footer mit Copyright-Infos.
