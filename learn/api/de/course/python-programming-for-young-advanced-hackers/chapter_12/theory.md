# Kapitel 12: Loops und Automatisierung – Python für dich grinden lassen

Willkommen, Hacker. Du hast deinen Programmen mit `if/else` beigebracht zu **denken**. Jetzt bringst du sie dazu zu **grinden**.

Loops sind, wie du Python sagst:
- „Mach das 10‑mal.“
- „Mach das für jedes Target in der Liste.“
- „Mach weiter, bis wir fertig sind.“

Statt denselben Code 100‑mal zu kopieren, schreibst du ihn **einmal** und lässt Python wiederholen. So kannst du:
- ganze Netzwerke scannen,
- Passwörter brute‑forcen (ethisch – im Labor),
- große Log‑Files verarbeiten,
- durch alle Prüfungsergebnisse gehen.

Am Ende dieses Kapitels kannst du:

- `for`‑Loops nutzen, um repetitive Tasks zu automatisieren.
- Zahlensequenzen mit `range()` generieren, um Loops zu steuern.
- Über Sammlungen iterieren (Lists, Strings, etc.).
- `while`‑Loops verwenden, wenn du die Anzahl der Wiederholungen nicht im Voraus kennst.
- Typische Loop‑Patterns für Counting, Searching und Filtering nutzen.
- Loops mit `break` und `continue` kontrollieren.

---

## 1. Was ist ein Loop?

Ein **Loop** wiederholt einen Codeblock, solange eine Regel sagt: „go“.

Ohne Loops:
- Wenn du 100 Server pingen willst, schreibst du 100 Zeilen.

Mit Loops:
- Du schreibst den Ping‑Code einmal,
- sagst „mach das 100‑mal“,
- und holst dir währenddessen was zum Snacken.

Es ist wie Mathe‑Hausaufgaben: alles manuell vs. ein Rechner, der den gleichen Aufgabentyp schnell wiederholt.

> Key takeaway: Loops sind, wie du Python die langweilige Wiederholungsarbeit für dich machen lässt.

---

## 2. Der `for`‑Loop: „für jedes Item in dieser Collection…“

Ein `for`‑Loop ist ideal, wenn du **die Collection kennst**, durch die du gehen willst – z. B. eine Liste IPs, Usernames oder Zahlen.

### Loopen mit `range()`

`range()` erzeugt eine Zahlenfolge – perfekt für „mach das N‑mal“.

```python
# range(5) generates numbers from 0 up to (but not including) 5
for i in range(5):
    print(f"Executing task #{i}")
```

Output:

```
Executing task #0
Executing task #1
Executing task #2
Executing task #3
Executing task #4
```

Du kannst auch start/stop/step angeben: `range(start, stop, step)`.

```python
# Scan ports from 80 to 85
for port in range(80, 86):
    print(f"Scanning port {port}…")
```

### Über Collections iterieren

Die echte Power: über **Lists, Strings und andere Iterables** gehen.

**Über eine Target‑List loopen:**

```python
targets = ["192.168.1.1", "10.0.0.5", "scanme.nmap.org"]

for target in targets:
    print(f"Pinging {target}…")
```

**Über einen String loopen:**

```python
password = "pA$$w0rd"

for character in password:
    print(f"Analyzing character: {character}")
```

> Key takeaway: `for`‑Loops sind stark, wenn du eine klare Menge an Items nacheinander verarbeiten willst.

---

## 3. Der `while`‑Loop: „mach weiter, solange das True ist“

Ein `while`‑Loop ist für Situationen, wo du **nicht weißt**, wie oft etwas wiederholt wird – aber du kennst die Regel, wann Schluss ist.

Denk: „Ich scroll TikTok **solange** ich nicht müde bin“… und plötzlich ist es 2 Uhr morgens.

```python
attempts = 0
max_attempts = 5

while attempts < max_attempts:
    print(f"Attempt #{attempts + 1}: Trying password…")
    # In a real attack, you’d try a password here
    attempts += 1  # CRITICAL: update the counter!

print("Max attempts reached.")
```

