# Usage

## Editing content

| Change | File |
| --- | --- |
| Name, tagline, links, bio, skills, experience, headings | `src/content/site.ts` |
| Shown repos, order, card titles, blurbs | `src/content/projects.ts` |
| Project screenshot filenames, optional collaborator repo URLs | `src/content/projects.ts` (`images`, `sources`) |
| Display settings (e.g. hero photo frame) | `src/content/settings.ts` |
| Default project image, social-preview fallback | `src/content/settings.ts` (`projects`) |
| Profile photo | `src/assets/images/profile-photo.jpeg` (replace, keep the name) |
| Browser tab icon | `src/assets/images/favicon.png` (64×64) and `src/assets/images/apple-touch-icon.png` (180×180) — replace, keep the names |
| Colors, font, spacing | `src/styles.css` |
| Section layout | `src/components/<Section>.tsx` |

Project rules:

- Only repos listed in `projectsConfig.order` are shown, in that order.
- `titles` overrides a card's heading; otherwise the repo name is used.
- `blurbs` overrides the GitHub description.
- `settings.hero.photoFrame = false` removes the photo border (for transparent PNGs).
- `sources: { "team-project": "https://github.com/other-owner/repo" }` overrides the repo for that entry in `order`; omitted entries use `w-lly`.
- Add screenshots under `src/assets/images/projects/`; set `images: { "team-project": "projects/team-project.png" }`.
- Image priority: existing configured file → custom GitHub social preview → `projects.defaultImage` (initially `project-default.jpeg`). Broken images fall through too.
- `settings.projects.defaultImageOpacity`: image opacity from `0` (invisible) to `1` (fully visible), initially `0.55`; affects fallback images only. Default images have a top-left "No preview yet" caption.
- Hover a card for details; tap its image or press Enter when focused on touch/keyboard devices. Code/Live links stay available.

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
The snapshot includes configured collaborator repositories and custom GitHub social-preview URLs for selected projects. Images remain on GitHub's image CDN (no binary downloads or extra API requests to display them). Refresh updates these URLs; if a preview page request fails, its previously saved URL is retained. The site uses saved previews even when live repository requests fail, and skips repeat preview-page requests for repositories with saved previews. Local screenshots still take priority. Re-run refresh after changing a repository's social preview.

Optional: set `GITHUB_TOKEN` to raise the API rate limit (60 → 5000 req/hour).
The site and the refresh script both read it.

## Deployment (Vercel)

1. Import the GitHub repo in Vercel.
2. Framework is detected automatically; build command `npm run build`.
3. Node.js version: 22.
4. Optional env var: `GITHUB_TOKEN`.

Pushes to the connected branch redeploy automatically.
