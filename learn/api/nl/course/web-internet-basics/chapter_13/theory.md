# Hoofdstuk 13: CDNs, caching en performance basics

Aan het einde van dit hoofdstuk kun je:

- Begrijpen waarom CDN’s worden gebruikt en wat ze doen.
- Verschil tussen browser‑cache, proxy‑cache en CDN weten.
- Eenvoudige performance‑maatregelen noemen (compressie, caching headers, optimaliseren afbeeldingen).

---

## Wat doet een CDN?

Een CDN (Content Delivery Network) is een netwerk van servers verspreid over locaties. Ze cachen statische assets dichtbij gebruikers zodat laadtijden korter worden.

---

## Cachinglagen

- **Browsercache** — lokale cache in de browser.
- **Proxy/CDN cache** — gedeelde cache dichterbij de gebruiker.
- **Server‑side caching** — cache op de oorsprong of applicatielaag.

Kijk naar `Cache‑Control` en `Expires` headers om gedrag te sturen.

---

## Simpele verbeteringen

- Gebruik `gzip` of `brotli` compressie.
- Optimaliseer en dimensioneer afbeeldingen.
- Stel juiste caching headers in voor statische assets.

> Belangrijk: Caching en CDN’s verminderen latency en belasting op de oorsprong, waardoor sites sneller en betrouwbaarder worden.
