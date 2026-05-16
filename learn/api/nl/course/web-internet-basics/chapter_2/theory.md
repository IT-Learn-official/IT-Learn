# Hoofdstuk 2: URL's (Het adresseringssysteem van het web)

Een URL is een gestructureerd adres dat de browser vertelt waarheen te gaan en wat op te vragen.

Aan het einde van dit hoofdstuk kun je:

- Een URL opdelen in protocol, host, pad, query en fragment.
- Uitleggen wat query‑parameters doen.
- Beschrijven wat een domeinnaam is.

---

## Wat is een URL?

URL = Uniform Resource Locator. Het bevat het protocol (hoe te praten), de host (welke server), het pad (welke resource), optionele query‑parameters en een optioneel fragment.

Voorbeeld:

```
https://api.example.com/users?limit=10#top
```

- `https` → protocol
- `api.example.com` → host
- `/users` → pad
- `?limit=10` → query
- `#top` → fragment

> **Belangrijk:** Een URL is een precies adres met onderdelen die de browser gebruikt om een resource te vinden en op te vragen.

---

## Query‑parameters

Query‑parameters zijn `key=value`‑paren na `?`, gebruikt voor filters, paginering en opties.

Bijv.: `/search?q=cats&page=2`

---

## Domeinnamen

Domeinnamen (zoals `example.com`) zijn mensvriendelijke labels die DNS naar IP‑adressen vertaalt. Hoofdstuk over DNS legt dit verder uit.
