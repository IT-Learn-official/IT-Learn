# Chapter 3: IP Addresses and DNS (Finding the Right Computer)

Computers use IP addresses; humans use domain names. DNS bridges the gap so browsers can find servers.

By the end of this chapter, you’ll be able to:

- Explain what an **IP address** is.
- Describe why DNS is needed.
- Summarize the basic name → address → connect flow.

---

## What Is an IP Address?

An **IP address** identifies a device on a network so data can be routed to it.

- **IPv4:** `192.168.1.20`
- **IPv6:** `2001:db8::1`

Devices often have a private IP on a local network and a public IP on the internet.

> **Key takeaway:** IP addresses let routers deliver packets to the correct device.

---

## Why DNS Exists

DNS is the internet’s phone book: it maps human-friendly names (like `example.com`) to IP addresses so browsers can connect.

---

## Basic Flow

1. Browser sees `example.com`.
2. Browser asks DNS for the IP address.
3. Browser connects to the IP and sends an HTTP request.

Later chapters go deeper into DNS internals.

