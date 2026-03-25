# Mission: Filter Long Words and Uppercase Them

Take a list of words, keep only the long ones, and make them uppercase.

## What your program should do

1. Start with a list `words`, for example: `["cat", "dragon", "hat", "wizard"]`.
2. Keep only the words with length **5 or more**.
3. Convert those words to uppercase.
4. Store the result in a list and print it.

## Hints

- You can use `filter` + `map`:
  - `filter` to keep only long words.
  - `map` to turn them into uppercase.
- Or use one list comprehension:
  - `[word.upper() for word in words if len(word) >= 5]`.

