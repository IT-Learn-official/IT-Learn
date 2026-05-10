# Kapitel 5: HTTP (Wie Browser und Server kommunizieren)

HTTP ist das Protokoll, das definiert, wie Clients und Server Anfragen und Antworten austauschen.

Am Ende dieses Kapitels wirst du in der Lage sein:

- Zu beschreiben, was HTTP ist.
- Häufige Methoden wie GET und POST zu nennen.
- Statuscodes, Header und Bodies zu erklären.

---

## Was ist HTTP?

HTTP = HyperText Transfer Protocol. Es strukturiert die Web‑Kommunikation als Anfragen (Clients) und Antworten (Server).

---

## Häufige Methoden

- **GET** — Daten lesen (safe/idempotent)
- **POST** — Daten senden/erstellen
- **PUT** — eine Ressource ersetzen (idempotent)
- **PATCH** — eine Ressource teilweise aktualisieren
- **DELETE** — eine Ressource löschen

---

## Statuscodes

- `200` — OK
- `201` — Created
- `400` — Bad Request
- `401` — Unauthorized
- `403` — Forbidden
- `404` — Not Found
- `500` — Server Error

Die erste Ziffer gruppiert Antworten: `2xx` Erfolg, `4xx` Client‑Fehler, `5xx` Server‑Fehler.

---

## Header und Body

Anfragen und Antworten enthalten Header (Metadaten) und einen optionalen Body (HTML, JSON, Dateien).

> **Wichtig:** HTTP besteht aus Methoden, Statuscodes, Headern und Bodies.
