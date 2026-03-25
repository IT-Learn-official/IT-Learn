# Assignment: SQL Syntax Detective

## 🎯 Objective
Develop your SQL debugging skills by identifying and fixing common syntax errors in SELECT statements.

## 📋 Instructions

Below are several SQL queries that contain errors. Your job is to:
1. Identify what's wrong with each query
2. Explain the error
3. Write the corrected version

## 🐛 Part 1: Find and Fix the Bugs

### Query 1: Missing Something?
```sql
SELECT username, level FROM hackers
```

**What's wrong?**
```
Your answer:
```

**Corrected query:**
```sql
-- Write the corrected version:
```

---

### Query 2: Word Order Confusion
```sql
SELECT FROM hackers username;
```

**What's wrong?**
```
Your answer:
```

**Corrected query:**
```sql
-- Write the corrected version:
```

---

### Query 3: Comma Catastrophe
```sql
SELECT username level FROM hackers;
```

**What's wrong?**
```
Your answer:
```

**Corrected query:**
```sql
-- Write the corrected version:
```

---

### Query 4: Extra Comma
```sql
SELECT username, level, FROM hackers;
```

**What's wrong?**
```
Your answer:
```

**Corrected query:**
```sql
-- Write the corrected version:
```

---

### Query 5: Missing Table
```sql
SELECT username, level;
```

**What's wrong?**
```
Your answer:
```

**Corrected query:**
```sql
-- Write the corrected version:
```

---

### Query 6: Spelling Mistake
```sql
SELCT username FROM hackers;
```

**What's wrong?**
```
Your answer:
```

**Corrected query:**
```sql
-- Write the corrected version:
```

---

## 🎓 Part 2: Build Correct Queries

Now that you've fixed errors, write correct queries from scratch:

### Task 2.1
Write a query to select `skill_name` and `points` from the `skills` table.

```sql
-- Your query:
```

---

### Task 2.2
Write a query to select all columns from the `projects` table.

```sql
-- Your query:
```

---

### Task 2.3
Write a query to select `username`, `level`, and `xp_points` from the `hackers` table.

```sql
-- Your query:
```

---

## 🔍 Part 3: Error Prevention

Answer these questions to help prevent future errors:

1. **Semicolon Rule**: Why is the semicolon important at the end of SQL statements?
```
Your answer:
```

2. **Comma Placement**: Where should commas go when selecting multiple columns?
```
Your answer:
```

3. **FROM Clause**: What happens if you forget the FROM clause?
```
Your answer:
```

4. **Column Names**: What should you check if you get an error about an "unknown column"?
```
Your answer:
```

---

## 💡 Part 4: Create Your Own

Write a query that includes THREE intentional errors, then have a friend or yourself (later) find and fix them.

### Your Buggy Query:
```sql
-- Write a query with 3 errors:
```

### List Your Intentional Errors:
1. 
2. 
3. 

### The Corrected Version:
```sql
-- Write the fixed version:
```

---

## ✅ Common Error Patterns

Learn to recognize these common mistakes:

| Error Type | Example | Fix |
|------------|---------|-----|
| Missing semicolon | `SELECT * FROM users` | Add `;` at the end |
| Missing comma | `SELECT name age FROM users;` | `SELECT name, age FROM users;` |
| Extra comma | `SELECT name, age, FROM users;` | Remove the trailing comma |
| Wrong order | `SELECT FROM users name;` | `SELECT name FROM users;` |
| Misspelled keyword | `SELCT * FROM users;` | `SELECT * FROM users;` |
| Missing FROM | `SELECT name;` | `SELECT name FROM users;` |

---

## 🏆 Mastery Checklist

You've mastered this assignment when you can:
- [ ] Spot syntax errors quickly
- [ ] Explain why each error is wrong
- [ ] Write correct queries consistently
- [ ] Fix errors without looking at examples
- [ ] Help others debug their queries

---

## 🎓 Bonus Challenge: Error Messages

Try running some of the buggy queries in the SQL editor and read the error messages. Write down:

1. What error message did you see?
2. Was the message helpful?
3. Could you figure out the problem from the message?

**Example:**
```
Query: SELECT username level FROM hackers;
Error Message: [Write what you see]
Meaning: [Explain in your own words]
```

---

## 💭 Reflection Questions

1. Which type of error was hardest to spot? Why?
2. What strategy will you use to avoid these errors in the future?
3. How do error messages help you debug?
4. What's the first thing you check when a query doesn't work?

---

## 📚 Key Takeaways

Remember the SQL SELECT syntax pattern:
```sql
SELECT column1, column2, column3
FROM table_name;
```

- Keywords: SELECT, FROM (usually UPPERCASE)
- Columns: Separated by commas, no comma after the last one
- Table name: After FROM
- Semicolon: Always at the end

Practice makes perfect! The more queries you write, the more natural the syntax becomes.

