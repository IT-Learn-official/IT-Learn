# Kapitel 3: Funktions‑Superkräfte und eingebaute Tools

Du hast gelernt, Python sprechen und rechnen zu lassen. Jetzt kommt deine nächste Superkraft: **Funktionen**. Eine Funktion ist ein wiederverwendbarer Befehl – ein fertiges Tool in deinem Hacking‑Arsenal. Wie ein einziger Button im Game statt 10 Aktionen hintereinander.

Am Ende dieses Kapitels kannst du:

- Erklären, was eine **Funktion** ist und warum sie der beste Freund eines Hackers ist.
- Eingebaute Funktionen wie `print()`, `len()`, `abs()`, `round()` und `type()` nutzen.
- Verstehen, was **Argumente** sind (die Daten, die du einer Funktion gibst).
- Verstehen, was ein **Return Value** ist (das Ergebnis, das eine Funktion zurückgibt).
- Console‑Output lesen und richtig interpretieren.

> Key takeaway: Eine Funktion ist ein benanntes, wiederverwendbares Tool, das du aufrufst, indem du den Namen mit Klammern `()` schreibst.

---

## 1. Was ist eine Funktion?

Stell dir vor, du hast magische Tools am Laptop. Ein Tool sagt dir, wie lang ein Text ist. Ein anderes macht aus einer „schmutzigen“ Zahl eine schön gerundete Zahl. Du willst diese Logik nicht jedes Mal neu schreiben – du willst einfach **das Tool aufrufen**.

Eine **Funktion** in Python ist genau so ein Tool:

- Sie hat einen **Namen** (z. B. `len`, `round`).
- Du **rufst** sie auf, indem du den Namen mit Klammern schreibst: `len("password")`.
- Die **Inputs** (Daten, mit denen sie arbeiten soll) kommen in die Klammern.
- Die Funktion erledigt ihren Job.
- Oft gibt sie ein **Ergebnis** zurück, das du weiterverwenden kannst.

Beispiele:

- Ein „Längen‑Checker“: du gibst `"secret"`, du bekommst `6`.
- Ein „Rundungs‑Tool“: du gibst `7.823`, du bekommst `8`.

In Python sind das Funktionen:

```python
# This calls the built-in function len()
len("secret")  # This will give back 6
```

> Key takeaway: Denk an eine Funktion als spezialisiertes Tool für eine konkrete Aufgabe.

---

## 2. `print()` nochmal – dein Kommunikationsgerät

Du verwendest `print()` seit Kapitel 1. Sieh es jetzt wie ein echter Hacker: Das ist die Funktion, mit der dein Programm Nachrichten nach außen schickt – wie das Chat‑Fenster deines Programms.

```python
print("Mission accomplished.")
```

Aufbau:

- `print` ist der **Name** der Funktion.
- Die Klammern `()` **rufen** die Funktion auf.
- In den Klammern steht das **Argument**: der String `"Mission accomplished."`.
- Die Aufgabe der Funktion ist, diesen Text am Screen auszugeben.

`print()` ist speziell, weil es vor allem **Output** für dich erzeugt. Das Ergebnis von `print()` speicherst du normalerweise nicht in einer Variablen.

Du kannst `print()` mehrere Argumente geben, getrennt durch Kommas:

```python
username = "Ghost"
level = 12
print("User:", username, "Level:", level)
```

> Key takeaway: `print()` nutzt du, damit dein Programm mit dir „spricht“.

---

## 3. Argumente – die Maschine füttern

Die Werte, die du **in die Klammern** schreibst, heißen **Argumente**. Das sind die Infos, die die Funktion braucht, um ihren Job zu machen.

```python
print("Access denied.")      # The argument is "Access denied."
len("hacker")               # The argument is "hacker"
round(3.14159, 2)           # The arguments are 3.14159 and 2
```

Manche Funktionen brauchen ein Argument, manche mehrere. Denk an Argumente wie Einstellungen bei einem Tool oder Optionen im Game‑Menü.

> Key takeaway: Argumente sind die Inputs, die du einer Funktion gibst, damit sie weiß, womit sie arbeiten soll.

---

## 4. Return Values – Ergebnisse zurückbekommen

Viele Funktionen geben nach ihrer Arbeit einen Wert zurück. Das nennt man **Return Value** – das Ergebnis der Funktion.

In der Python‑REPL (interaktive Shell) wird dieser Return Value automatisch angezeigt:

```python
>>> len("password")
8
```

Die `8` ist der _Return Value_ von `len("password")`.

In einem Script willst du diesen Return Value fast immer **speichern**, um ihn später zu nutzen:

