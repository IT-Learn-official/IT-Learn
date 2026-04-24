# Kapitel 11: Conditional Logic – deinem Code Entscheidungen beibringen

Willkommen, Hacker. Bis jetzt sind deine Scripts meistens einem festen Pfad gefolgt: oben starten, unten enden, fertig. Praktisch – aber ziemlich hirnlos.

In diesem Kapitel gibst du deinen Programmen ein echtes **Gehirn**.

Mit **Conditional Logic** (`if / elif / else`) kann dein Code:

- auf User‑Input reagieren,
- sich anders verhalten, wenn ein Login scheitert,
- je nach Prüfungsergebnis andere Messages zeigen,
- „allow“ oder „deny“ entscheiden wie ein echtes Access‑System.

Am Ende dieses Kapitels kannst du:

- **Vergleichsoperatoren** nutzen, um `True`/`False`‑Fragen zu stellen.
- `if`‑Statements schreiben, um Code nur dann auszuführen, wenn eine Bedingung erfüllt ist.
- `else` für den „ansonsten“‑Pfad verwenden.
- Mehrere Bedingungen mit `elif` verketten.
- Bedingungen mit `and`, `or` und `not` kombinieren, um smarte Regeln zu bauen.

---

## 1. Bedingungen: Ja/Nein‑Fragen für deinen Code

Eine **Bedingung** ist ein Ausdruck, der mit `True` oder `False` beantwortet werden kann.

Beispiele:

- Ist die Firewall aktiv?
- Ist der Score mindestens 10?
- Ist der Username gleich `"admin"`?
- Ist der Port größer als 1024?

In Python sind Bedingungen einfach Ausdrücke, die zu einem Boolean werden.

```python
port = 22
is_open = True

print(port == 22)       # True
print(is_open == True)  # True
print(port > 1024)      # False
```

Später lässt du `== True` meistens weg und schreibst `if is_open:` direkt – aber zum Verständnis ist es ok.

> Key takeaway: Bedingungen sind Ausdrücke, die `True` oder `False` liefern.

---

## 2. Vergleichsoperatoren: deine Frage‑Tools

Diese Operatoren vergleichen zwei Werte und geben einen Boolean zurück:

- `==` : ist gleich?
- `!=` : ist nicht gleich?
- `<` : ist kleiner?
- `>` : ist größer?
- `<=` : ist kleiner oder gleich?
- `>=` : ist größer oder gleich?

**Wichtige Falle:** Verwechsle `=` nicht mit `==`.

- `x = 10` → **Zuweisung**: 10 in `x` speichern.
- `x == 10` → **Vergleich**: ist `x` gleich 10?

`=` in einem `if` ist ein klassischer Anfängerfehler.

```python
score = 14

print(score >= 10)  # True, you passed (on 20)
print(score == 20)  # False
print(score != 0)   # True
```

> Key takeaway: `=` ändert eine Variable; `==` prüft einen Wert.

---

## 3. Das `if`‑Statement: dein erstes Gate

Ein `if` ist wie ein Security‑Gate:

- ist die Bedingung `True`, geht Python hinein und führt den Block aus.
- ist sie `False`, überspringt es den Block.

Indentation zeigt, welche Zeilen zum `if` gehören.

```python
is_admin = True

if is_admin == True:
    print("Administrative privileges granted.")
    print("Loading control panel…")

print("Program continues…")
```

Wenn `is_admin` `False` wäre, würdest du nur `Program continues…` sehen.

> Key takeaway: `if condition:` führt den eingerückten Block nur aus, wenn die Bedingung `True` ist.

---

## 4. `if / else`: zwei mögliche Pfade

`else` ist der zweite Pfad, wenn die `if`‑Bedingung **nicht** erfüllt ist.

```python
password_attempt = "12345"
correct_password = "pA$$w0rd_123"

if password_attempt == correct_password:
    print("Access Granted.")
else:
    print("Access Denied. Logging attempt.")
```

Einer der Blöcke läuft **immer**. Entweder rein oder nicht rein.

Schul‑Style:

