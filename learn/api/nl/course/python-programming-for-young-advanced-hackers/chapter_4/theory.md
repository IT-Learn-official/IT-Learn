# Hoofdstuk 4: Datatypes en typeconversie – Python leren denken zoals jij

Welkom terug, hacker. Je hebt al getallen en tekst naar Python geslingerd, en op één of andere manier is het nog niet ontploft. Nu zorgen we ervoor dat Python ook écht **begrijpt** wat je hem geeft.

Voor Python is er een groot verschil tussen:

- `15` als **getal** (je wiskundescore op 20), en
- `"15"` als **tekst** (misschien een stukje van je wifi-wachtwoord).

Als je dat door elkaar haalt, crasht je code harder dan je gsm wanneer je tijdens examens tien apps tegelijk openzet.

Tegen het einde van dit hoofdstuk kan je:

- Pythons kerndatatypes herkennen: `int`, `float`, `str` en `bool`.
- **Literals** gebruiken zoals `42`, `3.14`, `"password123"` en `True`.
- Met `type()` “scannen” welke soort waarde Python denkt dat iets is.
- Uitleggen wanneer Python types automatisch omzet (en wanneer hij dat absoluut weigert).
- Met `str()`, `int()`, `float()` en `bool()` veilig converteren tussen types zonder je code te breken.

---

## 1. Waarom datatypes belangrijk zijn: labels in Pythons brein

Denk aan het geheugen van je computer als je schoolrugzak. Je gooit er vanalles in, maar **jij** weet nog altijd wat wat is:

- wiskundeboek,
- laptop,
- lunch,
- die toets die je nog altijd niet aan je ouders hebt laten zien.

Python doet hetzelfde met **datatypes**. Elke waarde heeft een label in Pythons brein:

- **Getal** – voor berekeningen (gemiddelden, scores, damage, enz.).
- **Tekst** – voor usernames, chatberichten, wachtwoorden.
- **True/False‑vlag** – voor simpele ja/nee‑beslissingen.

Als Python niet weet _wat voor soort_ waarde hij voor zich heeft, weet hij ook niet welke bewerkingen zijn toegestaan. Je kan geen wiskunde doen op een Snapchat‑username, en je kan niet inloggen met het getal `1234` als de website de **string** `"1234"` verwacht.

> Key takeaway: Een datatype zegt Python **wat** een waarde is, zodat hij weet **wat je ermee mag doen**.

---

## 2. Integers (`int`) en floats (`float`)

Je hebt al getallen gezien, maar nu worden we preciezer.

### Integers (`int`)

**Integers** zijn hele getallen. Geen komma’s, geen punten, gewoon zuiver tellen:

```python
0
42
-100
99999
```

Dit zijn **integer literals** – getallen die letterlijk in je code staan. Hun type is `int`:

```python
print(type(100))  # <class 'int'>
```

Gebruik `int` voor dingen zoals:

- je score in EA FC of Fortnite,
- het aantal gemiste oproepen,
- je punten op 20.

### Floats (`float`)

**Floats** zijn getallen met decimalen. Die zijn voor precisie:

```python
3.14
-0.5
99.9
10.0
```

Dit zijn **float literals**. Hun type is `float`:

```python
print(type(99.9))  # <class 'float'>
```

Gebruik `float` voor:

- percentages (`87.5`% op een toets),
- afstanden (`2.75` km naar school),
- precieze health bars (`72.5` HP).

> Key takeaway: Gebruik `int` om hele dingen te tellen, en `float` wanneer je decimalen en precisie nodig hebt.

---

## 3. Strings (`str`): de taal van chats en wachtwoorden

Een **string** is eender welke reeks tekst. In Python maak je strings door tekst tussen aanhalingstekens te zetten.

```python
"Hello, world"
'password123'
"42"      # This is text, not a number!
""        # An empty string
"nick#1234"  # Could be a Discord tag
```

Dit zijn **string literals**. Hun type is `str`:

```python
print(type("Hello"))  # <class 'str'>
print(type("42"))     # <class 'str'>
```

Je kan strings aan elkaar plakken (dat heet **concatenation**):

```python
username = "hacker_" + "be"
print(username)  # hacker_be
```

