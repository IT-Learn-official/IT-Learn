# Kapitel 4: Server (Die Maschinen, die dir antworten)

Server sind Maschinen oder Software, die Anfragen von Browsern und Apps beantworten.

Am Ende dieses Kapitels wirst du in der Lage sein:

- Zu definieren, was ein Server ist.
- Zu erklären, was ein Webserver macht.
- Zu beschreiben, wie Backend‑Apps und Datenbanken zusammenarbeiten.

---

## Was ist ein Server?

Ein Server ist eine Maschine oder ein Dienst, der auf Anfragen lauscht und Antworten sendet. "Server" kann die physische/virtuelle Maschine oder die darauf laufende Software (z. B. Nginx, Apache, Node) bedeuten.

> **Wichtig:** Ein Server hört zu und antwortet — er liefert die Daten oder den Dienst, den Clients anfordern.

---

## Webserver vs Backend‑App

- **Webserver:** liefert statische Dateien, handhabt TLS und leitet Anfragen oft an das Backend weiter.
- **Backend‑App:** führt Anwendungslogik aus (Login, Datenbankzugriff, APIs) und erzeugt dynamische Antworten.

Moderne Seiten kombinieren Client (Browser), Webserver (Frontdoor), Backend‑App (Logik) und Datenbank (Speicher).
