# Chapter 2: Variables, Numbers, and Secret Codes

Welcome back, hacker. In chapter 1 you made the machine talk. Now you’re going to make it **remember stuff**, **do math**, and keep track of your “secret sauce” like scores, health, and codes. This is where your scripts stop being toys and start feeling like actual tools.

By the end of this chapter, you'll be able to:

- Create **variables** to store data like scores, health, or secret codes.
- Use **integers** (whole numbers) and **floats** (decimal numbers).
- Perform calculations with `+`, `-`, `*`, and `/`.
- Use integer division `//` and modulo `%` to split loot and find remainders.
- Control the **order of operations** with parentheses so your math isn’t scuffed.
- Mix **text and numbers** in your output without causing errors.
- Hunt down and fix common **math and variable bugs**.

---

## What Is a Variable?

A **variable** is like a labeled lockbox in your computer’s memory. You can store something inside it, give it a name, and come back to it later.

```python
player_score = 100
health = 95.5
secret_code = "xY_z3n"
```

Here:
- `player_score` is a box holding the number `100`.
- `health` is a box holding `95.5`.
- `secret_code` is a box holding the text `"xY_z3n"`.

The `=` sign isn't “equals” like in maths class. In Python, it’s an **assignment operator**. It means:

> Store the value on the **right** inside the variable on the **left**.

So this line:

```python
ammo = 50
```

Means: “Create a variable named `ammo` and put `50` inside it.”

You can update the value at any time:

```python
ammo = 50
ammo = ammo - 10  # You just fired 10 shots
print(ammo)
```

Python reads this as:
1. `ammo = 50` → Store `50` in `ammo`.
2. `ammo = ammo - 10` → Take the current value of `ammo` (50), subtract 10 (now 40), and store `40` back into `ammo`.
3. `print(ammo)` → It will show `40`.

### Naming Your Variables

Good variable names are crucial for writing clean, readable code—future-you will thank you when you’re fixing a bug at 23:00 before a test.

- Use letters, numbers, and `_` (underscore).
- **Never** start a variable name with a number.
- Use `snake_case` for names with multiple words (e.g., `player_health`).
- Make them descriptive! `player_health` is much better than `ph`.

**Valid Names:**
- `score`
- `player_health`
- `level_2_boss`

**Invalid Names:**
- `2fast` (starts with a number)
- `my score` (contains a space)

> Key takeaway: A variable is a named container for a piece of data. Use `=` to put data into it and update it over time.

---

## Integers vs. Floats

Python has different types of numbers. For now, we care about two:

- **Integers (`int`)**: Whole numbers, like `-10`, `0`, `42`.
- **Floats (`float`)**: Numbers with a decimal point, like `3.14`, `-0.5`, `10.0`.

```python
lives = 3          # An integer
speed = 7.5        # A float
temperature = -10  # An integer
```

Even `10.0` is a float because of the decimal point.

You’ll often use:
- `int` for things you count (lives, tries, levels, coins).
- `float` for things you measure (speed, time, accuracy, temperature).

> Key takeaway: Integers are for whole numbers. Floats are for numbers that need decimal precision.

---

## Basic Arithmetic: +, -, *, /

Python is your personal calculator, but with superpowers.

### Arithmetic Operators

- `+` : Addition
- `-` : Subtraction
- `*` : Multiplication
- `/` : Division (always results in a float)

```python
print(5 + 3)    # 8
print(100 - 25) # 75
print(4 * 8)    # 32
print(10 / 2)   # 5.0
print(9 / 2)    # 4.5
```

Notice that division `/` always gives you a float, even if the result is a whole number. That’s on purpose.

You can use variables in your calculations:

```python
damage = 25
health = 100
remaining_health = health - damage
print(remaining_health)  # 75
```

> Key takeaway: `+`, `-`, `*`, and `/` work like a calculator. Remember that `/` gives you a float.

---

## Integer Division (//) and Remainders (%)

Sometimes you don't want decimals; you want full groups and leftovers. Think: “How many full Teams calls can my data handle?” or “How many coins does each player get?”

- `//` : **Integer division** (or floor division)
- `%` : **Modulo** (the remainder)

### Integer Division `//`

`//` gives you the whole number result of a division and throws away the decimal part.

```python
print(9 // 2)   # 4
print(10 // 3)  # 3
```

### Modulo `%`

