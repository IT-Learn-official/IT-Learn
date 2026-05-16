# Chapter 11: Authentication & Authorization for APIs

By the end of this chapter, you’ll be able to:

- Explain the difference between authentication (who you are) and authorization (what you can do).
- Recognize common API authentication methods: sessions/cookies, API keys, and tokens (JWT).
- Have a high-level idea of OAuth2 purpose.

---

## Auth vs Authorization

- **Authentication** — proving your identity (e.g., logging in).
- **Authorization** — checking whether an identity can perform an action (e.g., can this user delete a file?).

Both are important for secure APIs.

---

## Common Methods

- **Sessions + Cookies**: server stores a session; browser keeps a cookie referencing it. Works well for web apps.
- **API Keys**: a static key sent with requests. Simple but should be kept secret.
- **Bearer tokens / JWT**: the token is sent in the `Authorization: Bearer <token>` header. JWTs contain a compact payload and a signature.

**Note:** Always send sensitive tokens over HTTPS and keep them out of public code.

---

## OAuth2 (Very Short)

OAuth2 is a framework for granting limited access to a user’s resources without sharing passwords (e.g., "Log in with Google"). It defines flows like the authorization code flow for apps that act on behalf of users.

> Key takeaway: Choose the right method for your app, store secrets safely, and always use HTTPS for authentication.
