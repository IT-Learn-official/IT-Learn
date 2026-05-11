# Kapitel 13: Caching, CDNs und Performance

Am Ende dieses Kapitels wirst du in der Lage sein:

- Zu erklären, warum Caching die Performance verbessert.
- Gängige Cache‑Header wie `Cache‑Control` und `ETag` zu erkennen.
- Zu beschreiben, was ein CDN (Content Delivery Network) macht.

---

## Warum cachen?

Caching speichert Kopien von Antworten, sodass Clients oder Zwischenserver sie wiederverwenden können, anstatt die Daten erneut zu holen. Das reduziert Latenz und Serverlast.

---

## Gängige Header

- `Cache‑Control: max‑age=3600` — erlaube Caching für eine Stunde.
- `ETag` — ein Fingerabdruck, der eine bestimmte Version einer Ressource identifiziert. Clients können damit prüfen, ob sich der Inhalt geändert hat.
- `Last‑Modified` — ein Zeitstempel, wann die Ressource zuletzt geändert wurde.

---

## CDNs

Ein CDN speichert Kopien statischer Assets (Bilder, CSS, JS) auf Servern weltweit. Wenn ein Nutzer ein Asset anfragt, liefert das CDN es von einem nahen Ort, was Latenz reduziert.

Vorteile: schnellere Ladezeiten, weniger Traffic zum Origin, bessere Verfügbarkeit.

> **Wichtig:** Caching und CDNs sind zentrale Werkzeuge, um Webseiten schnell und zuverlässig zu machen.
