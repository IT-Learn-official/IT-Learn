# Chapter 9: TLS and HTTPS Internals

By the end of this chapter, you’ll be able to:

- Explain why HTTPS is more secure than HTTP.
- Describe the role of TLS and certificates in establishing trust.
- Recognize basic certificate concepts like expiration and the chain of trust.

---

## Why HTTPS?

HTTPS is HTTP over TLS (Transport Layer Security). TLS encrypts the data sent between your browser and a server so eavesdroppers on the same network cannot read it.

HTTPS also helps verify that you are talking to the intended server (not an impostor) using certificates.

---

## Basic TLS Handshake (High Level)

1. ClientHello — browser says which TLS versions and ciphers it supports.
2. ServerHello + Certificate — server picks settings and sends its certificate.
3. Certificate verification — the browser checks the certificate chain and expiry.
4. Key exchange — client and server agree on a short-lived symmetric key.
5. Encrypted HTTP — normal HTTP messages go over the encrypted channel.

You don’t need to remember every detail now — the important part is: TLS encrypts and the certificate proves identity.

---

## Certificates and Chain of Trust

A certificate is signed by a Certificate Authority (CA). Browsers ship with a list of trusted CAs. When a certificate is signed (directly or indirectly) by a trusted CA, the browser accepts it as valid.

Certificates can expire and can be revoked — expired or invalid certificates cause browser warnings.

> Key takeaway: HTTPS uses TLS to encrypt traffic and certificates to prove server identity. Always use HTTPS for sensitive data.
