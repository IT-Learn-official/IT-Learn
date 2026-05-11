# Chapter 12: Real-time Web: WebSockets, SSE, and Webhooks

By the end of this chapter, you’ll be able to:

- Compare WebSockets, Server-Sent Events (SSE), and webhooks.
- Explain basic use-cases for each real-time technique.
- Understand the difference between client-initiated and server-initiated messages.

---

## WebSockets

WebSockets provide a persistent two-way connection between client and server. Once opened, both sides can send messages at any time.

Use cases: chat apps, multiplayer games, live collaboration.

Connection URL example: `wss://example.com/socket` (secure WebSocket).

---

## Server-Sent Events (SSE)

SSE is a simpler, one-way channel: the server pushes updates to the client over a long-lived HTTP connection. The client cannot send messages over that same channel.

Use cases: live feeds, notifications, stock tickers.

---

## Webhooks

Webhooks are server-to-server HTTP callbacks. Instead of polling a service, you give it a URL and it POSTs to you when something happens.

Use cases: payment notifications, third-party integrations, CI systems.

---

## Choosing the Right Tool

- If you need full duplex and low latency, choose **WebSockets**.
- If you need simple server-to-client updates and HTTP simplicity, consider **SSE**.
- If you need to be notified by another service, use **webhooks**.

> Key takeaway: Real-time features come in different shapes — pick the one that fits your needs and scale accordingly.
