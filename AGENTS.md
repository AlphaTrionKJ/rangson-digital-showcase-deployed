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

## Website architecture
- Keep the company presentation as a single anchored catalog at `/`; the source material is one cohesive document.
- Store source-derived text in `src/data/catalog.json` and original image references in `src/data/assets.json`; this keeps source verification independent of presentation.
- Serve extracted original media through Lovable Assets pointers in `src/assets`; this preserves original artwork without committing binary media.
- Keep catalog presentation and accessible image viewing in focused components, with semantic visual tokens in `src/styles.css`; this maintains consistent styling and interaction.
