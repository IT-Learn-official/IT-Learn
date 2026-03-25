# Your First Repo: Status, Add, Commit

Git work is usually the same loop:
check -> select -> save.

1. **Check**: `git status` shows what changed.
2. **Select**: `git add` stages what you want to save.
3. **Save**: `git commit` creates a snapshot.

Small example:

```bash
git status
git add index.html
git commit -m "Add homepage title"
```

---

To see history:

```bash
git log --oneline
```

To avoid committing junk (or secrets), use `.gitignore`:

```gitignore
node_modules/
.env
dist/
```

This way, git would ignore:
- `node_modules/` (huge folder with dependencies)
- `.env` (file with secrets)
- `dist/` (compiled code you don't edit)