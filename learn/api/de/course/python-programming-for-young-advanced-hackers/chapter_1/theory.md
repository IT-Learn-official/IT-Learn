# Kapitel 1: Starte deine Python‑Power

Willkommen, junger Hacker. Deine erste Mission – wenn du sie annimmst – ist es, die geheime Sprache der Computer zu lernen. In diesem Kapitel hörst du auf, nur ein normaler User zu sein, und startest deine Reise zum digitalen Master.

Am Ende dieses Kapitels kannst du:

- Erklären, was eine **Programmiersprache** ist (deine neue Superkraft).
- Den Unterschied zwischen **Code** (den Zaubersprüchen) und **Programmieren** (dem Masterplan) kennen.
- Verstehen, warum Python eine **interpretierte** Sprache ist (schnell und ideal zum direkten Experimentieren).
- Python im **interaktiven Modus (REPL)** und im **Script‑Modus** nutzen.
- Dein erstes echtes Python‑Script starten und die Maschine `Hello, World!` sagen lassen.

---

## Was ist eine Programmiersprache?

Stell dir vor, du hast einen Geheimagenten, der nur einen speziellen Code versteht. Du kannst ihm nicht einfach in normalem Deutsch sagen, was er tun soll – du brauchst seine Geheimsprache. Computer sind wie dieser Agent, und **Programmiersprachen** sind die geheimen Codes. Python ist eine der mächtigsten und beliebtesten „Geheimsprachen“ der Welt.

Als Hacker nutzt du diese Sprachen, um Computern Anweisungen zu geben. Diese Anweisungen nennt man **Code**. Es ist wie ein Zauberspruch: Du schreibst die magischen Worte, und der Computer führt deinen Befehl aus.

- **Dein Ziel:** „Computer, zeig mir alle WLAN‑Netzwerke in der Umgebung.“
- **Der Code:** die exakten Python‑Zeilen, die den Computer gehorchen lassen.

> **Key takeaway:** Eine Programmiersprache ist, wie du Computern Befehle gibst.

---

## Programm vs. Code

Viele werfen das durcheinander, aber ein echter Hacker kennt den Unterschied:

- **Code:** die einzelnen Zaubersprüche. Die Textzeilen, die du in einer Sprache wie Python schreibst, damit der Computer etwas Konkretes macht.
- **Programmieren:** der Masterplan. Die Kunst herauszufinden, _was_ du willst, das in Schritte zu zerlegen und dann den Code zu schreiben, der diese Schritte ausführt.

Echte Programmierer hämmern nicht einfach auf die Tastatur. Sie:

1. **Planen die Mission:** „Ich baue einen Bot, der automatisch meinen Online‑Unterricht beitritt.“
2. **Sammeln Infos:** „Welche Daten braucht der Bot? Den Klassenlink? Die Uhrzeit?“
3. **Erstellen eine Strategie:** Große Mission in kleine, machbare Aufgaben zerlegen.
4. **Schreiben den Code:** _Dann_ kommen die Zaubersprüche.

Zum Beispiel:

- **Programmieren (der Plan):**
  - „Schritt 1: Frag den User nach seinem Namen.“
  - „Schritt 2: Wenn er nichts eingibt, sag: ‚Hallo, mysteriöser Fremder!‘“
  - „Schritt 3: Später füge ich eine Funktion hinzu, um nach dem Hacker‑Alias zu fragen.“
- **Code (der Spruch):**
  - `name = input("Enter your name: ")`
  - `print("Hello, " + name + "!")`

> **Key takeaway:** **Programmieren** ist der Masterplan. **Code** sind die Sprüche, die ihn ausführen.

---

## Kompiliert vs. interpretiert

Nicht alle Programmiersprachen funktionieren gleich. Es gibt zwei Hauptarten:

### Kompilierte Sprachen

Sprachen wie **C++ oder Java** sind wie ein Roboterbau nach Bauplan. Du schreibst alle Anweisungen, dann übersetzt ein spezielles Programm – ein **Compiler** – alles in eine einzige Datei (z. B. eine `.exe` unter Windows). Danach kann der Roboter selbstständig laufen. Aber wenn du etwas ändern willst, musst du ihn neu bauen.

