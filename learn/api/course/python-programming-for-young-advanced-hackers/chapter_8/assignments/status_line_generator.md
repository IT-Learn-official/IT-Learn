# Mission: Status Line Generator

Generate a status line that combines several pieces of information.

## What your program should do

1. Start with variables like `filename`, `size_kb`, and `status`.
2. Use an **f-string** to build a single line of text that includes all of them.
3. Print something like:
   - `File "log.txt" (12 KB) – status: OK`

## Hints

- Remember to put `f` before the string: `f"...{variable}..."`.
- You can include quotes inside the string by using different quote types, for example:
  - `f'File "{filename}" ({size_kb} KB) – status: {status}'`.
