# Kapitel 9: TLS und HTTPS‑Interna

Am Ende dieses Kapitels wirst du in der Lage sein:

- Zu erklären, warum HTTPS sicherer ist als HTTP.
- Die Rolle von TLS und Zertifikaten bei der Vertrauensbildung zu beschreiben.
- Grundlegende Zertifikatskonzepte wie Ablauf und Vertrauenskette zu erkennen.

---

## Warum HTTPS?

HTTPS ist HTTP über TLS (Transport Layer Security). TLS verschlüsselt die Daten zwischen Browser und Server, sodass Lauscher im selben Netzwerk nichts mitlesen können.

HTTPS hilft außerdem zu überprüfen, dass du mit dem beabsichtigten Server kommunizierst (kein Angreifer), mithilfe von Zertifikaten.

---

## Grober TLS‑Handshake

1. ClientHello — der Browser sagt, welche TLS‑Versionen und Chiffren er unterstützt.
2. ServerHello + Certificate — der Server wählt Einstellungen und sendet sein Zertifikat.
3. Zertifikatsprüfung — der Browser prüft die Zertifikatskette und das Ablaufdatum.
4. Schlüsselaustausch — Client und Server einigen sich auf einen symmetrischen Sitzungsschlüssel.
5. Verschlüsseltes HTTP — normale HTTP‑Nachrichten laufen über den verschlüsselten Kanal.

---

## Zertifikate und Vertrauenskette

Ein Zertifikat wird von einer Certificate Authority (CA) signiert. Browser haben eine Liste vertrauenswürdiger CAs. Wenn ein Zertifikat (direkt oder indirekt) von einer vertrauenswürdigen CA signiert ist, akzeptiert der Browser es.

Zertifikate können ablaufen oder widerrufen werden — abgelaufene oder ungültige Zertifikate führen zu Warnungen.

> **Wichtig:** HTTPS verschlüsselt und Zertifikate beweisen Identität. Verwende HTTPS für sensible Daten.
