# Kapitel 9: Datenstrukturen – Lists, Tuples und Dictionaries im echten Leben

Willkommen zurück, Hacker. Bis jetzt hast du meistens mit **einer** Sache gleichzeitig gearbeitet:

- ein Username,
- eine IP‑Adresse,
- ein Passwort.

Aber dein echtes digitales Leben ist nicht „eine Sache“ – es ist:

- eine ganze Friends‑List,
- viele Prüfungsnoten,
- mehrere Game‑Accounts,
- tonnenweise Targets.

In diesem Kapitel lernst du Pythons wichtigste **Datenstrukturen**, um **Sammlungen** von Dingen zu verwalten:

- **Lists**: dein flexibles, geordnetes To‑Do / Inventory.
- **Tuples**: deine fixen Koordinaten und Settings.
- **Dictionaries**: deine Mini‑Datenbank mit Key → Value‑Infos.

---

## 1. Lists: dein Hacker‑Inventory (und Friends‑List)

Eine **List** ist eine geordnete, veränderbare Sammlung von Items, in eckigen Klammern `[]`.

Denk an eine List wie:

- dein Game‑Inventory,
- deine Spotify‑Playlist,
- eine Liste deiner nächsten Schularbeiten.

```python
tools = ["nmap", "metasploit", "wireshark"]
targets = ["192.168.1.1", "10.0.0.5", "scanme.nmap.org"]
```

Du greifst per Index zu (startet bei 0):

```python
print(tools[0])    # "nmap"
print(targets[-1]) # "scanme.nmap.org" (last item)
```

### Eine List verändern

Lists sind **mutable** – du kannst sie anpassen, wenn sich deine Mission (oder das Schuljahr) ändert.

**Item updaten:**

```python
# You upgraded your toolkit
tools[1] = "metasploit-framework"
```

**Item am Ende hinzufügen:**

```python
tools.append("john-the-ripper")
```

**Letztes Item entfernen:**

```python
last_tool = tools.pop()
print(f"Removed {last_tool} from inventory.")
```

**Bestimmtes Item nach Wert entfernen:**

```python
tools.remove("nmap")
```

Lists sind perfekt, wenn du eine Sammlung hast, die sich ändert, und wo **Reihenfolge wichtig** ist.

> Key takeaway: Eine List ist eine geordnete, veränderbare Sammlung – wie ein Game‑Inventory oder eine Task‑Queue.

---

## 2. Durch Lists loopen

Wenn du mit **jedem** Item in einer List etwas tun willst, nutzt du eine `for`‑Schleife.

```python
for target in targets:
    print(f"Initiating scan on: {target}")
```

Dieses Pattern nutzt du ständig:

- durch alle Noten gehen,
- alle IP‑Adressen checken,
- jedem User in einer Liste eine Message schicken.

> Key takeaway: `for item in list:` verarbeitet jedes Element sauber.

---

## 3. Tuples: fixierte Daten, die du nicht ändern willst

Ein **Tuple** ist wie eine List, nur **eingefroren**. Sobald du es erstellt hast, kannst du es nicht mehr ändern.

Tuples verwenden runde Klammern `()`:

```python
# An (x, y, z) coordinate in 3D space
target_coords = (105.3, 80.1, 20.0)

# RGB colour code
red = (255, 0, 0)
```

Zugriff per Index wie bei Lists:

```python
print(target_coords[0])  # 105.3
```

Aber wenn du einen Wert ändern willst:

```python
# This will crash with a TypeError
# target_coords[0] = 99.9
```

Wann sind Tuples sinnvoll?

- fixe Settings wie Screen‑Resolution `(1920, 1080)`,
- ein Prüfungsdatum `(year, month, day)`,
- Koordinaten, die sich während einer Berechnung nicht ändern sollen.

Außerdem ist es ein Signal an dein Zukunfts‑Ich: „Diese Daten sind **nicht zum Ändern gedacht**.“

> Key takeaway: Tuples sind geordnet wie Lists, aber immutable – perfekt für fixe Settings oder Koordinaten.

---

## 4. Dictionaries: deine Key → Value‑Datenbank

