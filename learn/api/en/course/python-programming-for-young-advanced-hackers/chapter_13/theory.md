# Chapter 13: Functions: Building Your Own Tools

Welcome, hacker. You've been using Python's built-in tools, but a true master builds their own. In this chapter, you'll learn to create **functions**—reusable, named blocks of code that act as your own custom scripts and tools. This is how you stop repeating yourself and start building a powerful, personal arsenal of code.

By the end of this chapter, you’ll be able to:

- Define your own functions with `def`.
- Use **parameters** to pass data to your functions.
- Use **return values** to get data back from your functions.
- Set **default parameters** to make your tools more flexible.
- Combine functions to build more complex programs.

---

## 1. Why Build Functions?

Imagine you have a sequence of commands you run frequently, like scanning a target for open ports. You could copy and paste the code every time, but that's inefficient and messy.

A **function** lets you package that sequence of commands, give it a name, and run it anytime, anywhere, with a single line of code.

Functions allow you to:
- **D.R.Y. (Don't Repeat Yourself):** Write code once, use it forever.
- **Organize:** Break a large, complex script into smaller, manageable, and understandable parts.
- **Abstract:** Hide complex logic behind a simple name. You don't need to know *how* `scan_target()` works, only that it *does*.

---

## 2. Defining Your First Tool

You define a function using the `def` keyword.

```python
# Define a function to display a mission briefing
def display_briefing():
    print("Mission: Infiltrate the target network.")
    print("Objective: Locate the 'flag.txt' file.")
    print("Warning: Avoid detection.")
```
- `def` is the keyword to **def**ine a function.
- `display_briefing` is the name of your new tool.
- `()` holds the parameters (inputs), which are empty for now.
- `:` and the **indented block** below it define what the function *does*.

Defining a function doesn't run it. It just adds the tool to your arsenal. To run it, you must **call** it by its name:
```python
display_briefing()
```

---

## 3. Parameters: Passing Arguments to Your Tools

A tool that does the same thing every time is limited. A tool that can accept different inputs is powerful. **Parameters** are the variables a function accepts as input.

```python
# A function that can ping any target
def ping_target(ip_address):
    print(f"Pinging {ip_address}...")
    # In a real script, you'd have ping logic here
    print("Target is responsive.")

# Call the function with different arguments
ping_target("192.168.1.1")
ping_target("google.com")
```
- In the function definition, `ip_address` is a **parameter**.
- When you call the function, `"192.168.1.1"` is an **argument**.

You can have multiple parameters:
```python
def attempt_login(username, password):
    print(f"Attempting login for user '{username}' with password '{password}'...")
    # Login logic would go here

attempt_login("admin", "12345")
```

---

## 4. `return`: Getting Intelligence Back

Printing to the screen is useful for status updates, but a truly powerful tool gives you data back that you can use in your script. The `return` statement is how a function sends a result back to the caller.

```python
# A function to check if a port is in the standard web port range
def is_web_port(port):
    if port == 80 or port == 443:
        return True
    else:
        return False

# Call the function and store its return value
port_to_check = 443
result = is_web_port(port_to_check)

if result == True:
    print(f"Port {port_to_check} is a standard web port. Begin web enumeration.")
else:
    print(f"Port {port_to_check} is not a standard web port.")
```
- The `return` keyword immediately ends the function and sends the specified value back.
- The code that called the function can then store this value in a variable (`result`) and use it to make decisions.

**`print` vs. `return`:**
- `print()` displays information for the human user.
- `return` sends data back to the program itself.

---

## 5. Default Parameters: Making Tools More Flexible

You can provide a **default value** for a parameter. If the caller doesn't provide an argument for that parameter, the default value is used automatically.

```python
# A tool to scan a target, defaulting to a quick scan
def scan_target(ip, scan_type="quick"):
    print(f"Starting '{scan_type}' scan on {ip}...")
    # Scanning logic here

# Call without specifying scan_type uses the default
scan_target("192.168.1.100")

# Override the default by providing an argument
scan_target("192.168.1.200", scan_type="deep")
```
This makes your functions more versatile without requiring the user to provide every single argument every time.

---

## 6. Building Complex Operations

The real power of functions comes from combining them. You can use the return value of one function as the argument for another, creating a chain of operations.

```python
def get_open_ports(ip):
    # Simulating a port scan
    print(f"Scanning {ip}...")
    return [22, 80, 443] # Returns a list of open ports

def analyze_port(port):
    if port == 22:
        return "SSH - Potential remote access."
    elif port == 80 or port == 443:
        return "HTTP/S - Web server detected."
    else:
        return "Unknown service."

# --- Main Script Logic ---
target_ip = "10.0.0.1"
open_ports = get_open_ports(target_ip) # Call the first function

print(f"Analysis for {target_ip}:")
for port in open_ports:
    analysis_result = analyze_port(port) # Call the second function in a loop
    print(f"  - Port {port}: {analysis_result}")
```

---

## Summary

- **Functions (`def`)** are your way of creating reusable, named tools.
- **Parameters** are the inputs your tools accept.
- **Arguments** are the actual values you pass when you call a function.
- **`return`** is how your tools give data back to your main script.
- **Default parameters** provide sensible defaults, making your functions easier to use.

By packaging your logic into functions, you elevate your code from a simple script to a well-organized, powerful program.