Python behandelt _alles_ tussen quotes als tekst:

- `"15"` – misschien je leeftijd als tekst.
- `15` – het getal vijftien.

Ze **zien** er vergelijkbaar uit voor jou, maar Python weigert om ze hetzelfde te behandelen.

> Key takeaway: Staat het tussen quotes, dan is het een `str`. Zelfs als het eruitziet als een getal, ziet Python het als tekst.

---

## 4. Booleans (`bool`): True/False‑schakelaars

Een **boolean** is het simpelste datatype. Het is letterlijk:

- `True`
- `False`

(Met hoofdletters – Python is kieskeurig.)

Booleans zijn perfect voor simpele aan/uit, ja/nee‑beslissingen:

```python
is_logged_in = True
has_homework_done = False
print(type(is_logged_in))  # <class 'bool'>
```

Later zie je dat vergelijkingen zoals `score >= 10` ook booleans opleveren.

Voorbeelden uit het dagelijkse leven:

- `wifi_on = True`
- `is_exam_week = False`
- `has_enough_sleep = False`

> Key takeaway: Booleans zijn kleine vlaggetjes – `True` of `False` – die beslissingen in je code sturen.

---

## 5. `type()`: je data‑scanner

`type()` is alsof je een scanner op een waarde richt en aan Python vraagt: _“Wat denk jij dat dit is?”_

```python
print(type(10))       # <class 'int'>
print(type(10.5))     # <class 'float'>
print(type("10"))     # <class 'str'>
print(type(False))    # <class 'bool'>
```

Wanneer je code rare errors geeft, is dit vaak je eerste debugging‑move:

```python
# Buggy code
user_input = "18"
# print("Next year you will be: " + user_input + 1)  # This will crash!

# Debugging
print(type(user_input))  # <class 'str'>
```

Python “roept”, omdat je tekst (`"18"`) en een getal (`1`) op een manier probeert te plakken die hij niet accepteert.

> Key takeaway: Als iets “cursed” aanvoelt: `print(type(jouw_variabele))` en kijk waarmee Python echt werkt.

---

## 6. Typeconversie: de identiteit van een waarde veranderen

Soms **moet** je het type van een waarde veranderen. Misschien krijg je input van een gebruiker als tekst, maar wil je ermee rekenen. Dat proces heet **typeconversie** of **type casting**.

### Impliciete conversie (automatisch)

Soms zet Python types stilletjes voor je om, als het logisch is:

```python
result = 5 + 2.5
print(result)        # 7.5
print(type(result))  # <class 'float'>
```

Hier “upgrade” Python de `5` (een `int`) naar `5.0` (een `float`) vóór hij optelt, zodat je geen decimalen verliest.

Hij doet dit alleen in veilige, evidente gevallen (zoals getallen mixen). Hij gaat **niet** automatisch tekst naar getallen omzetten voor jou.

### Expliciete conversie (manueel)

Meestal moet je types **zelf** omzetten. Dat doe je met functies die naar het type genoemd zijn:

- `str()`
- `int()`
- `float()`
- `bool()`

```python
age_string = "16"  # maybe from user input
age_number = int(age_string)
print(age_number + 1)  # 17
```

Je zegt eigenlijk: “Ik weet dat dit tekst was, maar behandel het nu als een integer.”

> Key takeaway: Python auto‑converteert alleen in simpele numerieke gevallen. Voor de rest roep **jij** `str()`, `int()`, `float()` of `bool()` op.

---

## 7. `str()`: alles naar tekst omzetten

Gebruik `str()` wanneer je niet‑tekstwaarden in een string wil steken – voor logs, berichten, Discord‑achtige output, enz.

```python
level = 10
message = "You reached level " + str(level)
print(message)  # You reached level 10
```

`str()` werkt op bijna alles:

```python
str(99.5)   # "99.5"
str(True)   # "True"
str(15)     # "15"
```

Handig wanneer je statusberichten maakt of waarden print om te debuggen.

> Key takeaway: Als je een zin bouwt en iets is nog geen string: wrap het in `str()`.

---

## 8. `int()` en `float()`: van tekst naar getallen

