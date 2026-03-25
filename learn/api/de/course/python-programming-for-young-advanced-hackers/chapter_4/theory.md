# Kapitel 4: Datentypen und Type Conversion – Python beibringen, wie du zu denken

Willkommen zurück, Hacker. Du hast Python schon Zahlen und Text hingeworfen, und es ist irgendwie nicht explodiert. Jetzt sorgen wir dafür, dass Python auch wirklich **versteht**, was du ihm gibst.

Für Python gibt es einen riesigen Unterschied zwischen:

- `15` als **Zahl** (deine Mathe‑Note von 20), und
- `"15"` als **Text** (vielleicht Teil deines WLAN‑Passworts).

Wenn du das verwechselst, crasht dein Code härter als dein Handy, wenn du während einer Schularbeit zehn Apps gleichzeitig öffnest.

Am Ende dieses Kapitels kannst du:

- Pythons Kerndatentypen erkennen: `int`, `float`, `str` und `bool`.
- **Literals** verwenden wie `42`, `3.14`, `"password123"` und `True`.
- Mit `type()` jeden Wert „scannen“ und sehen, was Python glaubt, dass es ist.
- Erklären, wann Python Typen automatisch umwandelt (und wann es sich strikt weigert).
- Mit `str()`, `int()`, `float()` und `bool()` sicher zwischen Typen konvertieren, ohne deinen Code zu brechen.

---

## 1. Warum Datentypen wichtig sind: Labels in Pythons Kopf

Stell dir den Speicher deines Computers wie deinen Schulrucksack vor. Du wirfst alles hinein, aber **du** weißt trotzdem, was was ist:

- Mathebuch,
- Laptop,
- Jause,
- die Schularbeit, die du deinen Eltern noch nicht gezeigt hast.

Python macht das Gleiche mit **Datentypen**. Jeder Wert hat ein Label in Pythons Kopf:

- **Zahl** – für Berechnungen (Durchschnitt, Scores, Damage, …).
- **Text** – für Usernames, Chat‑Messages, Passwörter.
- **True/False‑Flag** – für einfache Ja/Nein‑Entscheidungen.

Wenn Python nicht weiß, _welche Art_ von Wert es gerade hat, weiß es auch nicht, welche Operationen erlaubt sind. Du kannst keine Mathematik auf einen Snapchat‑Username anwenden, und du kannst dich nicht mit der Zahl `1234` einloggen, wenn die Website den **String** `"1234"` erwartet.

> Key takeaway: Ein Datentyp sagt Python **was** ein Wert ist, damit es weiß, **was du damit machen darfst**.

---

## 2. Integers (`int`) und Floats (`float`)

Zahlen kennst du schon – jetzt wird’s genauer.

### Integers (`int`)

**Integers** sind ganze Zahlen. Keine Kommas, keine Punkte, einfach saubere Counts:

```python
0
42
-100
99999
```

Das sind **Integer Literals** – Zahlen, die du direkt in den Code schreibst. Ihr Typ ist `int`:

```python
print(type(100))  # <class 'int'>
```

Nutze `int` für Dinge wie:

- Score in EA FC oder Fortnite,
- Anzahl verpasster Anrufe,
- deine Punkte von 20.

### Floats (`float`)

**Floats** sind Zahlen mit Dezimalpunkt. Die sind für Präzision:

```python
3.14
-0.5
99.9
10.0
```

Das sind **Float Literals**. Ihr Typ ist `float`:

```python
print(type(99.9))  # <class 'float'>
```

Nutze `float` für:

- Prozentwerte (`87.5`% bei einem Test),
- Distanzen (`2.75` km zur Schule),
- präzise Health‑Bars (`72.5` HP).

> Key takeaway: `int` ist fürs Zählen ganzer Dinge, `float` für Dezimalstellen und Präzision.

---

## 3. Strings (`str`): die Sprache von Chats und Passwörtern

Ein **String** ist jede Textfolge. In Python erzeugst du Strings, indem du Text in Anführungszeichen setzt.

```python
"Hello, world"
'password123'
"42"      # This is text, not a number!
""        # An empty string
"nick#1234"  # Could be a Discord tag
```

