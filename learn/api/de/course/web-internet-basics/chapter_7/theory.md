# Kapitel 7: Ports, TCP, UDP und die Transportschicht

Am Ende dieses Kapitels wirst du in der Lage sein:

- Zu erklären, was ein **Port** ist und warum er wichtig ist.
- Den Unterschied zwischen **TCP** und **UDP** zu beschreiben.
- Eine einfache `IP:port`‑Adresse zu lesen und zu verstehen, worauf sie zeigt.

---

## Was ist ein Port?

Eine IP‑Adresse identifiziert ein Gerät im Netzwerk. Ein **Port** identifiziert einen bestimmten Dienst auf diesem Gerät.

Zusammen sehen sie aus wie `93.184.216.34:80` (IP `:` Port).

Gängige Ports:

- `80` — HTTP
- `443` — HTTPS
- `22` — SSH
- `53` — DNS

Ports erlauben es, dass eine Maschine mehrere Netzwerkdienste gleichzeitig betreibt.

---

## TCP vs UDP (kurze Regeln)

TCP und UDP sind Transportschicht‑Protokolle, die auf IP aufsetzen.

- **TCP**
  - Verbindungsorientiert: Client und Server bauen eine Verbindung auf.
  - Garantiert geordnete, zuverlässige Lieferung.
  - Verwendet für Webseiten, APIs, Dateitransfers.

- **UDP**
  - Verbindungslos: sendet unabhängige Pakete.
  - Geringere Overhead, keine Garantie für Lieferung oder Reihenfolge.
  - Verwendet für DNS‑Abfragen, Echtzeit‑Audio/Video, Spiele.

Beispiel: HTTP verwendet TCP, weil Seiten korrekt und vollständig ankommen müssen; eine DNS‑Abfrage nutzt oft UDP wegen der Geschwindigkeit.

---

> **Wichtig:** IP routet Pakete zur Maschine; Ports routen sie zum Dienst auf dieser Maschine. TCP bringt Zuverlässigkeit, UDP bringt Geschwindigkeit.
