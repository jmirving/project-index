# Agent Instructions (Codex)

Always read `~/.config/agent/POLICY.md` before doing any work; it defines the shell policy, including the required wrappers for git and Beads commands and the allowed Beads actions.

## Mission
Implement tasks for this repo safely and incrementally.

## Source of truth
- Task list is in `TODO.md`.
- Use Beads to track task status and notes.
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
