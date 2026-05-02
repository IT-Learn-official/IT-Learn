# Mission: Virus Scanner Overlap

Two virus scanners find different sets of virus names. You want to know which viruses
were found by both scanners, and which viruses were found in total.

## What your program should do

1. Start with two sets, for example:
   - `scanner_a = {"virus1", "virus2", "virus3"}`
   - `scanner_b = {"virus2", "virus3", "virus4"}`
2. Use **intersection** to find viruses found by **both** scanners.
3. Use **union** to find **all** different viruses that were found.
4. Print both sets with clear labels.

## Hints

- Intersection: `both = scanner_a & scanner_b`.
- Union: `all_viruses = scanner_a | scanner_b`.
