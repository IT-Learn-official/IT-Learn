# Kapitel 6: Operatoren und Vergleiche – Python Entscheidungen beibringen

Du hast Python beigebracht, Daten zu speichern – jetzt soll es auch etwas **damit tun**. Operatoren sind die Symbole, mit denen Python rechnet, vergleicht und entscheidet – wie die Regeln in deinem Lieblingsspiel.

Wenn du wissen willst:
- „Reicht mein Prüfungsergebnis zum Bestehen?“
- „Hab ich genug Coins für den Skin?“
- „Kann ich noch ein Match spielen oder ist es schon zu spät?“

…dann gibst du Python jetzt genau diese Decision‑Making‑Power.

Am Ende dieses Kapitels kannst du:

- **Arithmetische Operatoren** für Berechnungen nutzen.
- **Vergleichsoperatoren** verwenden, um `True`/`False`‑Fragen zu stellen.
- **Zuweisungsoperatoren** einsetzen, um Variablen sauber zu aktualisieren.
- Bedingungen mit **logischen Operatoren** kombinieren, um smarte Regeln zu bauen.
- Komplexe Ausdrücke lesen und vorhersagen, was sie tun.

---

## 1. Arithmetische Operatoren: dein In‑Game‑Taschenrechner

Das sind die Grundtools für Zahlen. Einiges kennst du schon, aber hier ist die ganze Squad:

- `+`  : Addition
- `-`  : Subtraktion
- `*`  : Multiplikation
- `/`  : Division (liefert immer `float`)
- `//` : Integer Division (wirft Nachkommastellen weg)
- `%`  : Modulo (liefert den Rest)
- `**` : Exponent (Potenz)

```python
# 2 to the power of 4
print(2 ** 4)   # 16

# How many full teams of 3 can we make from 10 players?
print(10 // 3)  # 3

# How many players are left out?
print(10 % 3)   # 1
```

So rechnest du z. B.:
- wie viele Busse du für einen Schulausflug brauchst,
- wie viele Packs du mit deinen Coins kaufen kannst,
- wie viel Damage ein Combo macht, wenn Power mit dem Level skaliert.

> Key takeaway: Arithmetische Operatoren machen die Mathematik – von Schulstoff bis Game‑Logik.

---

## 2. Vergleichsoperatoren: Python Fragen stellen

Vergleichsoperatoren lassen dich **Ja/Nein**‑Fragen zu deinen Daten stellen. Das Ergebnis ist immer ein Boolean: `True` oder `False`.

- `==` : ist gleich?
- `!=` : ist nicht gleich?
- `<`  : ist kleiner?
- `>`  : ist größer?
- `<=` : ist kleiner oder gleich?
- `>=` : ist größer oder gleich?

Verwechsle `=` und `==` **nicht**:

- `x = 5` → **Zuweisung**: „speichere 5 in `x`“.
- `x == 5` → **Vergleich**: „ist `x` gleich 5?“

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

> Key takeaway: Vergleichsoperatoren stellen Fragen und geben `True`/`False` zurück – perfekt für Entscheidungen.

---

## 3. Zuweisungsoperatoren: Werte wie ein Pro updaten

Du kennst `=` bereits:

```python
score = 0
```

Aber oft willst du eine Variable **updaten**, basierend auf ihrem aktuellen Wert:

- `x = x + 1`  → +1
- `x = x - 5`  → -5

Python hat dafür saubere Shortcuts: **augmented assignment operators**:

| Operator | Example        | Equivalent to          |
|---------|----------------|------------------------|
| `+=`    | `score += 10`  | `score = score + 10`   |
| `-=`    | `health -= 25` | `health = health - 25` |
| `*=`    | `mana *= 2`    | `mana = mana * 2`      |
| `/=`    | `speed /= 2`   | `speed = speed / 2`    |

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

> Key takeaway: Nutze `+=`, `-=`, `*=` usw. als Standard zum Updaten – kürzer und leichter zu lesen.

---

## 4. Logische Operatoren: smarte Regeln bauen

Logische Operatoren kombinieren mehrere `True`/`False`‑Bedingungen zu größeren Regeln, z. B.:

> „Ich darf spielen, **wenn** die Hausaufgaben fertig sind **und** es vor 22:00 ist.“

