# Keylee's Cleaning Service

Static marketing site for Keylee's Cleaning Service — a local cleaning business serving Tooele and Salt Lake County, Utah.

## Stack
- Static HTML/CSS/JS (no build step)
- Hosted on Cloudflare Pages
- Contact form delivered via [FormSubmit](https://formsubmit.co) → `keylee.to801@yahoo.com`

## Local development
Open `index.html` in a browser, or run a simple static server from the project root:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Project structure
```
.
├── index.html            # Homepage with hero hook + services overview
├── services.html         # Full service breakdown + pricing
├── about.html            # Keylee's story + FAQ
├── contact.html          # Full contact form
├── thank-you.html        # Post-submission confirmation
├── assets/
│   ├── css/
│   │   ├── base.css      # Reset, design tokens, typography
│   │   └── components.css # Buttons, nav, cards, hero, chat widget
│   ├── js/
│   │   ├── main.js       # Mobile nav toggle, current-page marking
│   │   └── chat.js       # Floating chat widget (FormSubmit AJAX)
│   └── images/           # (placeholder)
├── _headers              # Cloudflare Pages security & cache headers
├── _redirects            # Clean-URL redirects
├── robots.txt
├── sitemap.xml
└── .gitignore
```

## Design language
Foxterra-inspired warm editorial palette:
- Background: `#F5EFE6` (warm cream)
- Accent: `#B85540` (terracotta) — primary CTA
- Trust accent: `#7A8B70` (sage)
- Ink: `#1A1A1A`

Typography: **Fraunces** (display serif), **Inter** (body), **Outfit** (UI labels).

## Contact form activation
The first form submission triggers a one-click confirmation email from FormSubmit to `keylee.to801@yahoo.com`. Click "Activate" once — all submissions from then on deliver normally.

## Deployment
Connected to Cloudflare Pages via GitHub (`misterho1/keylees-cleaning`).

- Build command: _(none)_
- Output directory: `/`
- Framework preset: None

Pushes to `main` deploy automatically.
