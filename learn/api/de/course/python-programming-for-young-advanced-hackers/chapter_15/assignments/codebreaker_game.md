# Mission: Codebreaker Mini-Game

Create a simple code-breaking game using two classes.

## What your program should do

1. Define a class `Code`.
   - In `__init__(self, secret)`, store the secret number in `self.secret`.
   - Add a method `check_guess(self, guess)` that:
     - Returns the string `"correct"` if `guess` equals `self.secret`.
     - Returns `"too low"` if `guess` is smaller than `self.secret`.
     - Returns `"too high"` if `guess` is larger than `self.secret`.

2. Define a class `CodeBreaker`.
   - In `__init__(self, name)`, store `self.name` and set `self.attempts = 0`.
   - Add a method `guess(self, code, number)` that:
     - Increases `self.attempts` by 1.
     - Calls `code.check_guess(number)` and stores the result.
     - Prints a message like: `"<name> guessed <number>: <result>"`.
     - Returns the result string.

3. In your main code:
   - Create a `Code` object with a secret number (for example, `7`).
   - Create a `CodeBreaker` named something cool (for example, `"Neo"`).
   - Call `guess` several times with different numbers until the result is `"correct"`.
   - After breaking the code, print how many attempts were needed.

## Stretch goals (optional)

- Add a `__str__(self)` method to `CodeBreaker` that returns something like:
  - `"CodeBreaker(name='Neo', attempts=3)"`.
- Give `CodeBreaker` a `history` list to remember every guessed number.
- At the end of the game, print the full guess history.

