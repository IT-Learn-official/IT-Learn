# Branches, Merging, and Conflicts

A branch is a separate line of work.
It lets you try changes without touching `main`.

Create a branch and switch to it:

```bash
git switch -c feature/navbar
```

When you are done, merge back into `main`:

```bash
git switch main
git merge feature/navbar
```

---

A **merge conflict** happens when Git cannot auto-combine changes (often the same lines).
In VS Code you can pick:

- current change
- incoming change
- both

Then you commit the merge.
