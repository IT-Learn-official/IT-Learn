# Kapitel 2: Variablen, Zahlen und Geheimcodes

Willkommen zurück, Hacker. In Kapitel 1 hast du die Maschine sprechen lassen. Jetzt bringst du sie dazu, **Dinge zu merken**, **zu rechnen** und deinen „Secret Sauce“ zu speichern: Scores, Health, Codes. Ab hier sind deine Scripts nicht mehr nur Spielzeug, sondern echte Tools.

Am Ende dieses Kapitels kannst du:

- **Variablen** anlegen, um Daten zu speichern (Score, Health, Geheimcodes …).
- **Integers** (ganze Zahlen) und **Floats** (Kommazahlen) verwenden.
- Mit `+`, `-`, `*` und `/` rechnen.
- `//` (Integer Division) und `%` (Modulo) nutzen, um Loot aufzuteilen und Reste zu finden.
- Die **Reihenfolge der Operationen** mit Klammern steuern, damit deine Mathematik nicht schiefgeht.
- **Text und Zahlen** im Output mischen, ohne Fehler zu erzeugen.
- Häufige **Mathe‑ und Variablen‑Bugs** finden und fixen.

---

## Was ist eine Variable?

Eine **Variable** ist wie ein beschrifteter Tresor im Speicher deines Computers. Du kannst etwas hineinlegen, ihr einen Namen geben und später wieder darauf zugreifen.

```python
player_score = 100
health = 95.5
secret_code = "xY_z3n"
```

Hier:
- `player_score` ist eine Box mit der Zahl `100`.
- `health` ist eine Box mit `95.5`.
- `secret_code` ist eine Box mit dem Text `"xY_z3n"`.

Das `=` ist nicht „gleich“ wie im Mathematikunterricht. In Python ist es ein **Zuweisungsoperator** (assignment). Es bedeutet:

> Speichere den Wert rechts **in** der Variablen links.

Also bedeutet:

```python
ammo = 50
```

„Erzeuge eine Variable `ammo` und speichere `50` darin.“

Du kannst den Wert jederzeit aktualisieren:

```python
ammo = 50
ammo = ammo - 10  # Du hast 10 Schüsse abgefeuert
print(ammo)
```

Python liest das so:
1. `ammo = 50` → speichere `50` in `ammo`.
2. `ammo = ammo - 10` → nimm den aktuellen Wert (50), minus 10 (40), speichere `40` zurück in `ammo`.
3. `print(ammo)` → zeigt `40`.

### Variablen richtig benennen

Gute Namen sind entscheidend für sauberen, lesbaren Code – dein Zukunfts‑Ich wird’s dir danken, wenn du um 23:00 vor einer Schularbeit noch einen Bug suchen musst.

- Buchstaben, Zahlen und `_` (Underscore) verwenden.
- **Nie** mit einer Zahl beginnen.
- Für mehrere Wörter `snake_case` nutzen (z. B. `player_health`).
- Beschreibend sein: `player_health` ist besser als `ph`.

**Gültige Namen:**
- `score`
- `player_health`
- `level_2_boss`

**Ungültige Namen:**
- `2fast` (beginnt mit einer Zahl)
- `my score` (enthält ein Leerzeichen)

> Key takeaway: Eine Variable ist ein benannter Container für Daten. Mit `=` weist du einen Wert zu und kannst ihn später ändern.

---

## Integers vs. Floats

Python kennt verschiedene Zahlentypen. Für den Anfang sind diese zwei wichtig:

- **Integers (`int`)**: ganze Zahlen wie `-10`, `0`, `42`.
- **Floats (`float`)**: Zahlen mit Dezimalpunkt wie `3.14`, `-0.5`, `10.0`.

```python
lives = 3          # integer
speed = 7.5        # float
temperature = -10  # integer
```

Auch `10.0` ist ein Float wegen `.0`.

Typisch:
- `int` für Dinge, die du zählst (Lives, Levels, Coins …).
- `float` für Dinge, die du misst (Speed, Zeit, Temperatur …).

> Key takeaway: Integers sind ganze Zahlen. Floats sind Zahlen mit Dezimalstellen.

---

## Grundrechenarten: +, -, *, /

Python ist dein Taschenrechner – nur mit Superkräften.

### Operatoren

- `+` : Addition
- `-` : Subtraktion
- `*` : Multiplikation
- `/` : Division (ergibt immer einen Float)

```python
print(5 + 3)    # 8
print(100 - 25) # 75
print(4 * 8)    # 32
print(10 / 2)   # 5.0
print(9 / 2)    # 4.5
```

Wichtig: `/` liefert immer einen Float, auch wenn das Ergebnis eigentlich ganz ist.

Mit Variablen rechnen:

```python
damage = 25
health = 100
remaining_health = health - damage
print(remaining_health)  # 75
```

> Key takeaway: `+`, `-`, `*`, `/` funktionieren wie am Rechner. `/` gibt einen Float zurück.

---

## Integer Division (//) und Reste (%)

Manchmal willst du keine Dezimalzahlen, sondern volle Gruppen und Reste. Denk an: „Wie viele Coins pro Player?“ oder „Wie viele volle Pakete passen hinein?“

