# Mission: High Score Table (List of Dicts)

Create and print a simple high score table.

## What your program should do

1. Start with a list of player dictionaries, for example:
   - `scores = [{"name": "Mia", "score": 15}, {"name": "Zed", "score": 20}]`
2. Add at least one more player dictionary to the list.
3. Loop through the list and print lines like:
   - `Mia: 15 points`

## Hints

- Use `scores.append({...})` to add a new player.
- Inside the loop, use `player["name"]` and `player["score"]`.
- An f-string can make the print line neat and readable.
