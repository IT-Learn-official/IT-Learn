# Hoofdstuk 15: Object‑Oriented Programming – de digitale wereld modelleren

Welkom terug, hacker. Tot nu toe schreef je scripts die één missie per keer doen: iets scannen, iets kraken, iets automatiseren. In dit hoofdstuk leer je hoe je **hele werelden** kan modelleren in code. Met **Object‑Oriented Programming (OOP)** schrijf je niet alleen losse functies—je bouwt digitale versies van dingen zoals users, servers, firewalls, Discord bots en zelfs complete game‑systemen.

Denk eraan als Minecraft maar voor code: in plaats van blokken te plaatsen, ontwerp je **blueprints** (`classes`) en “spawn” je echte **objects** eruit.

Tegen het einde van dit hoofdstuk kan je:

- Eigen **classes** definiëren als blueprints voor je digitale modellen.
- De `__init__()` constructor gebruiken om nieuwe **objects** te maken met eigen data.
- Info opslaan in **attributes** (eigenschappen van een object).
- **Methods** definiëren (de acties/abilities van een object).
- Meerdere unieke objects maken uit dezelfde class.

---

## 1. Waarom classes en objects gebruiken?

Stel dat je een klein netwerk modelleert voor een schoolproject. Je hebt meerdere servers, en elke server heeft:

- een IP‑adres
- een besturingssysteem
- een lijst open ports
- een online/offline status

Zonder OOP eindig je snel met een hoop losse variabelen en dictionaries:

```python
server1_ip = "192.168.1.10"
server1_os = "Linux"

server2_ip = "192.168.1.20"
server2_os = "Windows"
```

Dat wordt **snel rommelig**. Wat als je 10 servers hebt? 50? Wat als je later extra info nodig hebt, zoals locatie of eigenaar?

Met OOP maak je één keer een `Server` **class**, en dan “spawn” je zoveel `Server` **objects** als je nodig hebt. Alle data én gedrag van een server zitten dan netjes samen.

> Key takeaway: OOP bundelt data en gedrag in herbruikbare “dingen” (objects), in plaats van dat je met veel losse variabelen jongleert.

---

## 2. Class vs object: blueprint en instance

- Een **class** is de **blueprint**. Ze definieert wat alle objects van dat type _hebben_ en _kunnen_. Een `Server` class kan zeggen: elke server heeft een IP, een OS en kan gepingd worden.
- Een **object** (of **instance**) is een **echt ding** dat je maakt uit die blueprint. `server1` en `server2` zijn twee verschillende objects uit dezelfde class, elk met hun eigen IP en OS.

Je definieert een class met het keyword `class`:

```python
class Server:
    # This is the blueprint for all Server objects.
    # We’ll fill it in next.
    pass
```

Nu doet die class nog niks, maar het is het skelet waar je data en gedrag aan vastmaakt.

> Key takeaway: Een class is het ontwerp; een object is een concrete kopie van dat ontwerp in het geheugen.

---

## 3. De `__init__`‑method: een nieuw object smeden

Wanneer je een nieuw object maakt uit een class, kan Python automatisch een setup‑functie runnen. Die speciale functie heet `__init__()` en is de **constructor**.

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

Wat gebeurt hier?

- `def __init__(self, ip_address, os):`
  - `__init__` runt **automatisch** wanneer je een nieuwe `Server` maakt.
  - `ip_address` en `os` zijn details die je meegeeft.
- `self`
  - `self` betekent: “dit specifieke object”.
  - Als je `self.ip` zet, hang je die IP vast aan **deze** instance.
- `self.ip`, `self.os`, `self.is_online`
  - Dit zijn **attributes**: variabelen die **op het object** leven.

Nu kan je echt objects maken:

```python
# Create two server objects from the Server blueprint
server1 = Server("192.168.1.10", "Linux")
server2 = Server("10.0.0.5", "Windows Server")

# Access their attributes using dot notation
print(f"{server1.ip} is running {server1.os}")
print(f"{server2.ip} is running {server2.os}")
```

Zoals twee aparte Discord servers: zelfde platform, totaal andere settings en content.

> Key takeaway: `__init__` zet de startdata van elk nieuw object klaar en gebruikt `self` om attributes aan die specifieke instance te koppelen.

---

## 4. Methods: wat een object kan doen

**Methods** zijn functies die je _in_ een class definieert. Ze beschrijven wat een object kan **doen**. Elke method krijgt `self` als eerste parameter zodat ze de attributes van het object kan lezen en aanpassen.

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

