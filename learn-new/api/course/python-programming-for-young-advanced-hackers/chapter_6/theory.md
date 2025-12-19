# Chapter 6: Operators and Comparisons – Teaching Python to Make Choices

You’ve taught Python to store data; now it’s time to let it **do stuff** with that data. Operators are the symbols Python uses to calculate, compare, and decide — kind of like the rules in your favourite game.

If you want to know:
- “Is my exam score high enough to pass?”
- “Do I have enough coins to buy that skin?”
- “Can I play another match, or is it already too late?”

…you’re about to give Python the same decision‑making powers.

By the end of this chapter, you’ll be able to:

- Use **arithmetic operators** to perform calculations.
- Use **comparison operators** to ask `True`/`False` questions.
- Use **assignment operators** to update variables cleanly.
- Combine conditions with **logical operators** to build smart rules.
- Read complex expressions like a pro and predict what they’ll do.

---

## 1. Arithmetic Operators: Your In‑Game Calculator

These are the basic tools for working with numbers. You’ve seen some of them, but let’s complete the squad:

- `+`  : Addition
- `-`  : Subtraction
- `*`  : Multiplication
- `/`  : Division (always returns a `float`)
- `//` : Integer division (throws away the decimal)
- `%`  : Modulo (gives the remainder)
- `**` : Exponent (power)

```python
# 2 to the power of 4
print(2 ** 4)   # 16

# How many full teams of 3 can we make from 10 players?
print(10 // 3)  # 3

# How many players are left out?
print(10 % 3)   # 1
```

This is how you calculate:
- how many buses you need for a school trip,
- how many packs you can buy with your coins,
- how much damage a combo does when power scales with level.

> Key takeaway: Arithmetic operators do the maths — from basic school stuff to game logic.

---

## 2. Comparison Operators: Asking Python Questions

Comparison operators let you ask **yes/no** questions about your data. The result is always a boolean: `True` or `False`.

- `==` : is equal to?
- `!=` : is not equal to?
- `<`  : is less than?
- `>`  : is greater than?
- `<=` : is less than or equal to?
- `>=` : is greater than or equal to?

**Do NOT** confuse `=` and `==`:

- `x = 5` → **assignment**: “put 5 into `x`”.
- `x == 5` → **comparison**: “is `x` equal to 5?”.

```python
password = "password123"
print(password == "password123")  # True
print(password == "Password123")  # False (case‑sensitive)

level = 10
print(level > 5)     # True
print(level != 10)   # False

exam_score = 14
print(exam_score >= 10)  # True, you passed (out of 20)
```

> Key takeaway: Comparison operators ask questions and give you `True`/`False` answers you can use in decisions.

---

## 3. Assignment Operators: Updating Values Like a Pro

You already know `=` for giving a variable a value:

```python
score = 0
```

But a lot of the time you want to **update** a variable based on its current value:

- `x = x + 1`  → increase by 1
- `x = x - 5`  → decrease by 5

Python has clean shortcuts for this, called **augmented assignment operators**:

| Operator | Example        | Equivalent to          |
|---------|----------------|------------------------|
| `+=`    | `score += 10`  | `score = score + 10`   |
| `-=`    | `health -= 25` | `health = health - 25` |
| `*=`    | `mana *= 2`    | `mana = mana * 2`      |
| `/=`    | `speed /= 2`   | `speed = speed / 2`    |

```python
score = 100
# Player found a bonus
score += 50     # 150

health = 80
# Player took damage
health -= 30    # 50

study_hours = 2
# You decide to study twice as long (happens… sometimes)
study_hours *= 2   # 4
```

> Key takeaway: Use `+=`, `-=`, `*=` and friends as the standard way to update variables — it’s shorter and easier to read.

---

## 4. Logical Operators: Building Smart Rules

Logical operators let you combine multiple `True`/`False` conditions into bigger rules, like:

> “I can play **if** homework is done **and** it’s before 22:00.”

Python has three logical operators:

- `and` – **all** conditions must be `True`.
- `or`  – **at least one** condition must be `True`.
- `not` – flips `True` ↔ `False`.

### `and`: All Conditions Must Pass

```python
homework_done = True
time = 20  # 20:00

can_play = homework_done and time < 22
print(can_play)  # True
```

If either side is `False`, the whole expression is `False`.

### `or`: At Least One Condition

```python
has_sword = False
has_magic = True

can_fight = has_sword or has_magic
print(can_fight)  # True
```

Perfect for rules like:
- “You can join the server if you’re admin **or** moderator.”

### `not`: Flip the Value

```python
is_muted = False

if not is_muted:
    print("Mic is live.")
```

### Combining Them

You can combine logical operators with parentheses to control the order:

```python
level = 15
has_premium = False

# Can access secret area if:
# (level >= 10 AND has premium) OR level >= 20
can_access = (level >= 10 and has_premium) or (level >= 20)
print(can_access)  # False, level is 15 and no premium
```

> Key takeaway: `and`, `or`, and `not` let you build rules that feel like real‑life decisions.

---

## 5. Reading Real Expressions: School & Gaming Examples

Let’s look at some expressions you might actually use.

### Example: Exam Result Check

```python
score = 13      # out of 20
cheated = False

passed = (score >= 10) and (cheated == False)
print(passed)  # True
```

You pass **only if** you have enough points **and** you didn’t cheat.

### Example: “Can I Play Another Match?”

```python
time = 21  # 21:00
homework_done = True
parents_home = False

can_play = homework_done and (time < 22 or not parents_home)
print(can_play)
```

Read it like this:
- Homework must be done.
- AND (it’s before 22:00 OR your parents aren’t home yet).

This is exactly how you’ll later write rules for bots, apps, and games.

---

## 6. Common Operator Mistakes

Even pros mess these up sometimes. Here are the classics.

### Mistake 1: Using `=` Instead of `==`

```python
# Bug:
# if score = 10:   # ❌ this is invalid
#     print("Nice")

# Correct:
score = 10
if score == 10:
    print("Nice")
```

- `=` is **assignment**.
- `==` is **comparison**.

If you mix them up, Python will throw a **SyntaxError**.

### Mistake 2: Comparing the Wrong Types

```python
age = "16"   # comes from input as text

# Bug:
# if age >= 16:    # comparing 'str' with 'int'
#     print("You can see this movie.")

# Fix:
if int(age) >= 16:
    print("You can see this movie.")
```

Always check types when comparisons behave weirdly.

### Mistake 3: Overcomplicating Conditions

```python
# Not great:
if is_logged_in == True:
    ...

# Cleaner:
if is_logged_in:
    ...
```

Same for `False`:

```python
# Not great:
if is_banned == False:
    ...

# Cleaner:
if not is_banned:
    ...
```

> Key takeaway: Keep conditions clean and readable. You’re writing for future‑you as much as for Python.

---

## Summary

- **Arithmetic operators** (`+`, `-`, `*`, `/`, `//`, `%`, `**`) handle all the maths.
- **Comparison operators** (`==`, `!=`, `<`, `>`, `<=`, `>=`) ask questions and return `True`/`False`.
- **Assignment operators** (`=`, `+=`, `-=`, `*=` …) set and update variable values.
- **Logical operators** (`and`, `or`, `not`) combine simple conditions into powerful rules.
- Small mistakes like mixing `=` and `==` or comparing strings to numbers can completely break your logic.

> Achievement Unlocked: You can now make Python **think in conditions** — comparing scores, checking rules, and making decisions just like a game engine or a smart app.
