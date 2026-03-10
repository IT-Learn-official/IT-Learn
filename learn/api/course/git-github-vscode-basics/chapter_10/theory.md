# Git Cheat Sheet (Quick Commands)

You do not need to memorize everything.
Use this as a quick reminder.

## Daily Loop

```bash
git status
git add <file-name>
git commit -m "Message"
```

## History and Diffs

```bash
git log --oneline
git diff
```

## Branches

```bash
git branch
git switch -c feature/name
git switch main
git merge feature/name
```

## GitHub Sync

```bash
git pull origin main
git push -u origin main
```

## Undo

```bash
git restore file.txt
git revert <commit-id>
git stash
git stash pop
```

