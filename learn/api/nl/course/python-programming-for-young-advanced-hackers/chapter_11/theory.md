# Hoofdstuk 11: Conditionele logica – je code leren beslissen

Welkom, hacker. Tot nu toe volgden je scripts meestal één vast pad: bovenaan starten, tot onderaan runnen, klaar. Handig, maar een beetje hersenloos.

In dit hoofdstuk geef je je programma’s een echte **brain**.

Met **conditionele logica** (`if / elif / else`) kan je code:

- reageren op user input,
- anders werken wanneer een login faalt,
- een andere boodschap tonen afhankelijk van je examenscore,
- beslissen of je “toegang geeft” of “weigert” zoals een echt access‑systeem.

Tegen het einde van dit hoofdstuk kan je:

- **Vergelijkingsoperatoren** gebruiken om `True`/`False`‑vragen te stellen.
- `if`‑statements schrijven om code alleen te runnen wanneer een voorwaarde klopt.
- `else` gebruiken voor het “anders”‑pad.
- Meerdere opties ketenen met `elif`.
- Voorwaarden combineren met `and`, `or` en `not` om slimme regels te bouwen.

---

## 1. Conditions: ja/nee‑vragen voor je code

Een **condition** is eender welke expressie die je kan beantwoorden met `True` of `False`.

Voorbeelden:

- Is de firewall actief?
- Is de examenscore minstens 10?
- Is de username gelijk aan `"admin"`?
- Is de port groter dan 1024?

In Python zijn conditions gewoon expressies die evalueren naar een boolean.

```python
port = 22
is_open = True

print(port == 22)       # True
print(is_open == True)  # True
print(port > 1024)      # False
```

Later laat je meestal `== True` weg en schrijf je gewoon `if is_open:`, maar voorlopig is dit oké om te zien wat er gebeurt.

> Key takeaway: Conditions zijn expressies die `True` of `False` opleveren.

---

## 2. Vergelijkingsoperatoren: je vraag‑tools

Deze operatoren vergelijken twee waarden en geven een boolean terug:

- `==` : is gelijk aan?
- `!=` : is niet gelijk aan?
- `<` : is kleiner dan?
- `>` : is groter dan?
- `<=` : is kleiner dan of gelijk aan?
- `>=` : is groter dan of gelijk aan?

**Belangrijke val:** verwar `=` niet met `==`.

- `x = 10` → **assignment**: stop 10 in `x`.
- `x == 10` → **comparison**: is `x` gelijk aan 10?

`=` gebruiken in een `if` is een klassieke beginner‑bug.

```python
score = 14

print(score >= 10)  # True, you passed (on 20)
print(score == 20)  # False
print(score != 0)   # True
```

> Key takeaway: `=` verandert een variabele; `==` checkt een waarde.

---

## 3. De `if`‑statement: je eerste poort

Een `if`‑statement is zoals een security gate:

- als de condition `True` is, gaat Python binnen en runt hij de code.
- als het `False` is, slaat hij dat blok over.

Indentation toont welke regels bij de `if` horen.

```python
is_admin = True

if is_admin == True:
    print("Administrative privileges granted.")
    print("Loading control panel…")

print("Program continues…")
```

Als `is_admin` `False` was, zag je alleen `Program continues…`.

> Key takeaway: `if condition:` runt een ingesprongen blok alleen wanneer de condition `True` is.

---

## 4. `if / else`: twee mogelijke paden

`else` geeft je een tweede pad wanneer de `if`‑voorwaarde **niet** klopt.

```python
password_attempt = "12345"
correct_password = "pA$$w0rd_123"

if password_attempt == correct_password:
    print("Access Granted.")
else:
    print("Access Denied. Logging attempt.")
```

Eén van de twee blokken runt **altijd**. Je bent binnen, of je bent het niet.

School‑stijl:

```python
score = 9.5  # out of 20

if score >= 10:
    print("You passed, nice.")
else:
    print("Not passed. Next time we go harder.")
```

> Key takeaway: `if/else` is voor “dit of dat” – twee mogelijke uitkomsten.

---

## 5. `elif`: meer dan twee opties

Soms heeft het leven meer dan “ja” of “nee”. Bijvoorbeeld punten:

- 16+ → excellent,
- 12–15 → goed,
- 10–11 → net geslaagd,
- onder 10 → niet geslaagd.

