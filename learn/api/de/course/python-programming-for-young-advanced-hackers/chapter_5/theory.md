# Kapitel 5: Ausführungsfluss und digitale Forensik

Willkommen, Hacker. Du kannst schon Zaubersprüche schreiben (Code), aber jetzt musst du lernen, wie sich die Magie entfaltet. In diesem Kapitel meisterst du den **Execution Flow** – den Schritt‑für‑Schritt‑Pfad, den Python durch dein Script nimmt. Außerdem lernst du **digitale Forensik**: mit `print()`‑Statements Bugs jagen.

Am Ende dieses Kapitels kannst du:

- **Execution Flow** erklären und vorhersagen, wie ein Script läuft.
- **Variablen tracen**, um zu sehen, wie sich Daten im Lauf des Programms verändern.
- **Print‑Debugging** als wichtigstes Forensik‑Tool einsetzen.
- Fehlermeldungen analysieren und typische Bugs wie ein Pro fixen.

---

## Was ist Execution Flow?

Wenn du ein Python‑Script ausführst, „sieht“ der Interpreter nicht die ganze Datei auf einmal. Er arbeitet wie ein Detektiv, der eine Akte liest: Er startet **oben** und geht **nach unten**, Zeile für Zeile. Dieser verlässliche Top‑Down‑Pfad ist der **Execution Flow**.

Schau dir dieses Script an:

```python
# Line 1
print("Initializing program...")

# Line 2
username = "Cipher"
print("User found:", username)

# Line 3
level = 5
print("Level:", level)

# Line 4
level = level + 1
print("New level:", level)
```

Python führt es in strikter Reihenfolge aus:

1. Es printet `"Initializing program..."`.
2. Es erstellt `username` und printet den Wert.
3. Es erstellt `level` und printet den Wert.
4. Es rechnet `5 + 1`, setzt `level` auf `6` und printet den neuen Wert.

Die Reihenfolge ist alles. Wenn du `level` vor Zeile 3 printen würdest, crasht das Programm mit einem `NameError`, weil `level` an diesem Punkt der Timeline noch nicht existiert.

> **Key takeaway:** Python läuft von oben nach unten, Zeile für Zeile. Die Reihenfolge deiner Befehle ist kritisch.

---

## Variablen tracen: die Datenspur verfolgen

**Tracing** bedeutet, den Zustand deiner Variablen während der Ausführung zu verfolgen. Stell dir vor, du klebst einen GPS‑Tracker an Daten: Du siehst, wohin sie wandern und wie sie sich verändern. Das ist eine der wichtigsten Debugging‑Grundskills.

Tracen wir die Variablen in diesem Script:

```python
# 1. Start of script
health = 100
mana = 50

# 2. Took damage
health = health - 30

# 3. Cast a spell
mana = mana - 20

# 4. Found a health potion
health = health + 50
```

Ein Trace sieht so aus:

| Line # | Code Executed               | `health` value | `mana` value | Notes                     |
| :----- | :-------------------------- | :------------- | :----------- | :------------------------ |
| 1      | `health = 100`, `mana = 50` | 100            | 50           | Initial state             |
| 2      | `health = health - 30`      | 70             | 50           | `health` is updated       |
| 3      | `mana = mana - 20`          | 70             | 30           | `mana` is updated         |
| 4      | `health = health + 50`      | 120            | 30           | `health` is updated again |

Am Ende ist `health` `120` und `mana` `30`. Manuelles Tracing (am Papier oder im Kopf) ist extrem hilfreich, um Logikfehler zu finden.

> **Key takeaway:** Um dein Programm zu verstehen, musst du verfolgen können, wie sich Variablen von der ersten bis zur letzten Zeile verändern.

---

## Print‑Debugging: deine Forensik‑Toolbox

Wenn dein Code nicht funktioniert und du nicht weißt warum: Starre ihn nicht nur an. **Verhör ihn.** Die einfachste Methode sind `print()`‑Statements. Das nennt man **Print‑Debugging** – und es ist eines der zuverlässigsten Forensik‑Tools.

Ziel: Werte und Typen deiner Variablen an wichtigen Stellen im Execution Flow sichtbar machen.

### Szenario: eine buggy Berechnung

Stell dir vor, dieser Code soll die Gesamtkosten berechnen, liefert aber das falsche Ergebnis:

```python
price = 10
quantity = 3
tax = 0.05

# Buggy code
total = price + quantity * tax
print("Total cost:", total)
```

Output ist `10.15`, aber du hast `10 * 3` plus Tax erwartet. Was ist falsch? Print‑Debugging hilft:

```python
price = 10
quantity = 3
tax = 0.05

# --- Start of Forensic Investigation ---
print("DEBUG: price is", price, "and its type is", type(price))
print("DEBUG: quantity is", quantity, "and its type is", type(quantity))
print("DEBUG: tax is", tax, "and its type is", type(tax))

subtotal = price * quantity
print("DEBUG: subtotal is", subtotal)

total_tax = subtotal * tax
print("DEBUG: total_tax is", total_tax)

total = subtotal + total_tax
# --- End of Forensic Investigation ---

print("Final total:", total)
```

Wenn du jeden Schritt ausgibst, siehst du sofort, wo der Logikfehler steckt. Im originalen buggy Code war die Reihenfolge der Operationen falsch. Deine „Untersuchung“ zeigt die richtigen Schritte – und du kannst fixen.

> **Key takeaway:** Wenn Code kaputt ist, setz `print()`‑Statements, um Werte und Typen zu prüfen. Das führt dich zur Ursache.

---

## Fehlermeldungen lesen

Fehlermeldungen, also **Tracebacks**, sind keine Niederlagen. Das sind Hinweise. Ein guter Hacker liest sie genau.

Ein Traceback sagt dir drei Dinge:

1. **Datei und Zeilennummer**, wo der Fehler passiert ist.
2. **Die Codezeile**, die den Fehler ausgelöst hat.
3. **Den Fehlertyp** (`NameError`, `TypeError`, `ValueError`, …).

```
Traceback (most recent call last):
  File "C:/Users/hacker/my_script.py", line 5, in <module>
    print("Score: " + scor)
NameError: name 'scor' is not defined
```

**Forensik‑Analyse:**

- **Wo?** `my_script.py`, Zeile 5.
- **Was?** `print("Score: " + scor)`.
- **Warum?** `NameError`. Das Programm kennt `scor` nicht.

Der Hinweis ist klar: Tippfehler. Die Variable heißt wahrscheinlich `score`, nicht `scor`.

> **Key takeaway:** Hab keine Angst vor rotem Text. Lies die Fehlermeldung von unten nach oben. Sie sagt dir genau, wo du anfangen musst.

---

## Zusammenfassung

- **Execution Flow:** Python läuft von oben nach unten, in Reihenfolge.
- **Variablen‑Tracing:** (im Kopf oder am Papier) verfolgen, wie Variablen sich Zeile für Zeile ändern.
- **Print‑Debugging:** `print()` nutzen, um Werte im laufenden Programm zu sehen – Top‑Tool für Bug‑Jagd.
- **Fehlermeldungen:** sind Hinweise, keine Failures. Sie sagen dir wo und warum es crasht.

Du bist jetzt in der Lage, nicht nur Code zu schreiben, sondern ihn auch zu analysieren und zu debuggen. Das ist das Zeichen eines echten Programmierers.
