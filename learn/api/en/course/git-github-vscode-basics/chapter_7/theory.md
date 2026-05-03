# Undoing Mistakes (Without Panic)

Mistakes happen. Git has undo tools.

If you did not commit yet, you can throw away changes in a file:

```bash
git restore path/to/file.txt
```

If you already pushed, the safe undo is usually:

```bash
git revert <commit-id>
```

Revert makes a new commit that undoes an older one.

---

Need to switch branches but keep your messy work?

```bash
git stash
git stash pop
```

Tip: `git reset` can rewrite history, so be careful on shared branches.
