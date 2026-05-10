# Kapitel 11: Authentifizierung & Autorisierung für APIs

Am Ende dieses Kapitels wirst du in der Lage sein:

- Den Unterschied zwischen Authentifizierung (wer du bist) und Autorisierung (was du tun darfst) zu erklären.
- Gängige API‑Authentifizierungsmethoden zu erkennen: Sessions/Cookies, API‑Keys und Tokens (JWT).
- Eine grobe Vorstellung vom Zweck von OAuth2 zu haben.

---

## Auth vs Authorization

- **Authentifizierung** — die eigene Identität nachweisen (z. B. Einloggen).
- **Autorisierung** — prüfen, ob eine Identität eine Aktion ausführen darf (z. B. darf dieser Nutzer eine Datei löschen?).

Beides ist wichtig für sichere APIs.

---

## Gängige Methoden

- **Sessions + Cookies:** der Server speichert eine Session; der Browser behält ein Cookie mit dem Verweis. Gut für Web‑Apps.
- **API‑Keys:** ein statischer Schlüssel, der mit Anfragen gesendet wird. Einfach, aber geheim halten.
- **Bearer‑Tokens / JWT:** Token werden im Header `Authorization: Bearer <token>` gesendet. JWTs enthalten eine kompakte Nutzlast und Signatur.

**Hinweis:** Sende sensible Tokens immer über HTTPS und speichere sie nicht öffentlich im Code.

---

## OAuth2 (sehr kurz)

OAuth2 ist ein Framework, um begrenzten Zugriff auf Nutzerressourcen zu gewähren, ohne Passwörter zu teilen (z. B. "Login mit Google"). Es definiert Flows wie den Authorization Code Flow für Apps, die im Namen von Nutzern handeln.

> **Wichtig:** Wähle die richtige Methode für deine App, speichere Geheimnisse sicher und verwende HTTPS für Authentifizierung.
