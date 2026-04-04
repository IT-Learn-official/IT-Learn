# Missie: Raad het getal - afstand-hint

Doel

- Laat de computer een geheim getal kiezen en laat de gebruiker raden met feedback: te hoog/te laag + afstand.

Stappen

1. Open `attachments/guess_the_number_distance.py`.
2. Kies een geheim getal met `random.randint(1, 50)`.
3. Gebruik een `while`-loop om te blijven vragen tot het juist is.
4. Na elke foute gok:
   - Print of het **te hoog** of **te laag** is.
   - Bereken de afstand met `abs(secret - guess)` en print die.
5. Bij een juiste gok: print een kort succesbericht en stop.

Hints

- `import random`
- Gebruik `int(input(...))` om input om te zetten.
