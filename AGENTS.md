<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Portfolio section components are stacked on the single / route with hash-anchor scrolling to preserve the one-page layout.
- Keep editable experience entries, locations, accomplishment arrays, and skills in the central content file so wording changes do not require component edits.
- Keep simple presentation toggles in src/content/settings.ts, separate from biography and experience text.
- Use viewport-sized flow grids for the hero and native mandatory document snapping after measuring the sticky header; oversized sections remain freely scrollable without wheel interception.
