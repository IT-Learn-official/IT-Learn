# Chapter 12: Loops and Automation – Making Python Grind For You

Welcome, hacker. You’ve taught your programs how to **think** with `if/else`. Now it’s time to make them **grind**.

Loops are how you tell Python:
- “Do this 10 times.”
- “Do this for every target in the list.”
- “Keep going until we’re done.”

Instead of copy‑pasting the same code 100 times, you write it **once** and let Python repeat it for you. This is how you:
- scan whole networks,
- brute‑force passwords (ethically — in a lab),
- process huge log files,
- go through all your exam results.

By the end of this chapter, you’ll be able to:

- Use `for` loops to automate repetitive tasks.
- Generate number sequences with `range()` to control loops.
- Iterate over any collection (lists, strings, etc.).
- Use `while` loops when you don’t know in advance how many repeats you need.
- Use common loop patterns for counting, searching, and filtering data.
- Control loops with `break` and `continue`.

---

## 1. What Is a Loop?

A **loop** is a structure that repeats a block of code as long as a rule says “go”.

Without loops:
- If you wanted to ping 100 servers, you’d write 100 lines.

With loops:
- You write the ping code once,
- tell Python “do this 100 times”,
- and go grab a snack.

It’s the difference between doing all your maths homework manually and letting a calculator repeat the same type of problem instantly.

> Key takeaway: Loops are how you make Python do the boring repetitive work for you.

---

## 2. The `for` Loop: “For Each Item in This Collection…”

A `for` loop is used when you **know the collection** you want to go through — like a list of IPs, usernames, or numbers.

### Looping with `range()`

`range()` generates a sequence of numbers, perfect when you just need “do this N times”.

```python
# range(5) generates numbers from 0 up to (but not including) 5
for i in range(5):
    print(f"Executing task #{i}")
```

Output:

```
Executing task #0
Executing task #1
Executing task #2
Executing task #3
Executing task #4
```

You can also specify start, stop, and step: `range(start, stop, step)`.

```python
# Scan ports from 80 to 85
for port in range(80, 86):
    print(f"Scanning port {port}…")
```

### Looping Over Collections

The real power of `for` loops is going through **lists, strings, and other iterables**.

**Looping over a list of targets:**

```python
targets = ["192.168.1.1", "10.0.0.5", "scanme.nmap.org"]

for target in targets:
    print(f"Pinging {target}…")
```

**Looping over a string:**

```python
password = "pA$$w0rd"

for character in password:
    print(f"Analyzing character: {character}")
```

> Key takeaway: `for` loops shine when you have a clear set of items to process one by one.

---

## 3. The `while` Loop: “Keep Going While This Is True”

A `while` loop is for situations where you **don’t know** how many times something will repeat, but you **do** know the rule for when to stop.

Think: “I’ll scroll TikTok **while** I’m not tired yet”… and suddenly it’s 2 a.m.

```python
attempts = 0
max_attempts = 5

while attempts < max_attempts:
    print(f"Attempt #{attempts + 1}: Trying password…")
    # In a real attack, you’d try a password here
    attempts += 1  # CRITICAL: update the counter!

print("Max attempts reached.")
```

**DANGER:** If you forget to update the variable in your condition (like `attempts += 1`), the condition never becomes `False`, and your loop runs **forever**.

That’s called an **infinite loop**, and you’ll need to kill the program manually.

> Key takeaway: Use `while` when you know the stop condition, not the exact number of repetitions.

---

## 4. `for` vs `while`: Which One to Use?

- Use a **`for` loop** when:
  - you know how many times to repeat, or
  - you have a clear list/collection to iterate.
  - Examples: “for each target in this list”, “for each number from 1 to 100”.

- Use a **`while` loop** when:
  - the number of repetitions depends on the situation,
  - you keep going until a condition changes.
  - Examples: “while the connection is active”, “while the user hasn’t entered a valid value yet”.

They can sometimes both solve the same problem — choose the one that makes the logic clearer.

---

## 5. Controlling Your Loops: `break` and `continue`

Sometimes the default loop flow isn’t enough.

### `break`: Emergency Exit

`break` immediately stops the loop — even if the condition says it could continue.

```python
# A simple password checker
passwords_to_try = ["12345", "password", "qwerty", "pA$$w0rd"]
correct_password = "pA$$w0rd"

for password in passwords_to_try:
    print(f"Trying: {password}")
    if password == correct_password:
        print("Password found!")
        break  # Exit the loop, mission accomplished
```

### `continue`: Skip to the Next Round

`continue` skips the rest of the current loop body and jumps to the **next** iteration.

```python
# Only process .txt files
files = ["image.jpg", "report.txt", "data.json", "notes.txt"]

for file in files:
    if not file.endswith(".txt"):
        continue  # Skip non-text files

    print(f"Processing text file: {file}")
```

> Key takeaway: Use `break` to stop early; use `continue` to skip just one iteration.

---

## 6. Common Loop Patterns

Once you know the basics, you’ll see the same patterns everywhere.

### 6.1 Counter / Accumulator

You start at 0 and add as you go.

```python
# Count open ports
open_ports = [22, 80, 443, 8080]
count = 0

for port in open_ports:
    count += 1

print(f"Found {count} open ports.")
```

You can also accumulate sums, averages, etc.

### 6.2 Search Pattern

You look for something specific and mark it as found.

```python
users = ["root", "admin", "guest"]
user_to_find = "hacker"
found = False

for user in users:
    if user == user_to_find:
        found = True
        break

if found:
    print(f"User '{user_to_find}' exists on the system.")
else:
    print(f"User '{user_to_find}' not found.")
```

### 6.3 Filtering

Build a new list that only keeps items that match a condition.

```python
ports = [21, 22, 80, 443, 1337, 8080]
secure_ports = []

for port in ports:
    if port in [80, 443]:
        secure_ports.append(port)

print(secure_ports)  # [80, 443]
```

Later, you’ll learn even shorter ways (like list comprehensions), but this pattern is the base.

> Key takeaway: Counting, searching, and filtering are three loop “templates” you’ll reuse constantly.

---

## Summary

- **Loops** let your code repeat work instead of you.
- **`for` loops** iterate over a known sequence (`range`, lists, strings, etc.).
- **`while` loops** run as long as a condition is `True`.
- **`break`** exits a loop early.
- **`continue`** skips the rest of the current iteration and jumps to the next.
- Classic patterns: counters, searches, and filters.

> Achievement Unlocked: You can now make Python do repetitive work for you — from scanning targets and processing logs to analysing scores and filtering data.
