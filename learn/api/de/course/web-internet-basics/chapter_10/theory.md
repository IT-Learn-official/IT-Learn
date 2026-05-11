# Kapitel 10: RESTful APIs: Prinzipien und Design

Am Ende dieses Kapitels wirst du in der Lage sein:

- Auf hohem Niveau zu erklären, was REST ist.
- Einfache ressourcenorientierte URLs zu entwerfen und passende HTTP‑Methoden zu wählen.
- Statuscodes und JSON in einer API konsistent zu verwenden.

---

## REST in zwei Sätzen

REST ist ein Architektur‑Stil, bei dem Server **Ressourcen** (Nomen) über URLs bereitstellen und Clients sie mit Standard‑HTTP‑Methoden (GET, POST, PUT, DELETE) manipulieren.

Ein gut gestaltetes API nutzt klare Ressourcennamen und konsistentes Verhalten für Methoden und Statuscodes.

---

## Methoden und Idempotenz

- **GET** — Daten lesen (safe und idempotent)
- **POST** — neue Ressource erstellen (nicht zwangsläufig idempotent)
- **PUT** — Ressource ersetzen (idempotent)
- **PATCH** — Ressource teilweise aktualisieren (nicht zwangsläufig idempotent)
- **DELETE** — Ressource löschen (idempotent)

Idempotent bedeutet, dass das wiederholte Senden derselben Anfrage zum gleichen Ergebnis führt.

---

## Statuscodes und JSON

Verwende Statuscodes, um Ergebnisse zu kommunizieren. Gängige Codes, die du in REST‑APIs verwenden wirst:

- `200 OK` — Anfrage erfolgreich; Antwort enthält die Repräsentation.
- `201 Created` — Eine neue Ressource wurde erstellt; füge einen `Location`‑Header mit der URL hinzu.
- `204 No Content` — Erfolg ohne Antwortkörper (nützlich für DELETE/PUT).
- `301/302 Redirect` — Ressource verschoben (für JSON‑APIs weniger üblich).
- `400 Bad Request` — Die Anfrage ist fehlerhaft oder es fehlen erforderliche Felder.
- `401 Unauthorized` — Authentifizierung erforderlich oder fehlgeschlagen (ungültiges/abgelaufenes Token).
- `403 Forbidden` — Authentifiziert, aber nicht berechtigt, diese Aktion auszuführen.
- `404 Not Found` — Die angeforderte Ressource existiert nicht.
- `409 Conflict` — Anfrage konnte aufgrund eines Konflikts nicht abgeschlossen werden (z. B. doppelte Ressource).
- `422 Unprocessable Entity` — Semantische Validierung fehlgeschlagen (häufig bei Validierungsfehlern).
- `429 Too Many Requests` — Client wird wegen Rate‑Limit begrenzt.
- `500 Internal Server Error` — Generischer Serverfehler; Logs prüfen und erneut versuchen.
- `503 Service Unavailable` — Temporäre Überlastung oder Wartung.

APIs geben üblicherweise JSON zurück; setze `Content-Type: application/json` und konsistente Fehlerobjekte. Beispiel:

```
{
	"error": {
		"code": 422,
		"message": "Validierung fehlgeschlagen",
		"details": { "email": "Ungültiges Format" }
	}
}
```

---

## Kleines Beispiel (curl)

```
curl -X GET "https://api.example.com/users/42" -H "Accept: application/json"
```

> **Wichtig:** Entwirf APIs um Ressourcen und benutze HTTP korrekt — Methoden, Statuscodes und JSON sind wichtig.