**GEFAHR:** Wenn du vergisst, die Variable in der Bedingung zu updaten (`attempts += 1`), wird die Bedingung nie `False` und der Loop läuft **für immer**.

Das ist ein **infinite loop** – dann musst du das Programm manuell abbrechen.

> Key takeaway: Nutze `while`, wenn du die Stop‑Bedingung kennst, nicht die exakte Anzahl an Wiederholungen.

---

## 4. `for` vs `while`: was passt?

- Nimm **`for`**, wenn:
  - du weißt, wie oft du wiederholen willst, oder
  - du eine klare Collection hast, über die du iterierst.
  - Beispiele: „für jedes Target in der Liste“, „für jede Zahl von 1 bis 100“.

- Nimm **`while`**, wenn:
  - die Anzahl der Wiederholungen von der Situation abhängt,
  - du weitermachst, bis sich eine Bedingung ändert.
  - Beispiele: „solange die Verbindung aktiv ist“, „solange der User keinen gültigen Wert eingibt“.

Beide können manchmal dasselbe Problem lösen – nimm, was die Logik klarer macht.

---

## 5. Loops steuern: `break` und `continue`

Manchmal reicht der Standard‑Flow nicht.

### `break`: Notausgang

`break` stoppt den Loop sofort – auch wenn er weiterlaufen könnte.

```python
# A simple password checker
passwords_to_try = ["12345", "password", "qwerty", "pA$$w0rd"]
correct_password = "pA$$w0rd"

for password in passwords_to_try:
    print(f"Trying: {password}")
    if password == correct_password:
        print("Password found!")
        break  # Exit the loop, mission accomplished
```

### `continue`: diese Runde überspringen

`continue` überspringt den Rest des aktuellen Loop‑Bodys und springt zur **nächsten** Iteration.

```python
# Only process .txt files
files = ["image.jpg", "report.txt", "data.json", "notes.txt"]

for file in files:
    if not file.endswith(".txt"):
        continue  # Skip non-text files

    print(f"Processing text file: {file}")
```

> Key takeaway: `break` beendet früh; `continue` überspringt eine Iteration.

---

## 6. Häufige Loop‑Patterns

Wenn du die Basics kannst, siehst du überall dieselben Templates.

### 6.1 Counter / Accumulator

Du startest bei 0 und addierst.

```python
# Count open ports
open_ports = [22, 80, 443, 8080]
count = 0

for port in open_ports:
    count += 1

print(f"Found {count} open ports.")
```

Du kannst auch Summen, Durchschnitte usw. akkumulieren.

### 6.2 Search‑Pattern

Du suchst etwas Bestimmtes und markierst es als gefunden.

```python
users = ["root", "admin", "guest"]
user_to_find = "hacker"
found = False

for user in users:
    if user == user_to_find:
        found = True
        break

if found:
    print(f"User '{user_to_find}' exists on the system.")
else:
    print(f"User '{user_to_find}' not found.")
```

### 6.3 Filtering

Baue eine neue List, die nur Items behält, die eine Bedingung erfüllen.

```python
ports = [21, 22, 80, 443, 1337, 8080]
secure_ports = []

for port in ports:
    if port in [80, 443]:
        secure_ports.append(port)

print(secure_ports)  # [80, 443]
```

Später lernst du kürzere Varianten (z. B. List Comprehensions), aber dieses Pattern ist die Basis.

> Key takeaway: Counting, Searching und Filtering sind drei Loop‑„Templates“, die du ständig wiederverwendest.

---

## Zusammenfassung

- **Loops** lassen Code Arbeit wiederholen – statt du.
- **`for`‑Loops** iterieren über eine bekannte Sequenz (`range`, Lists, Strings, …).
- **`while`‑Loops** laufen, solange eine Bedingung `True` ist.
- **`break`** beendet einen Loop früh.
- **`continue`** überspringt den Rest der aktuellen Iteration.
- Klassische Patterns: Counter, Search und Filter.

> Achievement Unlocked: Du kannst Python jetzt repetitive Arbeit erledigen lassen – von Targets scannen und Logs verarbeiten bis zu Scores analysieren und Daten filtern.
