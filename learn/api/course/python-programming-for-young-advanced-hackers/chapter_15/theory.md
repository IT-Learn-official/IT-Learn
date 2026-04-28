# Chapter 15: Object-Oriented Programming – Modeling the Digital World

Welcome back, hacker. So far you’ve written scripts that do one mission at a time: scan something, crack something, automate something. In this chapter, you’ll learn how to **model whole worlds** in code. With **Object-Oriented Programming (OOP)**, you don’t just write loose functions—you build digital versions of things like users, servers, firewalls, Discord bots, and even whole game systems.

Think of it like Minecraft but for code: instead of placing blocks, you design **blueprints** (`classes`) and then spawn actual **objects** from them.

By the end of this chapter, you’ll be able to:

- Define custom **classes** as blueprints for your own digital models.
- Use the `__init__()` constructor to create new **objects** with their own data.
- Store information in **attributes** (an object’s properties).
- Define **methods** (an object’s abilities / actions).
- Create and manage multiple unique objects from the same class.

---

## 1. Why Use Classes and Objects?

Imagine you’re modeling a small network for a school project. You have multiple servers, and each server has:

- an IP address
- an operating system
- a list of open ports
- an online/offline status

Without OOP, you might end up with a bunch of variables and dictionaries lying around:

```python
server1_ip = "192.168.1.10"
server1_os = "Linux"

server2_ip = "192.168.1.20"
server2_os = "Windows"
```

This gets **messy fast**. What if you have 10 servers? 50? What if each server needs more info later, like a location or owner?

With OOP, you create a `Server` **class** once, and then you spawn as many `Server` **objects** as you want. All the data and behavior for each server lives in a neat, self-contained unit.

> Key takeaway: OOP lets you bundle data and behavior together into clean, reusable "things" (objects) instead of juggling tons of separate variables.

---

## 2. Classes vs. Objects: Blueprints and Instances

- A **class** is the **blueprint**. It defines what all objects of that type *have* and *can do*. A `Server` class might say: every server has an IP, an OS, and can be pinged.
- An **object** (or **instance**) is a **real thing** created from that blueprint. `server1` and `server2` are two different objects from the `Server` class, each with its own IP and OS.

You define a class with the `class` keyword:

```python
class Server:
    # This is the blueprint for all Server objects.
    # We’ll fill it in next.
    pass
```

Right now this class doesn’t do anything, but it’s the skeleton we’ll attach data and behavior to.

> Key takeaway: A class is the design; an object is a specific copy of that design living in memory.

---

## 3. The `__init__` Method: Forging a New Object

When you "spawn" a new object from a class, Python can automatically run a setup function to prepare it. That special function is called `__init__()` and is known as the **constructor**.

```python
class Server:
    # The constructor method
    def __init__(self, ip_address, os):
        print(f"New Server object created for {ip_address}...")

        # Attributes: data stored on the object
        self.ip = ip_address
        self.os = os
        self.is_online = True
```

Let’s unpack this:

- `def __init__(self, ip_address, os):`
  - `__init__` runs **automatically** when you create a new `Server`.
  - `ip_address` and `os` are details you pass in when creating the server.
- `self`
  - `self` is Python’s way of saying "this specific object".
  - When you set `self.ip`, you’re attaching that IP address to **this** `Server` instance.
- `self.ip`, `self.os`, `self.is_online`
  - These are **attributes**: variables that live **on the object itself**.

Now you can actually create objects:

```python
# Create two server objects from the Server blueprint
server1 = Server("192.168.1.10", "Linux")
server2 = Server("10.0.0.5", "Windows Server")

# Access their attributes using dot notation
print(f"{server1.ip} is running {server1.os}")
print(f"{server2.ip} is running {server2.os}")
```

This is like having two separate Discord servers: same platform, totally different content and settings.

> Key takeaway: `__init__` sets up each new object’s starting data, using `self` to attach attributes to that specific instance.

---

## 4. Methods: An Object’s Abilities

**Methods** are functions defined *inside* a class. They describe what an object can **do**. Every method takes `self` as the first parameter so it can access and modify the object’s own attributes.

```python
class Server:
    def __init__(self, ip_address, os):
        self.ip = ip_address
        self.os = os
        self.is_online = True

    # A method to simulate a ping
    def ping(self):
        if self.is_online:
            print(f"Ping to {self.ip}... Success!")
        else:
            print(f"Ping to {self.ip}... Failed. Host is offline.")

    # A method to take the server offline
    def take_offline(self):
        print(f"Taking {self.ip} offline.")
        self.is_online = False
```

