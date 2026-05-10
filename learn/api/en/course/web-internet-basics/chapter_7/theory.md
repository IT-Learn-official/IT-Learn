# Chapter 7: Ports, TCP, UDP, and the Transport Layer

By the end of this chapter, you’ll be able to:

- Explain what a **port** is and why it matters.
- Describe the difference between **TCP** and **UDP**.
- Read a simple `IP:port` address and know what it points to.

---

## What Is a Port?

An IP address identifies a device on the network. A **port** identifies a specific service on that device.

Together they look like `93.184.216.34:80` (IP `:` port).

Common ports:

- `80` — HTTP
- `443` — HTTPS
- `22` — SSH
- `53` — DNS

Ports let a single machine run many network services at the same time.

---

## TCP vs UDP (Simple Rules)

TCP and UDP are transport protocols that sit above IP.

- **TCP** (Transmission Control Protocol)
  - Connection-oriented: client and server set up a connection first.
  - Guarantees ordered, reliable delivery.
  - Used for web pages, APIs, file transfers.

- **UDP** (User Datagram Protocol)
  - Connectionless: sends independent packets.
  - Lower overhead, no guaranteed delivery or order.
  - Used for DNS queries, real-time audio/video, games.

Example: HTTP (web) uses TCP because pages must arrive correctly; a DNS lookup often uses UDP because speed matters and a lost packet can be retried.

---

## Connection Example (Very Short)

When you visit a web page the browser opens a TCP connection to the server’s IP and port (usually `:443` for HTTPS). The browser and server then exchange HTTP requests and responses over that connection.

> Key takeaway: IP routes packets to a machine; ports route them to a service on that machine. TCP gives reliability, UDP gives speed.
