# Hoofdstuk 3: Functie‑superkrachten en ingebouwde tools

Je hebt geleerd om Python te laten praten en rekenen. Nu is het tijd voor je volgende superkracht: **functies**. Een functie is een herbruikbaar commando, een kant‑en‑klaar tooltje in je hacking‑arsenaal. Denk: één knop in een game in plaats van 10 acties na elkaar.

Tegen het einde van dit hoofdstuk kan je:

- Uitleggen wat een **functie** is en waarom het een hacker’s beste vriend is.
- Ingebouwde functies gebruiken zoals `print()`, `len()`, `abs()`, `round()` en `type()`.
- Begrijpen wat **argumenten** zijn (de data die je aan een functie geeft).
- Begrijpen wat een **return value** is (het resultaat dat een functie teruggeeft).
- De output in de console lezen en interpreteren.

> Key takeaway: Een functie is een benoemd, herbruikbaar tool dat je activeert door zijn naam te “callen” met haakjes `()`.

---

## 1. Wat is een functie?

Stel je voor dat je een set magische tools op je laptop hebt. Eén tool vertelt je hoe lang een stuk tekst is. Een andere rondt een rommelig getal netjes af. Je wil die logica niet telkens opnieuw schrijven; je wil gewoon **de tool oproepen**.

Een **functie** in Python is exact zo’n tool:

- Ze heeft een **naam** (bijv. `len`, `round`).
- Je **roept** ze op door de naam met haakjes te schrijven: `len("password")`.
- Je zet de **inputs** (de data waarop ze moet werken) tussen de haakjes.
- De functie voert haar actie uit.
- Vaak geeft ze een **resultaat** terug dat je kan gebruiken.

Voorbeelden:

- Een “lengte‑checker”: je geeft `"secret"`, je krijgt `6` terug.
- Een “afrond‑tool”: je geeft `7.823`, je krijgt `8` terug.

In Python zijn dat functies:

```python
# This calls the built-in function len()
len("secret")  # This will give back 6
```

> Key takeaway: Zie een functie als een gespecialiseerd tool dat een specifieke job voor jou doet.

---

## 2. `print()` opnieuw bekeken – je communicatietoestel

Je gebruikt `print()` al sinds hoofdstuk 1. Bekijk het nu als een echte hacker: het is de functie waarmee je berichten van je programma naar de buitenwereld stuurt—de chatbox van je programma.

```python
print("Mission accomplished.")
```

Opbouw:

- `print` is de **naam** van de functie.
- De haakjes `()` **roepen** de functie op.
- Binnen de haakjes staat het **argument**: de string `"Mission accomplished."`.
- De job van de functie is die tekst op je scherm tonen.

`print()` is speciaal omdat het vooral bedoeld is om **output** te tonen aan jou. Je bewaart het resultaat van `print()` meestal niet in een variabele.

Je kan ook meerdere argumenten meegeven, gescheiden door komma’s:

```python
username = "Ghost"
level = 12
print("User:", username, "Level:", level)
```

> Key takeaway: `print()` gebruik je om je programma met jou te laten “praten”.

---

## 3. Argumenten – de machine voeden

De waarden die je **tussen de haakjes** zet wanneer je een functie oproept, heten **argumenten**. Dat is de info die de functie nodig heeft om haar job te doen.

```python
print("Access denied.")      # The argument is "Access denied."
len("hacker")               # The argument is "hacker"
round(3.14159, 2)           # The arguments are 3.14159 and 2
```

Sommige functies hebben één argument nodig, andere meerdere. Zie argumenten als instellingen op een tool of opties in een game‑menu.

> Key takeaway: Argumenten zijn de inputs die je aan een functie geeft, zodat ze weet waarop ze moet werken.

---

## 4. Return values – resultaten terugkrijgen

Veel functies geven na hun werk een waarde terug. Dat noem je een **return value**: het resultaat van de functie.

In de Python REPL (interactieve shell) wordt die return value automatisch getoond:

```python
>>> len("password")
8
```

De `8` die je ziet is de _return value_ van `len("password")`.

In een script wil je die return value bijna altijd **opslaan** in een variabele om later te gebruiken:

