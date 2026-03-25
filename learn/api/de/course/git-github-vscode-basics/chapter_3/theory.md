# Dein erstes Repo: Status, Add, Commit

Git-Arbeit ist meistens derselbe Ablauf:
prüfen -> auswählen -> speichern.

1. **Prüfen**: `git status` zeigt, was sich geändert hat.
2. **Auswählen**: `git add` staged, was du speichern willst.
3. **Speichern**: `git commit` erstellt einen Schnappschuss.

Kleines Beispiel:

```bash
git status
git add index.html
git commit -m "Homepage-Titel hinzufügen"
```

---

Historie ansehen:

```bash
git log --oneline
```

Damit du keinen Müll (oder Secrets) commitest, verwende `.gitignore`:

```gitignore
node_modules/
.env
dist/
```

So würde git ignorieren:

- `node_modules/` (riesiger Ordner mit Dependencies)
- `.env` (Datei mit Secrets)
- `dist/` (kompilierter Code, den du nicht direkt bearbeitest)
