# Branches, mergen en conflicten

Een branch is een aparte werklijn.
Zo kan je iets uitproberen zonder `main` aan te raken.

Maak een branch en switch ernaartoe:

```bash
git switch -c feature/navbar
```

Als je klaar bent, merge je terug naar `main`:

```bash
git switch main
git merge feature/navbar
```

---

Een **mergeconflict** gebeurt wanneer Git wijzigingen niet automatisch kan samenvoegen (vaak dezelfde regels).
In VS Code kan je kiezen:

- huidige wijziging
- binnenkomende wijziging
- allebei

Daarna commit je de merge.
