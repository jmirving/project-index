# Agent Instructions (Codex)

## Mission
Implement tasks for this repo safely and incrementally.

## Source of truth
- Task list is in `TODO.md`.
- Use Beads (`bd`) to track task status and notes.
- Keep the site static: HTML/CSS/vanilla JS only.

## Constraints (hard)
- No frameworks (no React/Vue/etc.)
- No build step / bundler
- Must work on GitHub Pages
- No server-side code, no secrets, no env vars

## Workflow (do this every run)
1. Read `TODO.md` and identify the next incomplete task.
2. Check Beads for existing issue(s) for that task:
   - If missing, create a Beads issue with a clear title.
   - If present, update notes with what you plan to do.
3. Implement the smallest coherent change that completes that task.
4. Verify locally (at minimum: the page loads; JS renders; no console errors).
5. Update Beads issue notes with:
   - what changed
   - files touched
   - how to verify
6. Do NOT mark tasks complete unless they meet the criteria in TODO.md.

This project uses **bd** (beads) for issue tracking. Run `bd onboard` to get started.

## Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

