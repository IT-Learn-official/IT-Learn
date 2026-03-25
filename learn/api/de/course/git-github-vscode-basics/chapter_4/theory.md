# Branches, Mergen und Konflikte

Ein Branch ist eine eigene Arbeitslinie.
Damit kannst du Änderungen ausprobieren, ohne `main` anzufassen.

Erstelle einen Branch und wechsle hinein:

```bash
git switch -c feature/navbar
```

Wenn du fertig bist, merge zurück nach `main`:

```bash
git switch main
git merge feature/navbar
```

---

Ein **Merge-Konflikt** passiert, wenn Git Änderungen nicht automatisch zusammenführen kann (oft dieselben Zeilen).
In VS Code kannst du wählen:
- aktuelle Änderung
- eingehende Änderung
- beides

Danach commitest du den Merge.