User input, data uit bestanden, zelfs data uit API’s komt bijna altijd binnen als **strings**. Om te rekenen moet je eerst converteren.

### Veilige conversies

```python
int("100")     # 100 (int)
float("7.5")   # 7.5 (float)
float("10")    # 10.0 (float)
int(7.9)       # 7   (truncates, does NOT round)
```

### Gevaarlijke conversies

Probeer je tekst om te zetten die niet op een getal lijkt, dan knalt Python met een `ValueError`:

```python
# These will all cause a ValueError!
# int("hello")
# int("7.5")    # int() can’t handle decimal strings
# float("hacker42!")
```

Een realistischer voorbeeld uit je leven:

```python
score_str = input("Enter your exam score out of 20: ")  # e.g. "15"
score = float(score_str)

average_needed = 10.0

if score >= average_needed:
    print("Nice, you passed!")
else:
    print("Ouch… better luck next test.")
```

> Key takeaway: Gebruik `int()`/`float()` om numerieke tekst om te zetten naar echte getallen – maar als de tekst geen geldig getal is, verwacht dan een `ValueError`.

---

## 9. `bool()`: is dit “iets” of “niets”?

`bool()` zet eender welke waarde om naar `True` of `False`. De regel:

- “Lege” dingen zijn `False`.
- Bijna alles anders is `True`.

### Waarden die `False` zijn:

```python
bool(0)      # False
bool(0.0)    # False
bool("")     # False (empty string)
bool(False)  # False
```

### Waarden die `True` zijn:

```python
bool(1)         # True
bool(-10)       # True
bool("hello")   # True
bool("False")   # True (non-empty string!)
bool(True)      # True
```

Dit is superhandig om te checken of de gebruiker **echt** iets ingetypt heeft:

```python
username = input("Enter username: ")

if bool(username):  # or just: if username:
    print("Welcome,", username)
else:
    print("Username cannot be empty!")
```

> Key takeaway: `bool(x)` is `False` voor `0`, `0.0` en `""`. Voor bijna alles anders is het `True`.

---

## 10. Veelvoorkomende type‑bugs (en hoe je ze ontclownt)

### Bug 1: strings en getallen mixen (`TypeError`)

```python
# Bug:
# score = 100
# print("Score: " + score)  # TypeError: can only concatenate str (not "int") to str

# Fix 1: Convert to string
score = 100
print("Score: " + str(score))

# Fix 2: Let print() handle it with commas
print("Score:", score)
```

### Bug 2: de verkeerde conversie gebruiken (`ValueError`)

```python
# Bug:
# value_str = "9.9"
# value_int = int(value_str)  # ValueError: invalid literal for int() with base 10: '9.9'

# Fix: Use the correct conversion
value_str = "9.9"
value_float = float(value_str)  # 9.9
```

### Bug 3: strings vergelijken in plaats van getallen (logic error)

```python
# Bug:
# exam_score = "15"   # comes from user input
# if exam_score > 10:  # Comparing strings, not numbers
#     print("Passed")

# Fix: Convert before comparing
exam_score = "15"
if int(exam_score) > 10:
    print("Passed")
else:
    print("Not passed")
```

> Key takeaway: `TypeError` betekent dat je onverenigbare types mixed. `ValueError` betekent dat je tekst probeerde te converteren die niet past bij het type dat je vroeg.

---

## Samenvatting

- Kerndatatypes: `int`, `float`, `str`, `bool`.
- **Literals** zijn waarden die je rechtstreeks schrijft, zoals `42` of `"hello"`.
- `type()` is je ingebouwde scanner om te checken wat Python denkt dat iets is.
- Python doet een beetje **impliciete conversie** bij getallen, maar reken er niet op – check.
- Gebruik **expliciete conversie** (`str()`, `int()`, `float()`, `bool()`) wanneer je tussen tekst, getallen en booleans wisselt.
- Let op `TypeError` en `ValueError` wanneer je conversies doet.

> Achievement Unlocked: Je spreekt nu Pythons **data‑taal** en kan veilig jongleren met tekst, getallen en booleans—of je nu punten berekent, logs analyseert of je eerste hacker‑tools bouwt.
