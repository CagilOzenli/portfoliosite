# Çağıl Özenli — Portfolio (Astro + Sanity)

Junior game developer portfolio. Static Astro site + Sanity Studio (`studio/`).
Full setup & deploy runbook: **`README.md`**.

## Non-negotiable rules

- **Tone:** honest, never senior/expert/veteran — but don't lead with "junior" as
  self-deprecation either. Frame copy around what Çağıl builds (gameplay systems,
  specific projects); mention entry-level/internship openness as a practical note,
  not the opening line. No years-of-experience or seniority claims either way.
- **No fabricated content.** No made-up projects, experience, awards, stats, or
  references. Unpublished/invisible content must stay hidden; keep empty-state fallbacks.
- **Design lives in code only.** All colors/sizing in `src/styles/tokens.css`
  (CSS variables). Never hardcode hex in components. CMS controls content, never design.
- Avoid neon/esports look, purple-blue gradients, heavy glow, desert/post-apoc imagery.
- Homepage shows **at most 4** featured projects (Sanity validation enforces this);
  3+ render as a horizontal scroll-snap rail, 0 hides the section (no placeholders).
- **Ask before** `git push`, any deploy, or domain/DNS changes. Explain steps clearly.

## Layout

- `src/pages/` — routes. `src/components/` — UI. `src/lib/` — Sanity client, GROQ
  queries (`queries.ts`), content accessors with safe fallbacks (`content.ts`), types.
- `studio/schemaTypes/` — singletons/ + documents/ + objects/. `studio/structure.ts`
  defines the sidebar and locks singletons.

## Commands

```
npm run dev       # site -> http://localhost:4321
npm run build     # -> dist/  (Cloudflare runs this)
npm run check     # astro/tsc typecheck — keep at 0 errors
cd studio && npm run dev   # Studio -> http://localhost:3333
```

## Env

Root `.env`: `PUBLIC_SANITY_PROJECT_ID=anmdcj3x`, `PUBLIC_SANITY_DATASET=production`,
`PUBLIC_SANITY_API_VERSION=2025-01-01`. `studio/.env`: `SANITY_STUDIO_PROJECT_ID`,
`SANITY_STUDIO_DATASET`. All `.env` files are gitignored.

The `production` dataset must be **public** for the static build to read content.
