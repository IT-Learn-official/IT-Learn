# Mission: Guess the Number  Distance Hint

The computer picks a secret number between 1 and 50. You try to guess it.
After each wrong guess, the program tells you if your guess is too high or too low,
and how far away you are from the secret number.

## What your program should do

1. Use `random.randint(1, 50)` to choose a secret number.
2. Use a `while` loop to keep asking the user for guesses **until** they are correct.
3. After each wrong guess:
   - Print whether the guess is **too high** or **too low**.
   - Compute the distance using `abs(secret - guess)` and print it.
4. When the user guesses correctly, print a celebration message and stop.

## Hints

- Use `import random` at the top of your file.
- Convert the input to an int with `int(input(...))`.
- Use `abs(secret - guess)` so the distance is always positive.

## Example (one possible run)

(Secret number is 30, but the user doesnt see it.)

```text
Guess a number between 1 and 50: 10
Too low!
You are 20 away.
Guess a number between 1 and 50: 40
Too high!
You are 10 away.
Guess a number between 1 and 50: 30
You got it!
```
