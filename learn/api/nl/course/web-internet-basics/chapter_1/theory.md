# Hoofdstuk 1: Het web vs. het internet (en wie met wie praat)

Dit hoofdstuk legt het verschil uit tussen het internet en het web en introduceert het client/server verzoek/antwoord‑patroon.

Aan het einde van dit hoofdstuk kun je:

- Het verschil tussen het **Internet** en het **World Wide Web** uitleggen.
- Het **client/server**‑idee (browser vraagt, server antwoordt) beschrijven.
- Samenvatten wat een **request** en een **response** zijn.

---

## Internet vs Web (kort)

Het **Internet** is het wereldwijde netwerk van verbonden apparaten en kabels. Het **Web** is een dienst die op dat netwerk draait: websites, links en pagina’s die browsers via HTTP laden.

Kort: Internet = netwerk; Web = websites en web‑apps.

> **Belangrijk:** Het web gebruikt het internet, maar het internet is breder dan alleen het web.

---

## Client en Server

- **Client:** een browser of app die data opvraagt.
- **Server:** een machine of dienst die op verzoeken antwoordt.

Analogie: jij (client) bestelt eten; het restaurant (server) bereidt en levert het.

---

## Request en Response

Typische flow:

1. De client stuurt een **request** (bijv. `GET /index.html`).
2. De server stuurt een **response** terug (statuscode, headers en body).

Latere hoofdstukken leggen de onderdelen van requests en responses uitgebreider uit.

> **Belangrijk:** Webpagina’s en API’s werken doordat clients requests doen en servers antwoorden sturen.
