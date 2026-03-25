# Mission: Zahl raten - Distanz-Hinweis

Ziel
- Der Computer wählt eine Geheimzahl, du rätst: Feedback „zu hoch/zu niedrig“ plus Distanz.

Schritte
1. Öffne `attachments/guess_the_number_distance.py`.
2. Wähle eine Geheimzahl mit `random.randint(1, 50)`.
3. Nutze eine `while`-Schleife und frage so lange, bis die Zahl stimmt.
4. Nach jedem falschen Tipp:
   - Gib aus, ob der Tipp **zu hoch** oder **zu niedrig** ist.
   - Berechne die Distanz mit `abs(secret - guess)` und gib sie aus.
5. Bei richtig: gib eine kurze Erfolgsmeldung aus und stoppe.

Hinweise
- `import random`
- Nutze `int(input(...))` für die Eingabe.

