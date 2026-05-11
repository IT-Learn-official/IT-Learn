# Kapitel 8: DNS im Detail und gängige DNS‑Einträge

Am Ende dieses Kapitels wirst du in der Lage sein:

- Zu erklären, was DNS macht und warum es nötig ist.
- Gängige DNS‑Einträge zu erkennen: **A**, **AAAA**, **CNAME**, **MX**, **TXT** und **NS**.
- DNS‑Caching und TTL auf hohem Niveau zu beschreiben.

---

## Was ist DNS?

DNS (Domain Name System) ist das Telefonbuch des Internets. Es übersetzt menschenfreundliche Domainnamen (z. B. `example.com`) in IP‑Adressen (z. B. `93.184.216.34`), damit Computer sich verbinden können.

DNS‑Abfragen sind meist schnell und werden gecacht, sodass dein Browser nicht für jeden Seitenaufruf die Root‑Server fragen muss.

---

## Gängige Record‑Typen

- **A** — weist einen Namen einer IPv4‑Adresse zu.
- **AAAA** — weist einen Namen einer IPv6‑Adresse zu.
- **CNAME** — macht einen Namen zum Alias eines anderen Namens.
- **MX** — zeigt, welche Server E‑Mails für die Domain annehmen.
- **NS** — listet die autoritativen Nameserver für eine Zone.
- **TXT** — freier Text, oft für Verifikation oder SPF.

---

## TTL und Caching

TTL (Time To Live) ist eine Zahl (in Sekunden), die Resolvern sagt, wie lange sie einen DNS‑Eintrag cachen dürfen. Kurze TTLs machen Änderungen schnell sichtbar; lange TTLs reduzieren DNS‑Traffic.

---

## Grundlegender Ablauf beim Aufrufen einer Seite

1. Browser sieht `example.com`.
2. Browser fragt den Resolver nach dem A/AAAA‑Eintrag.
3. Der Resolver gibt eine gecachte Antwort oder fragt die autoritativen Server ab.
4. Der Browser erhält die IP und verbindet sich.

> **Wichtig:** DNS verwandelt Namen in Adressen, und Caching mit TTL macht das in der Praxis schnell.
