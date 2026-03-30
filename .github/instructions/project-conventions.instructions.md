---
description: "Use when adding features, editing UI, writing JS, or modifying structure in this project. Covers Bucks2Bar coding style, Bootstrap 5 UI conventions, color palette, and file organization."
applyTo: "**"
---

# Bucks2Bar — Project Conventions

## Tech Stack

- **Vanilla JavaScript only** — no frameworks (React, Vue, Angular, etc.), no TypeScript, no build tools, no npm
- **Bootstrap 5** (CDN) for all layout, components, and utility classes
- **Chart.js 4** (CDN) for all charts
- All dependencies are loaded via CDN `<script>` / `<link>` tags in `index.html` — do not introduce new external libraries

## File Structure

Keep the project flat — do not create subdirectories:

| File | Purpose |
|------|---------|
| `index.html` | All HTML markup and CDN imports |
| `script.js` | All JavaScript logic |
| `README.md` | Project documentation |

- Do not split JS into modules or multiple files
- Do not create a separate CSS file — use Bootstrap utilities and inline `<style>` in `index.html`

## JavaScript Style

- Use `const` and `let`; never `var`
- Prefer `forEach`, `map`, `filter` over `for` loops
- Use `parseFloat(value || 0)` for safe numeric parsing from inputs
- All DOM lookups go through `document.getElementById()`
- Keep functions small and single-purpose (e.g. `updateTotalsAndNet`, `buildChart`)

## Bootstrap 5 UI Conventions

- Use Bootstrap 5 classes exclusively for layout — no custom CSS grid or flexbox outside of Bootstrap utilities
- Navbar: `navbar-dark bg-dark`
- Cards: `card shadow-sm` with `card-body`
- Tables: `table table-bordered align-middle` with `thead class="table-dark"`
- Tabs: `nav nav-tabs` / `tab-content` / `tab-pane fade`
- Responsive wrappers: `table-responsive`, `container`

## Color Palette

| Role | Bootstrap class | Hex |
|------|----------------|-----|
| Income / positive | `text-success` | `#198754` |
| Expense / negative | `text-danger` | `#dc3545` |
| Income input border | `.input-income` | `border-left: 4px solid #198754` |
| Expense input border | `.input-expense` | `border-left: 4px solid #dc3545` |
| Chart income bar | — | `rgba(25, 135, 84, 0.75)` |
| Chart expense bar | — | `rgba(220, 53, 69, 0.75)` |

Always use these exact colors; do not introduce new accent colors.

## Chart.js Conventions

- Reuse the existing `barChart` variable; update data in place with `barChart.update()` rather than destroying and recreating
- Chart type: `bar`, responsive, with legend at `position: 'top'`
- X-axis labels: 3-letter month abbreviations (`Jan`, `Feb`, etc.)
