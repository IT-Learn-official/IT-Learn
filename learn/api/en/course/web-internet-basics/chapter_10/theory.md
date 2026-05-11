# Chapter 10: RESTful APIs: Principles and Design

By the end of this chapter, you’ll be able to:

- Explain what REST is at a high level.
- Design simple resource-focused URLs and choose appropriate HTTP methods.
- Use status codes and JSON consistently in an API.

---

## REST in Two Lines

REST is an architectural style where servers expose **resources** (nouns) via URLs and clients manipulate them with standard HTTP methods (GET, POST, PUT, DELETE).

A well-designed API uses clear resource names and consistent behavior for methods and status codes.

---

## Methods and Idempotency

- **GET** — read data (safe and idempotent)
- **POST** — create a new resource (not necessarily idempotent)
- **PUT** — replace a resource (idempotent)
- **PATCH** — modify part of a resource (not necessarily idempotent)
- **DELETE** — remove a resource (idempotent)

Idempotent means you can repeat the same request and get the same result.

---

## Status Codes and JSON

Use status codes to communicate results. Common codes you'll use in REST APIs:

- `200 OK` — Request succeeded; response body contains the representation.
- `201 Created` — A new resource was created; include a `Location` header with its URL.
- `204 No Content` — Success with no response body (useful for DELETE/PUT responses).
- `301/302 Redirect` — Resource moved (less common for JSON APIs).
- `400 Bad Request` — The request is malformed or missing required fields.
- `401 Unauthorized` — Authentication required or failed (invalid/expired token).
- `403 Forbidden` — Authenticated but not allowed to perform this action.
- `404 Not Found` — The requested resource does not exist.
- `409 Conflict` — Request could not be completed due to a conflict (e.g., duplicate resource).
- `422 Unprocessable Entity` — Semantic validation failed (common for validation errors).
- `429 Too Many Requests` — Client is being rate limited.
- `500 Internal Server Error` — Generic server error; check logs and retry.
- `503 Service Unavailable` — Temporary overload or maintenance.

APIs usually send JSON; set the header `Content-Type: application/json` and return consistent error objects. Example error shape:

```
{
	"error": {
		"code": 422,
		"message": "Validation failed",
		"details": { "email": "Invalid format" }
	}
}
```

---

## A Tiny Example (curl)

```
curl -X GET "https://api.example.com/users/42" -H "Accept: application/json"
```

> Key takeaway: Design APIs around resources and use HTTP correctly — methods, status codes, and JSON matter.
