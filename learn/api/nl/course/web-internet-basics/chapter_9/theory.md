# Hoofdstuk 9: TLS en HTTPS‑internals

Aan het einde van dit hoofdstuk kun je:

- Uitleggen waarom HTTPS veiliger is dan HTTP.
- De rol van TLS en certificaten bij het opbouwen van vertrouwen beschrijven.
- Basisbegrippen van certificaten herkennen, zoals verlopen en keten van vertrouwen.

---

## Waarom HTTPS?

HTTPS is HTTP over TLS (Transport Layer Security). TLS versleutelt de data tussen je browser en een server zodat afluisteraars in hetzelfde netwerk niets kunnen lezen.

HTTPS helpt ook te verifiëren dat je met de bedoelde server praat (niet met een vervalser) via certificaten.

---

## Basis TLS‑handshake (hoog niveau)

1. ClientHello — de browser geeft aan welke TLS‑versies en ciphers hij ondersteunt.
2. ServerHello + Certificate — de server kiest instellingen en stuurt zijn certificaat.
3. Certificaatcontrole — de browser controleert de certificaatketen en geldigheid.
4. Sleutelmateria‑uitwisseling — client en server komen overeen over een tijdelijke symmetrische sleutel.
5. Versleuteld HTTP — normale HTTP‑berichten lopen over het versleutelde kanaal.

---

## Certificaten en keten van vertrouwen

Een certificaat is ondertekend door een Certificate Authority (CA). Browsers bevatten een lijst met vertrouwde CAs. Als een certificaat (direct of indirect) is ondertekend door een vertrouwde CA, accepteert de browser het.

Certificaten kunnen verlopen of ingetrokken worden — verlopen of ongeldige certificaten geven waarschuwingen.

> Belangrijk: HTTPS gebruikt TLS om verkeer te versleutelen en certificaten om server‑identiteit te bewijzen. Gebruik altijd HTTPS voor gevoelige data.