`%` gives you the remainder of a division.

```python
print(9 % 2)   # 1 (because 9 = 4*2 + 1)
print(10 % 3)  # 1 (because 10 = 3*3 + 1)
```

### Hacker Scenario: Splitting the Loot

Imagine you and your squad just finished a raid and got 25 digital coins.

```python
total_coins = 25
crew_members = 4

coins_per_member = total_coins // crew_members
leftover_coins = total_coins % crew_members

print("Each crew member gets", coins_per_member, "coins.")
print("Coins left over:", leftover_coins)
```

Output:

```
Each crew member gets 6 coins.
Coins left over: 1
```

> Key takeaway: `a // b` tells you how many full groups you get. `a % b` tells you what’s left over.

---

## Order of Operations and Parentheses

Python follows the same order of operations you learned in maths (PEMDAS/BODMAS):

1. **P**arentheses `()`
2. **E**xponents `**` (we’ll hit this later)
3. **M**ultiplication and **D**ivision `*`, `/`, `//`, `%`
4. **A**ddition and **S**ubtraction `+`, `-`

### Without Parentheses

```python
print(10 + 5 * 2)
```

Python does the multiplication first: `5 * 2` is `10`. Then `10 + 10` is `20`.

### With Parentheses

```python
print((10 + 5) * 2)
```

The parentheses force Python to do the addition first: `10 + 5` is `15`. Then `15 * 2` is `30`.

A smart hacker uses parentheses not just to get the right answer, but to make the code easier for other humans (and your future self on a tired Sunday night) to read.

> Key takeaway: Python follows the usual order of operations. Use `()` when you want to control the order or make your intent crystal clear.

---

## Mixing Text and Numbers

Trying to add a number to text directly will crash your program.

```python
age = 14
# This will cause a TypeError!
# print("Your age is " + age)
```

Python will scream at you with a `TypeError` because you can't add a string and an integer together.

### How to Fix It

#### 1. Convert the number to a string with `str()`

```python
age = 14
print("Your age is " + str(age))
```

`str(age)` turns the number `14` into the text `"14"`.

#### 2. Use commas in `print()`

`print()` can take multiple items separated by commas. It will automatically convert them to text and add spaces.

```python
age = 14
print("Your age is", age)
```

Both methods will correctly show: `Your age is 14`.

Be careful with numbers that *look* like strings:

```python
print("5" + "5")  # "55" (gluing strings)
print(5 + 5)       # 10 (adding numbers)
```

> Key takeaway: Use `str()` or commas in `print()` when you want to combine text and numbers.

---

## Debugging 101

Bugs are not fails; they’re puzzles. A good hacker is a good detective.

### Common Bugs

1. **Typos in Variable Names (`NameError`)**

```python
score = 100
print(scrore)  # NameError: name 'scrore' is not defined
```

**Fix:** Double-check your spelling. Python is not forgiving here.

2. **Using a Variable Before It Exists (`NameError`)**

```python
print(total)  # NameError: name 'total' is not defined
total = 0
```

**Fix:** Always define your variables before you use them.

3. **Logical Errors (Wrong Operator)**

```python
price = 10
quantity = 3
total = price + quantity  # Should be *
print(total)  # 13, but you probably wanted 30
```

**Fix:** Think through the logic: do you want to add or multiply here?

4. **Forgetting Parentheses**

```python
result = 100 - 10 * 5  # result is 50
# Did you mean (100 - 10) * 5, which is 450?
```

**Fix:** Use parentheses to show clearly what you meant.

### Simple Debugging Techniques

1. **Read the error message.** It tells you the type of error and the line number.
2. **Print your variables.** Add `print()` statements to see the values of your variables at different points.

```python
print("DEBUG: health =", health)
```

3. **Explain the code to yourself.** Walk through it line by line and say out loud what happens. (Yes, you will sound a bit weird. It works.)

> Key takeaway: Bugs are clues. Use error messages and `print()` to track down what actually happened in your code.

---

## What’s Next?

You now know how to:

- Store data in variables.
- Work with different types of numbers.
- Perform calculations and control the order of operations.
- Combine text and numbers safely in your output.
- Debug common issues with variables and maths.

Next up, you’ll use these skills in practice missions and start wiring them together into more advanced logic.

> Achievement Unlocked: You can now make Python remember, calculate, and report data—like a tiny Smartschool server you完全控制.
