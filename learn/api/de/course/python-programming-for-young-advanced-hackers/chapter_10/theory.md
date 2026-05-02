# Kapitel 10: Sets – keine Duplikate, schnelle Checks, smarte Vergleiche

Willkommen zurück, Hacker. Du hast bereits Lists, Tuples und Dictionaries genutzt, um Daten zu organisieren. Jetzt kommt ein spezialisiertes Tool: das **Set**.

Ein Set nutzt du, wenn dir wichtig ist:

- welche Werte mindestens einmal vorkommen,
- Duplikate schnell entfernen,
- Membership super schnell prüfen,
- zwei Datenquellen vergleichen.

Denk an: einzigartige Besucher, Leute die Mathe **und** Französisch bestanden haben, Usernames die auf zwei Plattformen vorkommen, IPs die zwei Scanner gesehen haben.

Am Ende dieses Kapitels kannst du:

- **Sets** erstellen und verwenden, um eindeutige Sammlungen zu verwalten.
- Set‑Operationen wie **Union**, **Intersection** und **Difference** nutzen, um Daten zu vergleichen.
- Entscheiden, wann ein Set besser ist als eine List.
- Typische Data‑Cleaning‑Tasks wie **Deduplication** durchführen.

---

## 1. Was ist ein Set?

Ein **Set** ist eine ungeordnete Sammlung von **einzigartigen** Elementen.

- Keine Duplikate.
- Keine garantierte Reihenfolge.
- Kein Indexing (`my_set[0]` gibt’s nicht).

Du erstellst ein Set mit `{}` oder mit `set()`.

```python
# A set of unique IP addresses
discovered_ips = {"192.168.1.1", "10.0.0.5", "192.168.1.1"}
print(discovered_ips)  # {'10.0.0.5', '192.168.1.1'}  (duplicate is gone)

# Creating a set from a list to get unique elements
ports = [22, 80, 443, 80, 22]
unique_ports = set(ports)
print(unique_ports)  # {80, 22, 443}
```

Reality‑Check Beispiele:

- einzigartige Usernames in einem Discord‑Server,
- einzigartige IPs, die dein Schul‑WLAN getroffen haben,
- einzigartige Noten, die ein Lehrer in einer Prüfung vergeben hat.

> Key takeaway: Ein Set entfernt Duplikate automatisch und kümmert sich nicht um Reihenfolge.

---

## 2. Ein Set verändern

Sets sind mutable: du kannst Items hinzufügen und entfernen – nur nicht per Index.

**Ein Item hinzufügen:**

```python
vulnerabilities = {"SQL Injection", "XSS"}
vulnerabilities.add("Remote Code Execution")
print(vulnerabilities)
```

**Ein Item entfernen:**

- `.remove(item)` — crasht mit `KeyError`, wenn das Item nicht vorhanden ist.
- `.discard(item)` — sicher; macht nichts, wenn es nicht da ist.

```python
# This will work
vulnerabilities.remove("XSS")

# This would crash if "Buffer Overflow" wasn’t in the set
# vulnerabilities.remove("Buffer Overflow")

# Safer: won’t crash even if the item isn’t present
vulnerabilities.discard("Buffer Overflow")
```

> Key takeaway: Nutze `.discard()`, wenn du nicht 100% sicher bist, dass das Item im Set ist.

---

## 3. Set‑Operationen: Daten vergleichen wie ein Analyst

Jetzt wird’s spannend. Sets kannst du mit Operatoren kombinieren, die wie Mathe aussehen:

- `|` → Union
- `&` → Intersection
- `-` → Difference

Stell dir vor, zwei Vulnerability‑Scanner laufen auf demselben Server:

```python
scanner_A_results = {"CVE-2021-44228", "CVE-2022-1388", "CVE-2020-1472"}
scanner_B_results = {"CVE-2022-1388", "CVE-2019-0708", "CVE-2020-1472"}
```

### Union (`|`): alles, was einer von beiden gesehen hat

