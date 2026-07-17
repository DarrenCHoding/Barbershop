# MONO Barberclub — Website

A premium, fully self-contained barbershop website. Dark monochrome design with
antique-gold accents, built with vanilla HTML, CSS and JavaScript — no frameworks,
no build step, no external images (all artwork is inline SVG).

## Preview

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Structure

```
index.html      All markup & inline SVG artwork
css/style.css   Design tokens, layout, animations, responsive rules
js/main.js      Interactions (no dependencies)
```

## Features

- **Hero** — staggered line reveal, rotating "Since 2016" stamp, ghost logotype, scroll cue
- **Marquee** — infinite service ticker
- **About** — animated stat counters, framed barber-chair line art
- **Services** — 6 priced services with dotted price leaders, hover states, featured "Signature" card
- **Ritual** — 4-step process strip
- **Barbers** — team cards with line-art portraits
- **Gallery** — asymmetric grid with hover captions
- **Reviews** — auto-advancing slider with dots, arrows and touch swipe
- **Booking** — validated appointment request form (min date = tomorrow, inline errors, success state)
- **Header** — blur-on-scroll, hides on scroll-down, active-section highlighting, full-screen mobile nav
- Scroll-reveal animations with per-grid stagger (IntersectionObserver)
- `prefers-reduced-motion` respected throughout
- Fully responsive (tested 390 px → 1440 px, zero horizontal overflow)

## Customising

All colours, fonts and spacing live as CSS custom properties at the top of
`css/style.css` (`--ink`, `--gold`, `--paper`, …). Prices, opening hours and
contact details are plain text in `index.html`.
