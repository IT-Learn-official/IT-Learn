# Hoofdstuk 3: IP‑adressen en DNS (De juiste computer vinden)

Computers gebruiken IP‑adressen; mensen gebruiken domeinnamen. DNS overbrugt het verschil zodat browsers servers kunnen vinden.

Aan het einde van dit hoofdstuk kun je:

- Uitleggen wat een **IP‑adres** is.
- Beschrijven waarom DNS nodig is.
- De basisstroom naam → adres → verbinden samenvatten.

---

## Wat is een IP‑adres?

Een **IP‑adres** identificeert een apparaat op een netwerk zodat data er naartoe gerouteerd kan worden.

- **IPv4:** `192.168.1.20`
- **IPv6:** `2001:db8::1`

Apparaten hebben vaak een privé‑IP op een lokaal netwerk en een publieke IP op het internet.

> **Belangrijk:** IP‑adressen laten routers pakketten naar het juiste apparaat sturen.

---

## Waarom DNS bestaat

DNS is het telefoonboek van het internet: het zet mensvriendelijke namen (zoals `example.com`) om naar IP‑adressen zodat browsers kunnen verbinden.

---

## Basisflow

1. Browser ziet `example.com`.
2. Browser vraagt DNS om het IP‑adres.
3. Browser verbindt met dat IP en stuurt een HTTP‑request.

Latere hoofdstukken duiken dieper in DNS‑internals.
