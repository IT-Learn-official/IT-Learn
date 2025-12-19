# Mission: String vs Number Detective

Some values *look* like numbers but are actually **strings**. Your job is to be a data type detective and convert them correctly.

## Starter idea

You have three variables:

```python
raw_age = "13"      # looks like a number, but is a string
raw_score = "250"   # also a string
bonus = 5            # an int
```

## Your tasks

1. Convert `raw_age` and `raw_score` into real numbers using `int()` (or `float()` if you prefer).
2. Store the converted values in new variables (for example, `age` and `score`).
3. Create a new variable `total_score` that adds `score` and `bonus`.
4. Print out clearly labeled lines, for example:
   - `Age: 13`
   - `Score: 250`
   - `Total score: 255`
5. Build one final message that mixes text and numbers, for example:

```python
print("You are " + str(age) + " years old and your score is " + str(score))
```

You can change the story (make it coins, points, levels, etc.), but you must:

- Convert at least **two** string values into numbers.
- Do at least **one** numeric calculation.
- Use `str()` or commas in `print` to mix text and numbers safely.

## Goal

When you run your script, you should see:

- The converted numbers.
- A correct total.
- At least one friendly sentence that glues text and numbers together **without** causing a `TypeError`.

