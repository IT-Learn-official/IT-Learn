# Chapter 4: Data Types and Type Conversion – Teaching Python to Think Like You

Welcome back, hacker. You’ve already thrown numbers and text at Python, and it somehow didn’t explode. Now we’re going to make sure it actually **understands** what you give it.

For Python, there’s a huge difference between:
- `15` as a **number** (your math grade out of 20), and
- `"15"` as **text** (maybe part of your Wi‑Fi password).

If you mix those up, your code crashes harder than your phone when you open ten apps during exams.

By the end of this chapter, you’ll be able to:

- Recognise Python’s core data types: `int`, `float`, `str`, and `bool`.
- Use **literals** like `42`, `3.14`, `"password123"`, and `True`.
- Use `type()` to “scan” any value and see what Python thinks it is.
- Explain when Python converts types automatically (and when it absolutely refuses).
- Use `str()`, `int()`, `float()`, and `bool()` to safely convert between types without breaking your code.

---

## 1. Why Data Types Matter: Labels in Python’s Brain

Think of your computer’s memory like your school backpack. You might yeet everything in there, but **you** still know what’s what:

- math book,
- laptop,
- lunch,
- that test you still haven’t shown your parents.

Python does the same thing with **data types**. Every value has a label in Python’s brain:

- **Number** – for calculations (averages, scores, damage, etc.).
- **Text** – for usernames, chat messages, passwords.
- **True/False flag** – for simple yes/no decisions.

If Python doesn’t know *what kind* of value it’s dealing with, it has no idea what operations are allowed. You can’t do maths on a Snapchat username, and you can’t log in with the number `1234` if the website expects the **string** `"1234"`.

> Key takeaway: A data type tells Python **what** a value is, so it knows **what you’re allowed to do** with it.

---

## 2. Integers (`int`) and Floats (`float`)

You’ve seen numbers already, but now we get precise.

### Integers (`int`)

**Integers** are whole numbers. No commas, no dots, just clean counts:

```python
0
42
-100
99999
```

These are **integer literals** — numbers literally written in your code. Their type is `int`:

```python
print(type(100))  # <class 'int'>
```

Use `int` for things like:
- score in EA FC or Fortnite,
- number of missed calls,
- your grade out of 20.

### Floats (`float`)

**Floats** are numbers with a decimal point. They’re for precision:

```python
3.14
-0.5
99.9
10.0
```

These are **float literals**. Their type is `float`:

```python
print(type(99.9))  # <class 'float'>
```

Use `float` for:
- percentages (`87.5`% on a test),
- distances (`2.75` km to school),
- precise health bars (`72.5` HP).

> Key takeaway: Use `int` for counting whole things, and `float` when you need decimals and precision.

---

## 3. Strings (`str`): The Language of Chats and Passwords

A **string** is any sequence of text. In Python, you create strings by wrapping text in quotes.

```python
"Hello, world"
'password123'
"42"      # This is text, not a number!
""        # An empty string
"nick#1234"  # Could be a Discord tag
```

These are **string literals**. Their type is `str`:

```python
print(type("Hello"))  # <class 'str'>
print(type("42"))     # <class 'str'>
```

You can join strings together (called **concatenation**):

```python
username = "hacker_" + "be"
print(username)  # hacker_be
```

Python treats *anything* in quotes as text:

- `"15"` — maybe your age as text.
- `15` — the number fifteen.

They **look** similar to you, but Python refuses to treat them the same.

> Key takeaway: If it’s in quotes, it’s a `str`. Even if it looks like a number, Python sees it as text.

---

## 4. Booleans (`bool`): True/False Switches

A **boolean** is the simplest data type. It’s literally just:

- `True`
- `False`

(With capital letters — Python is picky.)

Booleans are perfect for simple on/off, yes/no decisions:

```python
is_logged_in = True
has_homework_done = False
print(type(is_logged_in))  # <class 'bool'>
```

Later, you’ll see that comparisons like `score >= 10` produce booleans too.

Examples from daily life:
- `wifi_on = True`
- `is_exam_week = False`
- `has_enough_sleep = False`

> Key takeaway: Booleans are tiny flags — either `True` or `False` — that drive decision-making in your code.

---

## 5. `type()`: Your Data Scanner

`type()` is like pointing a scanner at a value to ask Python: *“What do you think this is?”*

```python
print(type(10))       # <class 'int'>
print(type(10.5))     # <class 'float'>
print(type("10"))     # <class 'str'>
print(type(False))    # <class 'bool'>
```

When your code throws weird errors, this is your first debugging move:

```python
# Buggy code
user_input = "18"
# print("Next year you will be: " + user_input + 1)  # This will crash!

# Debugging
print(type(user_input))  # <class 'str'>
```

Python is screaming because you tried to glue together text (`"18"`) and a number (`1`) in a way it doesn’t like.

> Key takeaway: When something feels cursed, `print(type(your_variable))` to see what Python is actually working with.

---

## 6. Type Conversion: Changing a Value’s Identity

Sometimes you **need** to change a value’s type. Maybe you get input from a user as text, but you want to calculate with it. This process is called **type conversion** or **type casting**.

### Implicit Conversion (Automatic)

