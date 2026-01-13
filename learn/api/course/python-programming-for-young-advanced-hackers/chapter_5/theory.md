# Chapter 5: Execution Flow and Digital Forensics

Welcome, hacker. You've learned to write spells (code), but now you must learn how the magic unfolds. In this chapter, you'll master the concept of **execution flow**—the step-by-step path Python takes through your script. You'll also learn the art of **digital forensics**, using `print()` statements to hunt down bugs.

By the end of this chapter, you'll be able to:

- Explain **execution flow** and predict how a script will run.
- **Trace variables** to track how data changes over time.
- Use **print-debugging** as your primary forensic tool.
- Analyze error messages and fix common bugs like a pro.

---

## What is Execution Flow?

When you run a Python script, the interpreter doesn't see the whole file at once. It acts like a detective reading a case file, starting at the **top** and reading **down**, one line at a time. This predictable, top-to-bottom path is the **execution flow**.

Consider this script:
```python
# Line 1
print("Initializing program...")

# Line 2
username = "Cipher"
print("User found:", username)

# Line 3
level = 5
print("Level:", level)

# Line 4
level = level + 1
print("New level:", level)
```
Python executes this in a strict order:
1.  It prints "Initializing program...".
2.  It creates the `username` variable, then prints it.
3.  It creates the `level` variable, then prints it.
4.  It calculates `5 + 1`, updates `level` to `6`, and then prints the new value.

The order is everything. If you tried to print `level` before line 3, the program would crash with a `NameError` because, at that point in the timeline, the `level` variable doesn't exist yet.

> **Key takeaway:** Python runs your code from top to bottom, one line at a time. The order of your commands is critical.

---

## Tracing Variables: Following the Data Trail

**Tracing** is the process of tracking the state of your variables as the program executes. It’s like putting a GPS tracker on a piece of data to see where it goes and how it changes. This is one of the most fundamental skills in debugging.

Let's trace the variables in this script:

```python
# 1. Start of script
health = 100
mana = 50

# 2. Took damage
health = health - 30

# 3. Cast a spell
mana = mana - 20

# 4. Found a health potion
health = health + 50
```

A trace would look like this:

| Line # | Code Executed | `health` value | `mana` value | Notes |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `health = 100`, `mana = 50` | 100 | 50 | Initial state |
| 2 | `health = health - 30` | 70 | 50 | `health` is updated |
| 3 | `mana = mana - 20` | 70 | 30 | `mana` is updated |
| 4 | `health = health + 50` | 120 | 30 | `health` is updated again |

By the end of the script, `health` is `120` and `mana` is `30`. Manually tracing your code like this on paper or in your head is a powerful way to find logical errors.

> **Key takeaway:** To understand your program, you must be able to trace how your variables change from the first line to the last.

---

## Print-Debugging: Your Forensic Toolkit

When your code doesn't work and you don't know why, don't just stare at it. **Interrogate it.** The easiest way to do this is with `print()` statements. This technique is called **print-debugging**, and it's the most reliable forensic tool in a hacker's arsenal.

The goal is to expose the values of your variables at key points in the execution flow.

### Scenario: A Buggy Calculation
Imagine this code is supposed to calculate the total cost of items, but it's giving the wrong answer.
```python
price = 10
quantity = 3
tax = 0.05

# Buggy code
total = price + quantity * tax
print("Total cost:", total)
```
The output is `10.15`, but you expected `10 * 3` plus tax. What's wrong? Let's use print-debugging to investigate.

```python
price = 10
quantity = 3
tax = 0.05

# --- Start of Forensic Investigation ---
print("DEBUG: price is", price, "and its type is", type(price))
print("DEBUG: quantity is", quantity, "and its type is", type(quantity))
print("DEBUG: tax is", tax, "and its type is", type(tax))

subtotal = price * quantity
print("DEBUG: subtotal is", subtotal)

total_tax = subtotal * tax
print("DEBUG: total_tax is", total_tax)

total = subtotal + total_tax
# --- End of Forensic Investigation ---

print("Final total:", total)
```
By printing out each step, you can pinpoint the exact location of the logical error. In the original buggy code, the order of operations was wrong. Your investigation reveals the correct steps, and you can now fix the code.

> **Key takeaway:** When your code is broken, add `print()` statements to check the values and types of your variables at every step. This will lead you to the source of the bug.

---

## Reading Error Messages

Error messages, or **tracebacks**, are not failures. They are clues. A good hacker reads them carefully.

A traceback tells you three things:
1.  **The file and line number** where the error occurred.
2.  **The line of code** that caused the error.
3.  **The type of error** (`NameError`, `TypeError`, `ValueError`, etc.).

```
Traceback (most recent call last):
  File "C:/Users/hacker/my_script.py", line 5, in <module>
    print("Score: " + scor)
NameError: name 'scor' is not defined
```
**Forensic Analysis:**
- **Where?** `my_script.py`, line 5.
- **What?** The line `print("Score: " + scor)`.
- **Why?** `NameError`. The program doesn't know what `scor` is.

The clue is obvious: you have a typo. The variable is likely named `score`, not `scor`.

> **Key takeaway:** Don't be afraid of red text. Read the error message from the bottom up. It tells you exactly where to start your investigation.

---

## Summary

- **Execution Flow:** Python runs code from top to bottom, in order.
- **Variable Tracing:** Mentally or on paper, track how your variables change line by line.
- **Print-Debugging:** Use `print()` to see the values of variables inside your running program. It's your most powerful tool for finding bugs.
- **Error Messages:** Are clues, not failures. Read them carefully to know where and why your program crashed.

You are now equipped to not only write code, but to analyze and debug it. This is the mark of a true programmer.