Das sind **String Literals**. Ihr Typ ist `str`:

```python
print(type("Hello"))  # <class 'str'>
print(type("42"))     # <class 'str'>
```

Du kannst Strings zusammenfügen (das heißt **concatenation**):

```python
username = "hacker_" + "be"
print(username)  # hacker_be
```

Python behandelt _alles_ in Anführungszeichen als Text:

- `"15"` – vielleicht dein Alter als Text.
- `15` – die Zahl fünfzehn.

Sie **sehen** für dich ähnlich aus, aber Python weigert sich, sie gleich zu behandeln.

> Key takeaway: Steht es in Anführungszeichen, ist es ein `str`. Auch wenn es wie eine Zahl aussieht, sieht Python es als Text.

---

## 4. Booleans (`bool`): True/False‑Schalter

Ein **Boolean** ist der einfachste Datentyp. Es ist buchstäblich:

- `True`
- `False`

(Mit Großbuchstaben – Python ist streng.)

Booleans sind perfekt für simple an/aus, ja/nein‑Entscheidungen:

```python
is_logged_in = True
has_homework_done = False
print(type(is_logged_in))  # <class 'bool'>
```

Später siehst du, dass Vergleiche wie `score >= 10` ebenfalls Booleans liefern.

Beispiele aus dem Alltag:

- `wifi_on = True`
- `is_exam_week = False`
- `has_enough_sleep = False`

> Key takeaway: Booleans sind kleine Flags – `True` oder `False` – die Entscheidungen in deinem Code steuern.

---

## 5. `type()`: dein Data‑Scanner

`type()` ist, als würdest du einen Scanner auf einen Wert richten und Python fragen: _„Was glaubst du, was das ist?“_

```python
print(type(10))       # <class 'int'>
print(type(10.5))     # <class 'float'>
print(type("10"))     # <class 'str'>
print(type(False))    # <class 'bool'>
```

Wenn dein Code komische Fehler wirft, ist das oft dein erster Debugging‑Move:

```python
# Buggy code
user_input = "18"
# print("Next year you will be: " + user_input + 1)  # This will crash!

# Debugging
print(type(user_input))  # <class 'str'>
```

Python „schreit“, weil du Text (`"18"`) und eine Zahl (`1`) auf eine Art kombinieren willst, die es nicht zulässt.

> Key takeaway: Wenn sich etwas cursed anfühlt: `print(type(deine_variable))` und schau, womit Python wirklich arbeitet.

---

## 6. Type Conversion: den Typ eines Wertes ändern

Manchmal **musst** du den Datentyp ändern. Zum Beispiel kommt User‑Input als Text, du willst aber damit rechnen. Das nennt man **Type Conversion** oder **Type Casting**.

### Implizite Conversion (automatisch)

Manchmal konvertiert Python still und leise, wenn es Sinn ergibt:

```python
result = 5 + 2.5
print(result)        # 7.5
print(type(result))  # <class 'float'>
```

Hier „upgradet“ Python die `5` (ein `int`) zu `5.0` (ein `float`) bevor es addiert, damit keine Dezimal‑Präzision verloren geht.

Das passiert nur in sicheren, offensichtlichen Fällen (z. B. Zahlen mischen). Text wird **nicht** automatisch zu Zahlen.

### Explizite Conversion (manuell)

Meistens musst du Typen **selbst** umwandeln. Das machst du mit Funktionen, die nach den Typen benannt sind:

- `str()`
- `int()`
- `float()`
- `bool()`

```python
age_string = "16"  # maybe from user input
age_number = int(age_string)
print(age_number + 1)  # 17
```

Du sagst damit: „Ich weiß, das war Text – behandle es jetzt als Integer.“

> Key takeaway: Python auto‑konvertiert nur in simplen numerischen Fällen. Für alles andere rufst **du** `str()`, `int()`, `float()` oder `bool()` auf.

---

## 7. `str()`: alles in Text verwandeln

Nutze `str()`, wenn du Nicht‑Text‑Werte in einen String kleben willst – für Logs, Messages, Discord‑Style Output usw.

```python
level = 10
message = "You reached level " + str(level)
print(message)  # You reached level 10
```

