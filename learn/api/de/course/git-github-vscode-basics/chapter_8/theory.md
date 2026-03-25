# Gute Gewohnheiten: saubere Historie und klare Messages

Git-Historie ist für Menschen.
Mach sie leicht lesbar.

Gute Commit-Messages sind kurz und konkret:

- schlecht: `i did something cool`
- gut: `Fix navbar spacing on mobile`

Versuche, Commits klein zu halten: eine Idee pro Commit.

---

Die meisten Repos haben eine `README.md`.
Schon 5 Zeilen helfen, das Projekt zu verstehen.

Wenn du einen stabilen Punkt erreichst, kannst du taggen:

```bash
git tag v1.0.0
```

und danach kannst du den Tag pushen:

```bash
git push origin v1.0.0
```

In VS Code: Schau vor dem Commit immer in den Diff.
