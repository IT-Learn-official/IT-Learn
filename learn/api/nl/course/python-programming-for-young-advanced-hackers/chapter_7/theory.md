# Hoofdstuk 7: Getallen, math‑superkrachten en gecontroleerde chaos – Python het zware denkwerk laten doen

Welkom terug, hacker. Tot nu toe gebruikte je getallen voor basic stuff: scores, counters, misschien een paar ports. Nu draaien we de knop omhoog.

In dit hoofdstuk maak je van Python een **slimme rekenmachine** die:

- met precieze metingen kan werken,
- groei/explosies in damage of data kan modelleren,
- en net genoeg **randomness** kan toevoegen zodat het aanvoelt als een echte game of een real‑world systeem.

Denk aan: loot‑kansen, random opponents, guessing games, en zelfs hoeveel wachtwoorden je zou moeten proberen in een brute‑force aanval.

Tegen het einde van dit hoofdstuk kan je:

- Het verschil begrijpen tussen **integers** en **floats** in echte use cases.
- Exponenten (`**`) gebruiken om snelle groei te modelleren (zoals wachtwoordcombinaties).
- De **`math` module** gebruiken voor tools zoals square roots en `pi`.
- Netjes afronden met `round()`, `math.floor()` en `math.ceil()`.
- `abs()` gebruiken om afstanden en verschillen te meten.
- De **`random` module** gebruiken voor onvoorspelbaar gedrag.

---

## 1. Verder dan basisgetallen: waarom dit telt

Je bent niet meer alleen aan het optellen en aftrekken. Met een beetje wiskunde kan je:

- schatten hoeveel wachtwoordcombinaties er bestaan,
- een critical hit chance simuleren in een game,
- afstanden berekenen tussen spelers op een 2D‑map,
- beslissen of je “geluk” had in een random event.

Deze tools zitten in alles: van TikTok’s “For You”‑randomness tot matchmaking in online games.

---

## 2. Integers (`int`) vs floats (`float`)

Een echte hacker weet exact **welk soort getal** hij gebruikt.

- **Integers (`int`)**: hele getallen.
  - voorbeelden: `-3`, `0`, `42`
  - goed voor: lives, login attempts, level, gemiste oproepen.

- **Floats (`float`)**: getallen met decimalen.
  - voorbeelden: `3.14`, `-0.5`, `10.0`
  - goed voor: win rate (`63.5%`), tijd in seconden, afstand, precieze HP.

Onthoud de deel‑operatoren:

- `/` – gewone deling, geeft altijd een **float**:

  ```python
  print(10 / 4)  # 2.5
  ```

- `//` – integer division, kapt de decimalen af:

  ```python
  print(10 // 4)  # 2
  ```

- `%` – modulo, geeft de **rest**:

  ```python
  print(10 % 4)   # 2
  ```

Conversies:

```python
float(5)   # 5.0
int(5.9)   # 5  (truncates, doesn’t round)
```

> Key takeaway: Gebruik `int` wanneer je dingen telt, en `float` wanneer precisie belangrijk is.

---

## 3. Exponenten (`**`): de power‑operator

Exponenten zijn voor “vermenigvuldig dit met zichzelf, meerdere keren”.

```python
print(2 ** 3)   # 8  (2 * 2 * 2)
print(2 ** 10)  # 1024 (very common in computing)
print(10 ** 6)  # 1000000
```

Waarom is dit nuttig?

- Aantal combinaties voor een wachtwoord.
- Damage die mee groeit met level (`damage = base * (1.1 ** level)`).
- Datagroei in storage, spelers online, enz.

Voorbeeld: hoeveel mogelijke 8‑cijferige PIN’s met cijfers 0–9?

```python
options_per_digit = 10
pin_length = 8

combinations = options_per_digit ** pin_length
print(combinations)
```

Dat enorme getal is waarom slechte wachtwoorden echt een slecht idee zijn.

---

## 4. De `math` module: extra tools in je toolbox

Python heeft een module `math` met extra (wat meer geavanceerde) functies.

Eerst importeer je die:

```python
import math
```

### Square roots met `math.sqrt()`

Square roots gebruik je vaak in afstandsberekeningen. Als je ooit formules zag voor afstand op een map: dit is het.

```python
import math

print(math.sqrt(25))     # 5.0
print(math.sqrt(10000))  # 100.0
```

Stel dat je op een 2D‑game map staat op `(0, 0)` en de enemy op `(3, 4)`. De afstand is:

```python
import math

x1, y1 = 0, 0
x2, y2 = 3, 4

 dx = x2 - x1
 dy = y2 - y1

 distance = math.sqrt(dx ** 2 + dy ** 2)
print(distance)  # 5.0
```

Dit is letterlijk de stelling van Pythagoras die in veel game engines draait.

