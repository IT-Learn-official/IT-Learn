# Mission: Unique Password Checker

Find how many unique passwords are in a list.

## What your program should do

1. Start with a list called `passwords` that contains some duplicate values, for example:
   - `passwords = ["1234", "qwerty", "1234", "admin"]`
2. Turn this list into a set to remove duplicates.
3. Print:
   - How many total passwords there are (`len(passwords)`).
   - How many **unique** passwords there are (`len(password_set)`).
4. Optionally, print the set of unique passwords.

## Hints

- Use `password_set = set(passwords)`.
- Use `len(...)` to count how many items are in a list or set.
