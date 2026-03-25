# Hoofdstuk 6: Operatoren en vergelijkingen – Python leren kiezen

Je hebt Python geleerd om data op te slaan; nu is het tijd om hem dingen te laten **doen** met die data. Operatoren zijn de symbolen die Python gebruikt om te rekenen, te vergelijken en te beslissen—zoals de regels in je favoriete game.

Als je wil weten:

- “Is mijn examenscore hoog genoeg om te slagen?”
- “Heb ik genoeg coins om die skin te kopen?”
- “Kan ik nog een match spelen, of is het al te laat?”

…dan ga je Python nu dezelfde decision‑making power geven.

Tegen het einde van dit hoofdstuk kan je:

- **Rekenoperatoren** gebruiken om berekeningen te maken.
- **Vergelijkingsoperatoren** gebruiken om `True`/`False`‑vragen te stellen.
- **Toekenningsoperatoren** gebruiken om variabelen netjes te updaten.
- Conditions combineren met **logische operatoren** om slimme regels te bouwen.
- Complexere expressies lezen als een pro en voorspellen wat ze doen.

---

## 1. Rekenoperatoren: je in‑game rekenmachine

Dit zijn de basis‑tools voor getallen. Je hebt er al een paar gezien, maar laten we de squad compleet maken:

- `+` : optellen
- `-` : aftrekken
- `*` : vermenigvuldigen
- `/` : delen (geeft altijd een `float`)
- `//` : integer division (gooit de decimalen weg)
- `%` : modulo (geeft de rest)
- `**` : exponent (macht)

```python
# 2 to the power of 4
print(2 ** 4)   # 16

# How many full teams of 3 can we make from 10 players?
print(10 // 3)  # 3

# How many players are left out?
print(10 % 3)   # 1
```

Zo bereken je bijvoorbeeld:

- hoeveel bussen je nodig hebt voor een schooluitstap,
- hoeveel packs je kan kopen met je coins,
- hoeveel damage een combo doet als power mee schaalt met level.

> Key takeaway: rekenoperatoren doen de wiskunde—van simpele schoolstuff tot game‑logica.

---

## 2. Vergelijkingsoperatoren: Python vragen stellen

Vergelijkingsoperatoren laten je **ja/nee**‑vragen stellen over je data. Het resultaat is altijd een boolean: `True` of `False`.

- `==` : is gelijk aan?
- `!=` : is niet gelijk aan?
- `<` : is kleiner dan?
- `>` : is groter dan?
- `<=` : is kleiner dan of gelijk aan?
- `>=` : is groter dan of gelijk aan?

Verwar `=` en `==` **niet**:

- `x = 5` → **assignment**: “stop 5 in `x`”.
- `x == 5` → **comparison**: “is `x` gelijk aan 5?”

```python
password = "password123"
print(password == "password123")  # True
print(password == "Password123")  # False (case-sensitive)

level = 10
print(level > 5)     # True
print(level != 10)   # False

exam_score = 14
print(exam_score >= 10)  # True, you passed (out of 20)
```

> Key takeaway: vergelijkingsoperatoren stellen vragen en geven `True`/`False`‑antwoorden die je kan gebruiken voor beslissingen.

---

## 3. Toekenningsoperatoren: waarden updaten als een pro

Je kent `=` al om een variabele een waarde te geven:

```python
score = 0
```

Maar vaak wil je een variabele **updaten** op basis van haar huidige waarde:

- `x = x + 1` → verhogen met 1
- `x = x - 5` → verlagen met 5

Python heeft hiervoor nette shortcuts: **augmented assignment operators**:

| Operator | Example        | Equivalent to          |
| -------- | -------------- | ---------------------- |
| `+=`     | `score += 10`  | `score = score + 10`   |
| `-=`     | `health -= 25` | `health = health - 25` |
| `*=`     | `mana *= 2`    | `mana = mana * 2`      |
| `/=`     | `speed /= 2`   | `speed = speed / 2`    |

```python
score = 100
# Player found a bonus
score += 50     # 150

health = 80
# Player took damage
health -= 30    # 50

study_hours = 2
# You decide to study twice as long (happens… sometimes)
study_hours *= 2   # 4
```

> Key takeaway: gebruik `+=`, `-=`, `*=` enz. als standaard om variabelen te updaten—korter en makkelijker leesbaar.

