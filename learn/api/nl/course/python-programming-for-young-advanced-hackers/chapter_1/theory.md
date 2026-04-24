# Hoofdstuk 1: Je Python-krachten opstarten

Welkom, jonge hacker. Je eerste missie, als je ze aanvaardt, is de geheime taal van computers leren. In dit hoofdstuk stop je met gewoon “gebruiker” zijn en start je je reis naar digitale meester.

Tegen het einde van dit hoofdstuk kan je:

- Uitleggen wat een **programmeertaal** is (je nieuwe superkracht).
- Het verschil kennen tussen **code** (de spreuken) en **programmeren** (het masterplan).
- Begrijpen waarom Python een **geïnterpreteerde** taal is (snel en ideaal om meteen te experimenteren).
- Python gebruiken in **interactieve modus (REPL)** en in **scriptmodus**.
- Je eerste echte Python-script starten en de machine laten zeggen: `Hello, World!`.

---

## Wat is een programmeertaal?

Stel je voor dat je een geheime agent hebt die alleen een speciale code begrijpt. Je kan niet gewoon in gewone mensentaal zeggen wat die moet doen; je moet de geheime taal gebruiken. Computers zijn zoals die agent, en **programmeertalen** zijn de geheime codes. Python is één van de krachtigste en populairste geheime talen ter wereld.

Als hacker gebruik je zulke talen om computers instructies te geven. Die instructies noem je **code**. Het is alsof je een spreuk schrijft: jij schrijft de magische woorden, en de computer voert je opdracht uit.

- **Jouw doel:** “Computer, toon mij alle wifi-netwerken in de buurt.”
- **De code:** de exacte Python-regels die de computer doen gehoorzamen.

> **Key takeaway:** Een programmeertaal is hoe je computers opdrachten geeft.

---

## Programma vs. code

Mensen halen dit vaak door elkaar, maar een echte hacker kent het verschil:

- **Code:** de losse spreuken. De regels tekst die je in een taal zoals Python schrijft om de computer iets specifieks te laten doen.
- **Programmeren:** het masterplan. Het is de kunst van uitzoeken _wat_ je wil doen, dat opdelen in stappen, en dan de code schrijven die die stappen uitvoert.

Echte programmeurs rammen niet zomaar op een toetsenbord. Ze:

1. **Plannen de missie:** “Ik ga een bot bouwen die automatisch mijn online lessen join’t.”
2. **Verzamelen intel:** “Welke info heeft de bot nodig? De leslink? Het tijdstip?”
3. **Maken een strategie:** breek de grote missie op in kleine, haalbare taken.
4. **Schrijven de code:** _pas dan_ schrijven ze de spreuken om het te laten gebeuren.

Bijvoorbeeld:

- **Programmeren (het plan):**
  - “Stap 1: Vraag de gebruiker naar zijn naam.”
  - “Stap 2: Als hij niets invult, zeg dan: ‘Hallo, mysterieuze vreemde!’”
  - “Stap 3: Later voeg ik een feature toe om naar zijn hacker-alias te vragen.”
- **Code (de spreuk):**
  - `name = input("Enter your name: ")`
  - `print("Hello, " + name + "!")`

> **Key takeaway:** **Programmeren** is het masterplan. **Code** is de set spreuken die het uitvoert.

---

## Gecompileerde vs. geïnterpreteerde talen

Niet elke programmeertaal werkt op dezelfde manier. Er zijn twee grote types:

### Gecompileerde talen

Talen zoals **C++ of Java** zijn alsof je een robot bouwt op basis van een plan. Je schrijft alle instructies, en dan vertaalt een speciaal programma—een **compiler**—alles naar één uitvoerbaar bestand (zoals een `.exe` op Windows). Eens gebouwd kan de robot zelfstandig draaien. Maar als je iets wil wijzigen, moet je alles opnieuw “bouwen”.

### Geïnterpreteerde talen

**Python** is een **geïnterpreteerde** taal. Dat is meer alsof je live met je robot praat. Je geeft één opdracht tegelijk, en die wordt meteen uitgevoerd.

**Hacker-voordelen:**

- **Snelheid:** je test ideeën meteen. Geen wachttijd voor een lange build.
- **Flexibiliteit:** pas je code “on the fly” aan en zie direct resultaat. Perfect om te experimenteren en snel iets in elkaar te hacken.

> **Key takeaway:** Gecompileerde talen worden in één keer gebouwd. Geïnterpreteerde talen zoals Python worden regel voor regel uitgevoerd—ideaal voor snel experimenteren.

---

## Over Python

Python werd in de late jaren 80 gemaakt door **Guido van Rossum**. Hij noemde het naar de Britse comedygroep _Monty Python’s Flying Circus_, omdat hij wou dat programmeren leuk zou zijn. (Spoiler: dat is het.)

**Wat kan je met Python doen?**

- Websites en webapps bouwen.
- **Videogames** maken.
- **Discord bots** schrijven en je social life automatiseren.
- **Artificial Intelligence** en machine learning aandrijven.
- Saai werk automatiseren, zoals duizenden bestanden hernoemen of je downloads-map ordenen.

Je leert hetzelfde gereedschap dat professionals bij Google, NASA en Netflix gebruiken.

> **Key takeaway:** Python is krachtig en beginnervriendelijk: van simpele scripts tot wereldveranderende AI.

---

## Uitvoermodi

Er zijn twee manieren om je Python-krachten te gebruiken:

### 1. Interactieve modus (REPL)

De **REPL** (Read, Evaluate, Print, Loop) is je persoonlijke hacking-sandbox. Het is alsof je rechtstreeks chat met de Python-interpreter.

- **Read:** Python leest je commando.
- **Evaluate:** het voert het commando uit.
- **Print:** het toont het resultaat.
- **Loop:** het wacht op je volgende commando.

Je typt `21 * 2` en Python antwoordt meteen `42`. Je typt `"Hack the " + "Planet"` en het antwoordt `'Hack the Planet'`.

De REPL is perfect om kleine stukjes code te testen en direct feedback te krijgen.

> **Key takeaway:** De REPL is je digitale speeltuin voor snelle experimenten.

### 2. Scriptmodus

Voor grotere projecten bewaar je je code in een bestand met `.py` (bijv. `my_first_bot.py`). Dat heet **scriptmodus**. Een script is een volledige set instructies die Python van boven naar beneden uitvoert.

Denk eraan als een missieplan dat je agent volledig uitvoert wanneer je het start.

> **Key takeaway:** Scriptmodus is voor echte programma’s die je kan opslaan en opnieuw uitvoeren.

---

## Je eerste script

De eerste traditie voor elke beginnende hacker: de machine laten erkennen dat jij er bent. De klassieker is:

```python
print("Hello, World!")
```

Als je dit runt, toont de computer `Hello, World!` op het scherm. Het is je eerste stap om de machine te laten doen wat _jij_ wil.

In de komende practice-missies maak je dit script en leer je ook een kapotte versie debuggen—zoals een echte digitale detective.

> **Key takeaway:** `print(...)` is de spreuk waarmee je Python laat praten.

---

## Wat volgt?

Je hebt nu de basis om je hacking-reis te starten. Tijd om:

- In de REPL te springen en te kijken wat je Python kan laten doen.
- Je eerste script te schrijven en uit te voeren.
- Te beginnen denken als een programmeur: plan je missie vóór je code schrijft.

> **Achievement Unlocked:** Je bent niet langer alleen een gebruiker. Je bent een programmeur. Tijd om de computer te laten plooien naar jouw wil.