`str()` funktioniert bei fast allem:

```python
str(99.5)   # "99.5"
str(True)   # "True"
str(15)     # "15"
```

Praktisch, wenn du Status‑Messages baust oder Werte fürs Debugging ausgibst.

> Key takeaway: Wenn du einen Satz baust und etwas noch kein String ist: pack es in `str()`.

---

## 8. `int()` und `float()`: von Text zu Zahlen

User‑Input, Daten aus Dateien, sogar API‑Daten kommen fast immer als **Strings**. Für Mathematik musst du zuerst konvertieren.

### Sichere Conversions

```python
int("100")     # 100 (int)
float("7.5")   # 7.5 (float)
float("10")    # 10.0 (float)
int(7.9)       # 7   (truncates, does NOT round)
```

### Gefährliche Conversions

Wenn du Text konvertierst, der nicht wie eine Zahl aussieht, fliegt dir ein `ValueError` um die Ohren:

```python
# These will all cause a ValueError!
# int("hello")
# int("7.5")    # int() can’t handle decimal strings
# float("hacker42!")
```

Ein realistisches Beispiel:

```python
score_str = input("Enter your exam score out of 20: ")  # e.g. "15"
score = float(score_str)

average_needed = 10.0

if score >= average_needed:
    print("Nice, you passed!")
else:
    print("Ouch… better luck next test.")
```

> Key takeaway: Nutze `int()`/`float()` um numerischen Text in echte Zahlen zu verwandeln – aber wenn der Text keine gültige Zahl ist, erwarte einen `ValueError`.

---

## 9. `bool()`: ist das „etwas“ oder „nichts“?

`bool()` wandelt jeden Wert in `True` oder `False` um. Die Regel:

- „Leere“ Dinge sind `False`.
- Fast alles andere ist `True`.

### Werte, die `False` sind:

```python
bool(0)      # False
bool(0.0)    # False
bool("")     # False (empty string)
bool(False)  # False
```

### Werte, die `True` sind:

```python
bool(1)         # True
bool(-10)       # True
bool("hello")   # True
bool("False")   # True (non-empty string!)
bool(True)      # True
```

Das ist superpraktisch, wenn du checken willst, ob der User **wirklich** etwas eingegeben hat:

```python
username = input("Enter username: ")

if bool(username):  # or just: if username:
    print("Welcome,", username)
else:
    print("Username cannot be empty!")
```

> Key takeaway: `bool(x)` ist `False` für `0`, `0.0` und `""`. Für fast alles andere ist es `True`.

---

## 10. Häufige Type‑Bugs (und wie du sie entclownst)

### Bug 1: Strings und Zahlen mischen (`TypeError`)

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

### Bug 2: falsch konvertieren (`ValueError`)

```python
# Bug:
# value_str = "9.9"
# value_int = int(value_str)  # ValueError: invalid literal for int() with base 10: '9.9'

# Fix: Use the correct conversion
value_str = "9.9"
value_float = float(value_str)  # 9.9
```

### Bug 3: Strings statt Zahlen vergleichen (Logic Error)

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

> Key takeaway: `TypeError` heißt: du hast inkompatible Typen gemischt. `ValueError` heißt: du hast Text konvertieren wollen, der nicht zum gewünschten Typ passt.

---

## Zusammenfassung

- Kerndatentypen: `int`, `float`, `str`, `bool`.
- **Literals** sind Werte, die du direkt schreibst, wie `42` oder `"hello"`.
- `type()` ist dein eingebauter Scanner: was glaubt Python, was ein Wert ist?
- Python macht ein bisschen **implizite Conversion** bei Zahlen, aber verlasse dich nicht darauf – check.
- Nutze **explizite Conversion** (`str()`, `int()`, `float()`, `bool()`), wenn du zwischen Text, Zahlen und Booleans wechselst.
- Achte auf `TypeError` und `ValueError`, wenn du konvertierst.

> Achievement Unlocked: Du sprichst jetzt Pythons **Daten‑Sprache** und kannst sicher mit Text, Zahlen und Booleans jonglieren – egal ob du Noten berechnest, Logs analysierst oder deine ersten Hacker‑Tools baust.
