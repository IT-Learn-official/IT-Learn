# Hoofdstuk 9: Datastructuren – lists, tuples en dictionaries in het echt

Welkom terug, hacker. Tot nu toe werkte je meestal met **één** ding tegelijk:
- één username,
- één IP‑adres,
- één wachtwoord.

Maar je echte digitale leven is niet “één ding” – het is:
- een hele friends list,
- een hoop examenscores,
- meerdere game accounts,
- een berg targets.

In dit hoofdstuk leer je Pythons kern‑**datastructuren** om **collecties** van data te beheren:

- **Lists**: je flexibele, geordende to‑do list / inventory.
- **Tuples**: je “locked‑in” coördinaten en settings.
- **Dictionaries**: je mini database met key → value‑info.

---

## 1. Lists: je hacker‑inventory (en friends list)

Een **list** is een geordende, veranderbare collectie items, tussen vierkante haken `[]`.

Denk aan een list als:
- je game inventory,
- je Spotify playlist,
- een lijst van komende toetsen.

```python
tools = ["nmap", "metasploit", "wireshark"]
targets = ["192.168.1.1", "10.0.0.5", "scanme.nmap.org"]
```

Je haalt items op via hun index (start op 0):

```python
print(tools[0])    # "nmap"
print(targets[-1]) # "scanme.nmap.org" (last item)
```

### Een list aanpassen

Lists zijn **mutable**: je kan ze aanpassen naargelang je missie (of je schooljaar) verandert.

**Een item updaten:**

```python
# You upgraded your toolkit
tools[1] = "metasploit-framework"
```

**Een item toevoegen achteraan:**

```python
tools.append("john-the-ripper")
```

**Het laatste item verwijderen:**

```python
last_tool = tools.pop()
print(f"Removed {last_tool} from inventory.")
```

**Een specifiek item verwijderen op waarde:**

```python
tools.remove("nmap")
```

Lists zijn ideaal wanneer je een collectie hebt die verandert en waarbij **volgorde belangrijk is**.

> Key takeaway: Een list is een geordende, veranderbare collectie – zoals een game inventory of een queue van taken.

---

## 2. Door lists loopen

Als je iets wil doen met **elk** item in een list, gebruik je een `for` loop.

```python
for target in targets:
    print(f"Initiating scan on: {target}")
```

Dit patroon gebruik je constant:
- door alle examenscores gaan,
- alle IP‑adressen checken,
- een bericht sturen naar elke gebruiker in een lijst.

> Key takeaway: `for item in list:` laat je elk element proper verwerken.

---

## 3. Tuples: vastgezette data die je niet wil veranderen

Een **tuple** is zoals een list, maar **bevroren**. Eens je ze maakt, kan je ze niet meer aanpassen.

Tuples gebruiken ronde haakjes `()`:

```python
# An (x, y, z) coordinate in 3D space
target_coords = (105.3, 80.1, 20.0)

# RGB colour code
red = (255, 0, 0)
```

Je haalt items op via index, net zoals bij een list:

```python
print(target_coords[0])  # 105.3
```

Maar als je een waarde probeert te veranderen:

```python
# This will crash with a TypeError
# target_coords[0] = 99.9
```

Wanneer zijn tuples handig?
- vaste settings zoals schermresolutie `(1920, 1080)`,
- een examendatum `(year, month, day)`,
- coördinaten die tijdens een berekening niet mogen veranderen.

Het is ook een signaal aan future‑you: “deze data is **niet bedoeld om te veranderen**.”

> Key takeaway: Tuples zijn geordend zoals lists, maar immutable – top voor vaste settings of coördinaten.

---

## 4. Dictionaries: je key → value database

Een **dictionary** (`dict`) is een (in principe) ongeordende collectie **key‑value pairs**.

Denk aan je contactenlijst:
- je zoekt op **naam** (de key),
- je krijgt het **nummer** (de value).

