# Chapter 8: Working with Text – Hacking Chats, Usernames, and Messages

Welcome back, hacker. Numbers are great for scores and grades, but most of your digital life is **text**:

- Discord messages,
- Insta captions,
- Wi‑Fi passwords,
- school portal emails,
- logs from that sketchy app you installed.

In Python, all that lives as **strings**.

If you can control strings, you can clean user input, parse files, build simple chatbots, and make your programs talk to humans instead of just spitting numbers.

By the end of this chapter, you’ll be able to:

- Create and manage strings, the fundamental unit of text.
- Grab individual characters with **indexing**.
- Slice out pieces of text with **slicing**.
- Use powerful **string methods** like `.lower()`, `.upper()`, `.strip()`, `.replace()`, and `.split()`.
- Build clean, dynamic messages with **f‑strings**.

---

## 1. What Is a String?

A **string** (type `str`) is just text in Python — anything inside quotes.

```python
username = "GhostInTheMachine"
secret_code = "pA$$w0rd_123"
ip_address = "192.168.1.1"  # This is text, not a number
status = "Math test tomorrow… send help"
```

Strings can hold:
- letters,
- numbers,
- emojis,
- symbols,
- spaces.

Use either single (`'`) or double (`"`) quotes — just be consistent.

> Key takeaway: If it’s inside quotes, Python treats it as **one string**, even if it looks like a number.

---

## 2. Indexing: Grabbing a Single Character

A string is an ordered sequence of characters. Each character has a position, or **index**.

Indexing starts at **0**:

```
 String:  P  Y  T  H  O  N
 Index:   0  1  2  3  4  5
```

You can also count from the back using negative indices:

- `text[-1]` → last character
- `text[-2]` → second to last

```python
command = "EXECUTE"

print(command[0])    # E (first character)
print(command[3])    # C
print(command[-1])   # E (last)
```

This is how you:
- check the first letter of a username,
- look for a specific character in a password,
- quickly inspect what’s inside a string.

**Important:** Strings are **immutable**. You can’t change a character in place — you must build a **new** string.

> Key takeaway: Use `text[index]` to grab one character; `0` is the first.

---

## 3. Slicing: Cutting Out Substrings

If indexing is like picking one letter, **slicing** is like cutting out a whole word.

Syntax: `text[start:end]`

- `start` → where to begin (inclusive)
- `end`   → where to stop (exclusive)

```python
data_packet = "ID:user_42|payload:data"

# Get the user part
user_id = data_packet[3:11]
print(user_id)  # "user_42"

# Get the payload
payload = data_packet[19:]  # from index 19 to the end
print(payload)  # "data"

# Get the packet type
packet_type = data_packet[:2]  # from start to index 2 (excluded)
print(packet_type)  # "ID"
```

More realistic examples:

```python
discord_tag = "nickname#1234"
name = discord_tag.split("#")[0]  # or discord_tag[:discord_tag.index("#")]
print(name)  # "nickname"
```

> Key takeaway: Slicing lets you carve out pieces of strings using `[start:end]`.

---

## 4. String Methods: Your Text‑Cleaning Toolkit

Strings come with built‑in **methods** (functions attached to the string) that make your life way easier.

You call them with a dot: `text.method()`.

### `.lower()` and `.upper()`: Case Control

Perfect when you don’t care about capitals (e.g. commands, usernames).

```python
user_input = "Yes"

if user_input.lower() == "yes":
    print("Access granted.")
```

```python
shout = "don’t forget your usb"
print(shout.upper())  # DON'T FORGET YOUR USB
```

### `.strip()`: Removing Extra Spaces

Users (and you) love to add random spaces. `.strip()` removes them from the start and end.

```python
raw_username = "   admin   "
clean_username = raw_username.strip()
print(f"'{raw_username}' -> '{clean_username}'")
# '   admin   ' -> 'admin'
```

Useful when reading input from forms, files, or terminals.

### `.replace(old, new)`: Find & Replace

Replace every occurrence of a substring.

```python
log_entry = "ERROR: User 'guest' failed to log in."

sanitized_log = log_entry.replace("guest", "[REDACTED]")
print(sanitized_log)
# ERROR: User '[REDACTED]' failed to log in.
```

Could also be used to:
- censor bad words,
- anonymise names in datasets,
- quickly tweak messages.

### `.split(separator)`: Breaking Text into Pieces

`.split()` takes a string and returns a **list of strings**.

```python
target_list = "127.0.0.1,192.168.1.1,10.0.0.1"

ip_addresses = target_list.split(",")
print(ip_addresses)
# ['127.0.0.1', '192.168.1.1', '10.0.0.1']
```

Another example with school subjects:

```python
subjects = "math,fr,eng,cs"
subject_list = subjects.split(",")
print(subject_list)
# ['math', 'fr', 'eng', 'cs']
```

> Key takeaway: String methods let you clean, standardise, and break apart text without writing huge amounts of code.

---

## 5. F‑Strings: Clean, Modern String Formatting

Building strings with `+` gets messy fast:

```python
# Old way (ugh):
# message = "User " + username + " has score " + str(score)
```

**F‑strings** (`f"..."`) let you plug variables directly into a string, cleanly and safely.

```python
username = "Cipher"
level = 12
ip = "127.0.0.1"

message = f"User {username} (Level {level}) connected from {ip}"
print(message)
# User Cipher (Level 12) connected from 127.0.0.1
```

You can even do simple expressions inside `{}`:

```python
score = 17
max_score = 20

print(f"You scored {score}/{max_score} ({score / max_score * 100:.1f}%)")
```

Here, `:.1f` means “round this float to 1 decimal place”.

> Key takeaway: f‑strings are the standard way to create readable, dynamic strings in modern Python.

---

## Summary

- **Strings (`str`)** hold all text data: usernames, messages, passwords, logs.
- **Indexing `[i]`** grabs a single character; indexing starts at 0.
- **Slicing `[start:end]`** extracts parts of a string.
- **String methods** help you manipulate text:
  - `.lower()` / `.upper()` – ignore capitalisation.
  - `.strip()` – clean extra spaces.
  - `.replace()` – swap one piece of text for another.
  - `.split()` – turn text into a list.
- **F‑strings** (`f"..."`) let you mix variables and text cleanly and are what you should use by default.

> Achievement Unlocked: You can now read, clean, and build strings like a pro — from Discord‑style messages to log files and school projects.
