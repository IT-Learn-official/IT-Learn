# Hoofdstuk 10: RESTful API’s: Principes en ontwerp

Aan het einde van dit hoofdstuk kun je:

- Uitleggen wat REST op hoofdlijnen is.
- Eenvoudige resource‑gerichte URL’s ontwerpen en geschikte HTTP‑methoden kiezen.
- Statuscodes en JSON consistent gebruiken in een API.

---

## REST in twee regels

REST is een architectuurstijl waarbij servers **resources** (zelfstandige naamwoorden) via URL’s beschikbaar maken en clients deze manipuleren met standaard HTTP‑methoden (GET, POST, PUT, DELETE).

Een goed ontworpen API gebruikt duidelijke resourcenamen en consistent gedrag voor methoden en statuscodes.

---

## Methodes en idempotentie

- **GET** — data lezen (safe en idempotent)
- **POST** — een nieuwe resource maken (niet per se idempotent)
- **PUT** — een resource vervangen (idempotent)
- **PATCH** — een resource gedeeltelijk bijwerken (niet per se idempotent)
- **DELETE** — een resource verwijderen (idempotent)

Idempotent betekent dat je dezelfde request meerdere keren kunt doen en hetzelfde resultaat krijgt.

---

## Statuscodes en JSON

Gebruik statuscodes om resultaten te communiceren. Veelgebruikte codes die je in REST‑API’s zult gebruiken:

- `200 OK` — Verzoek geslaagd; responsebody bevat de representatie.
- `201 Created` — Er is een nieuwe resource aangemaakt; voeg een `Location` header met de URL toe.
- `204 No Content` — Succes zonder responsebody (handig voor DELETE/PUT).
- `301/302 Redirect` — Resource verplaatst (minder gebruikelijk voor JSON‑API’s).
- `400 Bad Request` — Het verzoek is ongeldig of mist verplichte velden.
- `401 Unauthorized` — Authenticatie vereist of mislukt (ongeldig/verlopen token).
- `403 Forbidden` — Geauthenticeerd maar niet bevoegd om deze actie uit te voeren.
- `404 Not Found` — De gevraagde resource bestaat niet.
- `409 Conflict` — Verzoek kon niet worden voltooid vanwege een conflict (bijv. dubbele resource).
- `422 Unprocessable Entity` — Semantische validatie mislukt (gebruikelijk bij validatiefouten).
- `429 Too Many Requests` — Client wordt gerate‑limited.
- `500 Internal Server Error` — Generieke serverfout; controleer logs en probeer opnieuw.
- `503 Service Unavailable` — Tijdelijke overbelasting of onderhoud.

API’s sturen meestal JSON; zet de header `Content-Type: application/json` en geef consistente foutobjecten terug. Voorbeeld foutobject:

```
{
	"error": {
		"code": 422,
		"message": "Validatie mislukt",
		"details": { "email": "Ongeldig formaat" }
	}
}
```

---

## Klein voorbeeld (curl)

```
curl -X GET "https://api.example.com/users/42" -H "Accept: application/json"
```

> Belangrijk: Ontwerp API’s rond resources en gebruik HTTP correct — methodes, statuscodes en JSON doen ertoe.
