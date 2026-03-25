# Goede gewoontes: nette geschiedenis en duidelijke berichten

Git-geschiedenis is voor mensen.
Maak ze makkelijk om te lezen.

Goede commitboodschappen zijn kort en specifiek:

- slecht: `i did something cool`
- goed: `Fix navbar spacing on mobile`

Probeer commits klein te houden: één idee per commit.

---

De meeste repo's hebben een `README.md`.
Zelfs 5 regels helpen mensen het project te begrijpen.

Als je een stabiel punt bereikt, kan je een tag zetten:

```bash
git tag v1.0.0
```

en daarna kan je die tag pushen:

```bash
git push origin v1.0.0
```

In VS Code: kijk altijd naar de diff vóór je commit.