```python
password = "my_secret_password"
password_length = len(password)  # len() returns 18, which is stored in password_length
print("Password length is:", password_length)
```

Het is belangrijk om het verschil te snappen:

- `len("password")` **returnt** een waarde (`8`).
- `print("password")` **toont** iets op het scherm, maar returnt geen bruikbare waarde voor je programma.

> Key takeaway: Een return value is het resultaat dat een functie teruggeeft. Sla het op in een variabele als je het later nodig hebt.

---

## 5. Je ingebouwde hacking‑toolkit

Python komt met veel ingebouwde functies—zoals de standaard apps op je toestel. Een paar essentials:

- `len()`: hoe lang is deze data?
- `abs()`: wat is de absolute (positieve) waarde?
- `round()`: rommelige decimalen netjes maken.
- `type()`: welk datatype is dit?

### 5.1 `len()` – de lengtechecker

`len()` vertelt je hoeveel tekens er in een string zitten.

```python
len("code")          # 4
len("cyberspace")    # 10
len("Hello, world!") # 13 (spaties en leestekens tellen mee!)
```

Je kan het gebruiken om te checken of een wachtwoord lang genoeg is:

```python
password = "123"
password_length = len(password)
print("Password length is:", password_length)  # 3
```

### 5.2 `abs()` – absolute waarde

`abs()` geeft de niet-negatieve waarde van een getal. Denk aan “afstand tot nul”.

```python
abs(-10)  # 10
abs(10)   # 10
```

Handig in games/simulaties waar afstand telt, niet richting:

```python
player_pos = 5
enemy_pos = -5
distance = abs(player_pos - enemy_pos)  # abs(10) = 10
```

### 5.3 `round()` – de opruimer

`round()` maakt lange decimalen korter.

```python
round(3.14159)      # 3
round(3.14159, 2)   # 3.14
```

Top om scores/stats netjes te tonen:

```python
accuracy = 0.87654321
short_accuracy = round(accuracy, 2)
print("Your accuracy:", short_accuracy)  # Your accuracy: 0.88
```

### 5.4 `type()` – de inspecteur

`type()` is je debugging‑detective. Het vertelt je het datatype van een variabele.

```python
coins = 100
health = 98.6
username = "ZeroCool"

print(type(coins))     # <class 'int'>
print(type(health))    # <class 'float'>
print(type(username))  # <class 'str'>
```

Als je code vreemd doet, is `type()` één van de eerste checks: probeer je per ongeluk een getal bij een string te plakken? `type()` verraadt het.

> Key takeaway: `len()`, `abs()`, `round()` en `type()` zijn essentiële tools om data te inspecteren en te manipuleren.

---

## 6. Console output vs. return values

Het is belangrijk om te weten wat je in de console ziet.

1. **Geprinte output:** wat je code expliciet toont met `print()`.
2. **Return values:** in de REPL wordt het resultaat van wat je typt automatisch getoond.

In de REPL:

```python
>>> len("hacker")
6        # return value die getoond wordt
>>> print(len("hacker"))
6        # output van print()
```

In een script (`.py`) zie je **niets** tenzij je `print()` gebruikt:

```python
# Deze regel runt, maar je ziet niets
len("hacker")

# Deze regel toont 6
print(len("hacker"))
```

Het standaard patroon in scripts:

1. Roep een functie op en bewaar de return value in een variabele.
2. Gebruik `print()` om het resultaat te tonen.

```python
username = "Trinity"
length = len(username)
print("Username length:", length)
```

> Key takeaway: In scripts moet je `print()` gebruiken als je een waarde wil **zien**. Return values blijven in het programma tot je ze toont.

---

## Samenvatting

- Een **functie** is een herbruikbaar commando dat je oproept met `()`.
- **Argumenten** zijn de inputs die je tussen de haakjes meegeeft.
- Een **return value** is het resultaat dat een functie teruggeeft (en dat je kan opslaan).
- `print()` is voor output naar mensen.
- `len()`, `abs()`, `round()` en `type()` zijn krachtige ingebouwde tools.

> Achievement Unlocked: Je gebruikt Python’s ingebouwde toolkit als een pro—volgende keer begin je je **eigen** functies te smeden.
