# Mission: Share the Loot

You and your friends just hacked a game and discovered a secret treasure chest full of coins. Now you need a Python script to share the loot **fairly**.

You're going to use **integer division** (`//`) and **remainder** (`%`) to figure out how many coins each player gets and how many are left over.

---

## Your Task

1. Open the starter file `attachments/share_the_loot.py`.
2. Inside the file, set up two variables:

   ```python
   total_coins = 17   # you can change this later
   players = 4        # you can change this too
   ```

3. Use math to compute:

   ```python
   coins_per_player = total_coins // players
   leftover_coins = total_coins % players
   ```

4. Use `print` to show a friendly summary, for example:

   ```python
   print("Each player gets", coins_per_player, "coins.")
   print("Leftover coins:", leftover_coins)
   ```

5. Run the script and check that the results make sense.

---

## Hints

- `//` tells you **how many whole times** `players` fits into `total_coins`.
- `%` tells you **what's left over** after you share.
- Try drawing it on paper if you're not sure. For 17 coins and 4 players:
  - Each player gets 4 coins (4 + 4 + 4 + 4 = 16)
  - 1 coin is left over

---

## Experiments

- Change `total_coins` and `players` to different numbers.
- What happens when `players` is `1`?
- What happens when `total_coins` is exactly divisible by `players` (like 20 and 5)?

> Achievement idea: You just turned Python into a **loot sharing calculator** for your game.

