# Mission: Set vs List Detective

Compare a list with duplicates to a set with unique items.

## What your program should do

1. Start with a list that has duplicate items, for example:
   - `items_list = ["usb", "laptop", "usb", "phone"]`
2. Create a set called `items_set` from the list.
3. Print both `items_list` and `items_set` to see the difference.
4. Use the `in` operator to check if a particular item (like `"usb"`) is in `items_set` and print a message.

## Hints

- Convert with `items_set = set(items_list)`.
- Use `"usb" in items_set` to check membership.
