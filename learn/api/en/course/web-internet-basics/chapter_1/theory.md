# Chapter 1: What the Web and the Internet Are (Simple)

This chapter gives a short, easy explanation of the internet, the web, and how your browser gets a page.

By the end of this chapter you will be able to:

- Say the difference between the internet and the web.
- Explain what an IP address and a domain name do.
- Describe how a browser finds and asks a server for a page.

---

## Internet vs Web — short and simple

- The Internet is the global network of devices connected to each other.
- The Web (the websites you visit) is one service that runs on the Internet.

Think: the Internet is the road system; the Web is one kind of vehicle that uses the roads.

---

## Clients and servers (who talks to who)

- Your browser or app is the client: it asks for pages or data.
- A server is a computer that waits for requests and sends back answers.

Example: you (client) open a page; the server sends the page files back.

---

## IP addresses and domain names

- Every device on the Internet has an IP address (a number like `93.184.216.34`).
- Domain names (like `example.com`) are easy names people remember.
- DNS is the system that turns a domain name into the right IP address.

---

## How a browser loads a page — simple steps

1. You type or click a domain name (for example `example.com`).
2. Your computer asks DNS for the IP address of that name.
3. The browser connects to that IP using HTTP or HTTPS.
4. The server sends files (HTML, CSS, JS) and the browser shows the page.

Quick try (see what the server returns):

```
curl -i https://example.com
```

---

## Key takeaway

The internet connects computers. The web is one service on the internet that uses domain names, DNS, IPs and HTTP so browsers and servers can talk. Try small experiments (like `curl`) to see it work.

