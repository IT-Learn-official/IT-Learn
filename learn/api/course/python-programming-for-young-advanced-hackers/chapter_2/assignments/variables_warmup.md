# Mission: Name Your Secret Numbers

In chapter 1 you made Python say things. Now you're going to make Python **remember** some numbers for you.

In this mission, you'll create a few variables and print them out like a mini "status screen" for a game.

---

## Your Task

1. Open the starter file `attachments/variables_warmup.py`.
2. Create at least **three** variables:
   - One integer (a whole number), like `lives = 3`.
   - One float (a number with a decimal), like `speed = 1.5`.
   - One more number of your choice (coins, level, health, etc.).
3. Use `print` to show each variable with a label. For example:

   ```python
   print("Lives:", lives)
   print("Speed:", speed)
   ```

   or

   ```python
   print("Lives: " + str(lives))
   ```

4. Run the script and check that your "status screen" looks good.

---

## Hints

- Remember: **variables are named boxes** that hold values.
- Use names that make sense, like `player_health`, not just `x`.
- If you see an error when you mix text and numbers, try using `str(...)` or commas in `print`.

---

## Bonus Challenges

- Add more stats: `coins`, `level`, `enemy_health`, anything you like.
- Change the values and run the script again. Watch how your output changes.
- Try updating a variable, like:

  ```python
  coins = 10
  coins = coins + 5
  print("Coins:", coins)
  ```

  What does it show now?

> Achievement idea: You just built your first tiny **game status panel** using Python variables.

