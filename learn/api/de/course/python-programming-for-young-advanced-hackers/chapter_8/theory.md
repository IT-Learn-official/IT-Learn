# Kapitel 8: Mit Text arbeiten – Chats, Usernames und Messages hacken

Willkommen zurück, Hacker. Zahlen sind super für Scores und Noten, aber das meiste in deinem digitalen Leben ist **Text**:

- Discord‑Nachrichten,
- Insta‑Captions,
- WLAN‑Passwörter,
- E‑Mails im Schulportal,
- Logs von der sketchy App, die du irgendwann installiert hast.

In Python lebt das alles als **Strings**.

Wenn du Strings im Griff hast, kannst du User‑Input säubern, Dateien parsen, kleine Chatbots bauen und Programme schreiben, die mit Menschen reden statt nur Zahlen auszugeben.

Am Ende dieses Kapitels kannst du:

- Strings erstellen und verwalten – die Basiseinheit von Text.
- Einzelne Zeichen mit **Indexing** holen.
- Textstücke mit **Slicing** ausschneiden.
- Starke **String‑Methoden** nutzen wie `.lower()`, `.upper()`, `.strip()`, `.replace()` und `.split()`.
- Saubere, dynamische Messages mit **f‑strings** bauen.

---

## 1. Was ist ein String?

Ein **String** (Typ `str`) ist einfach Text in Python – alles in Anführungszeichen.

```python
username = "GhostInTheMachine"
secret_code = "pA$$w0rd_123"
ip_address = "192.168.1.1"  # This is text, not a number
status = "Math test tomorrow… send help"
```

Strings können enthalten:
- Buchstaben,
- Zahlen,
- Emojis,
- Symbole,
- Leerzeichen.

Du kannst `'` oder `"` verwenden – bleib einfach konsistent.

> Key takeaway: Ist es in Anführungszeichen, behandelt Python es als **einen String**, auch wenn es wie eine Zahl aussieht.

---

## 2. Indexing: ein einzelnes Zeichen holen

Ein String ist eine geordnete Folge von Zeichen. Jedes Zeichen hat eine Position – einen **Index**.

Indexing startet bei **0**:

```
 String:  P  Y  T  H  O  N
 Index:   0  1  2  3  4  5
```

Du kannst auch von hinten zählen mit negativen Indizes:

- `text[-1]` → letztes Zeichen
- `text[-2]` → vorletztes Zeichen

```python
command = "EXECUTE"

print(command[0])    # E (first character)
print(command[3])    # C
print(command[-1])   # E (last)
```

Damit kannst du:
- den ersten Buchstaben eines Usernames checken,
- nach einem bestimmten Zeichen in einem Passwort suchen,
- schnell sehen, was in einem String steckt.

**Wichtig:** Strings sind **immutable**. Du kannst ein Zeichen nicht „in place“ ändern – du musst einen **neuen** String bauen.

> Key takeaway: `text[index]` holt dir ein Zeichen; `0` ist das erste.

---

## 3. Slicing: Substrings ausschneiden

Wenn Indexing ein Buchstabe ist, dann ist **Slicing** ein ganzes Wort ausschneiden.

Syntax: `text[start:end]`

- `start` → Start (inklusive)
- `end`   → Ende (exklusive)

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

Realistischer:

```python
discord_tag = "nickname#1234"
name = discord_tag.split("#")[0]  # or discord_tag[:discord_tag.index("#")]
print(name)  # "nickname"
```

> Key takeaway: Slicing schneidet Teile aus Strings mit `[start:end]` heraus.

---

## 4. String‑Methoden: deine Text‑Cleaning‑Toolbox

Strings haben eingebaute **Methoden** (Funktionen am String), die dir extrem viel Arbeit abnehmen.

Du rufst sie mit Punkt auf: `text.method()`.

### `.lower()` und `.upper()`: Groß/Klein steuern

Perfekt, wenn dir Großschreibung egal ist (z. B. Commands, Usernames).

```python
user_input = "Yes"

if user_input.lower() == "yes":
    print("Access granted.")
```

```python
shout = "don’t forget your usb"
print(shout.upper())  # DON'T FORGET YOUR USB
```

### `.strip()`: Extra‑Spaces entfernen

User (und wir alle) tippen gerne zufällige Leerzeichen. `.strip()` entfernt sie vorne und hinten.

```python
raw_username = "   admin   "
clean_username = raw_username.strip()
print(f"'{raw_username}' -> '{clean_username}'")
# '   admin   ' -> 'admin'
```

Nützlich bei Input aus Formularen, Dateien oder Terminals.

### `.replace(old, new)`: Suchen & Ersetzen

Ersetzt jede Stelle eines Substrings.

```python
log_entry = "ERROR: User 'guest' failed to log in."

sanitized_log = log_entry.replace("guest", "[REDACTED]")
print(sanitized_log)
# ERROR: User '[REDACTED]' failed to log in.
```

Auch gut für:
- Schimpfwörter zensieren,
- Namen in Datensätzen anonymisieren,
- Messages schnell anpassen.

### `.split(separator)`: Text zerlegen

`.split()` nimmt einen String und gibt eine **Liste von Strings** zurück.

```python
target_list = "127.0.0.1,192.168.1.1,10.0.0.1"

ip_addresses = target_list.split(",")
print(ip_addresses)
# ['127.0.0.1', '192.168.1.1', '10.0.0.1']
```

Noch ein Beispiel mit Schulfächern:

```python
subjects = "math,fr,eng,cs"
subject_list = subjects.split(",")
print(subject_list)
# ['math', 'fr', 'eng', 'cs']
```

> Key takeaway: String‑Methoden lassen dich Text säubern, standardisieren und zerlegen, ohne riesige Mengen Code zu schreiben.

---

## 5. F‑Strings: sauberes, modernes String‑Formatting

Strings mit `+` zusammenzubauen wird schnell unübersichtlich:

```python
# Old way (ugh):
# message = "User " + username + " has score " + str(score)
```

**F‑Strings** (`f"..."`) lassen dich Variablen direkt einbauen – sauber und sicher.

```python
username = "Cipher"
level = 12
ip = "127.0.0.1"

message = f"User {username} (Level {level}) connected from {ip}"
print(message)
# User Cipher (Level 12) connected from 127.0.0.1
```

Du kannst sogar einfache Ausdrücke in `{}` rechnen:

```python
score = 17
max_score = 20

print(f"You scored {score}/{max_score} ({score / max_score * 100:.1f}%)")
```

`:.1f` heißt: „runde diese float auf 1 Nachkommastelle“.

> Key takeaway: f‑strings sind der Standard für lesbare, dynamische Strings in modernem Python.

---

## Zusammenfassung

- **Strings (`str`)** halten alle Textdaten: Usernames, Messages, Passwörter, Logs.
- **Indexing `[i]`** holt ein Zeichen; Indexing startet bei 0.
- **Slicing `[start:end]`** schneidet Teile aus einem String.
- **String‑Methoden** helfen dir bei Text‑Manipulation:
  - `.lower()` / `.upper()` – Großschreibung ignorieren/steuern.
  - `.strip()` – Extra‑Spaces entfernen.
  - `.replace()` – Text austauschen.
  - `.split()` – Text zu einer Liste machen.
- **F‑Strings** (`f"..."`) mischen Variablen und Text sauber und sind die beste Default‑Wahl.

> Achievement Unlocked: Du kannst jetzt Strings lesen, säubern und bauen wie ein Pro – von Discord‑Style Messages bis zu Log‑Files und Schulprojekten.