Sometimes Python quietly converts types for you when it makes sense:

```python
result = 5 + 2.5
print(result)        # 7.5
print(type(result))  # <class 'float'>
```

Here, Python upgrades the `5` (an `int`) to `5.0` (a `float`) before adding, so you don’t lose any decimal precision.

It only does this for safe, obvious cases like mixing numbers. It **won’t** magically convert text into numbers for you.

### Explicit Conversion (Manual)

Most of the time, you must convert types **yourself**. You do this with functions named after the types:

- `str()`
- `int()`
- `float()`
- `bool()`

```python
age_string = "16"  # maybe from user input
age_number = int(age_string)
print(age_number + 1)  # 17
```

You’re telling Python: “I know this was text, but treat it as an integer now.”

> Key takeaway: Python only auto‑converts in simple numeric cases. For everything else, **you** call `str()`, `int()`, `float()`, or `bool()`.

---

## 7. `str()`: Turning Anything Into Text

Use `str()` when you want to glue non‑text values into a string — for logs, messages, Discord‑style output, etc.

```python
level = 10
message = "You reached level " + str(level)
print(message)  # You reached level 10
```

`str()` works on almost anything:

```python
str(99.5)   # "99.5"
str(True)   # "True"
str(15)     # "15"
```

This is handy when you’re building status messages or printing values for debugging.

> Key takeaway: When you’re building a sentence and something isn’t a string yet, wrap it in `str()`.

---

## 8. `int()` and `float()`: From Text to Numbers

User input, data from files, even stuff from APIs almost always arrives as **strings**. To do maths, you must convert them first.

### Safe Conversions

```python
int("100")     # 100 (int)
float("7.5")   # 7.5 (float)
float("10")    # 10.0 (float)
int(7.9)       # 7   (truncates, does NOT round)
```

### Dangerous Conversions

Try to convert text that doesn’t look like a number, and Python blows up with a `ValueError`:

```python
# These will all cause a ValueError!
# int("hello")
# int("7.5")    # int() can’t handle decimal strings
# float("hacker42!")
```

A more realistic example from your life:

```python
score_str = input("Enter your exam score out of 20: ")  # e.g. "15"
score = float(score_str)

average_needed = 10.0

if score >= average_needed:
    print("Nice, you passed!")
else:
    print("Ouch… better luck next test.")
```

> Key takeaway: Use `int()`/`float()` to turn numeric text into real numbers — but if the text isn’t a valid number, expect a `ValueError`.

---

## 9. `bool()`: Is This “Something” or “Nothing”? 

`bool()` converts any value into `True` or `False`. The rule:

- “Empty” things are `False`.
- Almost everything else is `True`.

### Values that are `False`:

```python
bool(0)      # False
bool(0.0)    # False
bool("")     # False (empty string)
bool(False)  # False
```

### Values that are `True`:

```python
bool(1)         # True
bool(-10)       # True
bool("hello")   # True
bool("False")   # True (non‑empty string!)
bool(True)      # True
```

This is super useful when checking whether the user **actually** typed something:

```python
username = input("Enter username: ")

if bool(username):  # or just: if username:
    print("Welcome,", username)
else:
    print("Username cannot be empty!")
```

> Key takeaway: `bool(x)` is `False` for `0`, `0.0`, and `""`. For almost everything else, it’s `True`.

---

## 10. Common Type Bugs and How to Unclown Them

### Bug 1: Mixing Strings and Numbers (`TypeError`)

```python
# Bug:
# score = 100
# print("Score: " + score)  # TypeError: can only concatenate str (not "int") to str

# Fix 1: Convert to string
score = 100
print("Score: " + str(score))

# Fix 2: Let print() handle it with commas
print("Score:", score)
```

### Bug 2: Converting the Wrong Way (`ValueError`)

```python
# Bug:
# value_str = "9.9"
# value_int = int(value_str)  # ValueError: invalid literal for int() with base 10: '9.9'

# Fix: Use the correct conversion
value_str = "9.9"
value_float = float(value_str)  # 9.9
```

### Bug 3: Comparing Strings Instead of Numbers (Logic Error)

```python
# Bug:
# exam_score = "15"   # comes from user input
# if exam_score > 10:  # Comparing strings, not numbers
#     print("Passed")

# Fix: Convert before comparing
exam_score = "15"
if int(exam_score) > 10:
    print("Passed")
else:
    print("Not passed")
```

> Key takeaway: `TypeError` means you mixed incompatible types. `ValueError` means you tried to convert text that doesn’t fit the type you asked for.

---

## Summary

- Core data types: `int`, `float`, `str`, `bool`.
- **Literals** are values you write directly, like `42` or `"hello"`.
- `type()` is your built‑in scanner for checking what Python thinks a value is.
- Python does a bit of **implicit conversion** with numbers, but never assume — check.
- Use **explicit conversion** (`str()`, `int()`, `float()`, `bool()`) when moving between text, numbers, and booleans.
- Watch for `TypeError` and `ValueError` when dealing with conversions.

> Achievement Unlocked: You now speak Python’s **data language** and can safely juggle text, numbers, and booleans — whether you’re calculating grades, analysing logs, or building your first hacker tools.
