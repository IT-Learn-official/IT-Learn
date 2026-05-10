# Chapter 6: HTTPS and APIs (Secure Conversations and Data Services)

HTTPS protects HTTP traffic; APIs let apps exchange data. This chapter introduces both.

By the end of this chapter, you’ll be able to:

- Explain the difference between **HTTP** and **HTTPS**.
- Define what an **API** is.
- Recognize common API styles (REST, GraphQL, RPC, WebSockets, Webhooks).

---

## HTTP vs HTTPS (short)

HTTPS = HTTP + TLS. TLS encrypts traffic, prevents tampering, and helps prove server identity using certificates.

> **Key takeaway:** Use HTTPS to protect data in transit and verify the server.

---

## What Is an API?

An API (Application Programming Interface) is a server that exposes data or actions, usually over HTTP and JSON. Clients (web, mobile, other servers) call APIs to read or change data.

Example: `GET /users/42` → server returns JSON about user 42.

---

## Common API Styles

- **REST:** resource-oriented, uses HTTP methods and status codes.
- **GraphQL:** client asks for precise fields.
- **RPC/gRPC:** call functions on a remote server.
- **WebSockets:** persistent two-way channels for real-time data.
- **Webhooks:** server-to-server callbacks for events.

Later chapters (7–14) go deeper into transport, DNS, TLS, API design, authentication, real-time methods, caching/CDNs, and deployment/security.

