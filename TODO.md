# TODO — Personal Project Index (Static Site)

Goal: Build a static GitHub Pages site that acts as a table of contents for my personal projects.

---

## 1. Base Structure
- Create the following files in the repo root:
  - `index.html`
  - `style.css`
  - `script.js`
  - `projects.json`

Completion criteria:
- All files exist
- `index.html` loads in a browser without errors

---

## 2. Define `projects.json` (Source of Truth)
- Create `projects.json` as an array of project objects
- Each project supports:
  - `name` (string)
  - `repo` (URL string)
  - `status` (string: Idea | WIP | Stable)
  - `tech` (array of strings)
  - `description` (string)
  - `future` (string, optional)
  - `demo` (URL string, optional)

Include 1–2 example projects with placeholder data.

Completion criteria:
- JSON is valid
- Schema is documented implicitly by example
- Optional fields are omitted cleanly when unused

---

## 3. Basic HTML Skeleton (`index.html`)
- Add a simple page header/title
- Add a short intro explaining the purpose of the site
- Add a container element where projects will be rendered
- Link `style.css` and `script.js`

Constraints:
- No frameworks
- No build step

Completion criteria:
- Page renders without JS
- Container element exists for JS rendering

---

## 4. Render Projects in JavaScript (`script.js`)
- Fetch `projects.json`
- Loop over project entries
- Render each project into the page

Each rendered project should show:
- Name
- Status
- Tech stack (list or tags)
- Description
- Repo link
- Demo link (only if present)
- Future ideas (only if present)

Constraints:
- Vanilla JS only
- Handle missing optional fields gracefully

Completion criteria:
- Projects render correctly
- No console errors
- Adding/removing projects in JSON updates the page

---

## 5. Styling (`style.css`)
- Clean, readable layout
- Projects visually separated (cards or rows)
- Reasonable typography and spacing
- Mobile-friendly but simple

Constraints:
- No external CSS frameworks
- No external assets required

Completion criteria:
- Page is readable on desktop and mobile
- Styling does not break rendering logic

---

## 6. GitHub Pages Compatibility
- Ensure relative paths are used
- Ensure `fetch` works when served from GitHub Pages
- No assumptions about local filesystem

Completion criteria:
- Site works when opened locally
- Site works when deployed via GitHub Pages

---

## 7. Documentation Check
- Ensure README.md accurately reflects:
  - Repo structure
  - Purpose
  - How to update projects
- Update README if implementation differs from plan

Completion criteria:
- README matches reality
- No stale instructions

---

## Explicit Non-Goals
- Do NOT add React, Vue, or other frameworks
- Do NOT add a build step or bundler
- Do NOT add analytics
- Do NOT add authentication
- Do NOT add a backend

---

## Done Means Done
This TODO is complete when:
- Updating `projects.json` alone updates the site
- The site deploys cleanly on GitHub Pages
- The repo can be understood after a long break