# Hoofdstuk 11: Authenticatie & Autorisatie voor API’s

Aan het einde van dit hoofdstuk kun je:

- Het verschil uitleggen tussen authenticatie (wie je bent) en autorisatie (wat je mag doen).
- Veelvoorkomende API‑authenticatiemethoden herkennen: sessions/cookies, API‑sleutels en tokens (JWT).
- Een globaal idee van het doel van OAuth2 hebben.

---

## Auth vs Authorization

- **Authenticatie** — aantonen wie je bent (bijv. inloggen).
- **Autorisatie** — controleren of een identiteit een actie mag uitvoeren (bijv. mag deze gebruiker een bestand verwijderen?).

Beide zijn belangrijk voor veilige API’s.

---

## Veelvoorkomende methoden

- **Sessions + Cookies:** de server bewaart een sessie; de browser bewaart een cookie met een verwijzing. Werkt goed voor webapps.
- **API‑keys:** een statische sleutel die met requests wordt meegestuurd. Simpel maar moet geheim blijven.
- **Bearer tokens / JWT:** token wordt in de header `Authorization: Bearer <token>` gestuurd. JWTs bevatten een compacte payload en een handtekening.

**Let op:** Verstuur gevoelige tokens altijd via HTTPS en houd ze uit de openbare code.

---

## OAuth2 (kort)

OAuth2 is een framework om beperkte toegang tot iemands resources te verlenen zonder wachtwoorden te delen (bv. "Login met Google"). Het definieert flows zoals de authorization code flow voor apps die namens gebruikers handelen.

> Belangrijk: Kies de juiste methode voor je app, bewaar secrets veilig en gebruik altijd HTTPS voor authenticatie.
