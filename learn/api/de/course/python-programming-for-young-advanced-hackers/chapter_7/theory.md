# Kapitel 7: Zahlen, Mathe‑Superkräfte und kontrolliertes Chaos – Python das harte Denken machen lassen

Willkommen zurück, Hacker. Bis jetzt hast du Zahlen für Basics verwendet: Scores, Counter, vielleicht ein paar Ports. Jetzt drehen wir den Regler hoch.

In diesem Kapitel machst du Python zu einem **smarten Taschenrechner**, der:

- mit präzisen Messwerten arbeiten kann,
- Wachstum/Explosionen in Damage oder Daten modelliert,
- und genau genug **Randomness** einbaut, damit es sich wie ein echtes Game oder ein reales System anfühlt.

Denk an: Loot‑Chancen, zufällige Gegner, Guessing‑Games und sogar daran, wie viele Passwörter du bei einem Brute‑Force‑Angriff probieren müsstest.

Am Ende dieses Kapitels kannst du:

- Den Unterschied zwischen **Integers** und **Floats** in echten Use‑Cases verstehen.
- Exponenten (`**`) nutzen, um schnelles Wachstum zu modellieren (z. B. Passwort‑Kombinationen).
- Das **`math`‑Modul** verwenden: Square Roots, `pi`, usw.
- Sauber runden mit `round()`, `math.floor()` und `math.ceil()`.
- `abs()` verwenden, um Abstände und Differenzen zu messen.
- Das **`random`‑Modul** nutzen, um unvorhersehbares Verhalten einzubauen.

---

## 1. Mehr als Basiszahlen: warum das wichtig ist

Du addierst nicht mehr nur. Mit ein bisschen Mathe kannst du:

- schätzen, wie viele Passwort‑Kombinationen es gibt,
- eine Critical‑Hit‑Chance in einem Game simulieren,
- Distanzen zwischen Spielern auf einer 2D‑Map berechnen,
- entscheiden, ob du bei einem Zufalls‑Event „Glück“ hattest.

Diese Tools stecken in allem: von TikToks „For You“‑Randomness bis zum Matchmaking in Online‑Games.

---

## 2. Integers (`int`) vs Floats (`float`)

Ein echter Hacker weiß genau, **welche Art von Zahl** er gerade hat.

- **Integers (`int`)**: ganze Zahlen.
  - Beispiele: `-3`, `0`, `42`
  - gut für: Lives, Login‑Versuche, Level, Anzahl verpasster Anrufe.

- **Floats (`float`)**: Zahlen mit Dezimalpunkt.
  - Beispiele: `3.14`, `-0.5`, `10.0`
  - gut für: Win‑Rate (`63.5%`), Zeit in Sekunden, Distanz, präzise HP.

Merke dir die Divisions‑Operatoren:

- `/` – normale Division, liefert immer **float**:

  ```python
  print(10 / 4)  # 2.5
  ```

- `//` – Integer Division, schneidet die Nachkommastellen ab:

  ```python
  print(10 // 4)  # 2
  ```

- `%` – Modulo, liefert den **Rest**:

  ```python
  print(10 % 4)   # 2
  ```

Konvertierungen:

```python
float(5)   # 5.0
int(5.9)   # 5  (truncates, doesn’t round)
```

> Key takeaway: Nutze `int`, wenn du Dinge zählst, und `float`, wenn Präzision zählt.

---

## 3. Exponenten (`**`): der Power‑Operator

Exponenten sind für „multipliziere das mit sich selbst – mehrmals“.

```python
print(2 ** 3)   # 8  (2 * 2 * 2)
print(2 ** 10)  # 1024 (very common in computing)
print(10 ** 6)  # 1000000
```

Warum ist das nützlich?

- Anzahl möglicher Passwort‑Kombinationen.
- Damage, der mit Level wächst (`damage = base * (1.1 ** level)`).
- Datenwachstum (Storage, Spieler online, …).

Beispiel: Wie viele mögliche 8‑stellige PINs mit Ziffern 0–9?

```python
options_per_digit = 10
pin_length = 8

combinations = options_per_digit ** pin_length
print(combinations)
```

Diese riesige Zahl zeigt, warum schlechte Passwörter eine richtig schlechte Idee sind.

---

## 4. Das `math`‑Modul: extra Tools in der Toolbox

Python liefert ein Modul namens `math` mit – mit fortgeschritteneren Funktionen.

Zuerst importieren:

```python
import math
```

### Square Roots mit `math.sqrt()`

Square Roots brauchst du oft bei Distanz‑Berechnungen. Wenn du schon mal Formeln für Abstand auf einer Map gesehen hast: genau das.

```python
import math

print(math.sqrt(25))     # 5.0
print(math.sqrt(10000))  # 100.0
```

Stell dir eine 2D‑Game‑Map vor: Player bei `(0, 0)`, Gegner bei `(3, 4)`. Die Distanz ist:

```python
import math

x1, y1 = 0, 0
x2, y2 = 3, 4

 dx = x2 - x1
 dy = y2 - y1

 distance = math.sqrt(dx ** 2 + dy ** 2)
print(distance)  # 5.0
```

