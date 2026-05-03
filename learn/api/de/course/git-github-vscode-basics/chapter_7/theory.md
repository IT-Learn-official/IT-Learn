# Fehler rückgängig machen (ohne Panik)

Fehler passieren. Git hat Tools zum Rückgängigmachen.

Wenn du noch nicht committed hast, kannst du Änderungen an einer Datei verwerfen:

```bash
git restore path/to/file.txt
```

Wenn du schon gepusht hast, ist der sichere Undo meistens:

```bash
git revert <commit-id>
```

Revert erstellt einen neuen Commit, der einen älteren rückgängig macht.

---

Du musst den Branch wechseln, willst aber deine unfertige Arbeit behalten?

```bash
git stash
git stash pop
```

Tipp: `git reset` kann Historie umschreiben, also sei vorsichtig bei gemeinsamen Branches.