Python hat drei logische Operatoren:

- `and` – **alle** Bedingungen müssen `True` sein.
- `or`  – **mindestens eine** Bedingung muss `True` sein.
- `not` – kippt `True` ↔ `False`.

### `and`: alles muss passen

```python
homework_done = True
time = 20  # 20:00

can_play = homework_done and time < 22
print(can_play)  # True
```

Wenn eine Seite `False` ist, ist das Ergebnis `False`.

### `or`: mindestens eine Bedingung

```python
has_sword = False
has_magic = True

can_fight = has_sword or has_magic
print(can_fight)  # True
```

Perfekt für Regeln wie:
- „Du darfst dem Server beitreten, wenn du Admin **oder** Moderator bist.“

### `not`: umdrehen

```python
is_muted = False

if not is_muted:
    print("Mic is live.")
```

### Kombinieren

Mit Klammern steuerst du die Reihenfolge:

```python
level = 15
has_premium = False

# Can access secret area if:
# (level >= 10 AND has premium) OR level >= 20
can_access = (level >= 10 and has_premium) or (level >= 20)
print(can_access)  # False, level is 15 and no premium
```

> Key takeaway: `and`, `or` und `not` lassen dich Regeln bauen, die sich wie echte Entscheidungen anfühlen.

---

## 5. Reale Ausdrücke lesen: Schule & Gaming

### Beispiel: Prüfung bestehen

```python
score = 13      # out of 20
cheated = False

passed = (score >= 10) and (cheated == False)
print(passed)  # True
```

Du bestehst nur, wenn du genug Punkte hast **und** nicht geschummelt hast.

### Beispiel: „Kann ich noch ein Match spielen?“

```python
time = 21  # 21:00
homework_done = True
parents_home = False

can_play = homework_done and (time < 22 or not parents_home)
print(can_play)
```

Lies es so:
- Hausaufgaben müssen fertig sein.
- UND (es ist vor 22:00 ODER die Eltern sind noch nicht da).

Genau so schreibst du später Regeln für Bots, Apps und Games.

---

## 6. Typische Operator‑Fehler

Selbst Pros machen das manchmal. Die Klassiker:

### Fehler 1: `=` statt `==`

```python
# Bug:
# if score = 10:   # ❌ this is invalid
#     print("Nice")

# Correct:
score = 10
if score == 10:
    print("Nice")
```

- `=` ist **Zuweisung**.
- `==` ist **Vergleich**.

Wenn du’s verwechselst, gibt’s einen **SyntaxError**.

### Fehler 2: falsche Typen vergleichen

```python
age = "16"   # comes from input as text

# Bug:
# if age >= 16:    # comparing 'str' with 'int'
#     print("You can see this movie.")

# Fix:
if int(age) >= 16:
    print("You can see this movie.")
```

Check Typen, wenn Vergleiche komisch reagieren.

### Fehler 3: Bedingungen unnötig kompliziert machen

```python
# Not great:
if is_logged_in == True:
    ...

# Cleaner:
if is_logged_in:
    ...
```

Und für `False`:

```python
# Not great:
if is_banned == False:
    ...

# Cleaner:
if not is_banned:
    ...
```

> Key takeaway: Halte Bedingungen clean und lesbar. Du schreibst für dein Zukunfts‑Ich genauso wie für Python.

---

## Zusammenfassung

- **Arithmetische Operatoren** (`+`, `-`, `*`, `/`, `//`, `%`, `**`) machen die ganze Mathematik.
- **Vergleichsoperatoren** (`==`, `!=`, `<`, `>`, `<=`, `>=`) stellen Fragen und liefern `True`/`False`.
- **Zuweisungsoperatoren** (`=`, `+=`, `-=`, `*=` …) setzen und updaten Werte.
- **Logische Operatoren** (`and`, `or`, `not`) kombinieren Bedingungen zu starken Regeln.
- Kleine Fehler wie `=` vs `==` oder Strings mit Zahlen vergleichen können deine Logik komplett zerstören.

> Achievement Unlocked: Du kannst Python jetzt **in Bedingungen denken lassen** – Scores vergleichen, Regeln checken und Entscheidungen treffen wie eine Game‑Engine oder eine smarte App.
