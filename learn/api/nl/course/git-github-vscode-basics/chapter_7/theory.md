# Fouten ongedaan maken (zonder paniek)

Fouten gebeuren. Git heeft tools om dingen terug te draaien.

Als je nog niet gecommit hebt, kan je wijzigingen in een bestand weggooien:

```bash
git restore path/to/file.txt
```

Als je al gepusht hebt, is de veilige manier meestal:

```bash
git revert <commit-id>
```

Revert maakt een nieuwe commit die een oudere ongedaan maakt.

---

Moet je van branch wisselen maar wil je je rommelwerk behouden?

```bash
git stash
git stash pop
```

Tip: `git reset` kan geschiedenis herschrijven, dus wees voorzichtig op gedeelde branches.
