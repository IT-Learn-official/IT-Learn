# Chapter 11: Conditional Logic – Teaching Your Code to Decide

Welcome, hacker. Up to now, your scripts have mostly followed one fixed path: start at the top, run to the bottom, done. Useful, but kind of brainless.

In this chapter, you’ll give your programs an actual **brain**.

With **conditional logic** (`if / elif / else`), your code can:
- react to user input,
- behave differently when a login fails,
- show a different message depending on your exam score,
- decide if you can “enter” or “deny” like a real access system.

By the end of this chapter, you’ll be able to:

- Use **comparison operators** to ask `True`/`False` questions.
- Write `if` statements to run code only when a condition is met.
- Use `else` for the “otherwise” path.
- Chain multiple conditions with `elif`.
- Combine conditions with `and`, `or`, and `not` to build smart rules.

---

## 1. Conditions: Yes/No Questions for Your Code

A **condition** is any expression that can be answered with `True` or `False`.

Examples your code might ask:
- Is the firewall active?
- Is the exam score at least 10?
- Is the username equal to "admin"?
- Is the port greater than 1024?

In Python, conditions are just expressions that evaluate to a boolean.

```python
port = 22
is_open = True

print(port == 22)       # True
print(is_open == True)  # True
print(port > 1024)      # False
```

Later you’ll mostly skip `== True` and write `if is_open:` directly, but for now it’s fine to see what’s going on.

> Key takeaway: Conditions are just expressions that give you `True` or `False`.

---

## 2. Comparison Operators: Your Question Tools

These operators compare two values and return a boolean:

- `==`  : is equal to?
- `!=`  : is not equal to?
- `<`   : is less than?
- `>`   : is greater than?
- `<=`  : is less than or equal to?
- `>=`  : is greater than or equal to?

**Important trap:** Never confuse `=` with `==`.

- `x = 10` → **assignment**: put 10 into `x`.
- `x == 10` → **comparison**: is `x` equal to 10?

Using `=` inside an `if` is a classic beginner bug.

```python
score = 14

print(score >= 10)  # True, you passed (on 20)
print(score == 20)  # False
print(score != 0)   # True
```

> Key takeaway: `=` changes a variable; `==` checks a value.

---

## 3. The `if` Statement: Your First Gate

An `if` statement is like a security gate:
- if the condition is `True`, Python goes inside the gate and runs the code.
- if it’s `False`, it skips that block.

Indentation shows which lines belong to the `if`.

```python
is_admin = True

if is_admin == True:
    print("Administrative privileges granted.")
    print("Loading control panel…")

print("Program continues…")
```

If `is_admin` were `False`, you’d only see `Program continues…`.

> Key takeaway: `if condition:` runs an indented block only when the condition is `True`.

---

## 4. `if / else`: Two Possible Paths

`else` gives you a second path for when the `if` condition is **not** met.

```python
password_attempt = "12345"
correct_password = "pA$$w0rd_123"

if password_attempt == correct_password:
    print("Access Granted.")
else:
    print("Access Denied. Logging attempt.")
```

One of these blocks will **always** run. Either you’re in, or you’re not — there is no third option.

Let’s make it more school‑style:

```python
score = 9.5  # out of 20

if score >= 10:
    print("You passed, nice.")
else:
    print("Not passed. Next time we go harder.")
```

> Key takeaway: `if/else` handles “this or that” situations — two possible outcomes.

---

## 5. `elif`: More Than Two Options

Sometimes life has more than “yes” or “no”. Think of grade categories:
- 16+ → excellent,
- 12–15 → good,
- 10–11 → just passed,
- below 10 → fail.

`elif` (short for “else if”) lets you chain multiple options.

```python
score = 14

if score >= 16:
    print("Excellent, you’re smashing it.")
elif score >= 12:
    print("Good job, solid work.")
elif score >= 10:
    print("Barely passed, but passed.")
else:
    print("Didn’t pass. Time for a comeback.")
```

Python checks from top to bottom and executes **only the first** block whose condition is `True`.

A more hacker‑style example:

```python
privilege_level = "guest"

if privilege_level == "root":
    print("Full system access.")
elif privilege_level == "admin":
    print("Access to user management and system logs.")
elif privilege_level == "user":
    print("Standard user access.")
else:
    print("Unknown privilege level. Access restricted.")
```

> Key takeaway: Use `elif` when you have several different cases to handle, not just two.

---

## 6. Logical Operators: `and`, `or`, `not`

Real decisions often need **more than one** condition:

> “I can play if homework is done **and** it’s before 22:00.”

Python has three logical operators:

- `and` – all conditions must be `True`.
- `or`  – at least one condition must be `True`.
- `not` – flips `True` ↔ `False`.

### `and`: Everything Must Be True

```python
username = "admin"
ip_address = "127.0.0.1"

# Only allow admin from local machine
if username == "admin" and ip_address == "127.0.0.1":
    print("Welcome, administrator.")
```

If either part is `False`, the whole condition is `False`.

### `or`: At Least One Is Enough

```python
has_keycard = False
knows_password = True

# Door opens if you have the keycard OR know the password
if has_keycard or knows_password:
    print("Door unlocked.")
```

### `not`: Flip the Value

```python
is_logged_in = False

if not is_logged_in:
    print("Please log in to continue.")
```

Combine them for more complex rules:

```python
time = 21          # 21:00
homework_done = True
parents_home = False

can_play = homework_done and (time < 22 or not parents_home)
print(can_play)
```

Read it as:
- Homework must be done.
- AND (it’s before 22:00 OR parents are not home yet).

> Key takeaway: Logical operators combine simple checks into powerful rules.

---

## 7. Nested Conditions: Decisions Inside Decisions

You can put an `if` inside another `if`. This is called **nesting**.

```python
is_logged_in = True
user_role = "admin"

if is_logged_in:
    print("User is authenticated.")
    if user_role == "admin":
        print("Loading admin dashboard…")
    else:
        print("Loading user dashboard…")
else:
    print("Redirecting to login page…")
```

Nesting is powerful, but if you go too deep it becomes hard to read. Later, you’ll learn patterns to avoid “pyramids of doom”.

> Key takeaway: Nesting lets you express more complex logic, but don’t overdo it.

---

## 8. Common Mistakes With Conditionals

### 1. Using `=` Instead of `==`

```python
# Wrong (and will cause a SyntaxError):
# if score = 10:
#     print("Nice")

# Correct:
score = 10
if score == 10:
    print("Nice")
```

### 2. Comparing the Wrong Types

```python
age = "16"  # comes from input as text

# Bug:
# if age >= 16:  # comparing str to int
#     print("You can watch this movie.")

# Fix:
if int(age) >= 16:
    print("You can watch this movie.")
```

### 3. Over‑Verbose Booleans

```python
# Works, but noisy
if is_logged_in == True:
    ...

# Cleaner
if is_logged_in:
    ...

# Same idea for False
if not is_banned:
    ...
```

> Key takeaway: Most weird behaviour in conditionals comes from type issues or tiny symbol mistakes.

---

## Summary

- Conditions are `True`/`False` questions that your code uses to decide what to do.
- **Comparison operators** (`==`, `!=`, `<`, `>`, `<=`, `>=`) let you build those questions.
- `if` runs code only when a condition is `True`.
- `else` covers the “otherwise” path.
- `elif` lets you handle multiple specific cases.
- **Logical operators** (`and`, `or`, `not`) let you combine conditions into smart rules.

> Achievement Unlocked: Your programs can now **make decisions** — reacting to input, checking rules, and changing behaviour just like the logic behind games, apps, and login systems.
