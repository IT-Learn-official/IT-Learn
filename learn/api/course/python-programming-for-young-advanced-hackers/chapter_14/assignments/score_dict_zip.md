# Mission: Combine Names and Scores with zip

Use zip to combine two lists into a score dictionary.

## What your program should do

1. Start with two lists of the same length, for example:
   - `names = ["Mia", "Alex", "Zed"]`
   - `scores = [10, 15, 7]`
2. Use `zip(names, scores)` to pair each name with its score.
3. Build a dictionary `score_map` mapping each name to its score.
4. Print the dictionary.

## Hints

- You can do `score_map = dict(zip(names, scores))`.
- Or use a dict comprehension: `{name: score for name, score in zip(names, scores)}`.

