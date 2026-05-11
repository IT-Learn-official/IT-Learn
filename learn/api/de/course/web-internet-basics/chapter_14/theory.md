# Kapitel 14: Deployment, Skalierung und Sicherheitsgrundlagen

Am Ende dieses Kapitels wirst du in der Lage sein:

- Grundlegende Deployment‑Modelle für Web‑Dienste zu verstehen.
- Die Rolle von Load‑Balancern und Reverse‑Proxies zu beschreiben.
- Ein paar wesentliche Sicherheitspraktiken für den Betrieb von Web‑Diensten aufzuzählen.

---

## Deployment‑Modelle (kurz)

- **Single server** — einfach, gut für kleine Projekte.
- **Container** (Docker) — paketiert Apps mit ihrer Umgebung.
- **Platform as a Service (PaaS)** — verwaltete Plattformen, die Deployments vereinfachen.

---

## Load‑Balancer und Reverse‑Proxies

Ein **Load‑Balancer** verteilt eingehende Anfragen auf mehrere Backend‑Server, um Kapazität und Zuverlässigkeit zu erhöhen.

Ein **Reverse‑Proxy** (z. B. Nginx) sitzt vor deiner App, liefert statische Dateien, handhabt TLS und leitet Anfragen an das Backend weiter.

---

## Sicherheits‑Checkliste

- Überall **HTTPS** verwenden.
- Software aktuell halten.
- Starke Zugangsdaten verwenden und Schlüssel rotieren.
- Administrativen Zugriff einschränken und Logs überwachen.
- Wichtige Daten regelmäßig sichern.

> **Wichtig:** Deployments mit Blick auf Zuverlässigkeit und Sicherheit planen — einfache Muster (Reverse‑Proxy + TLS + Backups) sind oft sehr wirkungsvoll.
