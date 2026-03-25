# Mission: Network Node Ping Game

Build a tiny network of nodes and ping between them.

## What your program should do

1. Define a class `Node`.
   - In `__init__(self, name, online=True)`, store `self.name` and `self.online`.
   - Add a method `go_offline(self)` that sets `self.online = False`.
   - Add a method `go_online(self)` that sets `self.online = True`.
   - Add a `__str__(self)` method that returns something like:
     - `"Node(name='Server-1', online=True)"`.

2. Define a class `Network`.
   - In `__init__(self)`, create `self.nodes` as an empty list.
   - Add a method `add_node(self, node)` that appends the `Node` to `self.nodes`.
   - Add a method `ping(self, from_name, to_name)` that:
     - Looks for the `Node` with name `from_name` and the `Node` with name `to_name` in `self.nodes`.
     - If either node is not found, prints `"Unknown node"` and returns.
     - If either node is offline (`online` is `False`), prints `"Ping failed: one of the nodes is offline."`.
     - Otherwise prints `"Ping from <from_name> to <to_name>: OK"`.

3. In your main code:
   - Create a `Network`.
   - Create at least **three** `Node` objects (for example: `"Laptop"`, `"Router"`, `"Server"`).
   - Add them to the network using `add_node`.
   - Call `ping` a few times to show:
     - pings that succeed when both nodes are online,
     - pings that fail after you take one node offline.

## Stretch goals (optional)

- Add a method `show_online(self)` that prints all currently online nodes.
- Give each `Node` a `latency` attribute (for example, milliseconds) and show it in `__str__`.
- Make `ping` print different messages depending on latency (for example, label anything over 100 ms as `"slow"`).

