# Aditya Sachan — Portfolio

Personal portfolio website for **Aditya Sachan** — AI/ML Researcher & Software Engineer.

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Tailwind CSS v4** — Utility-first styling
- **GSAP 3** — Scroll-triggered animations
- **Framer Motion** — Component transitions
- **Lenis** — Smooth scrolling

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The dev server runs at `http://localhost:5173/`.

## Build

```bash
# Type check + production build
npm run build
```

Output is generated in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Deployment

This is a static site. Deploy the `dist/` directory to any static hosting provider:

- **Vercel** — `vercel deploy`
- **Netlify** — Drag and drop `dist/` or connect the GitHub repo
- **GitHub Pages** — Push `dist/` contents to a `gh-pages` branch
- **Cloudflare Pages** — Connect the repo with build command `npm run build` and output directory `dist`

## Project Structure

```
src/
  sections/       # Page sections (Hero, Work, Research, etc.)
  components/     # Reusable layout and UI components
  data/           # Static data (personal info, projects, skills)
  hooks/          # Custom React hooks
  lib/            # Utility functions and GSAP setup
  styles/         # Global CSS and design tokens
public/
  profilePic1.jpg                    # Portrait
  Aditya_Sachan_Resume_Updated.pdf   # Resume
  favicon.svg                        # Favicon
  og-image.jpg                       # Social preview image
  robots.txt                         # Search engine directives
```

## License

All rights reserved. This portfolio and its design are personal property.
