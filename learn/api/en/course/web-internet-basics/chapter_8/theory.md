# Chapter 8: DNS in Depth and Common DNS Records

By the end of this chapter, you’ll be able to:

- Explain what DNS does and why it is needed.
- Recognize common DNS records: **A**, **AAAA**, **CNAME**, **MX**, **TXT**, and **NS**.
- Describe DNS caching and TTL at a high level.

---

## What Is DNS?

DNS (Domain Name System) is the internet’s phone book. It translates human-friendly domain names (like `example.com`) into IP addresses (like `93.184.216.34`) so computers can connect.

DNS queries are usually fast and cached, so your browser does not ask the root servers for every single page load.

---

## Common Record Types

- **A** — maps a name to an IPv4 address.
- **AAAA** — maps a name to an IPv6 address.
- **CNAME** — makes one name an alias of another name.
- **MX** — tells mail systems which servers accept email for the domain.
- **NS** — lists the authoritative name servers for a zone.
- **TXT** — free-form text (often used for verification or SPF).

Example: `www.example.com` → A → `93.184.216.34`.

---

## TTL and Caching

TTL (Time To Live) is a number (in seconds) that tells resolvers how long they can cache a DNS record. Short TTL values make changes visible quickly; long TTLs reduce DNS traffic.

There are two main roles:

- **Recursive resolver** (your ISP or a public resolver like 1.1.1.1) — asks other servers and caches answers.
- **Authoritative server** — the server that holds the real records for a domain.

---

## Basic Flow When You Visit a Site

1. Browser sees `example.com`.
2. Browser asks the resolver for the A/AAAA record.
3. Resolver either returns a cached answer or queries the authoritative servers.
4. Browser gets the IP and connects to it.

> Key takeaway: DNS turns names into addresses, and caching with TTL makes this fast in practice.
