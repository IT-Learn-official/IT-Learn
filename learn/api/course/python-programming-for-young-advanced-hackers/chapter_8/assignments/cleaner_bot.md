# Mission: Cleaner Bot

Write a bot that cleans up messy text.

## What your program should do

1. Start from some prepared strings with extra spaces or unwanted words.
2. Use `.strip()` to remove extra spaces from the start and end.
3. Use `.replace(old, new)` to hide or change certain words.
4. Use `.split(",")` on a comma-separated string and print each item on its own line.

## Hints

- `text.strip()` removes spaces at the beginning and end.
- `text.replace("virus", "[REDACTED]")` replaces all occurrences of "virus".
- `items.split(",")` turns "a,b,c" into a list `["a", "b", "c"]`.
