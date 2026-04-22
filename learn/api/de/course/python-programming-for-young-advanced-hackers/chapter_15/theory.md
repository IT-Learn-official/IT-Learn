# Kapitel 15: Objektorientierte Programmierung – die digitale Welt modellieren

Willkommen zurück, Hacker. Bis jetzt hast du Scripts geschrieben, die jeweils eine Mission erledigen: etwas scannen, etwas knacken, etwas automatisieren. In diesem Kapitel lernst du, wie du **ganze Welten** in Code modellierst. Mit **Object‑Oriented Programming (OOP)** schreibst du nicht nur lose Funktionen – du baust digitale Versionen von Dingen wie Usern, Servern, Firewalls, Discord‑Bots und sogar ganzen Game‑Systemen.

Stell dir das wie Minecraft für Code vor: statt Blöcke zu platzieren, designst du **Blueprints** (`classes`) und spawnst echte **Objects** daraus.

Am Ende dieses Kapitels kannst du:

- Eigene **Classes** als Blueprints für digitale Modelle definieren.
- Den `__init__()`‑Konstruktor nutzen, um neue **Objects** mit eigenen Daten zu erstellen.
- Informationen in **Attributes** speichern (Eigenschaften eines Objects).
- **Methods** definieren (Fähigkeiten/Aktionen eines Objects).
- Mehrere einzigartige Objects aus derselben Class erstellen und verwalten.

---

## 1. Warum Classes und Objects?

Stell dir vor, du modellierst ein kleines Netzwerk für ein Schulprojekt. Du hast mehrere Server und jeder Server hat:

- eine IP‑Adresse
- ein Betriebssystem
- eine Liste offener Ports
- einen Online/Offline‑Status

Ohne OOP landest du schnell bei vielen Variablen und Dictionaries:

```python
server1_ip = "192.168.1.10"
server1_os = "Linux"

server2_ip = "192.168.1.20"
server2_os = "Windows"
```

Das wird **schnell messy**. Was, wenn du 10 Server hast? 50? Und später noch mehr Infos brauchst – z. B. Standort oder Owner?

Mit OOP erstellst du einmal eine `Server`‑**Class** und spawnst dann so viele `Server`‑**Objects** wie du willst. Daten und Verhalten eines Servers leben dann sauber zusammen.

> Key takeaway: OOP bündelt Daten und Verhalten in saubere, wiederverwendbare „Dinge“ (Objects), statt dass du tonnenweise einzelne Variablen jonglierst.

---

## 2. Class vs Object: Blueprint und Instance

- Eine **Class** ist der **Blueprint**. Sie definiert, was Objects dieses Typs _haben_ und _können_. Eine `Server`‑Class könnte sagen: jeder Server hat eine IP, ein OS und kann gepingt werden.
- Ein **Object** (oder **Instance**) ist ein **konkretes Ding**, das aus dem Blueprint erzeugt wird. `server1` und `server2` sind zwei verschiedene Objects aus derselben Class, jeweils mit eigener IP und eigenem OS.

Du definierst eine Class mit `class`:

```python
class Server:
    # This is the blueprint for all Server objects.
    # We’ll fill it in next.
    pass
```

Aktuell macht sie noch nichts, aber sie ist das Skelett, an das du Daten und Verhalten hängst.

> Key takeaway: Class = Design. Object = konkrete Kopie dieses Designs im Speicher.

---

## 3. Die `__init__`‑Methode: ein neues Object schmieden

Wenn du ein Object aus einer Class spawnst, kann Python automatisch eine Setup‑Funktion ausführen. Diese Spezialfunktion heißt `__init__()` und ist der **Konstruktor**.

```python
class Server:
    # The constructor method
    def __init__(self, ip_address, os):
        print(f"New Server object created for {ip_address}...")

        # Attributes: data stored on the object
        self.ip = ip_address
        self.os = os
        self.is_online = True
```

Was bedeutet das?

- `def __init__(self, ip_address, os):`
  - `__init__` läuft **automatisch**, wenn du einen neuen `Server` erstellst.
  - `ip_address` und `os` gibst du beim Erstellen mit.
- `self`
  - `self` heißt: „dieses konkrete Object“.
  - Mit `self.ip` hängst du die IP an **diese** Instance.
- `self.ip`, `self.os`, `self.is_online`
  - Das sind **Attributes**: Variablen, die **am Object selbst** leben.

Jetzt kannst du Objects erstellen:

```python
# Create two server objects from the Server blueprint
server1 = Server("192.168.1.10", "Linux")
server2 = Server("10.0.0.5", "Windows Server")

# Access their attributes using dot notation
print(f"{server1.ip} is running {server1.os}")
print(f"{server2.ip} is running {server2.os}")
```

Wie zwei unterschiedliche Discord‑Server: gleiche Plattform, aber komplett andere Settings.

> Key takeaway: `__init__` setzt die Startdaten jedes neuen Objects und nutzt `self`, um Attributes an diese spezielle Instance zu hängen.

---

## 4. Methods: was ein Object kann

**Methods** sind Funktionen, die _innerhalb_ einer Class definiert sind. Sie beschreiben, was ein Object **tun** kann. Jede Method hat `self` als ersten Parameter, damit sie auf die eigenen Attributes zugreifen und sie ändern kann.

