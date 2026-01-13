# Chapter 14: Advanced Data Ops – Comprehensions, Map, Filter, and Zip

Welcome, hacker. You’ve learned how to loop like a champ, but writing full `for` loops for every tiny thing can start to feel like doing extra homework.

Python has some **pro‑level shortcuts** for working with data:
- build new lists in one line,
- filter values without writing long loops,
- process two lists in parallel like they’re zipped together.

These are the tools you’ll see in “real” codebases and open‑source projects — they look fancy at first, but they’re just compact versions of things you already know.

You will master:

- **Comprehensions**: the clean, readable one‑liners for building lists, sets, and dictionaries.
- **`map()` and `filter()`**: functional tools for transforming and selecting data.
- **`lambda`**: tiny, anonymous functions for quick jobs.
- **`zip()`**: processing multiple data streams side by side.

---

## 1. From Loops to Comprehensions: Same Logic, Less Noise

Say you have a list of hostnames and want a new list in UPPERCASE.

Normal loop:

```python
hostnames = ["server-a", "server-b", "workstation-c"]
upper_hostnames = []

for host in hostnames:
    upper_hostnames.append(host.upper())

print(upper_hostnames)  # ['SERVER-A', 'SERVER-B', 'WORKSTATION-C']
```

Pythonic version with a **list comprehension**:

```python
hostnames = ["server-a", "server-b", "workstation-c"]
upper_hostnames = [host.upper() for host in hostnames]
print(upper_hostnames)
```

Same result, less boilerplate. It reads almost like English: 
> “`host.upper()` for each `host` in `hostnames`.”

> Key takeaway: Comprehensions are just compact loops for building new collections.

---

## 2. List Comprehensions: The Basic Pattern

The generic pattern:

```python
[expression for item in iterable]
```

- `expression` – what to do with each item.
- `item` – your loop variable.
- `iterable` – the thing you’re looping over.

Example: length of each password in a list.

```python
passwords = ["12345", "qwerty", "pA$$w0rd"]
lengths = [len(p) for p in passwords]
print(lengths)  # [5, 6, 8]
```

### Adding a Condition: Filter While You Build

You can also filter with an `if` at the end:

```python
# From a list of ports, keep only well-known ports (< 1024)
all_ports = [22, 80, 8080, 443, 1337, 21]
well_known_ports = [port for port in all_ports if port < 1024]
print(well_known_ports)  # [22, 80, 443, 21]
```

This is a shorter version of:

```python
well_known_ports = []
for port in all_ports:
    if port < 1024:
        well_known_ports.append(port)
```

> Key takeaway: `[expression for item in iterable if condition]` = loop + filter + build, all in one.

---

## 3. Set and Dictionary Comprehensions

The same idea works with sets and dictionaries.

### Set Comprehensions `{...}`

Use a **set comprehension** when you care about **unique** results.

```python
# Unique file extensions
files = ["exploit.py", "notes.txt", "image.jpg", "report.txt"]
extensions = {file.split('.')[-1] for file in files}
print(extensions)  # {'py', 'txt', 'jpg'}
```

### Dictionary Comprehensions `{key: value}`

Use a **dictionary comprehension** to create key → value maps fast.

```python
users = ["root", "admin", "guest"]
user_lengths = {user: len(user) for user in users}
print(user_lengths)  # {'root': 4, 'admin': 5, 'guest': 5}
```

> Key takeaway: Just swap `[]` for `{}` and use `key: value` when building dictionaries.

---

## 4. `map()` and `filter()`: The Functional Style

Before comprehensions became popular, Python used `map()` and `filter()` for the same kinds of jobs. You’ll still see them in older code or from devs who like functional programming.

### `map(function, iterable)` – Transform Every Item

`map()` applies a function to each item.

```python
ports_str = ["22", "80", "443"]
ports_int = list(map(int, ports_str))
print(ports_int)  # [22, 80, 443]
```

The comprehension version would be:

```python
ports_int = [int(p) for p in ports_str]
```

### `filter(function, iterable)` – Keep Only What Passes

`filter()` keeps only the items where the function returns `True`.

```python
def is_privileged_port(port):
    return port < 1024

ports = [22, 8080, 443, 1337]
privileged = list(filter(is_privileged_port, ports))
print(privileged)  # [22, 443]
```

Comprehension version:

```python
privileged = [p for p in ports if is_privileged_port(p)]
```

> Key takeaway: `map`/`filter` and comprehensions usually do the same thing — comprehensions are often more readable.

---

## 5. `lambda`: Tiny Anonymous Functions

Sometimes you need a super small function, just once. 
Instead of writing:

```python
def double(x):
    return x * 2
```

you can use a `lambda` — a tiny, anonymous function:

```python
numbers = [1, 2, 3, 4]
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)  # [2, 4, 6, 8]
```

The comprehension version is still cleaner most of the time:

```python
doubled = [x * 2 for x in numbers]
```

So when should you use `lambda`?
- quick throwaway logic,
- when some library expects “a function” and you don’t want to name it.

> Key takeaway: `lambda` = function without a name, best used for tiny one‑liners.

---

## 6. `zip()`: Walking Through Lists in Parallel

`zip()` lets you loop over multiple lists at the same time, pairing their items together.

```python
usernames = ["root", "admin", "guest"]
uids = [0, 1000, 1001]

for user, uid in zip(usernames, uids):
    print(f"User '{user}' has UID {uid}")
```

Output:

```
User 'root' has UID 0
User 'admin' has UID 1000
User 'guest' has UID 1001
```

`zip()` stops when the **shortest** list runs out.

You can also use `zip()` to build dictionaries quickly:

```python
user_uid_map = dict(zip(usernames, uids))
print(user_uid_map)  # {'root': 0, 'admin': 1000, 'guest': 1001}
```

Think of `zip()` like pairing two columns from a table — usernames in one column, UIDs in the other.

> Key takeaway: `zip()` is for synchronised walking over multiple lists.

---

## Summary

- **Comprehensions** (`[x for x in data if condition]`) are the modern, clean way to build lists, sets, and dicts from existing data.
- **`map()`** applies a function to every item; **`filter()`** keeps only items that pass a test.
- **`lambda`** creates tiny one‑line functions without a name — good for quick, simple logic.
- **`zip()`** lets you iterate over multiple lists in parallel and is great for building look‑up dictionaries.

> Achievement Unlocked: You can now write data‑processing code that’s not just correct, but **clean and professional** — like the stuff you’ll see in real projects and open‑source tools.
