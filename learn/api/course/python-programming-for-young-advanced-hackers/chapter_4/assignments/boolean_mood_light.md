# Mission: Boolean Mood Light

Booleans (`True` / `False`) are like tiny on/off switches in your program.
In this mission, you'll play with `bool()` and see what counts as "on" and "off".

## Starter idea

Use these variables (or make similar ones):

```python
is_happy = True
name = ""
coins = 0
message = "hi"
```

## Your tasks

1. For each variable, print:
   - its name
   - its value
   - `bool(value)`

   For example:

   ```python
   print("coins =", coins, "-> bool(coins) =", bool(coins))
   ```

2. Add at least **one more** variable of your own:
   - Maybe `streak_days = 5`
   - Or `nickname = "Shadow"`

3. Print the `bool(...)` of your new variable too.

You can use `repr(...)` for strings if you want to clearly see empty vs non-empty:

```python
print("name =", repr(name), "-> bool(name) =", bool(name))
```

## Goal

When you run your script, you should see:

- At least **four** lines of output.
- Each line shows a value and its boolean form from `bool(...)`.

Use this mission to get a feeling for which values are treated as **True** and which are **False**.

