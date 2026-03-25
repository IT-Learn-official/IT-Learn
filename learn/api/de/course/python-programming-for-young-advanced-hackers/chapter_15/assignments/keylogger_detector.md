# Mission: Keylogger Detector

Track running processes and flag the risky ones.

## What your program should do

1. Define a class `Process`.
   - In `__init__(self, name, risk_level)`, store `self.name` and `self.risk_level` (1–10).
   - Add a `__str__(self)` method that returns something like:
     - `"Process(name='discord.exe', risk_level=2)"`.

2. Define a class `SecurityMonitor`.
   - In `__init__(self)`, create `self.processes` as an empty list.
   - Add a method `add_process(self, process)` that appends a `Process` to `self.processes`.
   - Add a method `high_risk_processes(self, min_risk)` that:
     - Builds and **returns** a new list of `Process` objects whose `risk_level` is greater than or equal to `min_risk`.

3. In your main code:
   - Create a `SecurityMonitor`.
   - Add at least **five** `Process` objects with different names and risk levels.
   - Call `high_risk_processes(7)` and save the returned list.
   - Loop over the high-risk processes and print a warning for each, for example:
     - `"WARNING: high-risk process detected: <process>"`.

## Stretch goals (optional)

- Add a method `remove_process_by_name(self, name)` that removes **all** processes with that name from the list.
- Add a method `summary(self)` that returns a string like:
  - `"Total processes: 5, high risk (>=7): 2"`.
- Give `SecurityMonitor` a `__str__(self)` method that returns the summary string.

