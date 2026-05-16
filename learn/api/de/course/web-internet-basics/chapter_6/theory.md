# Kapitel 6: HTTPS und APIs (Sichere Gespräche und Datendienste)

HTTPS schützt HTTP‑Verkehr; APIs lassen Apps Daten austauschen. Dieses Kapitel führt beides ein.

Am Ende dieses Kapitels wirst du in der Lage sein:

- Den Unterschied zwischen **HTTP** und **HTTPS** zu erklären.
- Zu definieren, was eine **API** ist.
- Häufige API‑Stile (REST, GraphQL, RPC, WebSockets, Webhooks) zu erkennen.

---

## HTTP vs HTTPS (kurz)

HTTPS = HTTP + TLS. TLS verschlüsselt den Verkehr, verhindert Manipulation und hilft, die Identität eines Servers mit Zertifikaten zu überprüfen.

> **Wichtig:** Nutze HTTPS, um Daten unterwegs zu schützen und den Server zu verifizieren.

---

## Was ist eine API?

Eine API (Application Programming Interface) ist ein Server, der Daten oder Aktionen bereitstellt, meist über HTTP und JSON. Clients (Web, Mobile, andere Server) rufen APIs auf, um Daten zu lesen oder zu ändern.

Beispiel: `GET /users/42` → der Server gibt JSON zu Benutzer 42 zurück.

---

## Häufige API‑Stile

- **REST:** ressourcenorientiert, verwendet HTTP‑Methoden und Statuscodes.
- **GraphQL:** der Client fragt genau die Felder an, die er braucht.
- **RPC/gRPC:** ruft Funktionen auf einem entfernten Server auf.
- **WebSockets:** persistente zweiseitige Kanäle für Echtzeitdaten.
- **Webhooks:** serverseitige Rückrufe bei Ereignissen.

Spätere Kapitel (7–14) gehen tiefer in Transport, DNS, TLS, API‑Design, Authentifizierung, Real‑Time‑Methoden, Caching/CDNs und Deployment/Sicherheit.
