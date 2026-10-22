# Roshan Shikhare — Portfolio

Personal portfolio of **Roshan Shikhare**, a senior software engineer in Mumbai. The site is a static Next.js export deployed with GitHub Pages at [roshan190.github.io/portfolio-oberto](https://roshan190.github.io/portfolio-oberto).

The design and motion are adapted from [Juan Oberto’s portfolio](https://github.com/juandgg1611/Portfolio) (Juan Diego Oberto Urribarri), which is published under the MIT License. Juan’s copyright notice is kept in [LICENSE](./LICENSE), with a copyright line added for Roshan Shikhare.

## Stack

- Next.js 15 and React 19, exported as static HTML (`basePath`: `/portfolio-oberto`)
- Tailwind CSS 4
- GSAP and ScrollTrigger for the existing motion
- [`lenis`](https://github.com/darkroomengineering/lenis) for scroll events, with wheel and touch smoothing turned off so scrolling stays native
- Page curtains via `next-transition-router` (`auto` is off so links keep working under `basePath`)

## Scripts

```bash
npm install
npm run dev
npm run build
```

`npm run build` writes the static site to `out/`. GitHub Actions uploads that folder with `actions/upload-pages-artifact` and publishes it with `actions/deploy-pages`.

## Pages source

In the repository settings, set GitHub Pages **Source** to **GitHub Actions** if it is not already.
