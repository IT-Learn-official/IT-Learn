# Good Habits: Clean History and Clear Messages

Git history is for humans.
Make it easy to read.

Good commit messages are short and specific:

- bad: `i did something cool`
- good: `Fix navbar spacing on mobile`

Try to keep commits small: one idea per commit.

---

Most repos have a `README.md`.
Even 5 lines help people understand the project.

When you reach a stable point, you can tag it:

```bash
git tag v1.0.0
```

and after that, you can push the tag:

```bash
git push origin v1.0.0
```

In VS Code, always look at the diff before you commit.