Now use those methods on a specific server:

```python
server1 = Server("192.168.1.10", "Linux")

server1.ping()          # Calls the ping method on the server1 object
server1.take_offline()  # Changes server1’s is_online attribute
server1.ping()          # Behavior has now changed
```

Notice how this looks like using methods on other objects you already know from real life:

- `playlist.shuffle()` on Spotify
- `message.reply()` in a chat app
- `player.jump()` in a game engine

Behind the scenes, those are all objects with methods too.

> Key takeaway: Methods are actions that belong to an object and can read/change that object’s data through `self`.

---

## 5. Multiple Objects, Same Blueprint

The real power of OOP is that you can create **many** objects from one class, each with its own state but the same abilities.

```python
server1 = Server("192.168.1.10", "Linux")
server2 = Server("10.0.0.5", "Windows")

# Take server2 offline, but server1 remains online
server2.take_offline()

server1.ping()  # Output: Ping to 192.168.1.10... Success!
server2.ping()  # Output: Ping to 10.0.0.5... Failed. Host is offline.
```

`server1` and `server2` both come from the same `Server` class, but they act based on their **own** attributes. Changing one doesn’t magically change the other.

You can easily imagine this in a game: each `Player` has its own `health`, `position`, and `inventory`, but all players share the same rules for `move()`, `attack()`, or `heal()`.

> Key takeaway: One class can generate many independent objects. Each object has its own data, but they all share the same methods.

---

## 6. `__str__`: A Readable Representation

When you `print()` an object without any extra setup, Python shows something like `<__main__.User object at 0x00000123>`. That’s useful for the computer, but totally scuffed for humans.

You can fix this by defining the `__str__()` method in your class. It returns the **nice string version** of your object.

```python
class User:
    def __init__(self, username, role):
        self.username = username
        self.role = role

    def __str__(self):
        return f"User(username='{self.username}', role='{self.role}')"

# Now, printing the object is informative
admin_user = User("root", "administrator")
print(admin_user)  # Output: User(username='root', role='administrator')
```

This is extremely handy for debugging. Instead of guessing what’s inside your object, you just `print()` it and get a readable summary.

> Key takeaway: Implement `__str__` when you want your objects to print in a clean, human-friendly way.

---

## Common Bugs When Starting With OOP

When you first start writing classes, a few mistakes pop up all the time. Here’s a mini debugging guide.

### 1. Forgetting `self` in methods

```python
class Server:
    def __init__(self, ip_address):
        self.ip = ip_address

    def ping():  # ❌ missing self
        print(f"Pinging {self.ip}")
```

Python will complain with an error like:

```text
TypeError: ping() takes 0 positional arguments but 1 was given
```

Fix it by adding `self`:

```python
    def ping(self):  # ✅ self added
        print(f"Pinging {self.ip}")
```

### 2. Forgetting to use `self.` when setting attributes

```python
class Server:
    def __init__(self, ip_address):
        ip = ip_address  # ❌ creates a local variable, not an attribute
```

This means your object doesn’t actually remember the IP.

The fix:

```python
class Server:
    def __init__(self, ip_address):
        self.ip = ip_address  # ✅ stored on the object
```

### 3. Mixing up class vs. instance

Remember: `Server` (capital S) is the **class**, `server1` is the **object**.

```python
Server.ip = "192.168.1.10"  # ❌ doesn’t do what you think
server1 = Server("192.168.1.10", "Linux")  # ✅ correct way
```

> Key takeaway: When Python throws weird errors in OOP code, check your `self` usage and make sure you’re working with objects (instances), not just the class.

---

## Summary

In this chapter, you leveled up from writing standalone scripts to building digital models of the world around you.

- A **class** is a blueprint for creating objects (for example, `class Server:`).
- An **object** (instance) is a specific copy created from a class (like `server1 = Server(...)`).
- The `__init__(self, ...)` constructor sets up a new object’s starting data.
- **Attributes** (like `self.ip`) are variables attached to each object.
- **Methods** (like `def ping(self):`) are actions an object can perform using its own data.
- `self` always refers to *this* specific object instance inside a method.
- `__str__` lets you control how your object is displayed when you print it.

> Achievement Unlocked: You can now design your own data types with classes and bring them to life as objects—just like the systems behind your favorite games, apps, and Discord bots.
