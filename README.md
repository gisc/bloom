# Bloom Verbs Quiz

Interactive client-side web game for Bloom's Taxonomy. Shows a random verb and lets you choose the level (1–6); provides immediate green/red feedback and an "Another" button.

## Run Locally

- Open `index.html` in a browser, or start a simple server: `python -m http.server 8000` and navigate to `http://localhost:8000/`.

## Deploy to GitHub

- Repository: `computingsg/bloom`
- Branch: `main`
- Contents: static site in repository root (`index.html`, `bloom-game.css`, `bloom-game.js`).

To create and push:

1. Initialize and commit:
   - `git init`
   - `git checkout -b main`
   - `git add .`
   - `git commit -m "Initial commit: Bloom verbs quiz"`
2. Create repo and push (GitHub CLI):
   - `gh repo create computingsg/bloom --public --source=. --remote=origin --push`

Enable GitHub Pages: set Pages source to `main` branch, root (`/`). The site will be available at `https://computingsg.github.io/bloom/`.
