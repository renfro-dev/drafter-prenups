# Git Workflow Guide

Quick reference for managing code between GitHub and Replit.

## One-Time Setup

### In Replit (Console)
```bash
# Set pull strategy to avoid "divergent branches" errors
git config pull.rebase false
```

### In Local Repo (with Claude Code)
```bash
# Ignore .replit file changes to prevent conflicts
git update-index --assume-unchanged .replit
```

## Daily Workflow

### Starting Work (ALWAYS DO THIS FIRST)
```bash
git pull origin main
```

### After Making Changes
```bash
git add .
git commit -m "Description of what you changed"
git push origin main
```

### If Push is Rejected
```bash
# Someone else pushed first (e.g., Claude made changes)
git pull origin main  # This will auto-merge
git push origin main
```

## Best Practices

### ✅ DO
- **Always pull before starting work**
- Commit frequently with clear messages
- Work in one place at a time (Replit OR local with Claude)
- Pull before making changes in either environment

### ❌ DON'T
- Edit code in both Replit and local simultaneously
- Go days without pulling
- Force push (`git push --force`) unless absolutely necessary

## Common Scenarios

### Scenario 1: Working in Replit Only
```bash
# Start of session
git pull origin main

# Make changes in Replit editor
# ...

# End of session
git add .
git commit -m "Add user authentication"
git push origin main
```

### Scenario 2: Claude Makes Changes Locally
```bash
# Claude pushes changes to GitHub
# Then in Replit:
git pull origin main
# Your Replit code is now updated
```

### Scenario 3: Merge Conflict
If you see conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`):

1. Open the conflicted file in Replit
2. Look for conflict markers
3. Choose which version to keep (or combine them)
4. Remove the conflict markers
5. Commit the resolved file:
```bash
git add .
git commit -m "Resolve merge conflict"
git push origin main
```

## Quick Commands Reference

```bash
# Check status
git status

# See what changed
git diff

# View commit history
git log --oneline -10

# Undo uncommitted changes
git restore .

# See remote branches
git branch -a

# Pull latest without merge commit
git pull origin main --rebase
```

## Troubleshooting

### "divergent branches" error
```bash
git pull origin main --no-rebase
```

### Accidentally committed to wrong branch
```bash
git log  # Find the commit hash
git reset --soft HEAD~1  # Undo last commit, keep changes
```

### Want to see what's on GitHub vs local
```bash
git fetch origin
git diff main origin/main
```

### Nuclear option (reset local to match GitHub exactly)
```bash
# WARNING: This deletes all local changes
git fetch origin
git reset --hard origin/main
```
