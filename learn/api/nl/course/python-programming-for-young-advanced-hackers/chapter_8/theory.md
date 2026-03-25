# Hoofdstuk 8: Werken met tekst – chats hacken, usernames en berichten

Welkom terug, hacker. Getallen zijn top voor scores en punten, maar het grootste deel van je digitale leven is **tekst**:

- Discord‑berichten,
- Insta‑captions,
- wifi‑wachtwoorden,
- e‑mails van je schoolplatform,
- logs van die sketchy app die je ooit geïnstalleerd hebt.

In Python leeft dat allemaal als **strings**.

Als je strings kan controleren, kan je user input opschonen, bestanden parsen, simpele chatbots bouwen en je programma’s laten praten met mensen in plaats van alleen maar cijfers uit te spuwen.

Tegen het einde van dit hoofdstuk kan je:

- Strings maken en beheren, de basiseenheid van tekst.
- Individuele karakters pakken met **indexing**.
- Stukken tekst uitsnijden met **slicing**.
- Krachtige **string methods** gebruiken zoals `.lower()`, `.upper()`, `.strip()`, `.replace()` en `.split()`.
- Propere, dynamische berichten bouwen met **f‑strings**.

---

## 1. Wat is een string?

Een **string** (type `str`) is gewoon tekst in Python – alles tussen quotes.

```python
username = "GhostInTheMachine"
secret_code = "pA$$w0rd_123"
ip_address = "192.168.1.1"  # This is text, not a number
status = "Math test tomorrow… send help"
```

Strings kunnen bevatten:
- letters,
- cijfers,
- emoji’s,
- symbolen,
- spaties.

Gebruik enkelvoudige (`'`) of dubbele (`"`) quotes – wees gewoon consistent.

> Key takeaway: Staat het tussen quotes, dan behandelt Python het als **één string**, zelfs als het eruitziet als een getal.

---

## 2. Indexing: één karakter pakken

Een string is een geordende reeks karakters. Elk karakter heeft een positie: een **index**.

Indexing start op **0**:

```
 String:  P  Y  T  H  O  N
 Index:   0  1  2  3  4  5
```

Je kan ook van achteren tellen met negatieve indices:

- `text[-1]` → laatste karakter
- `text[-2]` → voorlaatste karakter

```python
command = "EXECUTE"

print(command[0])    # E (first character)
print(command[3])    # C
print(command[-1])   # E (last)
```

Zo kan je:
- de eerste letter van een username checken,
- een specifiek karakter zoeken in een wachtwoord,
- snel inspecteren wat er in een string zit.

**Belangrijk:** strings zijn **immutable**. Je kan een karakter niet “in place” aanpassen – je moet een **nieuwe** string bouwen.

> Key takeaway: Gebruik `text[index]` om één karakter te pakken; `0` is de eerste.

---

## 3. Slicing: substrings uitsnijden

Als indexing één letter pakken is, dan is **slicing** een heel woord uitsnijden.

Syntax: `text[start:end]`

- `start` → waar je begint (inclusief)
- `end`   → waar je stopt (exclusief)

```python
data_packet = "ID:user_42|payload:data"

# Get the user part
user_id = data_packet[3:11]
print(user_id)  # "user_42"

# Get the payload
payload = data_packet[19:]  # from index 19 to the end
print(payload)  # "data"

# Get the packet type
packet_type = data_packet[:2]  # from start to index 2 (excluded)
print(packet_type)  # "ID"
```

Meer realistische voorbeelden:

```python
discord_tag = "nickname#1234"
name = discord_tag.split("#")[0]  # or discord_tag[:discord_tag.index("#")]
print(name)  # "nickname"
```

> Key takeaway: Met slicing kan je stukken uit strings halen via `[start:end]`.

---

## 4. String methods: je tekst‑cleaning toolkit

Strings hebben ingebouwde **methods** (functies die aan de string “hangen”) die je leven veel makkelijker maken.

Je roept ze op met een punt: `text.method()`.

### `.lower()` en `.upper()`: hoofdletters controleren

Perfect wanneer je niet geeft om hoofdletters (bijv. commando’s, usernames).

```python
user_input = "Yes"

if user_input.lower() == "yes":
    print("Access granted.")
```

```python
shout = "don’t forget your usb"
print(shout.upper())  # DON'T FORGET YOUR USB
```

### `.strip()`: extra spaties verwijderen

Gebruikers (en jij ook) zetten graag random spaties. `.strip()` verwijdert ze vooraan en achteraan.

```python
raw_username = "   admin   "
clean_username = raw_username.strip()
print(f"'{raw_username}' -> '{clean_username}'")
# '   admin   ' -> 'admin'
```

Handig bij input uit forms, bestanden of terminals.

### `.replace(old, new)`: zoeken & vervangen

Vervang elke occurrence van een substring.

```python
log_entry = "ERROR: User 'guest' failed to log in."

sanitized_log = log_entry.replace("guest", "[REDACTED]")
print(sanitized_log)
# ERROR: User '[REDACTED]' failed to log in.
```

Je kan dit ook gebruiken om:
- scheldwoorden te censureren,
- namen te anonimiseren in datasets,
- snel messages aan te passen.

### `.split(separator)`: tekst opsplitsen

`.split()` neemt een string en geeft een **list van strings** terug.

```python
target_list = "127.0.0.1,192.168.1.1,10.0.0.1"

ip_addresses = target_list.split(",")
print(ip_addresses)
# ['127.0.0.1', '192.168.1.1', '10.0.0.1']
```

Nog een voorbeeld met vakken:

```python
subjects = "math,fr,eng,cs"
subject_list = subjects.split(",")
print(subject_list)
# ['math', 'fr', 'eng', 'cs']
```

> Key takeaway: String methods laten je tekst opschonen, standaardiseren en opbreken zonder gigantisch veel code te schrijven.

---

## 5. F‑strings: propere, moderne string formatting

Strings bouwen met `+` wordt snel rommelig:

```python
# Old way (ugh):
# message = "User " + username + " has score " + str(score)
```

**F‑strings** (`f"..."`) laten je variabelen rechtstreeks in de string steken, proper en veilig.

```python
username = "Cipher"
level = 12
ip = "127.0.0.1"

message = f"User {username} (Level {level}) connected from {ip}"
print(message)
# User Cipher (Level 12) connected from 127.0.0.1
```

Je kan zelfs simpele expressies in `{}` zetten:

```python
score = 17
max_score = 20

print(f"You scored {score}/{max_score} ({score / max_score * 100:.1f}%)")
```

Hier betekent `:.1f`: “rond deze float af op 1 decimaal”.

> Key takeaway: f‑strings zijn de standaard manier om leesbare, dynamische strings te maken in modern Python.

---

## Samenvatting

- **Strings (`str`)** houden alle tekstdata: usernames, berichten, wachtwoorden, logs.
- **Indexing `[i]`** pakt één karakter; indexing start op 0.
- **Slicing `[start:end]`** haalt stukken uit een string.
- **String methods** helpen je tekst manipuleren:
  - `.lower()` / `.upper()` – hoofdletters negeren.
  - `.strip()` – extra spaties opruimen.
  - `.replace()` – tekst vervangen.
  - `.split()` – tekst omzetten naar een list.
- **F‑strings** (`f"..."`) laten je variabelen en tekst proper mixen en zijn wat je best standaard gebruikt.

> Achievement Unlocked: Je kan nu strings lezen, opschonen en bouwen als een pro—van Discord‑achtige messages tot log files en schoolprojecten.
