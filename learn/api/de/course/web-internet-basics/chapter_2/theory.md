# Kapitel 2: URLs (Das Adresssystem des Web)

Eine URL ist eine strukturierte Adresse, die dem Browser sagt, wohin er gehen und was er anfordern soll.

Am Ende dieses Kapitels wirst du in der Lage sein:

- Eine URL in Protokoll, Host, Pfad, Query und Fragment aufzuteilen.
- Zu erklären, wozu Query‑Parameter dienen.
- Zu beschreiben, was ein Domainname ist.

---

## Was ist eine URL?

URL = Uniform Resource Locator. Sie enthält das Protokoll (wie kommuniziert wird), den Host (welcher Server), den Pfad (welche Ressource), optionale Query‑Parameter und ein optionales Fragment.

Beispiel:

```
https://api.example.com/users?limit=10#top
```

- `https` → Protokoll
- `api.example.com` → Host
- `/users` → Pfad
- `?limit=10` → Query
- `#top` → Fragment

> **Wichtig:** Eine URL ist eine präzise Adresse mit Teilen, die der Browser nutzt, um eine Ressource zu finden und anzufordern.

---

## Query‑Parameter

Query‑Parameter sind `key=value`‑Paare nach `?`, verwendet für Filter, Paginierung und Optionen.

Beispiel: `/search?q=cats&page=2`

---

## Domainnamen

Domainnamen (z. B. `example.com`) sind menschenlesbare Namen, die DNS in IP‑Adressen übersetzt. Kapitel über DNS erklären das genauer.
