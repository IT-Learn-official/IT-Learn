# Hoofdstuk 12: Loops en automatisatie – Python laten grinden voor jou

Welkom, hacker. Je hebt je programma’s geleerd om te **denken** met `if/else`. Nu is het tijd om ze te laten **grinden**.

Loops zijn hoe je tegen Python zegt:
- “Doe dit 10 keer.”
- “Doe dit voor elke target in de lijst.”
- “Blijf doorgaan tot we klaar zijn.”

In plaats van dezelfde code 100 keer te copy‑pasten, schrijf je ze **één keer** en laat je Python het herhalen. Zo kan je:
- hele netwerken scannen,
- wachtwoorden brute‑forcen (ethisch—in een lab),
- grote log files verwerken,
- door al je examenresultaten gaan.

Tegen het einde van dit hoofdstuk kan je:

- `for` loops gebruiken om repetitieve taken te automatiseren.
- Nummerreeksen genereren met `range()` om loops te sturen.
- Itereren over collecties (lists, strings, enz.).
- `while` loops gebruiken wanneer je niet op voorhand weet hoeveel herhalingen je nodig hebt.
- Veelvoorkomende loop‑patronen gebruiken om te tellen, te zoeken en data te filteren.
- Loops controleren met `break` en `continue`.

---

## 1. Wat is een loop?

Een **loop** is een structuur die een blok code herhaalt zolang een regel zegt: “ga door”.

Zonder loops:
- Als je 100 servers wil pingen, schrijf je 100 regels.

Met loops:
- Je schrijft de ping‑code één keer,
- zegt “doe dit 100 keer”,
- en gaat ondertussen een koek pakken.

Het is het verschil tussen al je wiskunde‑huiswerk manueel doen en een rekenmachine dezelfde soort oefening snel laten herhalen.

> Key takeaway: Loops zijn hoe je Python het saaie repetitieve werk voor jou laat doen.

---

## 2. De `for` loop: “voor elk item in deze collectie…”

Een `for` loop gebruik je wanneer je **de collectie kent** waar je door wil gaan—zoals een lijst IP’s, usernames of getallen.

### Loopen met `range()`

`range()` maakt een reeks getallen, perfect voor “doe dit N keer”.

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

Je kan ook start, stop en step meegeven: `range(start, stop, step)`.

```python
# Scan ports from 80 to 85
for port in range(80, 86):
    print(f"Scanning port {port}…")
```

### Loopen over collecties

De echte power van `for` loops: door **lists, strings en andere iterables** gaan.

**Door een list van targets loopen:**

```python
targets = ["192.168.1.1", "10.0.0.5", "scanme.nmap.org"]

for target in targets:
    print(f"Pinging {target}…")
```

**Door een string loopen:**

```python
password = "pA$$w0rd"

for character in password:
    print(f"Analyzing character: {character}")
```

> Key takeaway: `for` loops zijn top wanneer je een duidelijke set items één voor één wil verwerken.

---

## 3. De `while` loop: “blijf doorgaan zolang dit waar is”

Een `while` loop is voor situaties waar je **niet weet** hoe vaak iets herhaald wordt, maar je **wel** weet welke regel bepaalt wanneer je stopt.

Denk: “Ik scroll TikTok **zolang** ik nog niet moe ben”… en plots is het 2 uur ’s nachts.

```python
attempts = 0
max_attempts = 5

while attempts < max_attempts:
    print(f"Attempt #{attempts + 1}: Trying password…")
    # In a real attack, you’d try a password here
    attempts += 1  # CRITICAL: update the counter!

print("Max attempts reached.")
```

**GEVAAR:** Als je vergeet om de variabele in je condition te updaten (zoals `attempts += 1`), wordt de condition nooit `False` en loopt je loop **voor altijd**.

Dat heet een **infinite loop**, en je moet het programma dan manueel killen.

> Key takeaway: Gebruik `while` wanneer je de stop‑regel kent, niet het exacte aantal herhalingen.

---

## 4. `for` vs `while`: welke kies je?

- Gebruik een **`for` loop** wanneer:
  - je weet hoeveel keer je wil herhalen, of
  - je een duidelijke collectie hebt om over te itereren.
  - Voorbeelden: “voor elke target in deze list”, “voor elk getal van 1 tot 100”.

- Gebruik een **`while` loop** wanneer:
  - het aantal herhalingen afhangt van de situatie,
  - je doorgaat tot een condition verandert.
  - Voorbeelden: “zolang de connectie actief is”, “zolang de gebruiker nog geen geldige waarde gaf”.

Soms kan je hetzelfde probleem met allebei oplossen—kies wat de logica het duidelijkst maakt.

---

## 5. Je loops controleren: `break` en `continue`

Soms is de standaard flow niet genoeg.

### `break`: nooduitgang

`break` stopt de loop meteen—ook al zou hij nog kunnen doorgaan.

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

### `continue`: deze ronde overslaan

`continue` slaat de rest van de huidige loop‑body over en springt naar de **volgende** iteratie.

```python
# Only process .txt files
files = ["image.jpg", "report.txt", "data.json", "notes.txt"]

for file in files:
    if not file.endswith(".txt"):
        continue  # Skip non-text files

    print(f"Processing text file: {file}")
```

> Key takeaway: Gebruik `break` om vroeg te stoppen; gebruik `continue` om één iteratie over te slaan.

---

## 6. Veelvoorkomende loop‑patronen

Eens je de basics kent, zie je dezelfde templates overal terug.

### 6.1 Counter / accumulator

Je start op 0 en telt op.

```python
# Count open ports
open_ports = [22, 80, 443, 8080]
count = 0

for port in open_ports:
    count += 1

print(f"Found {count} open ports.")
```

Je kan ook sommen, gemiddelden, enz. accumuleren.

### 6.2 Zoek‑patroon

Je zoekt iets specifieks en markeert het als gevonden.

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

### 6.3 Filteren

Maak een nieuwe list met alleen items die matchen.

```python
ports = [21, 22, 80, 443, 1337, 8080]
secure_ports = []

for port in ports:
    if port in [80, 443]:
        secure_ports.append(port)

print(secure_ports)  # [80, 443]
```

Later leer je kortere manieren (zoals list comprehensions), maar dit is de basis.

> Key takeaway: Tellen, zoeken en filteren zijn drie loop‑templates die je constant hergebruikt.

---

## Samenvatting

- **Loops** laten je code werk herhalen in plaats van jij.
- **`for` loops** itereren over een gekende reeks (`range`, lists, strings, …).
- **`while` loops** lopen zolang een condition `True` is.
- **`break`** verlaat een loop vroeg.
- **`continue`** slaat de huidige iteratie over.
- Klassieke patronen: counters, searches en filters.

> Achievement Unlocked: Je kan Python nu repetitief werk laten doen—van targets scannen en logs verwerken tot scores analyseren en data filteren.
