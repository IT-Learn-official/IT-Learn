# Kapitel 13: Funktionen – deine eigenen Tools bauen

Willkommen, Hacker. Du hast Pythons eingebaute Tools genutzt, aber ein echter Master baut seine eigenen. In diesem Kapitel lernst du **Funktionen** zu erstellen: wiederverwendbare, benannte Codeblöcke. So hörst du auf dich zu wiederholen und baust dir ein starkes persönliches Arsenal.

Am Ende dieses Kapitels kannst du:

- Eigene Funktionen mit `def` definieren.
- **Parameter** nutzen, um Daten in Funktionen hineinzuschicken.
- **Return Values** nutzen, um Daten aus Funktionen zurückzubekommen.
- **Default Parameters** setzen, um Tools flexibler zu machen.
- Funktionen kombinieren, um komplexere Programme zu bauen.

---

## 1. Warum Funktionen bauen?

Stell dir vor, du führst oft dieselbe Befehlsfolge aus – z. B. einen Target‑Scan auf offene Ports. Du könntest den Code immer kopieren, aber das ist messy und ineffizient.

Eine **Funktion** lässt dich diese Befehlsfolge „einpacken“, benennen und überall mit einer Zeile wiederverwenden.

Funktionen helfen dir:

- **D.R.Y. (Don't Repeat Yourself):** einmal schreiben, immer wieder nutzen.
- **Organisation:** ein großes Script in kleine, verständliche Teile zerlegen.
- **Abstraktion:** komplexe Logik hinter einem einfachen Namen verstecken. Du musst nicht wissen, _wie_ `scan_target()` funktioniert – nur, dass es funktioniert.

---

## 2. Dein erstes Tool definieren

Du definierst eine Funktion mit dem Keyword `def`.

```python
# Define a function to display a mission briefing
def display_briefing():
    print("Mission: Infiltrate the target network.")
    print("Objective: Locate the 'flag.txt' file.")
    print("Warning: Avoid detection.")
```

- `def` ist das Keyword zum Definieren.
- `display_briefing` ist der Name deines neuen Tools.
- `()` enthält Parameter (Inputs), vorerst leer.
- `:` und der **eingerückte Block** darunter bestimmen, was die Funktion macht.

Definieren führt sie noch nicht aus. Um sie zu starten, musst du sie **aufrufen**:

```python
display_briefing()
```

---

## 3. Parameter: Argumente an deine Tools geben

Ein Tool, das immer dasselbe tut, ist limitiert. Ein Tool mit Inputs ist powerful. **Parameter** sind Variablen, die eine Funktion als Input bekommt.

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

- In der Definition ist `ip_address` ein **Parameter**.
- Beim Aufruf ist `"192.168.1.1"` ein **Argument**.

Mehrere Parameter:

```python
def attempt_login(username, password):
    print(f"Attempting login for user '{username}' with password '{password}'...")
    # Login logic would go here

attempt_login("admin", "12345")
```

---

## 4. `return`: Intelligence zurückbekommen

Printen ist gut für Status, aber ein starkes Tool gibt dir Daten zurück, die du im Script weiterverarbeiten kannst. Dafür ist `return`.

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

- `return` beendet die Funktion sofort und gibt einen Wert zurück.
- Der aufrufende Code kann den Wert speichern (`result`) und damit entscheiden.

**`print` vs `return`:**

- `print()` ist Output für Menschen.
- `return` ist Output für dein Programm.

---

## 5. Default Parameters: Tools flexibler machen

Du kannst einem Parameter einen **Default Value** geben. Wenn beim Aufruf kein Argument kommt, nimmt Python automatisch den Default.

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

So werden Funktionen vielseitiger, ohne dass man jedes Mal alle Argumente angeben muss.

---

## 6. Komplexere Operationen bauen

Die echte Power kommt, wenn du Funktionen kombinierst. Du nutzt den Return Value einer Funktion als Argument für die nächste – eine Kette von Operationen.

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

## Zusammenfassung

- **Funktionen (`def`)** sind wiederverwendbare, benannte Tools.
- **Parameter** sind Inputs der Funktion.
- **Argumente** sind die echten Werte beim Aufruf.
- **`return`** gibt Daten an dein Hauptscript zurück.
- **Default Parameters** geben sinnvolle Defaults und machen Funktionen leichter zu nutzen.

Wenn du Logik in Funktionen verpackst, wird aus einem einfachen Script ein sauberes, gut organisiertes Programm.
