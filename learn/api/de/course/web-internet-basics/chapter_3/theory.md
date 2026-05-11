# Kapitel 3: IP‑Adressen und DNS (Den richtigen Computer finden)

Computer verwenden IP‑Adressen; Menschen verwenden Domainnamen. DNS schlägt die Brücke, damit Browser Server finden.

Am Ende dieses Kapitels wirst du in der Lage sein:

- Zu erklären, was eine **IP‑Adresse** ist.
- Zu beschreiben, warum DNS nötig ist.
- Den grundlegenden Name → Adresse → Verbinden‑Ablauf zusammenzufassen.

---

## Was ist eine IP‑Adresse?

Eine **IP‑Adresse** identifiziert ein Gerät im Netzwerk, damit Daten an das richtige Ziel geleitet werden können.

- **IPv4:** `192.168.1.20`
- **IPv6:** `2001:db8::1`

Geräte haben oft eine private IP im lokalen Netzwerk und eine öffentliche IP im Internet.

> **Wichtig:** IP‑Adressen erlauben Routern, Pakete an das richtige Gerät zu liefern.

---

## Warum DNS existiert

DNS ist das Telefonbuch des Internets: es übersetzt menschenlesbare Namen (z. B. `example.com`) in IP‑Adressen, damit Browser sich verbinden können.

---

## Grundlegender Ablauf

1. Der Browser sieht `example.com`.
2. Der Browser fragt DNS nach der IP‑Adresse.
3. Der Browser verbindet sich mit der IP und sendet eine HTTP‑Anfrage.

Spätere Kapitel behandeln DNS‑Interna detaillierter.
