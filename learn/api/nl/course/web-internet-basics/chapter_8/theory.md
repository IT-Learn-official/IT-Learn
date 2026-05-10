# Hoofdstuk 8: DNS in detail en veelvoorkomende DNS‑records

Aan het einde van dit hoofdstuk kun je:

- Uitleggen wat DNS doet en waarom het nodig is.
- Veelvoorkomende DNS‑records herkennen: **A**, **AAAA**, **CNAME**, **MX**, **TXT**, **NS**.
- DNS‑caching en TTL op hoofdlijnen beschrijven.

---

## Wat is DNS?

DNS (Domain Name System) is het telefoonboek van het internet. Het vertaalt mensvriendelijke domeinnamen (zoals `example.com`) naar IP‑adressen (zoals `93.184.216.34`) zodat computers verbinding kunnen maken.

DNS‑queries zijn meestal snel en gecached, zodat je browser niet bij elke pagina de rootservers hoeft te vragen.

---

## Veelvoorkomende recordtypes

- **A** — wijst een naam naar een IPv4‑adres.
- **AAAA** — wijst een naam naar een IPv6‑adres.
- **CNAME** — maakt een naam een alias van een andere naam.
- **MX** — zegt welke mailservers e‑mail voor de domein accepteren.
- **NS** — lijst met autoritatieve nameservers voor een zone.
- **TXT** — vrij tekstveld (vaak gebruikt voor verificatie of SPF).

---

## TTL en caching

TTL (Time To Live) is een getal (in seconden) dat aangeeft hoe lang resolvers een DNS‑record mogen cachen. Korte TTL’s maken veranderingen snel zichtbaar; lange TTL’s verminderen DNS‑verkeer.

---

## Basisflow bij site‑bezoek

1. Browser ziet `example.com`.
2. Browser vraagt de resolver om het A/AAAA‑record.
3. De resolver geeft een gecachte antwoord of vraagt de autoritatieve servers.
4. Browser krijgt het IP en maakt verbinding.

> Belangrijk: DNS zet namen om in adressen en caching met TTL maakt dit snel in de praktijk.
