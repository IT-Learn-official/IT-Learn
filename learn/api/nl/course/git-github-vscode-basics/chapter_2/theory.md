# Git en VS Code instellen

Je kan Git op twee plaatsen gebruiken:

- de terminal (commando's)
- VS Code (knoppen + diffs)

Voor je start, stel je Git-naam en e-mail in.
Dit zet Git in je commits.

```bash
git config --global user.name "Jouw Naam"
git config --global user.email "jij@example.com"
```

Dit is niet je GitHub-wachtwoord.
Het is gewoon je commit-handtekening.

---

In VS Code open je **Source Control** om:

- gewijzigde bestanden te zien
- wijzigingen te stagen
- commitboodschappen te schrijven

Diff-kleuren betekenen meestal:

- groen = toegevoegd
- rood = verwijderd

Een waarschuwing: de `.git`-map bewaart de geschiedenis.
Als je `.git` verwijdert, is de repo-geschiedenis weg.
