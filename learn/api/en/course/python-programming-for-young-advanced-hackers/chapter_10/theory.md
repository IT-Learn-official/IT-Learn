# Chapter 10: Sets – No Duplicates, Fast Checks, Smart Comparisons

Welcome back, hacker. You’ve already used lists, tuples, and dictionaries to organise data. Now it’s time for a more specialised tool: the **set**.

A set is what you use when you care about:
- what values appear at least once,
- removing duplicates quickly,
- checking membership super fast,
- comparing two data sources.

Think: unique visitors, people who passed math **and** French, usernames that appear on two different platforms, IPs seen by two different scanners.

By the end of this chapter, you’ll be able to:

- Create and use **sets** to manage unique collections of data.
- Use set operations like **union**, **intersection**, and **difference** to compare data.
- Decide when a set is better than a list.
- Perform common data‑cleaning tasks like **deduplication**.

---

## 1. What Is a Set?

A **set** is an unordered collection of **unique** elements.

- No duplicates.
- No guaranteed order.
- No indexing (`my_set[0]` doesn’t exist).

You create a set with curly braces `{}` or by calling `set()`.

```python
# A set of unique IP addresses
discovered_ips = {"192.168.1.1", "10.0.0.5", "192.168.1.1"}
print(discovered_ips)  # {'10.0.0.5', '192.168.1.1'}  (duplicate is gone)

# Creating a set from a list to get unique elements
ports = [22, 80, 443, 80, 22]
unique_ports = set(ports)
print(unique_ports)  # {80, 22, 443}
```

Reality check examples:
- unique usernames in a Discord server,
- unique IPs that hit your school wifi,
- unique grades a teacher gave in one exam.

> Key takeaway: A set automatically removes duplicates and doesn’t care about order.

---

## 2. Modifying a Set

Sets are mutable: you can add and remove items, just not by index.

**Add one item:**

```python
vulnerabilities = {"SQL Injection", "XSS"}
vulnerabilities.add("Remote Code Execution")
print(vulnerabilities)
```

**Remove an item:**

- `.remove(item)` — crashes with `KeyError` if the item isn’t there.
- `.discard(item)` — safe; does nothing if the item isn’t there.

```python
# This will work
vulnerabilities.remove("XSS")

# This would crash if "Buffer Overflow" wasn’t in the set
# vulnerabilities.remove("Buffer Overflow")

# Safer: won’t crash even if the item isn’t present
vulnerabilities.discard("Buffer Overflow")
```

> Key takeaway: Use `.discard()` when you’re not 100% sure an item is in the set.

---

## 3. Set Operations: Comparing Data Like an Analyst

Now for the fun part. Sets can be combined with operators that look like math:
- `|` → union
- `&` → intersection
- `-` → difference

Imagine two vulnerability scanners ran on the same server:

```python
scanner_A_results = {"CVE-2021-44228", "CVE-2022-1388", "CVE-2020-1472"}
scanner_B_results = {"CVE-2022-1388", "CVE-2019-0708", "CVE-2020-1472"}
```

### Union (`|`): Everything Seen by Either

```python
all_vulnerabilities = scanner_A_results | scanner_B_results
# or: all_vulnerabilities = scanner_A_results.union(scanner_B_results)

print(all_vulnerabilities)
# {'CVE-2021-44228', 'CVE-2022-1388', 'CVE-2020-1472', 'CVE-2019-0708'}
```

### Intersection (`&`): What Both Agree On

```python
common_vulnerabilities = scanner_A_results & scanner_B_results
# or: scanner_A_results.intersection(scanner_B_results)

print(common_vulnerabilities)
# {'CVE-2022-1388', 'CVE-2020-1472'}
```

### Difference (`-`): What’s Only in One

```python
unique_to_A = scanner_A_results - scanner_B_results
print(unique_to_A)  # {'CVE-2021-44228'}
```

School‑style analogy with sets:
- `passed_math` and `passed_french` are sets of student names.
- Intersection = those who passed **both**.
- Difference = those who passed math but **not** French.

> Key takeaway: With union, intersection, and difference, sets become insanely good at comparing datasets.

---

## 4. When to Use a Set vs a List

**Use a list when:**
- order matters (`[first, second, third]`),
- duplicates are allowed or important,
- you need to index like `my_list[0]`.

**Use a set when:**
- you need items to be **unique**,
- you’re doing a lot of **membership checks** (`if x in my_set:`),
- you want to compare collections (union, intersection, difference),
- order doesn’t matter.

Reality examples for sets:
- all unique usernames that logged into a site today,
- all unique answers given in a quiz,
- all unique tags used in a note‑taking app.

> Key takeaway: If you find yourself deduping and checking “is X in here?” all the time, a set is probably the right tool.

---

## 5. Practical Data Ops With Sets

### Deduplication

The classic use: remove duplicates from a list.

```python
# A log file with repeated IPs
log_ips = ["10.0.0.5", "192.168.1.1", "10.0.0.5", "10.0.0.5", "192.168.1.2"]

unique_attackers = set(log_ips)
print(unique_attackers)  # {'192.168.1.1', '10.0.0.5', '192.168.1.2'}

# Need it as a list again?
unique_attackers_list = list(unique_attackers)
```

### Membership Testing

Checking if something is in a set is usually **faster** than in a list, especially when the collection is large.

```python
allowed_users = {"root", "admin", "guest"}
user_to_check = "intruder"

if user_to_check in allowed_users:
    print(f"User '{user_to_check}' is allowed.")
else:
    print(f"ALERT: Unauthorized user '{user_to_check}' detected!")
```

Same idea works for:
- banned words in a chat filter,
- banned usernames in a server,
- students who already submitted homework.

> Key takeaway: Sets shine when you need **unique data** and fast “is this here?” checks.

---

## Summary

- A **set** is an unordered collection of **unique** items.
- Create sets with `{}` or `set(iterable)`.
- Modify them with `.add()`, `.remove()`, and `.discard()`.
- Use set operations for comparisons:
  - `|` (union) → everything from both,
  - `&` (intersection) → only what’s in both,
  - `-` (difference) → what’s in the first but not the second.
- Choose sets over lists when you care about uniqueness, fast membership checks, and data comparisons more than order.

> Achievement Unlocked: You can now clean and compare datasets like a real analyst — from scanner outputs and log files to class lists and friend groups.
