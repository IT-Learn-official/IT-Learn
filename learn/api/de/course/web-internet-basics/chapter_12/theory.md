# Kapitel 12: Echtzeit‑Web: WebSockets, SSE und Webhooks

Am Ende dieses Kapitels wirst du in der Lage sein:

- WebSockets, Server‑Sent Events (SSE) und Webhooks zu vergleichen.
- Grundlegende Anwendungsfälle für jede Echtzeit‑Technik zu erklären.
- Den Unterschied zwischen client‑initiierten und server‑initiierten Nachrichten zu verstehen.

---

## WebSockets

WebSockets bieten eine persistente zweiseitige Verbindung zwischen Client und Server. Nach dem Aufbau kann jede Seite jederzeit Nachrichten senden.

Anwendungsfälle: Chat‑Apps, Multiplayer‑Spiele, Live‑Kollaboration.

Verbindungs‑Beispiel: `wss://example.com/socket` (sichere WebSocket‑URL).

---

## Server‑Sent Events (SSE)

SSE ist ein einfacherer, einseitiger Kanal: der Server pusht Updates an den Client über eine langgehaltene HTTP‑Verbindung. Der Client kann über denselben Kanal keine Nachrichten zurücksenden.

Anwendungsfälle: Live‑Feeds, Benachrichtigungen, Kurslisten.

---

## Webhooks

Webhooks sind server‑zu‑server HTTP‑Callbacks. Statt einen Dienst zu pollen, gibst du ihm eine URL, und er POSTet an dich, wenn etwas passiert.

Anwendungsfälle: Zahlungsbenachrichtigungen, Drittanbieter‑Integrationen, CI‑Systeme.

---

## Auswahl des richtigen Werkzeugs

- Für vollduplex und geringe Latenz → **WebSockets**.
- Für einfache Server→Client‑Updates → **SSE**.
- Für Benachrichtigungen von Dritt‑Diensten → **Webhooks**.

> **Wichtig:** Echtzeit‑Features gibt es in verschiedenen Formen — wähle passend zur Anforderung und skaliere richtig.
