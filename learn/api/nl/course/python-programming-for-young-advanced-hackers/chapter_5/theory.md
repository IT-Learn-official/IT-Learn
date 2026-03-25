# Hoofdstuk 5: Uitvoeringsflow en digitale forensics

Welkom, hacker. Je hebt geleerd om spreuken te schrijven (code), maar nu moet je leren hoe de magie zich ontvouwt. In dit hoofdstuk pak je het concept **execution flow** vast: het stap‑voor‑stap pad dat Python door je script volgt. En je leert **digitale forensics**: met `print()`‑statements bugs opsporen.

Tegen het einde van dit hoofdstuk kan je:

- **Execution flow** uitleggen en voorspellen hoe een script zal lopen.
- **Variabelen tracen** om te zien hoe data doorheen je code verandert.
- **Print‑debugging** gebruiken als je belangrijkste forensic tool.
- Foutmeldingen analyseren en veelvoorkomende bugs fixen als een pro.

---

## Wat is execution flow?

Wanneer je een Python‑script runt, ziet de interpreter niet het hele bestand “in één keer”. Hij werkt als een detective die een dossier leest: hij start bovenaan en leest naar beneden, regel per regel. Dat voorspelbare top‑to‑bottom pad heet de **execution flow**.

Bekijk dit script:
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

Python voert dit in strikte volgorde uit:
1. Hij print `"Initializing program..."`.
2. Hij maakt de variabele `username` en print die.
3. Hij maakt de variabele `level` en print die.
4. Hij rekent `5 + 1`, update `level` naar `6`, en print de nieuwe waarde.

De volgorde is alles. Als je `level` probeert te printen vóór regel 3, crasht je programma met een `NameError`, omdat `level` op dat moment in de tijdlijn nog niet bestaat.

> **Key takeaway:** Python runt je code van boven naar beneden, regel per regel. De volgorde van je commando’s is cruciaal.

---

## Variabelen tracen: het dataspoor volgen

**Tracing** is het proces waarbij je de toestand van je variabelen volgt terwijl het programma runt. Het is alsof je een GPS‑tracker op data zet: je ziet waar het naartoe gaat en hoe het verandert. Dit is één van de basisvaardigheden van debugging.

Laten we de variabelen tracen in dit script:

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

Een trace ziet er zo uit:

| Line # | Code Executed | `health` value | `mana` value | Notes |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `health = 100`, `mana = 50` | 100 | 50 | Initial state |
| 2 | `health = health - 30` | 70 | 50 | `health` is updated |
| 3 | `mana = mana - 20` | 70 | 30 | `mana` is updated |
| 4 | `health = health + 50` | 120 | 30 | `health` is updated again |

Aan het einde is `health` `120` en `mana` `30`. Manueel tracen (op papier of in je hoofd) is een sterke manier om logische fouten te vinden.

> **Key takeaway:** Om je programma te snappen, moet je kunnen volgen hoe variabelen veranderen van de eerste regel tot de laatste.

---

## Print‑debugging: je forensic toolkit

Als je code niet werkt en je weet niet waarom: staar er niet gewoon naar. **Onderzoek het.** De makkelijkste manier is met `print()`‑statements. Dit heet **print‑debugging**, en het is één van de meest betrouwbare tools in je arsenaal.

Het doel: toon de waarden van je variabelen op belangrijke momenten in de execution flow.

### Scenario: een buggy berekening

Stel dat deze code de totale kost moet berekenen, maar het antwoord is verkeerd:
```python
price = 10
quantity = 3
tax = 0.05

# Buggy code
total = price + quantity * tax
print("Total cost:", total)
```

De output is `10.15`, maar je verwachtte `10 * 3` plus tax. Wat loopt er mis? Gebruik print‑debugging:

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

Door elke stap te printen, kan je exact zien waar de logische fout zit. In de originele buggy code was de volgorde van bewerkingen verkeerd. Je “onderzoek” toont de juiste stappen, en dan kan je het fixen.

> **Key takeaway:** Als je code stuk is, voeg `print()`‑statements toe om waarden en types te checken. Dat leidt je naar de bron van de bug.

---

## Foutmeldingen lezen

Error messages, of **tracebacks**, zijn geen failures. Het zijn clues. Een goede hacker leest ze aandachtig.

Een traceback vertelt je drie dingen:
1. **Het bestand en regelnummer** waar de error gebeurde.
2. **De code‑regel** die de error veroorzaakte.
3. **Het type error** (`NameError`, `TypeError`, `ValueError`, …).

```
Traceback (most recent call last):
  File "C:/Users/hacker/my_script.py", line 5, in <module>
    print("Score: " + scor)
NameError: name 'scor' is not defined
```

**Forensic analyse:**
- **Waar?** `my_script.py`, regel 5.
- **Wat?** `print("Score: " + scor)`.
- **Waarom?** `NameError`. Het programma weet niet wat `scor` is.

De clue is duidelijk: er zit een typfout. De variabele heet waarschijnlijk `score`, niet `scor`.

> **Key takeaway:** Wees niet bang van rode tekst. Lees de error van onder naar boven. Ze zegt exact waar je onderzoek moet starten.

---

## Samenvatting

- **Execution flow:** Python runt code van boven naar beneden, in volgorde.
- **Variabelen tracen:** volg (in je hoofd of op papier) hoe variabelen veranderen, regel per regel.
- **Print‑debugging:** gebruik `print()` om waarden te zien in je draaiende programma. Superkracht voor bug‑jacht.
- **Foutmeldingen:** zijn clues, geen failures. Lees ze om te weten waar en waarom je code crasht.

Je kan nu niet alleen code schrijven, maar ook analyseren en debuggen. Dat is het teken van een echte programmeur.
