# Hoofdstuk 12: Websockets en realtime communicatie

Aan het einde van dit hoofdstuk kun je:

- Het verschil uitleggen tussen WebSockets en traditionele HTTP‑requests.
- Enkele toepassingsgevallen voor realtime communicatie noemen.
- Heel globaal het handshakemechanisme en het duplex‑karakter beschrijven.

---

## Waarom WebSockets?

WebSockets bieden een persistente, full‑duplex verbinding tussen client en server, handig voor chat, realtime updates en multiplayer games waar beide kanten data pushen.

---

## Hoe het anders is dan HTTP

HTTP is request/response — de client vraagt en de server antwoordt. WebSockets openen eerst een HTTP‑upgrade handshake en schakelen dan over naar een bidirectioneel kanaal.

---

## Toepassingen

- Chatapps
- Live dashboards en telemetrie
- Multiplayer games

> Belangrijk: WebSockets zijn sterk voor lage-latentie updates, maar maken server‑architectuur en schaalbaarheid uitdagender.
