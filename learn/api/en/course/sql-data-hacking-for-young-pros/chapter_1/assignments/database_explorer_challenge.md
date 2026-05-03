# Assignment: Database Explorer Challenge

## 🎯 Objective

Practice exploring multiple tables and understanding their relationships by writing various SELECT queries.

## 📋 Instructions

You're working with three tables:

- `hackers` - Information about hackers
- `skills` - Different skills that can be learned
- `projects` - Hacking projects and challenges

Your mission: Explore each table and understand what data they contain.

## 🔍 Part 1: The Hackers Table

### Task 1.1: Complete Overview

Write a query to see all data in the `hackers` table.

```sql
-- Your query:
```

### Task 1.2: Identity Check

Write a query to see only the `username` and `email` columns.

```sql
-- Your query:
```

### Task 1.3: Stats View

Write a query to see `username`, `level`, and `xp_points` columns.

```sql
-- Your query:
```

---

## 🛠️ Part 2: The Skills Table

### Task 2.1: Full Inventory

Write a query to see all available skills.

```sql
-- Your query:
```

### Task 2.2: Skill Categories

Write a query to see only `skill_name` and `category`.

```sql
-- Your query:
```

### Task 2.3: Difficulty Rating

Write a query to see `skill_name`, `difficulty`, and `points`.

```sql
-- Your query:
```

---

## 💼 Part 3: The Projects Table

### Task 3.1: All Projects

Write a query to view all columns from the `projects` table.

```sql
-- Your query:
```

### Task 3.2: Project Names

Write a query to see only the `project_name` column.

```sql
-- Your query:
```

### Task 3.3: Project Details

Write a query to see `project_name`, `status`, and `difficulty`.

```sql
-- Your query:
```

---

## 📊 Part 4: Analysis Questions

After exploring all three tables, answer these questions:

1. **Data Relationships**: Do you notice any connections between the tables? Which columns might link them together?

2. **Primary Keys**: What column in each table appears to be the primary key?

3. **Data Types**: What kinds of data types do you see? (numbers, text, dates?)

4. **Table Purposes**:
   - What is the `hackers` table used for?
   - What is the `skills` table used for?
   - What is the `projects` table used for?

5. **Column Naming**: Do you notice any naming patterns in the columns? (like using underscores, or 'id' for identifiers?)

---

## 🎓 Bonus Challenges

### Challenge 1: Custom Selection

From the `hackers` table, select any 4 columns of your choice (not just the ones mentioned above).

```sql
-- Your creative query:
```

### Challenge 2: Different Order

Write a query that selects columns from the `skills` table, but display them in reverse alphabetical order compared to how they appear in the table.

```sql
-- Your query:
```

### Challenge 3: Single Column from Each

Write three separate queries, each selecting a single different column from each of the three tables.

```sql
-- Query 1 (from hackers):


-- Query 2 (from skills):


-- Query 3 (from projects):
```

---

## ✅ Completion Checklist

Mark each item as you complete it:

- [ ] Completed all queries in Part 1
- [ ] Completed all queries in Part 2
- [ ] Completed all queries in Part 3
- [ ] Answered all analysis questions
- [ ] Attempted at least one bonus challenge
- [ ] All queries run without errors
- [ ] Understood the purpose of each table

---

## 💡 Tips for Success

1. **Test Each Query**: Run each query immediately after writing it to check for errors
2. **Compare Results**: Look at the differences between `SELECT *` and selecting specific columns
3. **Note Column Names**: Keep a list of column names for each table - you'll use them later
4. **Understand the Data**: Don't just copy queries - read and understand what each table contains

---

## 🏆 Mastery Goals

You've mastered this assignment when you can:

- ✅ Write SELECT queries for any table without looking at examples
- ✅ Choose the right columns based on what information you need
- ✅ Identify the structure and purpose of a table by querying it
- ✅ Switch between different tables confidently
- ✅ Explain what each table stores and why

---

## 📝 Reflection

1. Which table was most interesting to explore? Why?
2. What surprised you about the data organization?
3. How does seeing data in tables compare to working with spreadsheets?
4. What other information would you like to see in these tables?

---

## 🎯 Real-World Connection

In real development:

- **Hackers table** = Users table (storing user accounts)
- **Skills table** = Course catalog or product inventory
- **Projects table** = Orders, tasks, or assignments

Understanding table structures is the first step to building powerful applications!
