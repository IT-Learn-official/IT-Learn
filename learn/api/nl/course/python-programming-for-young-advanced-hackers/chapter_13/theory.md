# Hoofdstuk 13: Functies – je eigen tools bouwen

Welkom, hacker. Je hebt Pythons ingebouwde tools gebruikt, maar een echte master bouwt zijn eigen tools. In dit hoofdstuk leer je **functies** maken: herbruikbare, benoemde blokken code. Zo stop je met jezelf te herhalen en bouw je een sterk persoonlijk arsenaal.

Tegen het einde van dit hoofdstuk kan je:

- Je eigen functies definiëren met `def`.
- **Parameters** gebruiken om data door te geven aan je functies.
- **Return values** gebruiken om data terug te krijgen uit je functies.
- **Default parameters** instellen om je tools flexibeler te maken.
- Functies combineren tot complexere programma’s.

---

## 1. Waarom functies bouwen?

Stel dat je vaak dezelfde reeks commando’s uitvoert, zoals een target scannen op open ports. Je kan die code telkens copy‑pasten, maar dat is rommelig en inefficiënt.

Een **functie** laat je die reeks code “inpakken”, een naam geven, en overal hergebruiken met één regel.

Functies helpen je om:
- **D.R.Y. (Don't Repeat Yourself):** schrijf code één keer, gebruik ze forever.
- **Organiseren:** breek een groot script op in kleine, begrijpelijke stukjes.
- **Abstractie:** verstop complexe logica achter een simpele naam. Je hoeft niet te weten *hoe* `scan_target()` werkt, alleen dat het werkt.

---

## 2. Je eerste tool definiëren

Je definieert een functie met het keyword `def`.

```python
# Define a function to display a mission briefing
def display_briefing():
    print("Mission: Infiltrate the target network.")
    print("Objective: Locate the 'flag.txt' file.")
    print("Warning: Avoid detection.")
```

- `def` is het keyword om een functie te definiëren.
- `display_briefing` is de naam van je nieuwe tool.
- `()` bevat parameters (inputs), voorlopig leeg.
- `:` en het **ingesprongen blok** eronder bepalen wat de functie doet.

Een functie definiëren runt ze nog niet. Je voegt de tool gewoon toe. Om ze te runnen moet je ze **callen**:

```python
display_briefing()
```

---

## 3. Parameters: argumenten doorgeven

Een tool die altijd hetzelfde doet is beperkt. Een tool met verschillende inputs is powerful. **Parameters** zijn variabelen die een functie als input accepteert.

```python
# A function that can ping any target
def ping_target(ip_address):
    print(f"Pinging {ip_address}...")
    # In a real script, you'd have ping logic here
    print("Target is responsive.")

# Call the function with different arguments
ping_target("192.168.1.1")
ping_target("google.com")
```

- In de definitie is `ip_address` een **parameter**.
- Bij het oproepen is `"192.168.1.1"` een **argument**.

Je kan meerdere parameters hebben:

```python
def attempt_login(username, password):
    print(f"Attempting login for user '{username}' with password '{password}'...")
    # Login logic would go here

attempt_login("admin", "12345")
```

---

## 4. `return`: intelligence terugkrijgen

Naar het scherm printen is handig voor status, maar een echte tool geeft data terug die je in je script kan gebruiken. Dat doe je met `return`.

```python
# A function to check if a port is in the standard web port range
def is_web_port(port):
    if port == 80 or port == 443:
        return True
    else:
        return False

# Call the function and store its return value
port_to_check = 443
result = is_web_port(port_to_check)

if result == True:
    print(f"Port {port_to_check} is a standard web port. Begin web enumeration.")
else:
    print(f"Port {port_to_check} is not a standard web port.")
```

- `return` stopt de functie meteen en stuurt de waarde terug.
- De code die de functie opriep kan die waarde opslaan (`result`) en gebruiken in beslissingen.

**`print` vs `return`:**
- `print()` toont info aan de mens.
- `return` stuurt data terug naar het programma zelf.

---

## 5. Default parameters: flexibeler tools

Je kan een **default value** geven aan een parameter. Als je bij het oproepen geen argument meegeeft, gebruikt Python automatisch die default.

```python
# A tool to scan a target, defaulting to a quick scan
def scan_target(ip, scan_type="quick"):
    print(f"Starting '{scan_type}' scan on {ip}...")
    # Scanning logic here

# Call without specifying scan_type uses the default
scan_target("192.168.1.100")

# Override the default by providing an argument
scan_target("192.168.1.200", scan_type="deep")
```

Zo worden je functies veelzijdiger zonder dat je altijd elk argument expliciet moet meegeven.

---

## 6. Complexere operaties bouwen

De echte power komt wanneer je functies combineert. Je gebruikt de return value van één functie als argument voor een andere en bouwt zo een chain.

```python
def get_open_ports(ip):
    # Simulating a port scan
    print(f"Scanning {ip}...")
    return [22, 80, 443] # Returns a list of open ports

def analyze_port(port):
    if port == 22:
        return "SSH - Potential remote access."
    elif port == 80 or port == 443:
        return "HTTP/S - Web server detected."
    else:
        return "Unknown service."

# --- Main Script Logic ---
target_ip = "10.0.0.1"
open_ports = get_open_ports(target_ip) # Call the first function

print(f"Analysis for {target_ip}:")
for port in open_ports:
    analysis_result = analyze_port(port) # Call the second function in a loop
    print(f"  - Port {port}: {analysis_result}")
```

---

## Samenvatting

- **Functies (`def`)** zijn je manier om herbruikbare, benoemde tools te maken.
- **Parameters** zijn de inputs die je tool accepteert.
- **Argumenten** zijn de echte waarden die je meegeeft wanneer je de functie oproept.
- **`return`** is hoe je tool data teruggeeft aan je hoofdscript.
- **Default parameters** geven slimme defaults en maken functies makkelijker te gebruiken.

Door je logica te verpakken in functies, upgrade je van “een scriptje” naar een nette, krachtige codebase.
