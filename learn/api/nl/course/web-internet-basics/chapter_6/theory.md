# Hoofdstuk 6: HTTPS en API’s (Veilige gesprekken en dataservices)

HTTPS beschermt HTTP‑verkeer; API’s laten apps data uitwisselen. Dit hoofdstuk introduceert beide onderwerpen.

Aan het einde van dit hoofdstuk kun je:

- Het verschil tussen **HTTP** en **HTTPS** uitleggen.
- Beschrijven wat een **API** is.
- Gewone API‑stijlen herkennen (REST, GraphQL, RPC, WebSockets, Webhooks).

---

## HTTP vs HTTPS (kort)

HTTPS = HTTP + TLS. TLS versleutelt verkeer, voorkomt manipulatie en helpt de identiteit van een server met certificaten te verifiëren.

> **Belangrijk:** Gebruik HTTPS om data onderweg te beschermen en de server te verifiëren.

---

## Wat is een API?

Een API (Application Programming Interface) is een server die data of acties aanbiedt, meestal via HTTP en JSON. Clients (web, mobiel, andere servers) roepen API’s aan om data te lezen of te wijzigen.

Voorbeeld: `GET /users/42` → server retourneert JSON over gebruiker 42.

---

## Veelvoorkomende API‑stijlen

- **REST:** resource‑gericht, gebruikt HTTP‑methoden en statuscodes.
- **GraphQL:** client vraagt precies de velden aan die nodig zijn.
- **RPC/gRPC:** roept functies aan op een externe server.
- **WebSockets:** persistente tweerichtingskanalen voor real‑time data.
- **Webhooks:** server‑naar‑server callbacks bij gebeurtenissen.

Latere hoofdstukken (7–14) gaan dieper in transport, DNS, TLS, API‑ontwerp, authenticatie, real‑time methoden, caching/CDN’s en deployment/beveiliging.