`elif` (“else if”) laat je meerdere opties ketenen.

```python
score = 14

if score >= 16:
    print("Excellent, you’re smashing it.")
elif score >= 12:
    print("Good job, solid work.")
elif score >= 10:
    print("Barely passed, but passed.")
else:
    print("Didn’t pass. Time for a comeback.")
```

Python checkt van boven naar beneden en voert **alleen het eerste** blok uit waarvan de condition `True` is.

Hacker‑stijl:

```python
privilege_level = "guest"

if privilege_level == "root":
    print("Full system access.")
elif privilege_level == "admin":
    print("Access to user management and system logs.")
elif privilege_level == "user":
    print("Standard user access.")
else:
    print("Unknown privilege level. Access restricted.")
```

> Key takeaway: Gebruik `elif` wanneer je meerdere cases wil afhandelen, niet alleen twee.

---

## 6. Logische operatoren: `and`, `or`, `not`

Echte beslissingen hebben vaak **meer dan één** voorwaarde:

> “Ik mag spelen als mijn huiswerk af is **en** het is vóór 22:00.”

Python heeft drie logische operatoren:

- `and` – alle conditions moeten `True` zijn.
- `or` – minstens één condition moet `True` zijn.
- `not` – keert `True` ↔ `False` om.

### `and`: alles moet waar zijn

```python
username = "admin"
ip_address = "127.0.0.1"

# Only allow admin from local machine
if username == "admin" and ip_address == "127.0.0.1":
    print("Welcome, administrator.")
```

### `or`: één is genoeg

```python
has_keycard = False
knows_password = True

# Door opens if you have the keycard OR know the password
if has_keycard or knows_password:
    print("Door unlocked.")
```

### `not`: omkeren

```python
is_logged_in = False

if not is_logged_in:
    print("Please log in to continue.")
```

Combineren:

```python
time = 21          # 21:00
homework_done = True
parents_home = False

can_play = homework_done and (time < 22 or not parents_home)
print(can_play)
```

Lees het zo:

- Huiswerk moet af zijn.
- EN (het is vóór 22:00 OF ouders zijn nog niet thuis).

> Key takeaway: Logische operatoren maken van simpele checks krachtige regels.

---

## 7. Geneste conditions: beslissingen in beslissingen

Je kan een `if` in een andere `if` zetten. Dat heet **nesting**.

```python
is_logged_in = True
user_role = "admin"

if is_logged_in:
    print("User is authenticated.")
    if user_role == "admin":
        print("Loading admin dashboard…")
    else:
        print("Loading user dashboard…")
else:
    print("Redirecting to login page…")
```

Nesting is krachtig, maar als je te diep gaat wordt het moeilijk leesbaar. Later leer je patterns om “pyramids of doom” te vermijden.

> Key takeaway: Nesting laat complexere logica toe, maar overdrijf niet.

---

## 8. Veelvoorkomende fouten met conditionals

### 1. `=` gebruiken in plaats van `==`

```python
# Wrong (and will cause a SyntaxError):
# if score = 10:
#     print("Nice")

# Correct:
score = 10
if score == 10:
    print("Nice")
```

### 2. Verkeerde types vergelijken

```python
age = "16"  # comes from input as text

# Bug:
# if age >= 16:  # comparing str to int
#     print("You can watch this movie.")

# Fix:
if int(age) >= 16:
    print("You can watch this movie.")
```

### 3. Te verbose booleans

```python
# Works, but noisy
if is_logged_in == True:
    ...

# Cleaner
if is_logged_in:
    ...

# Same idea for False
if not is_banned:
    ...
```

> Key takeaway: Vreemd gedrag in conditionals komt meestal door type‑issues of een klein symbool‑foutje.

---

## Samenvatting

- Conditions zijn `True`/`False`‑vragen die je code gebruikt om te beslissen.
- **Vergelijkingsoperatoren** (`==`, `!=`, `<`, `>`, `<=`, `>=`) bouwen die vragen.
- `if` runt code alleen wanneer een condition `True` is.
- `else` is het “anders”‑pad.
- `elif` is voor meerdere cases.
- **Logische operatoren** (`and`, `or`, `not`) combineren conditions tot slimme regels.

> Achievement Unlocked: Je programma’s kunnen nu **beslissingen nemen**—reageren op input, regels checken en gedrag aanpassen zoals in games, apps en login‑systemen.