En zo gebruik je methods op een specifieke server:

```python
server1 = Server("192.168.1.10", "Linux")

server1.ping()          # Calls the ping method on the server1 object
server1.take_offline()  # Changes server1’s is_online attribute
server1.ping()          # Behavior has now changed
```

Dit lijkt op methods van objects die je al kent:

- `playlist.shuffle()` op Spotify
- `message.reply()` in een chat‑app
- `player.jump()` in een game engine

Achter de schermen zijn dat ook objects met methods.

> Key takeaway: Methods zijn acties die bij een object horen en via `self` de data van dat object kunnen lezen/veranderen.

---

## 5. Meerdere objects, dezelfde blueprint

De echte power van OOP: je maakt **veel** objects uit één class. Elk object heeft zijn eigen state, maar dezelfde abilities.

```python
server1 = Server("192.168.1.10", "Linux")
server2 = Server("10.0.0.5", "Windows")

# Take server2 offline, but server1 remains online
server2.take_offline()

server1.ping()  # Output: Ping to 192.168.1.10... Success!
server2.ping()  # Output: Ping to 10.0.0.5... Failed. Host is offline.
```

`server1` en `server2` komen uit dezelfde `Server` class, maar gedragen zich volgens hun **eigen** attributes. De ene veranderen verandert de andere niet.

Denk aan een game: elke `Player` heeft eigen `health`, `position` en `inventory`, maar alle players delen dezelfde regels voor `move()`, `attack()` en `heal()`.

> Key takeaway: Eén class kan veel onafhankelijke objects maken. Elk heeft eigen data, maar ze delen dezelfde methods.

---

## 6. `__str__`: een leesbare voorstelling

Als je een object print zonder extra setup, krijg je iets zoals `<__main__.User object at 0x00000123>`. Handig voor de computer, maar waardeloos voor mensen.

Je kan dit fixen door `__str__()` te definiëren. Die geeft de **mooie string‑versie** van je object terug.

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

Superhandig bij debugging: je `print()` het object en je ziet meteen wat erin zit.

> Key takeaway: Implementeer `__str__` als je wil dat objects netjes en mensvriendelijk geprint worden.

---

## Veelvoorkomende bugs bij starten met OOP

Als je net begint met classes, komen deze fouten vaak voor.

### 1. `self` vergeten in methods

```python
class Server:
    def __init__(self, ip_address):
        self.ip = ip_address

    def ping():  # ❌ missing self
        print(f"Pinging {self.ip}")
```

Python klaagt met iets als:

```text
TypeError: ping() takes 0 positional arguments but 1 was given
```

Fix door `self` toe te voegen:

```python
    def ping(self):  # ✅ self added
        print(f"Pinging {self.ip}")
```

### 2. `self.` vergeten bij attributes zetten

```python
class Server:
    def __init__(self, ip_address):
        ip = ip_address  # ❌ creates a local variable, not an attribute
```

Dan “onthoudt” je object de IP niet.

Fix:

```python
class Server:
    def __init__(self, ip_address):
        self.ip = ip_address  # ✅ stored on the object
```

### 3. Class vs instance door elkaar halen

`Server` (met hoofdletter) is de **class**, `server1` is het **object**.

```python
Server.ip = "192.168.1.10"  # ❌ doesn’t do what you think
server1 = Server("192.168.1.10", "Linux")  # ✅ correct way
```

> Key takeaway: Als Python rare errors geeft in OOP‑code: check `self` en check of je met objects (instances) werkt, niet alleen met de class.

---

## Samenvatting

In dit hoofdstuk ging je van losse scripts naar digitale modellen bouwen.

- Een **class** is een blueprint om objects te maken (bijv. `class Server:`).
- Een **object** (instance) is een concrete kopie gemaakt uit die class (zoals `server1 = Server(...)`).
- `__init__(self, ...)` zet de startdata van een object klaar.
- **Attributes** (zoals `self.ip`) zijn variabelen die aan een object hangen.
- **Methods** (zoals `def ping(self):`) zijn acties die een object kan uitvoeren.
- `self` verwijst altijd naar _dit_ specifieke object in een method.
- Met `__str__` bepaal je hoe je object eruitziet wanneer je het print.

> Achievement Unlocked: Je kan nu je eigen datatypes ontwerpen met classes en ze tot leven brengen als objects—zoals de systemen achter je favoriete games, apps en Discord bots.
