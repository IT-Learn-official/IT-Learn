# Git und VS Code einrichten

Du kannst Git an zwei Stellen nutzen:
- im Terminal (Befehle)
- in VS Code (Buttons + Diffs)

Bevor du startest, setze deinen Git-Namen und deine E-Mail.
Das schreibt Git in deine Commits.

```bash
git config --global user.name "Dein Name"
git config --global user.email "du@example.com"
```

Das ist nicht dein GitHub-Passwort.
Es ist nur deine Commit-Signatur.

---

In VS Code öffne **Source Control**, um:
- geänderte Dateien zu sehen
- Änderungen zu stagen
- Commit-Nachrichten zu schreiben

Diff-Farben bedeuten meistens:
- grün = hinzugefügt
- rot = entfernt

Eine Warnung: Der Ordner `.git` speichert die Historie.
Wenn du `.git` löschst, ist die Repo-Historie weg.
