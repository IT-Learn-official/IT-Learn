# Mission: Message Analyzer

Analyze a secret message using indexing, slicing, and case changes.

## What your program should do

1. Start from a given message string in the code (for example: `"Top Secret: HACK THE PLANET"`).
2. Print:
   - The **first** character.
   - The **last** character.
   - A slice of the message that contains the secret word.
3. Print the whole message in **lowercase** and then in **UPPERCASE**.

## Hints

- Use `message[0]` for the first character.
- Use `message[-1]` for the last character.
- Use `message[start:end]` to get a slice.
- Use `message.lower()` and `message.upper()`.
