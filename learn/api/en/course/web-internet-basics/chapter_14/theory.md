# Chapter 14: Deployment, Scaling, and Security Basics

By the end of this chapter, you’ll be able to:

- Understand basic deployment models for web services.
- Describe the role of load balancers and reverse proxies.
- List a few essential security practices for running web services.

---

## Deployment Models (Short)

- **Single server** — simple, good for small projects.
- **Containers** (Docker) — package apps with their environment.
- **Platform as a Service (PaaS)** — managed platforms that simplify deployment (e.g., Heroku-like services).

---

## Load Balancers and Reverse Proxies

A **load balancer** distributes incoming requests across multiple backend servers to increase capacity and reliability.

A **reverse proxy** (e.g., Nginx) sits in front of your app to serve static files, handle TLS, and forward requests to the backend.

---

## Basic Security Checklist

- Use **HTTPS** everywhere.
- Keep your software up to date.
- Use strong credentials and rotate keys.
- Limit administrative access and monitor logs.
- Back up important data regularly.

> Key takeaway: Deploy with an eye on reliability and security — simple patterns (reverse proxy + TLS + backups) go a long way.
