# Chapter 3: Function Superpowers and Built-in Tools

You’ve learned to make Python talk and think. Now it’s time to unlock your next superpower: **functions**. A function is a reusable command, a pre-built tool in your hacking arsenal that you can use to get things done quickly—like pressing one button in a game instead of doing 10 actions manually.

By the end of this chapter, you'll be able to:

- Explain what a **function** is and why it’s a hacker’s best friend.
- Use built-in functions like `print()`, `len()`, `abs()`, `round()`, and `type()`.
- Understand what **arguments** are (the data you feed into a function).
- Understand what a **return value** is (the result a function gives back).
- Read and interpret the output you see in the console.

> Key takeaway: A function is a named, reusable tool that you activate by calling its name followed by parentheses `()`.

---

## 1. What Is a Function?

Imagine you have a set of magic tools on your laptop. One tool, when you give it a piece of text, tells you how long it is. Another, when you give it a messy number, cleans it up nicely. You don’t want to rewrite that logic every time; you just want to **call the tool**.

A **function** in Python is exactly like one of those magic tools:

- It has a **name** (e.g., `len`, `round`).
- You **call** it by writing its name with parentheses: `len("password")`.
- You put the **inputs** (the data it needs to work on) inside the parentheses.
- The function performs its special action.
- Often, it gives you a **result** back that you can use.

For example:

- A “length-checker” tool: you give it `"secret"`, it gives you back `6`.
- A “rounding” tool: you give it `7.823`, it gives you back `8`.

In Python, these tools are functions:

```python
# This calls the built-in function len()
len("secret")  # This will give back 6
```

> Key takeaway: Think of a function as a specialized tool that performs a specific job for you.

---

## 2. `print()` Revisited – Your Communication Device

You’ve been using `print()` since chapter 1. Now, look at it like a true hacker: it’s a function for sending messages from your program to the outside world—like your program’s chat window.

```python
print("Mission accomplished.")
```

Here’s the breakdown:

- `print` is the **name** of the function.
- The parentheses `()` **call** the function, activating it.
- Inside the parentheses is the **argument**: the string `"Mission accomplished."`.
- The function’s job is to display that text on your screen.

`print()` is special because its main purpose is to create **output** for you to see. You don't usually store the result of `print()` in a variable.

You can give `print()` multiple arguments, separated by commas:

```python
username = "Ghost"
level = 12
print("User:", username, "Level:", level)
```

> Key takeaway: `print()` is the function you use to make your program talk to you.

---

## 3. Arguments – Feeding the Machine

The values you put **inside the parentheses** when you call a function are called **arguments**. They are the information the function needs to do its job.

```python
print("Access denied.")      # The argument is "Access denied."
len("hacker")               # The argument is "hacker"
round(3.14159, 2)           # The arguments are 3.14159 and 2
```

Some functions need one argument, while others can take multiple. Think of arguments like the settings on a tool or options in a game menu.

> Key takeaway: Arguments are the inputs you provide to a function so it knows what to work on.

---

## 4. Return Values – Getting Results Back

Many functions, after doing their work, give you a value back. This is called a **return value**. It’s the result of the function’s operation.

In the Python REPL (interactive shell), the return value is automatically displayed:

```python
>>> len("password")
8
```

The `8` you see is the *return value* of `len("password")`.

In a script, you almost always want to **store** this return value in a variable to use it later:

```python
password = "my_secret_password"
password_length = len(password)  # len() returns 18, which is stored in password_length
print("Password length is:", password_length)
```

It’s crucial to understand the difference:

- `len("password")` **returns** a value (`8`).
- `print("password")` **displays** something on the screen but doesn't return a useful value to your program.

> Key takeaway: A return value is the result a function gives back. Store it in a variable if you want to use it again later.

---

## 5. Your Built-in Hacking Toolkit

Python comes with many pre-built functions—kind of like your default app list before you install anything from the store. Here are a few essentials:

- `len()`: How long is this data?
- `abs()`: What’s the absolute (positive) value?
- `round()`: Clean up messy decimal numbers.
- `type()`: What kind of data is this?

### 5.1 `len()` – The Length Checker

`len()` tells you the number of characters in a string.

```python
len("code")          # 4
len("cyberspace")    # 10
len("Hello, world!") # 13 (spaces and punctuation count!)
```

You can use it to check if a password is long enough:

```python
password = "123"
password_length = len(password)
print("Password length is:", password_length)  # 3
```

### 5.2 `abs()` – The Absolute Value

`abs()` gives you the non-negative value of a number. Think of it as distance from zero.

```python
abs(-10)  # 10
abs(10)   # 10
```

This is useful in games or simulations where you care about distance, not direction:

```python
player_pos = 5
enemy_pos = -5
distance = abs(player_pos - enemy_pos)  # abs(10) = 10
```

### 5.3 `round()` – The Cleaner

`round()` helps you shorten long, messy decimal numbers.

```python
round(3.14159)      # 3 (rounds to the nearest whole number)
round(3.14159, 2)   # 3.14 (rounds to 2 decimal places)
```

This is great for displaying scores or stats nicely:

```python
accuracy = 0.87654321
short_accuracy = round(accuracy, 2)
print("Your accuracy:", short_accuracy)  # Your accuracy: 0.88
```

### 5.4 `type()` – The Inspector

`type()` is your debugging detective. It tells you the data type of a variable.

```python
coins = 100
health = 98.6
username = "ZeroCool"

print(type(coins))     # <class 'int'>
print(type(health))    # <class 'float'>
print(type(username))  # <class 'str'>
```

If your code is acting weird, one of the first things to check is the `type()` of your variables. Are you trying to add a number to a string by accident? `type()` will expose it.

> Key takeaway: `len()`, `abs()`, `round()`, and `type()` are essential built-in tools for inspecting and manipulating data.

---

## 6. Console Output vs. Return Values

It’s important to know what you’re actually seeing in the console.

1. **Printed Output:** What your code explicitly prints using `print()`.
2. **Return Values:** In the REPL, the result of any expression you type is automatically shown.

In the REPL:

```python
>>> len("hacker")
6        # This is the return value being displayed
>>> print(len("hacker"))
6        # This is the output from the print() function
```

In a script (`.py` file), **nothing** is displayed unless you use `print()`:

```python
# This line runs, but you see nothing
len("hacker")

# This line will show 6 in the output
print(len("hacker"))
```

In scripts, the standard pattern is:

1. Call a function and store its return value in a variable.
2. Use `print()` to show the result to the user.

```python
username = "Trinity"
length = len(username)
print("Username length:", length)
```

> Key takeaway: In scripts, if you want to **see** a value, you must `print()` it. Return values stay inside the program unless you display them.

---

## Summary

- A **function** is a reusable command you call with `()`.
- **Arguments** are the data you pass into the function’s parentheses.
- A **return value** is the result a function gives back, which you can store in a variable.
- `print()` displays information for humans.
- `len()`, `abs()`, `round()`, and `type()` are powerful built-in tools for working with data.

> Achievement Unlocked: You can now use Python’s built-in toolkit like a pro—next you’ll start forging your **own** functions.
