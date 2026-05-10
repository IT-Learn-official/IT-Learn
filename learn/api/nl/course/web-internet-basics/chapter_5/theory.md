# Hoofdstuk 5: HTTP (Hoe browsers en servers praten)

HTTP is het protocol dat definieert hoe clients en servers verzoeken en antwoorden uitwisselen.

Aan het einde van dit hoofdstuk kun je:

- Beschrijven wat HTTP is.
- Veelgebruikte methoden zoals GET en POST noemen.
- Statuscodes, headers en bodies uitleggen.

---

## Wat is HTTP?

HTTP = HyperText Transfer Protocol. Het structureert webcommunicatie als requests (van clients) en responses (van servers).

---

## Veelgebruikte methoden

- **GET** — gegevens lezen (safe/idempotent)
- **POST** — gegevens verzenden/aanmaken
- **PUT** — een resource vervangen (idempotent)
- **PATCH** — een resource gedeeltelijk bijwerken
- **DELETE** — een resource verwijderen

---

## Statuscodes

- `200` — OK
- `201` — Created
- `400` — Bad Request
- `401` — Unauthorized
- `403` — Forbidden
- `404` — Not Found
- `500` — Server Error

De eerste cijfergroep geeft de categorie aan: `2xx` succes, `4xx` clientfout, `5xx` serverfout.

---

## Headers en Body

Requests en responses bevatten headers (metadata) en een optionele body (HTML, JSON, bestanden).

> **Belangrijk:** HTTP bestaat uit methoden, statuscodes, headers en bodies.