```python
score = 9.5  # out of 20

if score >= 10:
    print("You passed, nice.")
else:
    print("Not passed. Next time we go harder.")
```

> Key takeaway: `if/else` ist für „das oder das“ – zwei Outcomes.

---

## 5. `elif`: mehr als zwei Optionen

Manchmal gibt’s mehr als „ja“ oder „nein“. Beispiel Noten:

- 16+ → excellent,
- 12–15 → gut,
- 10–11 → knapp bestanden,
- unter 10 → nicht bestanden.

`elif` („else if“) erlaubt dir, mehrere Fälle zu verketten.

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

Python prüft von oben nach unten und führt **nur den ersten** Block aus, dessen Bedingung `True` ist.

Hacker‑Style:

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

> Key takeaway: Nutze `elif`, wenn du mehrere Cases hast, nicht nur zwei.

---

## 6. Logische Operatoren: `and`, `or`, `not`

Reale Entscheidungen brauchen oft **mehr als eine** Bedingung:

> „Ich darf spielen, wenn die Hausaufgaben fertig sind **und** es vor 22:00 ist.“

Python hat drei logische Operatoren:

- `and` – alle Bedingungen müssen `True` sein.
- `or` – mindestens eine Bedingung muss `True` sein.
- `not` – kippt `True` ↔ `False`.

### `and`: alles muss stimmen

```python
username = "admin"
ip_address = "127.0.0.1"

# Only allow admin from local machine
if username == "admin" and ip_address == "127.0.0.1":
    print("Welcome, administrator.")
```

### `or`: eins reicht

```python
has_keycard = False
knows_password = True

# Door opens if you have the keycard OR know the password
if has_keycard or knows_password:
    print("Door unlocked.")
```

### `not`: umdrehen

```python
is_logged_in = False

if not is_logged_in:
    print("Please log in to continue.")
```

Kombinieren:

```python
time = 21          # 21:00
homework_done = True
parents_home = False

can_play = homework_done and (time < 22 or not parents_home)
print(can_play)
```

Lies es so:

- Hausaufgaben müssen fertig sein.
- UND (vor 22:00 ODER Eltern noch nicht zu Hause).

> Key takeaway: Logische Operatoren machen aus kleinen Checks starke Regeln.

---

## 7. Nested Conditions: Entscheidungen in Entscheidungen

Du kannst ein `if` in ein anderes `if` setzen. Das heißt **Nesting**.

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

Nesting ist mächtig, aber zu tief wird’s schwer lesbar. Später lernst du Patterns, um „Pyramids of Doom“ zu vermeiden.

> Key takeaway: Nesting drückt komplexere Logik aus – aber übertreib’s nicht.

---

## 8. Typische Fehler mit Conditionals

### 1. `=` statt `==`

```python
# Wrong (and will cause a SyntaxError):
# if score = 10:
#     print("Nice")

# Correct:
score = 10
if score == 10:
    print("Nice")
```

### 2. Falsche Typen vergleichen

```python
age = "16"  # comes from input as text

# Bug:
# if age >= 16:  # comparing str to int
#     print("You can watch this movie.")

# Fix:
if int(age) >= 16:
    print("You can watch this movie.")
```

### 3. Zu verbose Booleans

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

> Key takeaway: Weirdes Verhalten bei Conditionals kommt fast immer von Typ‑Issues oder einem winzigen Symbol‑Fehler.

---

## Zusammenfassung

- Bedingungen sind `True`/`False`‑Fragen, mit denen dein Code entscheidet.
- **Vergleichsoperatoren** (`==`, `!=`, `<`, `>`, `<=`, `>=`) bauen diese Fragen.
- `if` führt Code nur aus, wenn die Bedingung `True` ist.
- `else` ist der „ansonsten“‑Pfad.
- `elif` ist für mehrere Cases.
- **Logische Operatoren** (`and`, `or`, `not`) kombinieren Bedingungen zu smarten Regeln.

> Achievement Unlocked: Deine Programme können jetzt **Entscheidungen treffen** – auf Input reagieren, Regeln checken und Verhalten ändern wie die Logik hinter Games, Apps und Login‑Systemen.
