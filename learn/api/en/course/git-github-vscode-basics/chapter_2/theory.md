# Setting Up Git and VS Code

You can use Git in two places:
- the terminal (commands)
- VS Code (buttons + diffs)

Before you start, set your Git name and email.
This is what Git writes into your commits.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

This is not your GitHub password.
It is just your commit signature.

---

In VS Code, open **Source Control** to:
- see changed files
- stage changes
- write commit messages

Diff colors usually mean:
- green = added
- red = removed

One warning: the `.git` folder stores the history.
If you delete `.git`, the repo history is gone.
