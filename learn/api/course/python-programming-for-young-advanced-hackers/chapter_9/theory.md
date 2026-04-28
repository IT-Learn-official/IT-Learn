# Chapter 9: Data Structures – Lists, Tuples, and Dictionaries in Real Life

Welcome back, hacker. Up to now you’ve mostly worked with **one** thing at a time:
- one username,
- one IP address,
- one password.

But your actual digital life is not “one thing” — it’s:
- a whole friends list,
- a bunch of exam scores,
- multiple game accounts,
- tons of targets.

In this chapter, you’ll learn Python’s core **data structures** for handling **collections** of stuff like that:

- **Lists**: Your flexible, ordered to‑do list / inventory.
- **Tuples**: Your locked‑in coordinates and settings.
- **Dictionaries**: Your mini database of key → value info.

---

## 1. Lists: Your Hacker Inventory (and Friends List)

A **list** is an ordered, changeable collection of items, enclosed in square brackets `[]`.

Think of a list as:
- your game inventory,
- your Spotify playlist,
- a list of upcoming tests.

```python
tools = ["nmap", "metasploit", "wireshark"]
targets = ["192.168.1.1", "10.0.0.5", "scanme.nmap.org"]
```

You access items by their index (starting from 0):

```python
print(tools[0])    # "nmap"
print(targets[-1]) # "scanme.nmap.org" (last item)
```

### Modifying a List

Lists are **mutable** — you can update them as your mission (or school year) changes.

**Update an item:**

```python
# You upgraded your toolkit
tools[1] = "metasploit-framework"
```

**Add an item to the end:**

```python
tools.append("john-the-ripper")
```

**Remove the last item:**

```python
last_tool = tools.pop()
print(f"Removed {last_tool} from inventory.")
```

**Remove a specific item by value:**

```python
tools.remove("nmap")
```

Lists are perfect anytime you have a changing collection where **order matters**.

> Key takeaway: A list is an ordered, changeable collection — like a game inventory or a queue of tasks.

---

## 2. Looping Through Lists

To do something with **every** item in a list, you use a `for` loop.

```python
for target in targets:
    print(f"Initiating scan on: {target}")
```

You’ll use this pattern all the time:
- going through all exam scores,
- checking all IP addresses,
- sending a message to each user in a list.

> Key takeaway: `for item in list:` lets you process every element cleanly.

---

## 3. Tuples: Locked‑Down Data You Don’t Change

A **tuple** is like a list, **but frozen**. Once you create it, you can’t modify it.

Tuples use parentheses `()`:

```python
# An (x, y, z) coordinate in 3D space
target_coords = (105.3, 80.1, 20.0)

# RGB colour code
red = (255, 0, 0)
```

You access items by index just like a list:

```python
print(target_coords[0])  # 105.3
```

But if you try to change a value:

```python
# This will crash with a TypeError
# target_coords[0] = 99.9
```

Where do tuples make sense?
- fixed settings like a screen resolution `(1920, 1080)",
- exam date `(year, month, day)",
- coordinates that shouldn’t change during a calculation.

They’re also a signal to future‑you: “this data is **not meant to change**.”

> Key takeaway: Tuples are ordered like lists, but immutable — great for fixed settings or coordinates.

---

## 4. Dictionaries: Your Key → Value Database

A **dictionary** (`dict`) is an unordered collection of **key–value pairs**.

Think of it like a contact list on your phone:
- you look up by **name** (the key),
- you get the **number** (the value).

Dictionaries use curly braces `{}`:

```python
# A profile of a target system
system_profile = {
    "ip": "192.168.1.100",
    "os": "Linux",
    "open_ports": [22, 80, 443],
    "vulnerable": True
}
```

Access values by their key:

```python
print(system_profile["ip"])         # "192.168.1.100"
print(system_profile["open_ports"]) # [22, 80, 443]
```

You’re no longer stuck with “position 0, 1, 2…” — you use meaningful names.

### Modifying a Dictionary

Dictionaries are **mutable** too. You can change or add information.

```python
# Update the OS
system_profile["os"] = "Ubuntu 22.04"

# Add a new intel field
system_profile["hostname"] = "web-server-01"

print(system_profile)
```

Real‑life examples for students:

```python
student = {
    "name": "Amira",
    "class": "4IT",
    "average": 14.8,
    "favourite_game": "Minecraft"
}
```

> Key takeaway: A dictionary stores labelled data: you look things up by key, not by index.

---

## 5. Looping Through Dictionaries

You often want to go through all key–value pairs.

**Looping through keys:**

```python
for key in system_profile:
    print(f"Intel key: {key} -> {system_profile[key]}")
```

**Looping through items (key and value):**

```python
for key, value in system_profile.items():
    print(f"{key}: {value}")
```

This pattern is super common when:
- showing all data in a profile,
- generating a report from a config,
- inspecting JSON‑like data.

> Key takeaway: Use `.items()` when you want both the key and value in a clean loop.

---

## 6. Choosing the Right Data Structure

So which one do you use when? Quick cheat sheet:

- **List `[]`**
  - Ordered.
  - Changeable (add/remove/update).
  - Use when order matters and you mostly care about “the items themselves”.
  - Examples: friends list, upcoming exams, IPs to scan.

- **Tuple `()`**
  - Ordered.
  - **Not** changeable.
  - Use for small, fixed groups of values that belong together.
  - Examples: `(x, y)` coordinates, `(year, month, day)`, `(R, G, B)` colours.

- **Dictionary `{}`**
  - Unordered (in theory; in practice Python keeps insertion order, but don’t rely on it for logic).
  - Changeable.
  - Look up values by meaningful **keys**.
  - Examples: user profile, system configuration, settings.

### Combining Them (Where It Gets Fun)

Real programs usually **mix** these structures.

```python
# A list of student profiles
students = [
    {"name": "Amira", "class": "4IT", "average": 14.8},
    {"name": "Noah", "class": "5WE", "average": 11.3},
]

# Get the class of the first student
print(students[0]["class"])  # 4IT

# Loop through all students
for student in students:
    print(f"{student['name']} from {student['class']} has an average of {student['average']}")
```

This “list of dictionaries” pattern is everywhere: from web APIs to game save files.

> Key takeaway: Lists, tuples, and dictionaries combine to model almost any real‑world data you want to hack on.

---

## Summary

- **Lists `[]`**: ordered and mutable — great for inventories, queues, and anything that changes.
- **Tuples `()`**: ordered and immutable — great for coordinates and fixed settings.
- **Dictionaries `{}`**: key → value maps — great for profiles, configs, and labelled data.
- You can nest these structures (lists of dicts, dicts with list values, etc.) to represent complex information.

> Achievement Unlocked: You can now organise data in Python like a pro — from class results and game stats to target profiles and configuration files.
