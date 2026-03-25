# Mission: Make Objects Print Nicely

Give a class a friendly string representation.

## What your program should do

1. Start from a simple class (for example, a `Player` or `Book` class) with some attributes.
2. Add a `__str__(self)` method that returns a short, readable summary string.
3. Create one or more objects of that class and use `print(obj)` to show the summary.

## Hints

- `__str__` should return a string, not print it.
- Inside `__str__`, you can use an f-string like:
  - `return f"Player {self.name} (score: {self.score})"`.

