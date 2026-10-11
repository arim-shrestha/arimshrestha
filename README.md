# Arim Shrestha Portfolio

A Next.js portfolio site with no portfolio backend. Section content is stored in JSON under [`src/data`](./src/data).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update portfolio content

Edit the matching JSON file and save it; the page reads these files directly:

- [`home.json`](./src/data/home.json): name, title, tagline, availability, location, resume, and tech stack
- [`about.json`](./src/data/about.json): biography and About section copy
- [`skills.json`](./src/data/skills.json): skill categories and skills
- [`experience.json`](./src/data/experience.json): work history
- [`projects.json`](./src/data/projects.json): project cards and optional profile link
- [`contact.json`](./src/data/contact.json): email and social links

Leave optional links as empty strings to hide them. Add a resume or project/certificate media file under `public` and use its root-relative path (for example, `/resume.pdf`). Contact links open the corresponding email, phone, or social destination directly.

The standalone Projects section is currently hidden until real project details are added. The CV is available at `public/arim-shrestha-cv.pdf`; replace it and update `resumeUrl` in `home.json` when the CV changes.

## Build

```bash
npm run build
```

The static site is generated in `dist/` and can be hosted on any static-file host.
