# Hoofdstuk 2: Variabelen, getallen en geheime codes

Welkom terug, hacker. In hoofdstuk 1 liet je de machine praten. Nu ga je haar **dingen laten onthouden**, **rekenen** en je “secret sauce” bijhouden: scores, health, codes… Hier stoppen je scripts met speelgoed te zijn en beginnen ze echte tools te worden.

Tegen het einde van dit hoofdstuk kan je:

- **Variabelen** maken om data op te slaan (score, health, geheime codes…).
- Werken met **integers** (hele getallen) en **floats** (kommagetallen).
- Rekenen met `+`, `-`, `*` en `/`.
- `//` (integer division) en `%` (modulo) gebruiken om loot te verdelen en restjes te vinden.
- De **volgorde van bewerkingen** controleren met haakjes, zodat je wiskunde niet “scuffed” is.
- **Tekst en getallen** combineren in output zonder errors.
- Veelvoorkomende **math- en variable bugs** vinden en fixen.

---

## Wat is een variabele?

Een **variabele** is zoals een gelabelde kluis in het geheugen van je computer. Je stopt er iets in, geeft het een naam, en je kan er later op terugkomen.

```python
player_score = 100
health = 95.5
secret_code = "xY_z3n"
```

Hier:

- `player_score` is een doos met het getal `100`.
- `health` is een doos met `95.5`.
- `secret_code` is een doos met de tekst `"xY_z3n"`.

Het `=`-teken is niet “is gelijk aan” zoals in de wiskundeles. In Python is het een **toekenningsoperator** (assignment). Het betekent:

> Stop de waarde rechts **in** de variabele links.

Dus deze regel:

```python
ammo = 50
```

Betekent: “Maak een variabele `ammo` en stop er `50` in.”

Je kan de waarde op elk moment updaten:

```python
ammo = 50
ammo = ammo - 10  # Je hebt 10 keer geschoten
print(ammo)
```

Python leest dit zo:

1. `ammo = 50` → stop `50` in `ammo`.
2. `ammo = ammo - 10` → neem de huidige waarde (50), trek 10 af (40), en stop `40` terug in `ammo`.
3. `print(ammo)` → toont `40`.

### Je variabelen goed benoemen

Goede variabelenamen zijn cruciaal voor leesbare code—future-you gaat je bedanken als je om 23:00 nog een bug moet fixen.

- Gebruik letters, cijfers en `_` (underscore).
- Begin **nooit** met een cijfer.
- Gebruik `snake_case` voor meerdere woorden (bijv. `player_health`).
- Maak ze beschrijvend: `player_health` is beter dan `ph`.

**Geldige namen:**

- `score`
- `player_health`
- `level_2_boss`

**Ongeldige namen:**

- `2fast` (begint met een cijfer)
- `my score` (spatie)

> Key takeaway: Een variabele is een benoemde container voor data. Met `=` stop je er data in, en je kan die waarde later aanpassen.

---

## Integers vs. floats

Python heeft verschillende types getallen. Voorlopig zijn dit de belangrijkste:

- **Integers (`int`)**: hele getallen, zoals `-10`, `0`, `42`.
- **Floats (`float`)**: getallen met een komma, zoals `3.14`, `-0.5`, `10.0`.

```python
lives = 3          # integer
speed = 7.5        # float
temperature = -10  # integer
```

Zelfs `10.0` is een float door de `.0`.

Je gebruikt vaak:

- `int` voor dingen die je telt (lives, levels, coins…).
- `float` voor dingen die je meet (snelheid, tijd, temperatuur…).

> Key takeaway: Integers zijn voor hele getallen. Floats zijn voor getallen met decimalen.

---

## Basisrekenen: +, -, \*, /

Python is je persoonlijke rekenmachine, maar met superkrachten.

### Rekenkundige operatoren

- `+` : optellen
- `-` : aftrekken
- `*` : vermenigvuldigen
- `/` : delen (geeft altijd een float terug)

```python
print(5 + 3)    # 8
print(100 - 25) # 75
print(4 * 8)    # 32
print(10 / 2)   # 5.0
print(9 / 2)    # 4.5
```

Let op: delen met `/` geeft altijd een float, ook als het “mooi” uitkomt.

Je kan variabelen gebruiken in berekeningen:

```python
damage = 25
health = 100
remaining_health = health - damage
print(remaining_health)  # 75
```

> Key takeaway: `+`, `-`, `*` en `/` werken zoals op een rekenmachine. `/` geeft een float.

---

## Integer division (//) en restjes (%)

Soms wil je geen decimalen: je wil volledige groepen en leftovers. Denk: “Hoeveel coins krijgt elke speler?” of “Hoeveel volle groepen passen erin?”

- `//` : **integer division** (floor division)
- `%` : **modulo** (de rest)

### Integer division `//`

`//` geeft je het hele-getal-resultaat en gooit de decimalen weg.

```python
print(9 // 2)   # 4
print(10 // 3)  # 3
```

### Modulo `%`

`%` geeft je de rest na de deling.

