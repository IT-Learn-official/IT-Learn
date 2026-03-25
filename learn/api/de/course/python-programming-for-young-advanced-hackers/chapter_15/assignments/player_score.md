# Mission: Player with Score

Create a Player class that can track and change a score.

## What your program should do

1. Define a class `Player`.
2. In `__init__(self, name, score)`, store the values in `self.name` and `self.score`.
3. Add a method `add_score(self, points)` that increases `self.score` by `points`.
4. Add a method `reset_score(self)` that sets `self.score` back to 0.
5. In your main code:
   - Create a Player.
   - Call `add_score` a few times.
   - Print the score.
   - Call `reset_score` and print the score again.

## Hints

- Inside methods, always use `self.score`, not just `score`.
- Use `self.score += points` to add points.

