# Git-Spickzettel (Kurzbefehle)

Du musst dir nicht alles merken.
Nutze das als schnelle Erinnerung.

## Alltagsschleife

```bash
git status
git add <file-name>
git commit -m "Message"
```

## Historie und Diffs

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

## GitHub-Sync

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
