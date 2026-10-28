# Roadmap

- [x] Rebalance hero name placement and fit the first screen on desktop and smaller devices
- [x] Add an editable hero photo-frame setting
- [x] Restore reliable section snapping, including snap-back on a small home-page scroll; verify long sections remain readable

- [x] Mockup approved (v5)
- [x] Build the real site from the approved mockup
  - [x] Content file (`src/content/site.ts`), section components, four-color palette, Hanken Grotesk
  - [x] GitHub projects: server-side fetch, 10-min cache, bundled snapshot fallback
  - [x] Projects show ONLY repos listed in `src/content/projects.ts`, in that exact order
  - [x] Section-by-section scroll settling (spring feel), reduced-motion safe
  - [x] Sticky nav that clears snapped sections and anchor jumps at every width
- [x] Replace placeholder experience with résumé jobs, separating SRC spring and fall; summarize skills only and preserve all other information
- [x] Rename Projects heading to "My Work" and its note to "from GitHub"; remove the Break Through Tech AI Fellow entry
- [x] Let project cards show a written title (`titles` in `src/content/projects.ts`), falling back to the repo name
- [x] Write `USAGE.md` covering tests, Vercel deployment, and GitHub data refresh

## Open

- [ ] Contact form still only shows a "not connected yet" message — needs a decision on what it should do
