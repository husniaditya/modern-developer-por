# 🚀 Modern Developer Portfolio

Elegant, fast, and animated portfolio built with React, Vite, Tailwind CSS v4, and Framer Motion — complete with theme + language persistence and a live GitHub contributions heatmap.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=222)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=fff)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06b6d4?logo=tailwindcss&logoColor=fff)
![FramerMotion](https://img.shields.io/badge/Framer%20Motion-12-111?logo=framer&logoColor=fff)
![i18next](https://img.shields.io/badge/i18next-25-2E5E82?logo=i18next&logoColor=fff)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)


## Highlights

- Modern, accessible UI with light/dark themes and consistent contrast
- Theme + language persisted to localStorage (works across reloads)
- Internationalization with i18next and preloaded locales (EN, ID, FR, ES, DE, CN, JA)
- Animated GitHub contributions calendar (secure GraphQL backend or optional SVG fallback)
- Smooth scroll-triggered section reveals and tasteful parallax on project images
- Vite dev middleware for local GitHub GraphQL testing via `.env` token
- Production-friendly asset handling (images, PDFs) with Vite imports and typings


## Tech Stack

- App: React 19 + TypeScript, Vite 6
- Styling: Tailwind CSS v4 (container queries), Radix UI primitives, utility-first tokens
- Animations: Framer Motion (whileInView, stagger, parallax transforms)
- i18n: i18next + react-i18next + browser language detection
- Data: GitHub GraphQL v4 (via small backend or local dev proxy)
- Charts/visuals: D3 helpers and lightweight UI components


## Project structure

```text
src/
  components/
    HeroSection.tsx                # Theme-aware hero, modern light background, dark starfield
    ProjectsSection.tsx            # Scroll-triggered reveals, clip-path image reveal, parallax
    CertificationsSection.tsx      # Modern scroll animation per card
    SkillsSection.tsx              # Includes GitHub contributions calendar
    GithubContributions.tsx        # Animated heatmap with serverless/dev proxy support
    ui/*                           # Radix-based UI primitives styled for Tailwind v4
  contexts/ThemeContext.tsx        # Theme provider, persisted in localStorage
  i18n/                            # i18next setup + locales (en, id, fr, es, de, cn, ja)
  styles/theme.css                 # Design tokens & theme slots
  utils/scrollUtils.ts             # Smooth scrolling helpers
vite.config.ts                     # Vite + Tailwind + Spark + dev proxy for /api/contributions
```


## Theming and i18n

- Theme: light/dark, persisted in localStorage, toggles `dark` on the root element
- Language: i18next with browser detection and localStorage persistence
- Accessible color choices in both themes; tooltips and surfaces use neutral tokens for contrast


## Deployment

Any static host will work. Common choices:

- Vercel: static export with optional serverless function for `/api/contributions`
- Netlify: deploy the `dist/` folder; add a serverless function for contributions
- GitHub Pages: works for static build; use `VITE_GH_CORS_PROXY` or an external endpoint for contributions

Ensure your environment variables are configured on your hosting platform if you use a serverless endpoint.


## License

This project is MIT licensed. See `LICENSE` for details.

Note: Some UI building blocks and icons are based on open-source libraries (Radix UI, Phosphor/Lucide, etc.). Refer to their respective licenses.


## Acknowledgements

- React, Vite, Tailwind CSS, Radix UI, Framer Motion, i18next
- GitHub GraphQL API for contributions data
- Community utilities that inspired certain animations and patterns

