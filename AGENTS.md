# Portfolio Project Notes

## Project overview

- This is Arim Shrestha's portfolio frontend, built with Next.js, React, TypeScript, Material UI, and GSAP.
- The frontend is intentionally backend-free. Portfolio data is imported from local JSON files; do not add API/database dependencies for content or contact messages.
- Next.js is configured for static export. `npm run build` generates the deployable site in `dist/`.
- See [README.md](./README.md) for local setup and content-editing basics.

## Portfolio content

Edit the JSON source files in `src/data/` rather than hardcoding portfolio copy in components:

- `home.json`: name, role, tagline, location, status, stats, resume path, and hero technology stack.
- `about.json`: About heading, biography, chips, and highlight cards.
- `skills.json`: skill categories and skill lists.
- `experience.json`: work history and achievements.
- `projects.json`: project categories, case-study copy, links, images, video reels, services, and technology tags.
- `contact.json`: email, phone, website, and social links.

The current resume is `public/arim-shrestha-cv.pdf`; its path is set in `home.json`. Project descriptions should remain grounded in the supplied project repositories and Arim's project notes; do not invent credentials, client outcomes, or metrics.

Arim's CV is the source of truth for professional facts. Current highlights include 8+ years of experience, web/native mobile/desktop development, Adobe UXP/CEP extension and plugin work, and roles at Gamenic Nalamiz Tech, Katsumok Co. Ltd., and Policy Nepal Pvt. Ltd.

The Policy Nepal Pvt. Ltd. role began with a three-month internship and then transitioned to full-time employment. Preserve that progression in the Experience section.

Do not add unsupported team-size or leadership claims. Arim explicitly asked for those claims to be removed from both Experience and About; use only the responsibilities listed in the current CV.

The Contact section uses direct contact-link cards and does not include a message form. The website value remains available to the profile data but is intentionally not rendered as a Contact card. Keep optional contact links empty to hide them.

## UI conventions

- Keep the existing responsive Material UI and GSAP patterns when changing sections.
- On desktop, keep the complete Hero content and scroll control within the viewport below the fixed 72px navbar; do not stack independent minimum heights and vertical padding that exceed `100svh`.
- Long values in the Hero code-card must wrap inside the card instead of creating horizontal overflow.
- Keep repeated editable copy in section JSON; add corresponding types/components only when introducing a new data shape or behavior.

## Commands

Run these from `frontend/`:

```bash
npm run dev
npm run lint
npm run build
```