```python
class Server:
    def __init__(self, ip_address, os):
        self.ip = ip_address
        self.os = os
        self.is_online = True

    # A method to simulate a ping
    def ping(self):
        if self.is_online:
            print(f"Ping to {self.ip}... Success!")
        else:
            print(f"Ping to {self.ip}... Failed. Host is offline.")

    # A method to take the server offline
    def take_offline(self):
        print(f"Taking {self.ip} offline.")
        self.is_online = False
```

So nutzt du Methods:

```python
server1 = Server("192.168.1.10", "Linux")

server1.ping()          # Calls the ping method on the server1 object
server1.take_offline()  # Changes server1’s is_online attribute
server1.ping()          # Behavior has now changed
```

Das sieht aus wie Methods aus dem echten Leben:

- `playlist.shuffle()` auf Spotify
- `message.reply()` in einer Chat‑App
- `player.jump()` in einer Game‑Engine

Hinter den Kulissen sind das alles Objects mit Methods.

> Key takeaway: Methods sind Aktionen eines Objects und können über `self` dessen Daten lesen/ändern.

---

## 5. Viele Objects, ein Blueprint

Die echte Power: du kannst **viele** Objects aus einer Class erzeugen. Jedes hat seinen eigenen Zustand, aber die gleichen Fähigkeiten.

```python
server1 = Server("192.168.1.10", "Linux")
server2 = Server("10.0.0.5", "Windows")

# Take server2 offline, but server1 remains online
server2.take_offline()

server1.ping()  # Output: Ping to 192.168.1.10... Success!
server2.ping()  # Output: Ping to 10.0.0.5... Failed. Host is offline.
```

`server1` und `server2` kommen aus derselben `Server`‑Class, verhalten sich aber nach ihren **eigenen** Attributes. Wenn du eins änderst, ändert das nicht automatisch das andere.

Game‑Analogie: Jeder `Player` hat eigene `health`, `position` und `inventory`, aber alle teilen dieselben Regeln für `move()`, `attack()` oder `heal()`.

> Key takeaway: Eine Class kann viele unabhängige Objects erzeugen. Jedes hat eigene Daten, aber sie teilen Methods.

---

## 6. `__str__`: eine lesbare Darstellung

Wenn du ein Object ohne Setup printest, kommt etwas wie `<__main__.User object at 0x00000123>`. Für den Computer ok, für Menschen völlig unbrauchbar.

Du kannst das fixen, indem du `__str__()` definierst. Das liefert die **schöne String‑Version** deines Objects.

```python
class User:
    def __init__(self, username, role):
        self.username = username
        self.role = role

    def __str__(self):
        return f"User(username='{self.username}', role='{self.role}')"

# Now, printing the object is informative
admin_user = User("root", "administrator")
print(admin_user)  # Output: User(username='root', role='administrator')
```

Super fürs Debugging: du printest das Object und bekommst eine lesbare Zusammenfassung.

> Key takeaway: Implementiere `__str__`, wenn deine Objects beim Printen sauber und human‑friendly erscheinen sollen.

---

## Typische Bugs am Anfang mit OOP

Wenn du mit Classes startest, passieren diese Fehler oft:

### 1. `self` in Methods vergessen

```python
class Server:
    def __init__(self, ip_address):
        self.ip = ip_address

    def ping():  # ❌ missing self
        print(f"Pinging {self.ip}")
```

Python meckert z. B.:

```text
TypeError: ping() takes 0 positional arguments but 1 was given
```

Fix: `self` hinzufügen:

```python
    def ping(self):  # ✅ self added
        print(f"Pinging {self.ip}")
```

### 2. `self.` beim Setzen von Attributes vergessen

```python
class Server:
    def __init__(self, ip_address):
        ip = ip_address  # ❌ creates a local variable, not an attribute
```

Dann merkt sich das Object die IP nicht.

Fix:

```python
class Server:
    def __init__(self, ip_address):
        self.ip = ip_address  # ✅ stored on the object
```

### 3. Class vs Instance verwechseln

`Server` (großes S) ist die **Class**, `server1` ist das **Object**.

```python
Server.ip = "192.168.1.10"  # ❌ doesn’t do what you think
server1 = Server("192.168.1.10", "Linux")  # ✅ correct way
```

> Key takeaway: Wenn Python bei OOP komische Fehler wirft: check `self` und stell sicher, dass du mit Objects (Instances) arbeitest – nicht nur mit der Class.

---

## Zusammenfassung

In diesem Kapitel bist du von Standalone‑Scripts zu digitalen Modellen aufgestiegen.

- Eine **Class** ist ein Blueprint für Objects (z. B. `class Server:`).
- Ein **Object** (Instance) ist eine konkrete Kopie aus der Class (z. B. `server1 = Server(...)`).
- `__init__(self, ...)` setzt die Startdaten eines neuen Objects.
- **Attributes** (z. B. `self.ip`) sind Variablen, die am Object hängen.
- **Methods** (z. B. `def ping(self):`) sind Aktionen eines Objects, die dessen Daten nutzen.
- `self` bezieht sich immer auf _dieses_ konkrete Object.
- `__str__` steuert, wie dein Object beim Printen dargestellt wird.

> Achievement Unlocked: Du kannst jetzt eigene Datentypen mit Classes designen und sie als Objects zum Leben erwecken – wie die Systeme hinter deinen Lieblingsgames, Apps und Discord‑Bots.
