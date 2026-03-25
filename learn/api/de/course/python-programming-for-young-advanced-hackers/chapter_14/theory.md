# Kapitel 14: Advanced Data Ops – Comprehensions, Map, Filter und Zip

Willkommen, Hacker. Du kannst loopen wie ein Champ – aber für jede Kleinigkeit einen vollen `for`‑Loop zu schreiben fühlt sich irgendwann wie Extra‑Hausaufgaben an.

Python hat ein paar **Pro‑Level Shortcuts** für Daten:

- neue Lists in einer Zeile bauen,
- Werte filtern ohne lange Loops,
- zwei Lists parallel verarbeiten, als wären sie „zusammengezipt“.

Das sind Tools, die du in „echten“ Codebases und Open‑Source Projekten siehst. Sie wirken fancy, sind aber nur kompakte Versionen von Dingen, die du schon kannst.

Du lernst:

- **Comprehensions**: saubere One‑Liner für Lists, Sets und Dictionaries.
- **`map()` und `filter()`**: funktionale Tools zum Transformieren und Auswählen.
- **`lambda`**: winzige, anonyme Funktionen für Quick‑Jobs.
- **`zip()`**: mehrere Datenströme nebeneinander verarbeiten.

---

## 1. Von Loops zu Comprehensions: gleiche Logik, weniger Noise

Du hast eine List mit Hostnames und willst eine neue List in UPPERCASE.

Normaler Loop:

```python
hostnames = ["server-a", "server-b", "workstation-c"]
upper_hostnames = []

for host in hostnames:
    upper_hostnames.append(host.upper())

print(upper_hostnames)  # ['SERVER-A', 'SERVER-B', 'WORKSTATION-C']
```

Pythonic mit **List Comprehension**:

```python
hostnames = ["server-a", "server-b", "workstation-c"]
upper_hostnames = [host.upper() for host in hostnames]
print(upper_hostnames)
```

Gleiches Ergebnis, weniger Boilerplate. Es liest sich fast wie Englisch:

> „`host.upper()` for each `host` in `hostnames`.“

> Key takeaway: Comprehensions sind kompakte Loops zum Bauen neuer Collections.

---

## 2. List Comprehensions: das Grundmuster

Das generische Pattern:

```python
[expression for item in iterable]
```

- `expression` – was du mit jedem Item machst.
- `item` – die Loop‑Variable.
- `iterable` – worüber du iterierst.

Beispiel: Länge jedes Passworts in einer List.

```python
passwords = ["12345", "qwerty", "pA$$w0rd"]
lengths = [len(p) for p in passwords]
print(lengths)  # [5, 6, 8]
```

### Mit Bedingung: Filtern während du baust

Du kannst am Ende ein `if` anhängen:

```python
# From a list of ports, keep only well-known ports (< 1024)
all_ports = [22, 80, 8080, 443, 1337, 21]
well_known_ports = [port for port in all_ports if port < 1024]
print(well_known_ports)  # [22, 80, 443, 21]
```

Kurzform von:

```python
well_known_ports = []
for port in all_ports:
    if port < 1024:
        well_known_ports.append(port)
```

> Key takeaway: `[expression for item in iterable if condition]` = loop + filter + build in einem.

---

## 3. Set‑ und Dictionary‑Comprehensions

Das gleiche Prinzip funktioniert mit Sets und Dictionaries.

### Set Comprehensions `{...}`

Nutze eine **Set Comprehension**, wenn dir **eindeutige** Ergebnisse wichtig sind.

```python
# Unique file extensions
files = ["exploit.py", "notes.txt", "image.jpg", "report.txt"]
extensions = {file.split('.')[-1] for file in files}
print(extensions)  # {'py', 'txt', 'jpg'}
```

### Dictionary Comprehensions `{key: value}`

Nutze eine **Dictionary Comprehension**, um Key → Value Maps schnell zu erzeugen.

```python
users = ["root", "admin", "guest"]
user_lengths = {user: len(user) for user in users}
print(user_lengths)  # {'root': 4, 'admin': 5, 'guest': 5}
```

> Key takeaway: Tausche `[]` gegen `{}` und nutze `key: value` für Dictionaries.

---

## 4. `map()` und `filter()`: der funktionale Stil

Bevor Comprehensions so beliebt waren, hat man oft `map()` und `filter()` verwendet. Du siehst sie noch in älterem Code oder bei Devs, die funktional mögen.

### `map(function, iterable)` – jedes Item transformieren

`map()` wendet eine Funktion auf jedes Item an.

```python
ports_str = ["22", "80", "443"]
ports_int = list(map(int, ports_str))
print(ports_int)  # [22, 80, 443]
```

Comprehension:

```python
ports_int = [int(p) for p in ports_str]
```

### `filter(function, iterable)` – nur behalten, was besteht

`filter()` behält Items, bei denen die Funktion `True` zurückgibt.

```python
def is_privileged_port(port):
    return port < 1024

ports = [22, 8080, 443, 1337]
privileged = list(filter(is_privileged_port, ports))
print(privileged)  # [22, 443]
```

Comprehension:

```python
privileged = [p for p in ports if is_privileged_port(p)]
```

> Key takeaway: `map`/`filter` und Comprehensions lösen meist das gleiche Problem – Comprehensions sind oft besser lesbar.

---

## 5. `lambda`: winzige anonyme Funktionen

Manchmal brauchst du eine sehr kleine Funktion nur einmal.
Statt:

```python
def double(x):
    return x * 2
```

geht auch `lambda`:

```python
numbers = [1, 2, 3, 4]
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)  # [2, 4, 6, 8]
```

Comprehension ist meistens noch cleaner:

```python
doubled = [x * 2 for x in numbers]
```

Wann `lambda`?

- schnelle Throwaway‑Logik,
- wenn eine Library „eine Funktion“ erwartet und du sie nicht extra benennen willst.

> Key takeaway: `lambda` = Funktion ohne Namen, am besten für kleine One‑Liner.

---

## 6. `zip()`: parallel durch Lists gehen

`zip()` lässt dich über mehrere Lists gleichzeitig iterieren und Items paarweise zusammennehmen.

```python
usernames = ["root", "admin", "guest"]
uids = [0, 1000, 1001]

for user, uid in zip(usernames, uids):
    print(f"User '{user}' has UID {uid}")
```

Output:

```
User 'root' has UID 0
User 'admin' has UID 1000
User 'guest' has UID 1001
```

`zip()` stoppt, wenn die **kürzeste** List endet.

Du kannst damit auch schnell Dictionaries bauen:

```python
user_uid_map = dict(zip(usernames, uids))
print(user_uid_map)  # {'root': 0, 'admin': 1000, 'guest': 1001}
```

Denk an `zip()` wie zwei Spalten einer Tabelle zusammenführen.

> Key takeaway: `zip()` ist fürs synchronisierte „nebeneinander gehen“.

---

## Zusammenfassung

- **Comprehensions** (`[x for x in data if condition]`) sind der moderne, saubere Weg, Lists/Sets/Dicts aus Daten zu bauen.
- **`map()`** transformiert jedes Item; **`filter()`** behält nur Items, die einen Test bestehen.
- **`lambda`** baut winzige One‑Line‑Funktionen ohne Namen – gut für Quick‑Logic.
- **`zip()`** iteriert parallel über mehrere Lists und ist super für Look‑up Dictionaries.

> Achievement Unlocked: Du kannst jetzt Data‑Processing Code schreiben, der nicht nur korrekt ist, sondern auch **clean und professionell** – wie in echten Projekten und Open‑Source Tools.
