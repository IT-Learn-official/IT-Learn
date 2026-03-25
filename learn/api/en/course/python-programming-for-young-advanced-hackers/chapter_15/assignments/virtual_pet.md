# Mission: Your First Virtual Pet

Create a simple virtual pet that can get hungry and be fed.

## What your program should do

1. Define a class `Pet`.
2. In `__init__(self, name)`, set `self.name` and start `self.hunger` at 0.
3. Add a method `feed(self, amount)` that reduces `self.hunger` by `amount`, but not below 0.
4. Add a method `status(self)` that returns a message based on hunger, for example:
   - If hunger is 0: `"{name} is full."`
   - If hunger is between 1 and 5: `"{name} is a bit hungry."`
   - If hunger is higher: `"{name} is very hungry!"`
5. In your main code, create a Pet, manually change hunger a bit, call `feed`, and print `status()` before and after.

## Hints

- To keep hunger from going below 0, you can use:
  - `self.hunger = max(0, self.hunger - amount)`.

