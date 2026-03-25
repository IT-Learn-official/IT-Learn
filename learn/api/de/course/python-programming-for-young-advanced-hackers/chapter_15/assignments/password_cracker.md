# Mission: Password Cracker Sim

Simulate a digital vault that tracks password attempts and locks after too many failures.

## What your program should do

1. Define a class `Attempt`.
   - In `__init__(self, guess)`, store the guess in `self.guess`.
   - Add a `__str__(self)` method that returns something like `"Attempt(guess='1234')"`.

2. Define a class `Vault`.
   - In `__init__(self, secret_password, max_attempts)`, store:
     - `self.secret_password` (string),
     - `self.max_attempts` (int),
     - `self.failed_attempts` as an empty list `[]`,
     - `self.locked` as `False`.
   - Add a method `try_unlock(self, attempt)` that:
     - If `self.locked` is already `True`, prints `"Vault is locked!"` and returns `False`.
     - If `attempt.guess` equals `self.secret_password`:
       - Prints `"Unlocked!"` and returns `True`.
     - Otherwise:
       - Appends the `attempt` to `self.failed_attempts`.
       - If the number of failed attempts is now **greater than or equal to** `self.max_attempts`:
         - Set `self.locked` to `True`.
         - Print `"Too many attempts. Vault locked!"`.
       - Return `False`.

3. In your main code:
   - Create a `Vault` with a secret password (for example, `"swordfish"`) and `max_attempts = 3`.
   - Create several `Attempt` objects with different guesses (some correct, some wrong).
   - Call `try_unlock` with each attempt and observe the printed output.
   - Try calling `try_unlock` again **after** the vault is locked and see what happens.

## Stretch goals (optional)

- Add a method `status(self)` that returns a string like:
  - `"Vault(locked=True, failed_attempts=3)"`.
- Add a method `clear_failed_attempts(self)` that empties `self.failed_attempts` and sets `self.locked` back to `False`.
- Store a list of raw guess strings and loop over them, creating an `Attempt` object in a `for` loop for each guess.

