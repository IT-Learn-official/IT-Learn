# Chapter 13: Caching, CDNs, and Performance

By the end of this chapter, you’ll be able to:

- Explain why caching improves performance.
- Recognize common caching headers like `Cache-Control` and `ETag`.
- Describe what a CDN (Content Delivery Network) does.

---

## Why Cache?

Caching stores copies of responses so clients or intermediary servers can reuse them instead of fetching the data again. This reduces latency and server load.

---

## Common Headers

- `Cache-Control: max-age=3600` — allow caching for one hour.
- `ETag` — a fingerprint that identifies a specific version of a resource. Clients can use it to check if content changed.
- `Last-Modified` — a timestamp of when the resource last changed.

Use these headers to make caching predictable and safe.

---

## CDNs (Content Delivery Networks)

A CDN stores copies of static assets (images, CSS, JS) on servers around the world. When a user requests an asset, the CDN serves it from a nearby location, reducing latency.

Benefits: faster loads, reduced origin traffic, higher availability.

> Key takeaway: Caching and CDNs are essential tools to make websites fast and reliable.
