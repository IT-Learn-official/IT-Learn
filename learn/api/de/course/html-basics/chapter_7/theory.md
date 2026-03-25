# Links

Links erstellst du mit einem `<a>`-Tag („anchor“). Das `href`-Attribut legt das Ziel des Links fest.

So funktioniert es:

```html
<a href="https://www.example.com">Visit Example</a>
```

In diesem Fall wird ein Link mit dem Text „Visit Example“ erstellt. Wenn der User darauf klickt, öffnet er die Website https://www.example.com.

---

Wenn der Link in einem neuen Tab öffnen soll, kannst du `target="_blank"` hinzufügen:

```html
<a href="https://www.example.com" target="_blank" rel="noopener noreferrer"
  >Visit Example</a
>
```

Das öffnet den Link in einem neuen Tab. Das ist praktisch bei Links, die User von deiner Seite wegführen, damit sie leicht zurückkommen.

Wenn du `target="_blank"` verwendest, ist es Best Practice, auch `rel="noopener noreferrer"` zu setzen. Das verhindert mögliche Sicherheitsprobleme (reverse tabnabbing) – gerade in Lehrbeispielen ist das wichtig.
