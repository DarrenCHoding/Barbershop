# MONO Barberclub — Website

A premium barbershop website. Dark monochrome design with antique-gold accents,
built with vanilla HTML, CSS and JavaScript — no frameworks, no build step.
Icons and decorative artwork are inline SVG; photography is referenced from
Shutterstock (see [Image credits](#image-credits)).

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

- **Hero** — full-bleed barbershop photo with gradient shade, staggered line reveal, rotating "Since 2016" stamp, ghost logotype, scroll cue
- **Marquee** — infinite service ticker
- **About** — animated stat counters, framed barber-chair photograph
- **Services** — 6 priced services with dotted price leaders, hover states, featured "Signature" card
- **Ritual** — 4-step process strip
- **Barbers** — team cards with photo portraits (grayscale → colour on hover)
- **Gallery** — asymmetric photo grid, grayscale treatment with hover captions
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

## Image credits

Photography is hot-linked from Shutterstock **watermarked preview URLs** as
reference/comp images. Before going to production, license the images (or swap
in your own photos) and replace the URLs in `index.html`:

| Placement | Shutterstock ID |
| --- | --- |
| Hero background | [1633272001](https://www.shutterstock.com/image-photo/barbershop-interior-black-white-dark-background-1633272001) |
| About — barber chair | [2078167900](https://www.shutterstock.com/image-photo/vertical-shot-barbershop-black-leather-chair-2078167900) |
| Gallery — interior | [669239866](https://www.shutterstock.com/image-photo/stylish-vintage-barber-chairs-black-grey-669239866) |
| Gallery — tools | [1500521915](https://www.shutterstock.com/image-photo/tool-barber-top-view-professional-razors-1500521915) |
| Gallery — fade close-up | [2767557689](https://www.shutterstock.com/image-photo/close-up-barbers-hands-using-professional-electric-2767557689) |
| Gallery — scissor work | [1783562759](https://www.shutterstock.com/image-photo/barbershop-hand-master-process-work-mens-1783562759) |
| Gallery — straight razor | [1820021855](https://www.shutterstock.com/image-photo/straight-razor-barbershop-towel-barber-shop-1820021855) |
| Gallery — hot towel | [1938530200](https://www.shutterstock.com/image-photo/professional-barber-applies-hot-towel-male-1938530200) |
| Barber — Jonas | [2623399499](https://www.shutterstock.com/image-photo/barber-wearing-leather-apron-2623399499) |
| Barber — Emir | [1539557852](https://www.shutterstock.com/image-photo/barber-man-apron-keeping-arms-crossed-1539557852) |
| Barber — Luca | [1428224171](https://www.shutterstock.com/image-photo/portrait-happy-barber-man-hairstylist-posing-1428224171) |
