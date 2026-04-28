# Mission: Firewall Rule Simulator

Simulate a tiny firewall that decides which connections are allowed or blocked.

## What your program should do

1. Define a class `FirewallRule`.
   - In `__init__(self, allowed_ip, allowed_port)`, store the values in `self.allowed_ip` and `self.allowed_port`.
   - Add a method `allows(self, ip, port)` that:
     - Returns `True` if **both** `ip` and `port` match this rule’s `allowed_ip` and `allowed_port`.
     - Returns `False` otherwise.

2. Define a class `Firewall`.
   - In `__init__(self)`, create `self.rules` as an empty list.
   - Add a method `add_rule(self, rule)` that appends a `FirewallRule` object to `self.rules`.
   - Add a method `check(self, ip, port)` that:
     - Loops over all rules in `self.rules`.
     - If **any** rule’s `allows(ip, port)` returns `True`, return the string `"ALLOW"`.
     - If no rules match, return the string `"BLOCK"`.

3. In your main code (at the bottom of the file):
   - Create a `Firewall` object.
   - Add at least **two** rules, for example:
     - allow `"10.0.0.5"` on port `22`.
     - allow `"192.168.1.100"` on port `80`.
   - Call `check` with at least **four** different `(ip, port)` combinations.
   - Print each `(ip, port)` tested and whether it is allowed or blocked.

## Stretch goals (optional)

Try these if you finish early:

- Add a `__str__(self)` method to `FirewallRule` that returns something like:
  - `"Rule: allow 10.0.0.5 on port 22"`.
- Add a method `list_rules(self)` on `Firewall` that prints all rules using their `__str__` output.
- Allow a special value `"ANY"` for `allowed_ip` or `allowed_port` that matches any IP or any port.

