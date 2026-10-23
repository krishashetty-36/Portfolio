# Krisha — Portfolio Website

A modern, responsive, single-page portfolio built with plain **HTML, CSS and JavaScript** — no frameworks, no build step, no dependencies.

All content is taken from `KRISHA_RESUME FINAL.pdf` (the resume is the single source of truth).

## Run it locally

Any of these work — pick one:

**Option 1 — just open the file**

Double-click `index.html` (or drag it into your browser). Everything loads from relative paths, so no server is required.

**Option 2 — local server (recommended)**

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

```bash
# Node (if you have it)
npx serve .
```

## Project structure

```
.
├── index.html        # All content & page metadata (title, description, Open Graph)
├── css/styles.css    # Design system: navy/white/cyan palette, layout, responsive rules
├── js/main.js        # Mobile menu, scroll-spy, reveal animations, contact form
├── favicon.svg       # Initials-based favicon ("K")
└── README.md
```

## How to update your portfolio later

| What you want to change | Where to edit |
|---|---|
| Name, title, intro, profile text | `index.html` → hero (`id="home"`) and about (`id="about"`) sections |
| Education entries | `index.html` → `<ol class="timeline">` |
| Internship details | `index.html` → `id="experience"` section |
| Projects | `index.html` → `id="projects"` section (one `.project` card each) |
| Technical / soft skills | `index.html` → `id="skills"` section (`.tag` list items) |
| Certifications & languages | `index.html` → `id="certifications"` section |
| Email, phone, LinkedIn, GitHub | `index.html` → contact section, footer, and the `mailto:` line in `js/main.js` |
| Colors & spacing | `css/styles.css` → `:root` variables (top of the file) |
| Fonts | `css/styles.css` → `--font` variable |
| Animations on/off | `js/main.js` → reveal observer; motion is already disabled for users with "reduce motion" enabled |

### Tips

- Keep the `<title>` and `meta description` in `index.html` in sync if your headline changes.
- External links use `target="_blank" rel="noopener noreferrer"` — keep those attributes when swapping URLs.
- The **contact form has no backend**: it validates the fields and then opens the visitor's mail app with a pre-filled email to `krishashetty36@gmail.com`. It never stores or transmits data from this site. If you ever want true form submissions, you'd add a service (e.g. a form endpoint) — until then, the note under the form says exactly what it does.
- There are no statistics, testimonials, counters, stock photos or invented details anywhere; only resume-supported content.

## Accessibility & quality notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), a skip-to-content link, visible focus states, labelled form fields, `aria-expanded` on the menu toggle.
- Fully responsive at desktop, tablet and mobile widths (mobile menu below 820px).
- Honours `prefers-reduced-motion` and `prefers-contrast`.
- No console errors, no external requests except none at all — fonts use the system stack, so it works offline.
