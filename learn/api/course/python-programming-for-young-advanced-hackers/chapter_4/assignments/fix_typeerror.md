# Mission: Fix the TypeError

Your friend wrote some code that mixes strings and numbers and keeps crashing with `TypeError`.
You are the bug fixer!

Open the starter file and look for the buggy code snippets. They will look something like this:

```python
age = "15"
print("Next year you will be " + age + 1)

score = "100"
print("Total score: " + score + 50)

coins = "10"
bonus = 5
coins_after_bonus = coins + bonus
print("Coins after bonus:", coins_after_bonus)
```

## Your tasks

1. Use `int()` (or `float()` where needed) to turn numeric-looking strings into real numbers **before** doing math.
2. Use `str()` or commas in `print` when you want to mix text and numbers.
3. Do **not** change the story or the numbers; just fix the types.

## Goal

When you are done, your fixed program should:

- Run **without any errors**.
- Print something like:

```text
Next year you will be 16
Total score: 150
Coins after bonus: 15
```

Tip: If you are stuck, print the `type(...)` of a variable to see what it is right now.