### Pi met `math.pi`

`math` geeft je ook een precieze waarde voor π (pi):

```python
import math

radius = 10
# Circumference = 2 * pi * r
circumference = 2 * math.pi * radius
print(circumference)
```

Handig voor cirkels, rotaties en elke vorm van cirkelbeweging.

---

## 5. Afronden: `round()`, `floor()` en `ceil()`

Decimalen zijn leuk, maar soms wil je gewoon hele getallen. Python heeft meerdere opties.

### `round()`: normaal afronden

```python
print(round(4.7))        # 5
print(round(4.3))        # 4
print(round(3.14159, 2)) # 3.14
```

Je kan aan `round()` zeggen hoeveel decimalen je wil houden.

### `math.floor()`: altijd naar beneden

```python
import math

print(math.floor(4.999))  # 4
```

Voorbeeld: als je wil tellen hoeveel **volledige** groepjes van 4 leerlingen je kan maken uit 19.

### `math.ceil()`: altijd naar boven

```python
import math

print(math.ceil(4.001))   # 5
```

Voorbeeld: schooluitstap, elke bus kan 50 leerlingen meenemen. Je hebt 101 leerlingen:

```python
import math

students = 101
capacity_per_bus = 50

buses_needed = math.ceil(students / capacity_per_bus)
print(buses_needed)  # 3
```

> Key takeaway: `round()` = normaal; `floor()` = altijd naar beneden; `ceil()` = altijd naar boven.

---

## 6. `abs()`: afstand zonder richting

`abs()` geeft je de **absolute waarde** – hoe ver iets van nul ligt.

```python
print(abs(-10))  # 10
print(abs(10))   # 10
```

Superhandig om te berekenen “hoe ver je ernaast zit”:

```python
secret_number = 50
player_guess = 35

distance = abs(secret_number - player_guess)
print("You were", distance, "away from the secret number!")
```

Ideaal in een guessing game om hints te geven:

- “Je zit heel dicht!”
- “Je zit ver weg…”

---

## 7. De `random` module: gecontroleerde chaos

Computers zijn normaal voorspelbaar. Met de `random` module voeg je **gecontroleerde chaos** toe—perfect voor games, simulaties of random test data.

Eerst importeer je die:

```python
import random
```

### `random.randint(a, b)`: random integer in een bereik

```python
import random

# Roll a 6-sided die
dice_roll = random.randint(1, 6)
print("You rolled a", dice_roll)

# Pick a random port number
port = random.randint(1024, 49151)
print("Random port:", port)
```

### `random.choice(sequence)`: kies een random item

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

Je kan dit gebruiken om:

- een random straf van je leerkracht te kiezen (grapje… meestal),
- random een vriend uit een lijst te kiezen om uit te nodigen,
- random enemy behaviour te simuleren.

### `random.random()`: random float tussen 0.0 en 1.0

```python
import random

# 30% chance of a critical hit
if random.random() < 0.30:
    print("Critical Hit!")
else:
    print("Normal Hit.")
```

Dit patroon wordt overal gebruikt voor kansen/probabilities.

---

## 8. Mini‑games met randomness

Je hebt nu genoeg tools om simpele terminal‑games te maken. Twee klassiekers:

### Number guessing game

- De computer kiest een geheim getal:

  ```python
  import random

  secret = random.randint(1, 100)
  ```

- De speler blijft gokken.
- Je gebruikt `abs()` om te tonen hoe ver hij zit.
- Je stopt wanneer hij correct raadt.

### Dice rolling simulator

- Vraag hoeveel dobbelstenen je moet rollen.
- Gebruik een `for` loop en `random.randint(1, 6)` voor elke dobbelsteen.
- Toon elke roll en de totale som.

Ze voelen klein, maar ze zijn gemaakt uit **exact dezelfde ingrediënten** als echte games en simulaties.

---

## Samenvatting

- **`int` vs `float`**: ints voor counts, floats voor precieze waarden.
- **`**`\*\*: exponent‑operator om snelle groei te modelleren.
- **`math` module**: extra tools zoals `sqrt()` en `pi`.
- **Afronden**:
  - `round()` – normaal,
  - `math.floor()` – altijd naar beneden,
  - `math.ceil()` – altijd naar boven.
- **`abs()`**: meet afstand tussen getallen zonder richting.
- **`random` module** geeft onvoorspelbaarheid:
  - `randint(a, b)` – random integer in een bereik,
  - `choice(sequence)` – random element uit een lijst,
  - `random()` – random float voor kans‑checks.

> Achievement Unlocked: Je kan nu Pythons math‑superkrachten én randomness gebruiken om slimmere tools, simulaties en games te bouwen—niet alleen saaie rekenmachientjes.
