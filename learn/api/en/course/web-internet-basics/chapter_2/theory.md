# Chapter 2: URLs (The Address System of the Web)

A URL is a structured address that tells a browser where to go and what to request.

By the end of this chapter, you’ll be able to:

- Break a URL into protocol, host, path, query, and fragment.
- Explain what query parameters do.
- Describe what a domain name is.

---

## What Is a URL?

URL = Uniform Resource Locator. It includes the protocol (how to talk), the host (which server), the path (which resource), optional query parameters, and an optional fragment.

Example:

```
https://api.example.com/users?limit=10#top
```

- `https` → protocol
- `api.example.com` → host
- `/users` → path
- `?limit=10` → query
- `#top` → fragment

> **Key takeaway:** A URL is a precise address with parts the browser uses to find and request a resource.

---

## Query Parameters

Query parameters are `key=value` pairs after `?`, used for filters, paging, and options.

Example: `/search?q=cats&page=2`

---

## Domain Names

Domain names (like `example.com`) are human-friendly labels that DNS translates to IP addresses. Chapters on DNS explain this in detail.

