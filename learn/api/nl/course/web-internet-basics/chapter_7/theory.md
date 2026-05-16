# Hoofdstuk 7: Poorten, TCP, UDP en de transportlaag

Aan het einde van dit hoofdstuk kun je:

- Uitleggen wat een **poort** is en waarom het belangrijk is.
- Het verschil tussen **TCP** en **UDP** beschrijven.
- Een eenvoudige `IP:poort`‑adres lezen en weten waar het naar verwijst.

---

## Wat is een poort?

Een IP‑adres identificeert een apparaat op het netwerk. Een **poort** identificeert een specifieke dienst op dat apparaat.

Samen zien ze eruit als `93.184.216.34:80` (IP `:` poort).

Veelgebruikte poorten:

- `80` — HTTP
- `443` — HTTPS
- `22` — SSH
- `53` — DNS

Poorten maken het mogelijk dat één machine meerdere netwerkdiensten tegelijk draait.

---

## TCP vs UDP (kort)

TCP en UDP zijn transportprotocollen boven IP.

- **TCP**
  - Connectiegeoriënteerd: client en server zetten eerst een verbinding op.
  - Garandeert geordende, betrouwbare levering.
  - Gebruikt voor webpagina’s, API’s, bestandsoverdracht.

- **UDP**
  - Connectieloos: stuurt losse pakketten.
  - Lagere overhead, geen garantie op levering of volgorde.
  - Gebruikt voor DNS‑queries, realtime audio/video, games.

Voorbeeld: HTTP gebruikt TCP omdat pagina’s correct moeten aankomen; DNS gebruikt vaak UDP vanwege snelheid.

---

> Belangrijk: IP routet pakketten naar een machine; poorten routeren ze naar een dienst op die machine. TCP biedt betrouwbaarheid, UDP biedt snelheid.
