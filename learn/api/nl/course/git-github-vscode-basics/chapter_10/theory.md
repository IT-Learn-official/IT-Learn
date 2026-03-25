# Git-spiekbrief (snelle commando's)

Je hoeft niet alles vanbuiten te kennen.
Gebruik dit als snelle herinnering.

## Dagelijkse loop

```bash
git status
git add <file-name>
git commit -m "Message"
```

## Geschiedenis en diffs

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

## GitHub sync

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