```python
all_vulnerabilities = scanner_A_results | scanner_B_results
# or: all_vulnerabilities = scanner_A_results.union(scanner_B_results)

print(all_vulnerabilities)
# {'CVE-2021-44228', 'CVE-2022-1388', 'CVE-2020-1472', 'CVE-2019-0708'}
```

### Intersection (`&`): worüber beide übereinstimmen

```python
common_vulnerabilities = scanner_A_results & scanner_B_results
# or: scanner_A_results.intersection(scanner_B_results)

print(common_vulnerabilities)
# {'CVE-2022-1388', 'CVE-2020-1472'}
```

### Difference (`-`): was nur in einem Set ist

```python
unique_to_A = scanner_A_results - scanner_B_results
print(unique_to_A)  # {'CVE-2021-44228'}
```

Schul‑Analogie:

- `passed_math` und `passed_french` sind Sets von Schülernamen.
- Intersection = jene, die **beides** bestanden haben.
- Difference = jene, die Mathe bestanden haben, aber **nicht** Französisch.

> Key takeaway: Union, Intersection und Difference machen Sets extrem stark zum Vergleichen von Datensätzen.

---

## 4. Wann Set statt List?

**Nutze eine List, wenn:**

- Reihenfolge wichtig ist (`[first, second, third]`),
- Duplikate erlaubt oder wichtig sind,
- du Indexing brauchst wie `my_list[0]`.

**Nutze ein Set, wenn:**

- Items **einzigartig** sein müssen,
- du viele **Membership Checks** machst (`if x in my_set:`),
- du Sammlungen vergleichen willst (Union/Intersection/Difference),
- Reihenfolge egal ist.

Reality‑Beispiele:

- alle einzigartigen Usernames, die heute eingeloggt sind,
- alle einzigartigen Antworten in einem Quiz,
- alle einzigartigen Tags in einer Notiz‑App.

> Key takeaway: Wenn du dauernd deduplizierst und „ist X hier drin?“ checkst, ist ein Set wahrscheinlich das richtige Tool.

---

## 5. Praktische Data‑Ops mit Sets

### Deduplication

Der Klassiker: Duplikate aus einer List entfernen.

```python
# A log file with repeated IPs
log_ips = ["10.0.0.5", "192.168.1.1", "10.0.0.5", "10.0.0.5", "192.168.1.2"]

unique_attackers = set(log_ips)
print(unique_attackers)  # {'192.168.1.1', '10.0.0.5', '192.168.1.2'}

# Need it as a list again?
unique_attackers_list = list(unique_attackers)
```

### Membership Testing

Zu prüfen, ob etwas in einem Set ist, ist meistens **schneller** als in einer List – besonders bei großen Sammlungen.

```python
allowed_users = {"root", "admin", "guest"}
user_to_check = "intruder"

if user_to_check in allowed_users:
    print(f"User '{user_to_check}' is allowed.")
else:
    print(f"ALERT: Unauthorized user '{user_to_check}' detected!")
```

Gleiches Prinzip für:

- verbotene Wörter in einem Chat‑Filter,
- gebannte Usernames auf einem Server,
- Schüler, die Hausaufgaben schon abgegeben haben.

> Key takeaway: Sets glänzen bei **einzigartigen Daten** und schnellen „ist das hier?“‑Checks.

---

## Zusammenfassung

- Ein **Set** ist eine ungeordnete Sammlung von **einzigartigen** Items.
- Sets erstellen: `{}` oder `set(iterable)`.
- Ändern mit `.add()`, `.remove()`, `.discard()`.
- Vergleichs‑Operationen:
  - `|` (Union) → alles aus beiden,
  - `&` (Intersection) → nur das Gemeinsame,
  - `-` (Difference) → nur im ersten Set.
- Nutze Sets, wenn Uniqueness, schnelle Membership Checks und Vergleiche wichtiger sind als Reihenfolge.

> Achievement Unlocked: Du kannst jetzt Datensätze säubern und vergleichen wie ein echter Analyst – von Scanner‑Output und Log‑Files bis zu Klassenlisten und Friend‑Groups.
