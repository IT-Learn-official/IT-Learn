# Mission: Mini Shop Calculator

You are building a tiny shop calculator that works with prices and quantities.
The values arrive as **strings**, so you need to convert them before doing math.

## Starter idea

```python
price_str = "9.99"      # price of one item as text
quantity_str = "3"      # how many items as text
```

## Your tasks

1. Convert `price_str` to a float using `float()`.
2. Convert `quantity_str` to an int using `int()`.
3. Multiply them to get a `subtotal`.
4. Print the subtotal in a friendly way, for example:

```python
print("Subtotal:", subtotal)
```

Optional power-ups:

- Add a boolean `discount_active = True` or `False`.
- If a discount is active, print a second line like `Discount applied!`.

## Goal

When you run your script with the starter values, you should see something close to:

```text
Subtotal: 29.97
```

(Don't worry if Python prints `29.969999999` because of float math. That's normal.)