- `//` : **Integer Division** (Floor Division)
- `%` : **Modulo** (der Rest)

### Integer Division `//`

`//` gibt dir das ganzzahlige Ergebnis und wirft die Nachkommastellen weg.

```python
print(9 // 2)   # 4
print(10 // 3)  # 3
```

### Modulo `%`

`%` liefert den Rest einer Division.

```python
print(9 % 2)   # 1 (weil 9 = 4*2 + 1)
print(10 % 3)  # 1 (weil 10 = 3*3 + 1)
```

### Hacker‑Szenario: Loot aufteilen

Du und dein Squad habt 25 digitale Coins erbeutet.

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

> Key takeaway: `a // b` sagt dir, wie viele volle Gruppen du bekommst. `a % b` sagt dir, was übrig bleibt.

---

## Rechenreihenfolge und Klammern

Python folgt der üblichen Reihenfolge (PEMDAS/BODMAS):

1. **Klammern** `()`
2. **Potenzen** `**` (kommt später)
3. **Multiplikation/Division** `*`, `/`, `//`, `%`
4. **Addition/Subtraktion** `+`, `-`

### Ohne Klammern

```python
print(10 + 5 * 2)
```

Python rechnet zuerst `5 * 2` (= 10) und dann `10 + 10` (= 20).

### Mit Klammern

```python
print((10 + 5) * 2)
```

Jetzt wird zuerst `10 + 5` (= 15) und dann `15 * 2` (= 30) gerechnet.

Ein smarter Hacker nutzt Klammern nicht nur für das richtige Ergebnis, sondern auch, um Code für Menschen (und fürs müde Zukunfts‑Ich) gut lesbar zu machen.

> Key takeaway: Python folgt der normalen Rechenreihenfolge. Nutze `()`, um die Reihenfolge zu steuern oder deine Absicht klar zu machen.

---

## Text und Zahlen mischen

Wenn du eine Zahl direkt mit Text „zusammenkleben“ willst, crasht dein Programm.

```python
age = 14
# This will cause a TypeError!
# print("Your age is " + age)
```

Python wirft einen `TypeError`, weil du String und Integer nicht direkt verbinden kannst.

### So fixst du das

#### 1. Zahl in String umwandeln mit `str()`

```python
age = 14
print("Your age is " + str(age))
```

`str(age)` macht aus `14` den Text `"14"`.

#### 2. Kommas in `print()` verwenden

`print()` kann mehrere Werte annehmen. Es konvertiert sie automatisch zu Text und fügt Leerzeichen ein.

```python
age = 14
print("Your age is", age)
```

Beides zeigt: `Your age is 14`.

Vorsicht bei Zahlen, die eigentlich Strings sind:

```python
print("5" + "5")  # "55" (Strings kleben)
print(5 + 5)      # 10 (Zahlen addieren)
```

> Key takeaway: Nutze `str()` oder Kommas in `print()`, um Text und Zahlen sicher zu kombinieren.

---

## Debugging 101

Bugs sind keine Niederlagen – sie sind Rätsel. Ein guter Hacker ist ein guter Detektiv.

### Häufige Bugs

1. **Vertipper bei Variablennamen (`NameError`)**

```python
score = 100
print(scrore)  # NameError: name 'scrore' is not defined
```

**Fix:** Schreibweise checken. Python ist da gnadenlos.

2. **Variable benutzen, bevor sie existiert (`NameError`)**

```python
print(total)  # NameError: name 'total' is not defined
total = 0
```

**Fix:** Variablen immer vor der Nutzung definieren.

3. **Logikfehler (falscher Operator)**

```python
price = 10
quantity = 3
total = price + quantity  # sollte * sein
print(total)  # 13, aber du wolltest wahrscheinlich 30
```

**Fix:** Logik prüfen: Addieren oder multiplizieren?

4. **Klammern vergessen**

```python
result = 100 - 10 * 5  # result is 50
# Meintest du (100 - 10) * 5, das ist 450?
```

**Fix:** Klammern setzen, um die Absicht klar zu machen.

### Einfache Debugging‑Techniken

1. **Fehlermeldung lesen.** Sie nennt Fehlertyp und Zeilennummer.
2. **Variablen ausgeben.** `print()` nutzen, um Werte an verschiedenen Stellen zu sehen.

```python
print("DEBUG: health =", health)
```

3. **Code dir selbst erklären.** Zeile für Zeile durchgehen und laut sagen, was passiert. (Ja, klingt komisch. Funktioniert.)

> Key takeaway: Bugs sind Hinweise. Nutze Fehlermeldungen und `print()`, um herauszufinden, was wirklich passiert.

---

## Was kommt als Nächstes?

Du weißt jetzt, wie du:

- Daten in Variablen speicherst.
- Mit verschiedenen Zahlentypen arbeitest.
- Rechenoperationen ausführst und die Reihenfolge steuerst.
- Text und Zahlen sicher im Output kombinierst.
- Häufige Probleme mit Variablen und Mathe debugst.

Als Nächstes nutzt du diese Skills in Practice‑Missionen und kombinierst sie zu stärkerer Logik.

> Achievement Unlocked: Du kannst Python jetzt merken, rechnen und berichten lassen – wie einen Mini‑Schulserver, den du komplett unter Kontrolle hast.
