# Mission: Dice Roller  Sum of Many Rolls

Simulate rolling a 6-sided dice many times and add up the results.

## What your program should do

1. Ask the user **how many times** to roll the dice.
2. Use `random.randint(1, 6)` to simulate each roll.
3. For each roll, you can print something like `Roll 1: 4`.
4. Keep a running **total** of all rolls.
5. At the end, print the total sum.

## Hints

- Use `import random` at the top of your file.
- Start with `total = 0` before the loop.
- Inside the loop, do something like:
  - `roll = random.randint(1, 6)`
  - `total = total + roll`

## Example (one possible run)

Input:

```text
How many rolls? 3
```

Possible output:

```text
Roll 1: 4
Roll 2: 1
Roll 3: 6
Total: 11
```
