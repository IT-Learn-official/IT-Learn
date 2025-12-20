# Mission: Online vs Chat Users

Some users are online, some are in chat, and some are both.

## What your program should do

1. Start with two sets, for example:
   - `online_users = {"anna", "bob", "clara"}`
   - `chat_users = {"bob", "dave"}`
2. Find the users who are **both** online and in chat (intersection).
3. Print the result.
4. Check if a particular user (for example, `"clara"`) is in `chat_users` using the `in` operator and print a message.

## Hints

- Intersection: `both = online_users & chat_users`.
- Membership: `"clara" in chat_users` returns `True` or `False`.