Dictionaries gebruiken accolades `{}`:

```python
# A profile of a target system
system_profile = {
    "ip": "192.168.1.100",
    "os": "Linux",
    "open_ports": [22, 80, 443],
    "vulnerable": True
}
```

Je haalt waarden op via hun key:

```python
print(system_profile["ip"])         # "192.168.1.100"
print(system_profile["open_ports"]) # [22, 80, 443]
```

Je zit niet vast aan “positie 0, 1, 2…” – je gebruikt betekenisvolle namen.

### Een dictionary aanpassen

Dictionaries zijn ook **mutable**. Je kan data veranderen of toevoegen.

```python
# Update the OS
system_profile["os"] = "Ubuntu 22.04"

# Add a new intel field
system_profile["hostname"] = "web-server-01"

print(system_profile)
```

Real‑life voorbeeld voor leerlingen:

```python
student = {
    "name": "Amira",
    "class": "4IT",
    "average": 14.8,
    "favourite_game": "Minecraft"
}
```

> Key takeaway: Een dictionary bewaart gelabelde data: je zoekt op key, niet op index.

---

## 5. Door dictionaries loopen

Je wil vaak door alle key‑value pairs gaan.

**Door keys loopen:**

```python
for key in system_profile:
    print(f"Intel key: {key} -> {system_profile[key]}")
```

**Door items loopen (key én value):**

```python
for key, value in system_profile.items():
    print(f"{key}: {value}")
```

Dit patroon is heel common wanneer je:
- alle data in een profiel wil tonen,
- een rapport wil maken uit een config,
- JSON‑achtige data wil inspecteren.

> Key takeaway: Gebruik `.items()` als je zowel key als value tegelijk wil in een nette loop.

---

## 6. De juiste datastructuur kiezen

Welke kies je wanneer? Snelle cheat sheet:

- **List `[]`**
  - Geordend.
  - Veranderbaar (add/remove/update).
  - Gebruik wanneer volgorde telt en je vooral “de items zelf” beheert.
  - Voorbeelden: friends list, komende toetsen, IP’s om te scannen.

- **Tuple `()`**
  - Geordend.
  - **Niet** veranderbaar.
  - Gebruik voor kleine, vaste groepjes waarden die samen horen.
  - Voorbeelden: `(x, y)` coördinaten, `(year, month, day)`, `(R, G, B)` kleuren.

- **Dictionary `{}`**
  - Ongeordend (in theorie; in de praktijk bewaart Python insertion order, maar reken er niet op voor logica).
  - Veranderbaar.
  - Je zoekt waarden op via betekenisvolle **keys**.
  - Voorbeelden: user profiel, systeemconfig, instellingen.

### Combineren (waar het leuk wordt)

Echte programma’s **mixen** deze structuren.

```python
# A list of student profiles
students = [
    {"name": "Amira", "class": "4IT", "average": 14.8},
    {"name": "Noah", "class": "5WE", "average": 11.3},
]

# Get the class of the first student
print(students[0]["class"])  # 4IT

# Loop through all students
for student in students:
    print(f"{student['name']} from {student['class']} has an average of {student['average']}")
```

Dit “list of dictionaries”‑patroon zie je overal: van web API’s tot game save files.

> Key takeaway: Lists, tuples en dictionaries samen laten je bijna elke real‑world data modelleren waar je mee wil hacken.

---

## Samenvatting

- **Lists `[]`**: geordend en mutable – top voor inventories, queues en alles wat verandert.
- **Tuples `()`**: geordend en immutable – top voor coördinaten en vaste settings.
- **Dictionaries `{}`**: key → value maps – top voor profielen, configs en gelabelde data.
- Je kan ze nesten (lists van dicts, dicts met list‑waarden, enz.) om complexere info te representeren.

> Achievement Unlocked: Je kan data in Python nu organiseren als een pro—van klasresultaten en game stats tot target profielen en config files.