```python
password = "my_secret_password"
password_length = len(password)  # len() returns 18, which is stored in password_length
print("Password length is:", password_length)
```

Wichtig ist der Unterschied:

- `len("password")` **returnt** einen Wert (`8`).
- `print("password")` **zeigt** etwas am Screen, returnt aber keinen nützlichen Wert für dein Programm.

> Key takeaway: Ein Return Value ist das Ergebnis, das eine Funktion zurückgibt. Speichere es in einer Variablen, wenn du es später brauchst.

---

## 5. Deine eingebaute Hacking‑Toolbox

Python bringt viele eingebaute Funktionen mit – wie Standard‑Apps, bevor du extra etwas installierst. Ein paar Essentials:

- `len()`: Wie lang sind diese Daten?
- `abs()`: Was ist der absolute (positive) Wert?
- `round()`: Lange Dezimalzahlen sauber machen.
- `type()`: Welcher Datentyp ist das?

### 5.1 `len()` – der Längen‑Checker

`len()` sagt dir, wie viele Zeichen in einem String sind.

```python
len("code")          # 4
len("cyberspace")    # 10
len("Hello, world!") # 13 (Leerzeichen und Satzzeichen zählen mit!)
```

Du kannst damit prüfen, ob ein Passwort lang genug ist:

```python
password = "123"
password_length = len(password)
print("Password length is:", password_length)  # 3
```

### 5.2 `abs()` – absoluter Wert

`abs()` liefert den nicht‑negativen Wert einer Zahl. Denk an „Abstand zu 0“.

```python
abs(-10)  # 10
abs(10)   # 10
```

Praktisch in Games/Simulationen, wenn Distanz zählt, nicht Richtung:

```python
player_pos = 5
enemy_pos = -5
distance = abs(player_pos - enemy_pos)  # abs(10) = 10
```

### 5.3 `round()` – der Aufräumer

`round()` kürzt lange Dezimalzahlen.

```python
round(3.14159)      # 3
round(3.14159, 2)   # 3.14
```

Ideal, um Scores/Stats schön anzuzeigen:

```python
accuracy = 0.87654321
short_accuracy = round(accuracy, 2)
print("Your accuracy:", short_accuracy)  # Your accuracy: 0.88
```

### 5.4 `type()` – der Inspektor

`type()` ist dein Debugging‑Detektiv. Es sagt dir, welchen Datentyp eine Variable hat.

```python
coins = 100
health = 98.6
username = "ZeroCool"

print(type(coins))     # <class 'int'>
print(type(health))    # <class 'float'>
print(type(username))  # <class 'str'>
```

Wenn dein Code komisch ist, ist `type()` eine der ersten Checks: Versuchst du gerade aus Versehen eine Zahl und einen String zu addieren? `type()` deckt das auf.

> Key takeaway: `len()`, `abs()`, `round()` und `type()` sind essentielle Tools, um Daten zu inspizieren und zu bearbeiten.

---

## 6. Console‑Output vs. Return Values

Es ist wichtig zu wissen, was du in der Konsole wirklich siehst.

1. **Printed Output:** was dein Code explizit mit `print()` ausgibt.
2. **Return Values:** in der REPL wird das Ergebnis jeder Eingabe automatisch angezeigt.

In der REPL:

```python
>>> len("hacker")
6        # Return Value, der angezeigt wird
>>> print(len("hacker"))
6        # Output von print()
```

In einem Script (`.py`) wird **nichts** angezeigt, außer du verwendest `print()`:

```python
# Läuft, aber du siehst nichts
len("hacker")

# Zeigt 6
print(len("hacker"))
```

Standard‑Pattern in Scripts:

1. Funktion aufrufen und Return Value in einer Variable speichern.
2. Mit `print()` das Ergebnis anzeigen.

```python
username = "Trinity"
length = len(username)
print("Username length:", length)
```

> Key takeaway: In Scripts musst du `print()` verwenden, wenn du einen Wert **sehen** willst. Return Values bleiben im Programm, bis du sie ausgibst.

---

## Zusammenfassung

- Eine **Funktion** ist ein wiederverwendbarer Befehl, den du mit `()` aufrufst.
- **Argumente** sind Inputs, die du in die Klammern gibst.
- Ein **Return Value** ist das Ergebnis, das eine Funktion zurückgibt (und das du speichern kannst).
- `print()` ist Output für Menschen.
- `len()`, `abs()`, `round()` und `type()` sind starke eingebaute Tools.

> Achievement Unlocked: Du nutzt Pythons eingebaute Toolbox wie ein Pro – als Nächstes schmiedest du deine **eigenen** Funktionen.