```python
print(9 % 2)   # 1 (want 9 = 4*2 + 1)
print(10 % 3)  # 1 (want 10 = 3*3 + 1)
```

### Hacker-scenario: loot verdelen

Stel: jij en je squad hebben 25 digitale coins buitgemaakt.

```python
total_coins = 25
crew_members = 4

coins_per_member = total_coins // crew_members
leftover_coins = total_coins % crew_members

print("Each crew member gets", coins_per_member, "coins.")
print("Coins left over:", leftover_coins)
```

Output:

```
Each crew member gets 6 coins.
Coins left over: 1
```

> Key takeaway: `a // b` zegt hoeveel volledige groepen je hebt. `a % b` zegt wat er overblijft.

---

## Volgorde van bewerkingen en haakjes

Python volgt dezelfde volgorde als in de wiskunde (PEMDAS/BODMAS):

1. **Haakjes** `()`
2. **Machten** `**` (komen later)
3. **Vermenigvuldigen / delen** `*`, `/`, `//`, `%`
4. **Optellen / aftrekken** `+`, `-`

### Zonder haakjes

```python
print(10 + 5 * 2)
```

Python doet eerst `5 * 2` (= 10) en dan `10 + 10` (= 20).

### Met haakjes

```python
print((10 + 5) * 2)
```

Nu moet Python eerst `10 + 5` (= 15) doen en daarna `15 * 2` (= 30).

Een slimme hacker gebruikt haakjes niet alleen voor het juiste antwoord, maar ook om code voor mensen (en voor jezelf op een vermoeide zondag) leesbaar te houden.

> Key takeaway: Python volgt de normale rekenvolgorde. Gebruik `()` om de volgorde te sturen of je intentie duidelijk te maken.

---

## Tekst en getallen combineren

Een getal rechtstreeks “optellen” bij tekst laat je programma crashen.

```python
age = 14
# This will cause a TypeError!
# print("Your age is " + age)
```

Python geeft een `TypeError`, omdat je geen string en int aan elkaar kan plakken.

### Hoe los je dat op?

#### 1. Converteer het getal met `str()`

```python
age = 14
print("Your age is " + str(age))
```

`str(age)` maakt van `14` de tekst `"14"`.

#### 2. Gebruik komma’s in `print()`

`print()` kan meerdere items aan. Het converteert ze automatisch naar tekst en zet er spaties tussen.

```python
age = 14
print("Your age is", age)
```

Beide tonen: `Your age is 14`.

Let op bij “getallen” die eigenlijk strings zijn:

```python
print("5" + "5")  # "55" (strings plakken)
print(5 + 5)      # 10 (getallen optellen)
```

> Key takeaway: Gebruik `str()` of komma’s in `print()` om tekst en getallen veilig te combineren.

---

## Debugging 101

Bugs zijn geen fails; het zijn puzzels. Een goede hacker is een goede detective.

### Veelvoorkomende bugs

1. **Typfouten in variabelen (`NameError`)**

```python
score = 100
print(scrore)  # NameError: name 'scrore' is not defined
```

**Fix:** check je spelling. Python vergeeft dit niet.

2. **Een variabele gebruiken vóór die bestaat (`NameError`)**

```python
print(total)  # NameError: name 'total' is not defined
total = 0
```

**Fix:** definieer variabelen vóór je ze gebruikt.

3. **Logische errors (verkeerde operator)**

```python
price = 10
quantity = 3
total = price + quantity  # zou * moeten zijn
print(total)  # 13, maar je wilde waarschijnlijk 30
```

**Fix:** denk door: moet je hier optellen of vermenigvuldigen?

4. **Haakjes vergeten**

```python
result = 100 - 10 * 5  # result is 50
# Bedoelde je (100 - 10) * 5, dat 450 is?
```

**Fix:** gebruik haakjes om duidelijk te maken wat je bedoelt.

### Simpele debugging-technieken

1. **Lees de foutmelding.** Die vertelt je het type error en het regelnummer.
2. **Print je variabelen.** Voeg `print()` toe om waarden op verschillende momenten te zien.

```python
print("DEBUG: health =", health)
```

3. **Leg je code aan jezelf uit.** Ga regel per regel en zeg hardop wat er gebeurt. (Ja, dat klinkt gek. Het werkt.)

> Key takeaway: Bugs zijn aanwijzingen. Gebruik foutmeldingen en `print()` om te ontdekken wat er écht gebeurt.

---

## Wat volgt?

Je weet nu hoe je:

- Data opslaat in variabelen.
- Met verschillende nummer-types werkt.
- Rekent en de volgorde van bewerkingen controleert.
- Tekst en getallen veilig combineert in output.
- Veelvoorkomende problemen in variabelen en wiskunde debugt.

Hierna ga je deze skills gebruiken in practice-missies en ze aan elkaar koppelen tot sterkere logica.

> Achievement Unlocked: Je kan Python nu laten onthouden, rekenen en rapporteren—zoals een mini Smartschool-server die jij volledig onder controle hebt.