### Interpretierte Sprachen

**Python** ist eine **interpretierte** Sprache. Das ist eher wie ein Live‑Gespräch mit deinem Roboter: Du gibst einen Befehl nach dem anderen, und er führt ihn sofort aus.

**Hacker‑Vorteile:**

- **Speed:** Ideen sofort testen. Kein Warten auf lange Builds.
- **Flexibilität:** Code „on the fly“ ändern und sofort Ergebnis sehen. Perfekt zum Experimentieren und schnellen Zusammenhacken.

> **Key takeaway:** Kompilierte Sprachen werden „am Stück“ gebaut. Interpretierte Sprachen wie Python laufen Zeile für Zeile – ideal für schnelles Experimentieren.

---

## Über Python

Python wurde Ende der 1980er von **Guido van Rossum** entwickelt. Er benannte es nach der britischen Comedy‑Gruppe _Monty Python’s Flying Circus_, weil Programmieren Spaß machen sollte. (Spoiler: tut es.)

**Was kannst du mit Python machen?**

- Websites und Web‑Apps bauen.
- **Videospiele** erstellen.
- **Discord‑Bots** schreiben und Dinge automatisieren.
- **Artificial Intelligence** und Machine Learning antreiben.
- Langweilige Aufgaben automatisieren, z. B. tausende Dateien umbenennen oder deinen Downloads‑Ordner sortieren.

Du lernst dasselbe Tool, das Profis bei Google, NASA und Netflix einsetzen.

> **Key takeaway:** Python ist mächtig und anfängerfreundlich – von kleinen Scripts bis zu AI‑Projekten.

---

## Ausführungsmodi

Es gibt zwei Wege, deine Python‑Power zu nutzen:

### 1. Interaktiver Modus (REPL)

Die **REPL** (Read, Evaluate, Print, Loop) ist deine persönliche Hacking‑Sandbox. Wie ein direkter Chat mit dem Python‑Interpreter.

- **Read:** Python liest deinen Befehl.
- **Evaluate:** führt ihn aus.
- **Print:** zeigt das Ergebnis.
- **Loop:** wartet auf den nächsten Befehl.

Du tippst `21 * 2` und Python antwortet sofort `42`. Du tippst `"Hack the " + "Planet"` und bekommst `'Hack the Planet'`.

Die REPL ist perfekt, um kleine Code‑Snippets zu testen und sofort Feedback zu bekommen.

> **Key takeaway:** Die REPL ist dein digitaler Spielplatz für schnelle Experimente.

### 2. Script‑Modus

Für größere Projekte speicherst du deinen Code in einer Datei mit `.py` (z. B. `my_first_bot.py`). Das ist der **Script‑Modus**. Ein Script ist eine komplette Liste von Anweisungen, die Python von oben nach unten ausführt.

Denk daran wie an einen vollständigen Missionsplan: Wenn du das Script startest, wird der Plan komplett durchgezogen.

> **Key takeaway:** Script‑Modus ist für echte Programme, die du speichern und immer wieder ausführen kannst.

---

## Dein erstes Script

Die erste Tradition für jeden angehenden Hacker: Die Maschine soll dich „anerkennen“. Der Klassiker:

```python
print("Hello, World!")
```

Wenn du das ausführst, zeigt der Computer `Hello, World!` am Bildschirm. Das ist dein erster Schritt, damit die Maschine macht, was _du_ willst.

In den kommenden Practice‑Missionen erstellst du dieses Script und lernst außerdem, ein kaputtes zu debuggen – wie ein echter digitaler Detektiv.

> **Key takeaway:** `print(...)` ist der Spruch, mit dem du Python sprechen lässt.

---

## Was kommt als Nächstes?

Du hast jetzt das Fundament für deine Reise. Zeit für:

- In die REPL springen und ausprobieren, was Python kann.
- Dein erstes Script schreiben und ausführen.
- Wie ein Programmierer denken: Mission planen, bevor du Code schreibst.

> **Achievement Unlocked:** Du bist nicht mehr nur ein User. Du bist ein Programmierer. Los geht’s – bring den Computer dazu, deinen Willen auszuführen.
