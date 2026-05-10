# Chapter 5: HTTP (How Browsers and Servers Talk)

HTTP is the protocol that defines how clients and servers exchange requests and responses.

By the end of this chapter, you’ll be able to:

- Describe what HTTP is.
- Name common methods like GET and POST.
- Explain status codes, headers, and bodies.

---

## What Is HTTP?

HTTP = HyperText Transfer Protocol. It structures web communication as requests (from clients) and responses (from servers).

---

## Common Methods

- **GET** — read data (safe/idempotent)
- **POST** — create/send data
- **PUT** — replace a resource (idempotent)
- **PATCH** — partially update a resource
- **DELETE** — remove a resource

Clicking a link typically triggers a GET request.

---

## Status Codes

- `200` — OK
- `201` — Created
- `400` — Bad Request
- `401` — Unauthorized
- `403` — Forbidden
- `404` — Not Found
- `500` — Server Error

The first digit groups responses: `2xx` success, `4xx` client error, `5xx` server error.

---

## Headers and Body

Requests and responses include headers (metadata) and an optional body (HTML, JSON, files).

> **Key takeaway:** HTTP is a request/response protocol built from methods, status codes, headers, and bodies.