Ein **Dictionary** (`dict`) ist eine (prinzipiell) ungeordnete Sammlung von **Key‑Value‑Pairs**.

Denk an deine Kontaktliste:

- du suchst nach **Name** (Key),
- du bekommst die **Nummer** (Value).

Dictionaries nutzen geschweifte Klammern `{}`:

```python
# A profile of a target system
system_profile = {
    "ip": "192.168.1.100",
    "os": "Linux",
    "open_ports": [22, 80, 443],
    "vulnerable": True
}
```

Du greifst über Keys zu:

```python
print(system_profile["ip"])         # "192.168.1.100"
print(system_profile["open_ports"]) # [22, 80, 443]
```

Du bist nicht mehr an „Position 0, 1, 2…“ gebunden – du nutzt aussagekräftige Namen.

### Ein Dictionary verändern

Dictionaries sind ebenfalls **mutable**. Du kannst Werte ändern oder neue Infos hinzufügen.

```python
# Update the OS
system_profile["os"] = "Ubuntu 22.04"

# Add a new intel field
system_profile["hostname"] = "web-server-01"

print(system_profile)
```

Real‑Life Beispiel für Schüler:

```python
student = {
    "name": "Amira",
    "class": "4IT",
    "average": 14.8,
    "favourite_game": "Minecraft"
}
```

> Key takeaway: Ein Dictionary speichert gelabelte Daten – lookup über Key statt über Index.

---

## 5. Durch Dictionaries loopen

Oft willst du alle Key‑Value‑Pairs durchgehen.

**Über Keys loopen:**

```python
for key in system_profile:
    print(f"Intel key: {key} -> {system_profile[key]}")
```

**Über Items loopen (Key und Value):**

```python
for key, value in system_profile.items():
    print(f"{key}: {value}")
```

Das Pattern ist superhäufig, wenn du:

- alle Daten in einem Profil ausgeben willst,
- einen Report aus einer Config generierst,
- JSON‑ähnliche Daten inspizierst.

> Key takeaway: Nutze `.items()`, wenn du Key und Value in einer sauberen Loop brauchst.

---

## 6. Die richtige Datenstruktur wählen

Welche nimmst du wann? Kurz‑Cheat‑Sheet:

- **List `[]`**
  - Geordnet.
  - Veränderbar (add/remove/update).
  - Verwende es, wenn Reihenfolge zählt und du vor allem „die Items“ verwaltest.
  - Beispiele: Friends‑List, nächste Tests, IPs zum Scannen.

- **Tuple `()`**
  - Geordnet.
  - **Nicht** veränderbar.
  - Für kleine, fixe Gruppen von Werten, die zusammengehören.
  - Beispiele: `(x, y)` Koordinaten, `(year, month, day)`, `(R, G, B)` Farben.

- **Dictionary `{}`**
  - Ungeordnet (theoretisch; praktisch behält Python die Einfüge‑Reihenfolge, aber verlass dich nicht für Logik darauf).
  - Veränderbar.
  - Lookup über sinnvolle **Keys**.
  - Beispiele: User‑Profil, System‑Config, Settings.

### Kombinieren (da wird’s spannend)

Echte Programme **mischen** diese Strukturen.

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

Dieses „List of Dictionaries“‑Pattern ist überall: von Web‑APIs bis zu Game‑Save‑Files.

> Key takeaway: Lists, Tuples und Dictionaries kombiniert modellieren fast jede reale Datenwelt, an der du hacken willst.

---

## Zusammenfassung

- **Lists `[]`**: geordnet und mutable – perfekt für Inventories, Queues und alles, was sich ändert.
- **Tuples `()`**: geordnet und immutable – perfekt für Koordinaten und fixe Settings.
- **Dictionaries `{}`**: Key → Value‑Maps – perfekt für Profile, Configs und gelabelte Daten.
- Du kannst sie verschachteln (Lists von Dicts, Dicts mit List‑Werten, …), um komplexe Infos abzubilden.

> Achievement Unlocked: Du kannst Daten in Python jetzt organisieren wie ein Pro – von Klassenergebnissen und Game‑Stats bis zu Target‑Profilen und Config‑Files.
