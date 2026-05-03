# Hoofdstuk 10: Sets – geen duplicaten, snelle checks, slimme vergelijkingen

Welkom terug, hacker. Je hebt al lists, tuples en dictionaries gebruikt om data te organiseren. Nu is het tijd voor een meer gespecialiseerde tool: de **set**.

Een set gebruik je wanneer je geeft om:

- welke waarden minstens één keer voorkomen,
- snel duplicaten weggooien,
- supersnel membership checken,
- twee databronnen vergelijken.

Denk aan: unieke bezoekers, mensen die geslaagd zijn voor wiskunde **en** Frans, usernames die op twee platformen voorkomen, IP’s die door twee scanners gezien zijn.

Tegen het einde van dit hoofdstuk kan je:

- **Sets** maken en gebruiken om unieke collecties te beheren.
- Set‑operaties gebruiken zoals **union**, **intersection** en **difference** om data te vergelijken.
- Beslissen wanneer een set beter is dan een list.
- Veelvoorkomende data‑cleaning doen zoals **deduplication**.

---

## 1. Wat is een set?

Een **set** is een ongeordende collectie van **unieke** elementen.

- Geen duplicaten.
- Geen gegarandeerde volgorde.
- Geen indexing (`my_set[0]` bestaat niet).

Je maakt een set met accolades `{}` of door `set()` te gebruiken.

```python
# A set of unique IP addresses
discovered_ips = {"192.168.1.1", "10.0.0.5", "192.168.1.1"}
print(discovered_ips)  # {'10.0.0.5', '192.168.1.1'}  (duplicate is gone)

# Creating a set from a list to get unique elements
ports = [22, 80, 443, 80, 22]
unique_ports = set(ports)
print(unique_ports)  # {80, 22, 443}
```

Reality check voorbeelden:

- unieke usernames in een Discord server,
- unieke IP’s die je school‑wifi geraakt hebben,
- unieke punten die een leerkracht gaf op één examen.

> Key takeaway: Een set gooit automatisch duplicaten weg en geeft niet om volgorde.

---

## 2. Een set aanpassen

Sets zijn mutable: je kan items toevoegen en verwijderen, alleen niet via index.

**Eén item toevoegen:**

```python
vulnerabilities = {"SQL Injection", "XSS"}
vulnerabilities.add("Remote Code Execution")
print(vulnerabilities)
```

**Een item verwijderen:**

- `.remove(item)` — crasht met `KeyError` als het item er niet in zit.
- `.discard(item)` — veilig; doet niets als het item er niet in zit.

```python
# This will work
vulnerabilities.remove("XSS")

# This would crash if "Buffer Overflow" wasn’t in the set
# vulnerabilities.remove("Buffer Overflow")

# Safer: won’t crash even if the item isn’t present
vulnerabilities.discard("Buffer Overflow")
```

> Key takeaway: Gebruik `.discard()` als je niet 100% zeker bent dat een item in de set zit.

---

## 3. Set‑operaties: data vergelijken zoals een analyst

Nu wordt het leuk. Sets kan je combineren met operatoren die lijken op wiskunde:

- `|` → union
- `&` → intersection
- `-` → difference

Stel dat twee vulnerability scanners op dezelfde server hebben gedraaid:

```python
scanner_A_results = {"CVE-2021-44228", "CVE-2022-1388", "CVE-2020-1472"}
scanner_B_results = {"CVE-2022-1388", "CVE-2019-0708", "CVE-2020-1472"}
```

### Union (`|`): alles wat één van beide zag

```python
all_vulnerabilities = scanner_A_results | scanner_B_results
# or: all_vulnerabilities = scanner_A_results.union(scanner_B_results)

print(all_vulnerabilities)
# {'CVE-2021-44228', 'CVE-2022-1388', 'CVE-2020-1472', 'CVE-2019-0708'}
```

### Intersection (`&`): waar ze beiden akkoord over zijn

```python
common_vulnerabilities = scanner_A_results & scanner_B_results
# or: scanner_A_results.intersection(scanner_B_results)

print(common_vulnerabilities)
# {'CVE-2022-1388', 'CVE-2020-1472'}
```

### Difference (`-`): wat enkel in één set zit

```python
unique_to_A = scanner_A_results - scanner_B_results
print(unique_to_A)  # {'CVE-2021-44228'}
```

School‑analogie met sets:

- `passed_math` en `passed_french` zijn sets van leerlingennamen.
- Intersection = wie **beide** vakken gehaald heeft.
- Difference = wie wiskunde haalde maar **niet** Frans.

> Key takeaway: Met union, intersection en difference zijn sets absurd goed om datasets te vergelijken.

---

## 4. Wanneer gebruik je een set vs een list?

**Gebruik een list wanneer:**

- volgorde belangrijk is (`[first, second, third]`),
- duplicaten toegestaan of belangrijk zijn,
- je indexing nodig hebt zoals `my_list[0]`.

**Gebruik een set wanneer:**

- items **uniek** moeten zijn,
- je veel **membership checks** doet (`if x in my_set:`),
- je collecties wil vergelijken (union, intersection, difference),
- volgorde niet belangrijk is.

Real‑life voorbeelden voor sets:

- alle unieke usernames die vandaag inlogden,
- alle unieke antwoorden in een quiz,
- alle unieke tags in een notitie‑app.

> Key takeaway: Als je jezelf constant ziet “dedupen” en “zit X hierin?” checken, dan is een set waarschijnlijk de juiste tool.

---

## 5. Praktische data‑ops met sets

### Deduplication

De klassieker: duplicaten verwijderen uit een list.

```python
# A log file with repeated IPs
log_ips = ["10.0.0.5", "192.168.1.1", "10.0.0.5", "10.0.0.5", "192.168.1.2"]

unique_attackers = set(log_ips)
print(unique_attackers)  # {'192.168.1.1', '10.0.0.5', '192.168.1.2'}

# Need it as a list again?
unique_attackers_list = list(unique_attackers)
```

### Membership testing

Checken of iets in een set zit is meestal **sneller** dan in een list, zeker als de collectie groot is.

```python
allowed_users = {"root", "admin", "guest"}
user_to_check = "intruder"

if user_to_check in allowed_users:
    print(f"User '{user_to_check}' is allowed.")
else:
    print(f"ALERT: Unauthorized user '{user_to_check}' detected!")
```

Zelfde idee voor:

- verboden woorden in een chatfilter,
- banned usernames in een server,
- leerlingen die hun huiswerk al ingediend hebben.

> Key takeaway: Sets zijn sterk wanneer je **unieke data** nodig hebt en snelle “zit dit hier?” checks.

---

## Samenvatting

- Een **set** is een ongeordende collectie van **unieke** items.
- Sets maken: `{}` of `set(iterable)`.
- Sets aanpassen: `.add()`, `.remove()` en `.discard()`.
- Sets vergelijken met operaties:
  - `|` (union) → alles uit beide,
  - `&` (intersection) → alleen wat in beide zit,
  - `-` (difference) → wat in de eerste zit maar niet in de tweede.
- Kies sets boven lists wanneer je uniqueness, snelle membership checks en vergelijkingen belangrijker vindt dan volgorde.

> Achievement Unlocked: Je kan nu datasets cleanen en vergelijken als een echte analyst—van scanner‑output en log files tot klaslijsten en friend groups.