---

## 4. Logische operatoren: slimme regels bouwen

Logische operatoren laten je meerdere `True`/`False`‑voorwaarden combineren tot grotere regels, zoals:

> “Ik mag spelen **als** mijn huiswerk af is **en** het is vóór 22:00.”

Python heeft drie logische operatoren:

- `and` – **alle** voorwaarden moeten `True` zijn.
- `or` – **minstens één** voorwaarde moet `True` zijn.
- `not` – keert `True` ↔ `False` om.

### `and`: alles moet kloppen

```python
homework_done = True
time = 20  # 20:00

can_play = homework_done and time < 22
print(can_play)  # True
```

Als één kant `False` is, is de hele expressie `False`.

### `or`: minstens één voorwaarde

```python
has_sword = False
has_magic = True

can_fight = has_sword or has_magic
print(can_fight)  # True
```

Perfect voor regels zoals:

- “Je mag de server joinen als je admin **of** moderator bent.”

### `not`: omkeren

```python
is_muted = False

if not is_muted:
    print("Mic is live.")
```

### Combineren

Je kan logische operatoren combineren met haakjes om de volgorde te sturen:

```python
level = 15
has_premium = False

# Can access secret area if:
# (level >= 10 AND has premium) OR level >= 20
can_access = (level >= 10 and has_premium) or (level >= 20)
print(can_access)  # False, level is 15 and no premium
```

> Key takeaway: met `and`, `or` en `not` bouw je regels die aanvoelen zoals echte beslissingen.

---

## 5. Echte expressies lezen: school & gaming

### Voorbeeld: slagen op een examen

```python
score = 13      # out of 20
cheated = False

passed = (score >= 10) and (cheated == False)
print(passed)  # True
```

Je slaagt **alleen als** je genoeg punten hebt **en** je niet gespiekt hebt.

### Voorbeeld: “Kan ik nog een match spelen?”

```python
time = 21  # 21:00
homework_done = True
parents_home = False

can_play = homework_done and (time < 22 or not parents_home)
print(can_play)
```

Lees het zo:

- Huiswerk moet af zijn.
- EN (het is vóór 22:00 OF je ouders zijn nog niet thuis).

Zo schrijf je later regels voor bots, apps en games.

---

## 6. Veelgemaakte operator‑fouten

Zelfs pros maken deze soms. De klassiekers:

### Fout 1: `=` gebruiken in plaats van `==`

```python
# Bug:
# if score = 10:   # ❌ this is invalid
#     print("Nice")

# Correct:
score = 10
if score == 10:
    print("Nice")
```

- `=` is **assignment**.
- `==` is **comparison**.

Als je ze door elkaar haalt, krijg je een **SyntaxError**.

### Fout 2: verkeerde types vergelijken

```python
age = "16"   # comes from input as text

# Bug:
# if age >= 16:    # comparing 'str' with 'int'
#     print("You can see this movie.")

# Fix:
if int(age) >= 16:
    print("You can see this movie.")
```

Check types wanneer vergelijkingen vreemd doen.

### Fout 3: conditions te ingewikkeld maken

```python
# Not great:
if is_logged_in == True:
    ...

# Cleaner:
if is_logged_in:
    ...
```

En voor `False`:

```python
# Not great:
if is_banned == False:
    ...

# Cleaner:
if not is_banned:
    ...
```

> Key takeaway: hou conditions clean en leesbaar. Je schrijft voor future‑you evenveel als voor Python.

---

## Samenvatting

- **Rekenoperatoren** (`+`, `-`, `*`, `/`, `//`, `%`, `**`) doen alle wiskunde.
- **Vergelijkingsoperatoren** (`==`, `!=`, `<`, `>`, `<=`, `>=`) stellen vragen en geven `True`/`False`.
- **Toekenningsoperatoren** (`=`, `+=`, `-=`, `*=` …) zetten en updaten variabele waarden.
- **Logische operatoren** (`and`, `or`, `not`) combineren eenvoudige voorwaarden tot krachtige regels.
- Kleine fouten zoals `=` vs `==` of strings vergelijken met numbers breken je logica compleet.

> Achievement Unlocked: Je kan Python nu **laten denken in conditions**—scores vergelijken, regels checken en beslissingen nemen zoals een game engine of een slimme app.
