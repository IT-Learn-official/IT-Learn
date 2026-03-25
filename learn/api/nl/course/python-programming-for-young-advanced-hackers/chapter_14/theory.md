# Hoofdstuk 14: Advanced data ops – comprehensions, map, filter en zip

Welkom, hacker. Je kan loopen als een champ, maar voor elke mini‑actie een volledige `for` loop schrijven begint te voelen als extra huiswerk.

Python heeft een paar **pro‑level shortcuts** voor data:
- nieuwe lists bouwen in één regel,
- waarden filteren zonder lange loops te schrijven,
- twee lists parallel verwerken alsof ze samen “gezip’t” zijn.

Dit zijn tools die je in “echte” codebases en open‑source projecten ziet. Ze lijken fancy, maar het zijn gewoon compacte versies van dingen die je al kent.

Je leert:

- **Comprehensions**: leesbare one‑liners voor lists, sets en dictionaries.
- **`map()` en `filter()`**: functionele tools om data te transformeren of te selecteren.
- **`lambda`**: kleine anonieme functies voor snelle jobs.
- **`zip()`**: meerdere datastromen naast elkaar verwerken.

---

## 1. Van loops naar comprehensions: zelfde logica, minder ruis

Stel: je hebt een list hostnames en je wil een nieuwe list in UPPERCASE.

Gewone loop:

```python
hostnames = ["server-a", "server-b", "workstation-c"]
upper_hostnames = []

for host in hostnames:
    upper_hostnames.append(host.upper())

print(upper_hostnames)  # ['SERVER-A', 'SERVER-B', 'WORKSTATION-C']
```

Pythonic versie met een **list comprehension**:

```python
hostnames = ["server-a", "server-b", "workstation-c"]
upper_hostnames = [host.upper() for host in hostnames]
print(upper_hostnames)
```

Zelfde resultaat, minder boilerplate. Het leest bijna als Engels:
> “`host.upper()` voor elke `host` in `hostnames`.”

> Key takeaway: Comprehensions zijn compacte loops om nieuwe collecties te bouwen.

---

## 2. List comprehensions: het basispatroon

Het generieke patroon:

```python
[expression for item in iterable]
```

- `expression` – wat je met elk item doet.
- `item` – je loop‑variabele.
- `iterable` – waar je door loopt.

Voorbeeld: lengte van elk wachtwoord in een list.

```python
passwords = ["12345", "qwerty", "pA$$w0rd"]
lengths = [len(p) for p in passwords]
print(lengths)  # [5, 6, 8]
```

### Een condition toevoegen: filteren terwijl je bouwt

Je kan ook filteren met een `if` op het einde:

```python
# From a list of ports, keep only well-known ports (< 1024)
all_ports = [22, 80, 8080, 443, 1337, 21]
well_known_ports = [port for port in all_ports if port < 1024]
print(well_known_ports)  # [22, 80, 443, 21]
```

Dit is de korte versie van:

```python
well_known_ports = []
for port in all_ports:
    if port < 1024:
        well_known_ports.append(port)
```

> Key takeaway: `[expression for item in iterable if condition]` = loop + filter + build in één.

---

## 3. Set‑ en dictionary‑comprehensions

Hetzelfde idee werkt voor sets en dictionaries.

### Set comprehensions `{...}`

Gebruik een **set comprehension** wanneer je geeft om **unieke** resultaten.

```python
# Unique file extensions
files = ["exploit.py", "notes.txt", "image.jpg", "report.txt"]
extensions = {file.split('.')[-1] for file in files}
print(extensions)  # {'py', 'txt', 'jpg'}
```

### Dictionary comprehensions `{key: value}`

Gebruik een **dictionary comprehension** om snel key → value maps te maken.

```python
users = ["root", "admin", "guest"]
user_lengths = {user: len(user) for user in users}
print(user_lengths)  # {'root': 4, 'admin': 5, 'guest': 5}
```

> Key takeaway: Wissel `[]` om naar `{}` en gebruik `key: value` voor dictionaries.

---

## 4. `map()` en `filter()`: de functionele stijl

Vóór comprehensions populair werden, gebruikte Python vaak `map()` en `filter()` voor hetzelfde soort werk. Je ziet ze nog in oudere code of bij devs die van functioneel houden.

### `map(function, iterable)` – transformeer elk item

`map()` past een functie toe op elk item.

```python
ports_str = ["22", "80", "443"]
ports_int = list(map(int, ports_str))
print(ports_int)  # [22, 80, 443]
```

Comprehension‑versie:

```python
ports_int = [int(p) for p in ports_str]
```

### `filter(function, iterable)` – hou alleen wat “slaagt”

`filter()` houdt items waarvoor de functie `True` teruggeeft.

```python
def is_privileged_port(port):
    return port < 1024

ports = [22, 8080, 443, 1337]
privileged = list(filter(is_privileged_port, ports))
print(privileged)  # [22, 443]
```

Comprehension‑versie:

```python
privileged = [p for p in ports if is_privileged_port(p)]
```

> Key takeaway: `map`/`filter` en comprehensions doen meestal hetzelfde—comprehensions zijn vaak leesbaarder.

---

## 5. `lambda`: mini anonieme functies

Soms heb je een superkleine functie nodig, maar maar één keer.
In plaats van:

```python
def double(x):
    return x * 2
```

gebruik je een `lambda`:

```python
numbers = [1, 2, 3, 4]
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)  # [2, 4, 6, 8]
```

De comprehension‑versie is meestal nog cleaner:

```python
doubled = [x * 2 for x in numbers]
```

Wanneer gebruik je `lambda`?
- snelle throwaway logica,
- wanneer een library “een functie” verwacht en je die niet wil benoemen.

> Key takeaway: `lambda` = functie zonder naam, best voor kleine one‑liners.

---

## 6. `zip()`: parallel door lists wandelen

`zip()` laat je over meerdere lists tegelijk loopen door items per positie te koppelen.

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

`zip()` stopt wanneer de **kortste** list op is.

Je kan er ook snel dictionaries mee maken:

```python
user_uid_map = dict(zip(usernames, uids))
print(user_uid_map)  # {'root': 0, 'admin': 1000, 'guest': 1001}
```

Denk aan `zip()` als twee kolommen in een tabel koppelen.

> Key takeaway: `zip()` is voor gesynchroniseerd door meerdere lists stappen.

---

## Samenvatting

- **Comprehensions** (`[x for x in data if condition]`) zijn de moderne, cleane manier om lists/sets/dicts te bouwen uit bestaande data.
- **`map()`** past een functie toe op elk item; **`filter()`** houdt alleen items die slagen.
- **`lambda`** maakt kleine one‑line functies zonder naam—handig voor quick logic.
- **`zip()`** laat je parallel itereren en is top om look‑up dictionaries te bouwen.

> Achievement Unlocked: Je kan nu data‑processing code schrijven die niet alleen correct is, maar ook **clean en professioneel**—zoals je ziet in echte projecten en open‑source tools.