Das ist wortwörtlich der Satz des Pythagoras – in vielen Game‑Engines.

### Pi mit `math.pi`

`math` gibt dir auch einen präzisen Wert für π (Pi):

```python
import math

radius = 10
# Circumference = 2 * pi * r
circumference = 2 * math.pi * radius
print(circumference)
```

Nützlich für Kreise, Rotation und alles, was „rund“ ist.

---

## 5. Runden: `round()`, `floor()` und `ceil()`

Dezimalstellen sind gut, aber manchmal willst du ganze Zahlen. Python gibt dir mehrere Optionen.

### `round()`: normales Runden

```python
print(round(4.7))        # 5
print(round(4.3))        # 4
print(round(3.14159, 2)) # 3.14
```

Du kannst angeben, wie viele Dezimalstellen bleiben sollen.

### `math.floor()`: immer nach unten

```python
import math

print(math.floor(4.999))  # 4
```

Beispiel: Wie viele **volle** Gruppen zu 4 Schülern kannst du aus 19 machen?

### `math.ceil()`: immer nach oben

```python
import math

print(math.ceil(4.001))   # 5
```

Beispiel: Ausflug – ein Bus kann 50 Schüler. Du hast 101:

```python
import math

students = 101
capacity_per_bus = 50

buses_needed = math.ceil(students / capacity_per_bus)
print(buses_needed)  # 3
```

> Key takeaway: `round()` = normal; `floor()` = immer runter; `ceil()` = immer rauf.

---

## 6. `abs()`: Abstand ohne Richtung

`abs()` gibt dir den **absoluten Wert** – wie weit eine Zahl von 0 weg ist.

```python
print(abs(-10))  # 10
print(abs(10))   # 10
```

Super für „wie weit daneben“:

```python
secret_number = 50
player_guess = 35

distance = abs(secret_number - player_guess)
print("You were", distance, "away from the secret number!")
```

Perfekt für Hinweise im Guessing‑Game:

- „Du bist sehr nah!“
- „Du bist weit weg…“

---

## 7. Das `random`‑Modul: kontrolliertes Chaos

Computer sind normalerweise vorhersehbar. Mit `random` baust du **kontrolliertes Chaos** ein – perfekt für Games, Simulationen oder zufällige Testdaten.

Zuerst importieren:

```python
import random
```

### `random.randint(a, b)`: zufällige Zahl in einem Bereich

```python
import random

# Roll a 6-sided die
dice_roll = random.randint(1, 6)
print("You rolled a", dice_roll)

# Pick a random port number
port = random.randint(1024, 49151)
print("Random port:", port)
```

### `random.choice(sequence)`: zufälliges Element wählen

```python
import random

replies = [
    "Access Granted",
    "Access Denied",
    "Connection Timed Out"
]

response = random.choice(replies)
print(response)
```

Das kannst du nutzen, um:

- eine „zufällige Strafe“ vom Lehrer zu ziehen (Scherz… meistens),
- zufällig einen Freund aus einer Liste einzuladen,
- zufälliges Gegner‑Verhalten zu simulieren.

### `random.random()`: zufälliger Float zwischen 0.0 und 1.0

```python
import random

# 30% chance of a critical hit
if random.random() < 0.30:
    print("Critical Hit!")
else:
    print("Normal Hit.")
```

Dieses Muster wird überall für Wahrscheinlichkeiten verwendet.

---

## 8. Mini‑Games mit Randomness

Du hast jetzt genug Tools für kleine Terminal‑„Games“. Zwei Klassiker:

### Number Guessing Game

- Der Computer wählt eine Geheimzahl:

  ```python
  import random

  secret = random.randint(1, 100)
  ```

- Der Player rät immer wieder.
- Mit `abs()` sagst du, wie weit er daneben liegt.
- Ende, wenn er richtig rät.

### Dice Rolling Simulator

- Frag, wie viele Würfel gerollt werden sollen.
- `for`‑Loop + `random.randint(1, 6)` pro Würfel.
- Jeden Wurf + Gesamtsumme ausgeben.

Klein, aber aus **denselben Zutaten** wie echte Games und Simulationen gebaut.

---

## Zusammenfassung

- **`int` vs `float`**: ints für Counts, floats für präzise Werte.
- **`**`\*\*: Exponent‑Operator für schnelles Wachstum.
- **`math`‑Modul**: Tools wie `sqrt()` und `pi`.
- **Runden**:
  - `round()` – normal,
  - `math.floor()` – immer runter,
  - `math.ceil()` – immer rauf.
- **`abs()`**: misst Abstand zwischen Zahlen ohne Richtung.
- **`random`‑Modul** bringt Unvorhersehbarkeit:
  - `randint(a, b)` – zufällige Zahl im Bereich,
  - `choice(sequence)` – zufälliges Element aus einer Liste,
  - `random()` – zufälliger Float für Wahrscheinlichkeiten.

> Achievement Unlocked: Du kannst jetzt Pythons Mathe‑Superkräfte und Randomness nutzen, um smartere Tools, Simulationen und Games zu bauen – nicht nur langweilige Rechner.
