# Je eerste repo: status, add, commit

Git-werk is meestal dezelfde lus:
check -> selecteer -> bewaar.

1. **Check**: `git status` toont wat er veranderde.
2. **Selecteer**: `git add` staged wat je wilt bewaren.
3. **Bewaar**: `git commit` maakt een momentopname.

Klein voorbeeld:

```bash
git status
git add index.html
git commit -m "Homepage-titel toevoegen"
```

---

Geschiedenis bekijken:

```bash
git log --oneline
```

Om geen rommel (of secrets) te committen, gebruik je `.gitignore`:

```gitignore
node_modules/
.env
dist/
```

Dan zou git dit negeren:

- `node_modules/` (gigantische map met dependencies)
- `.env` (bestand met secrets)
- `dist/` (gecompileerde code die je niet rechtstreeks bewerkt)
