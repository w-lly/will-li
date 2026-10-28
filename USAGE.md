# Usage

## Editing content

| Change | File |
| --- | --- |
| Name, tagline, links, bio, skills, experience, headings | `src/content/site.ts` |
| Shown repos, order, card titles, blurbs | `src/content/projects.ts` |
| Display settings (e.g. hero photo frame) | `src/content/settings.ts` |
| Profile photo | `src/assets/images/profile-photo.jpeg` (replace, keep the name) |
| Browser tab icon | `src/assets/images/favicon.png` (64×64) and `src/assets/images/apple-touch-icon.png` (180×180) — replace, keep the names |
| Colors, font, spacing | `src/styles.css` |
| Section layout | `src/components/<Section>.tsx` |

Project rules:

- Only repos listed in `projectsConfig.order` are shown, in that order.
- `titles` overrides a card's heading; otherwise the repo name is used.
- `blurbs` overrides the GitHub description.
- `settings.hero.photoFrame = false` removes the photo border (for transparent PNGs).

## Commands

```sh
npm install                # install dependencies
npm run dev                # local dev server
npm run build              # production build
npm test                   # run tests once
npm run test:watch         # re-run tests on save
npm run refresh-projects   # update the saved GitHub snapshot
```

## Tests

Located in `src/test/`. Run `npm test` after editing content files.

- `projects.test.ts` — repo selection, order, titles, blurbs.
- `experience.test.ts` — SRC spring and fall terms stay separate.
- `app-routing.test.tsx` — the home page renders.

New `*.test.ts` files in `src/test/` are picked up automatically.

## GitHub data

Repos are fetched from the GitHub API on page load and cached for ~10 minutes.
No manual step is required.

`src/content/projects.snapshot.json` is a fallback used only if GitHub is
unavailable. Update it with `npm run refresh-projects` (Node 18+, works on
Windows and Linux).

Optional: set `GITHUB_TOKEN` to raise the API rate limit (60 → 5000 req/hour).
The site and the refresh script both read it.

## Deployment (Vercel)

1. Import the GitHub repo in Vercel.
2. Framework is detected automatically; build command `npm run build`.
3. Node.js version: 22.
4. Optional env var: `GITHUB_TOKEN`.

Pushes to the connected branch redeploy automatically.
