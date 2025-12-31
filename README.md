# Personal Project Index / Portfolio

## Purpose
This repository hosts a **static portfolio website** that acts as a table of contents for my personal GitHub projects.

The site is meant to be:
- Free to host (GitHub Pages)
- Low maintenance
- Easy to update after long gaps
- Suitable for demos to friends, collaborators, or employers

It lists projects with:
- Name
- Status (idea / WIP / stable)
- Tech stack
- Short description
- Future ideas
- Links to GitHub repo and (optional) live demo

---

## High-Level Design
- **Static site only** (HTML + CSS + minimal JS)
- **No framework** (no React, no build step)
- **Single source of truth**: `projects.json`
- The page dynamically renders project cards from JSON

---

## Constraints (important)
- Must work on **GitHub Pages**
- Must not require a backend
- Must not require environment variables
- Must not require a build or bundler
- Must remain readable and editable manually

This repo should still make sense if opened again after a year.

---

## Tech Stack
- HTML
- CSS
- Vanilla JavaScript
- GitHub Pages

---

## Repo Structure
/
├── index.html
├── style.css
├── script.js
├── projects.json
├── README.md
├── TODO.md
└── AGENTS.md

---

## Updating Projects
- Edit `projects.json`
- Refresh the page to see updates

## Development Workflow
- Edit files locally
- Serve locally for testing (example: `python3 -m http.server`)
- Deploy by pushing to `main`
- GitHub Pages serves from repository root

---

## Non-Goals
- No authentication
- No analytics
- No CMS
- No server-side rendering
- No database

---

## Notes for AI Contributors
- Prefer clarity over cleverness
- Avoid unnecessary abstractions
- Keep everything inspectable in-browser
- If something can be done with simple JS, do not introduce tooling
