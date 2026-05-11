# CLAUDE.md

## Commands
```bash
npm run dev
npm run build
npm run check
```

## Stack
Next.js App Router + Styled Components + Framer Motion.

`src/app/page.tsx` → `src/App.tsx` (`"use client"`). All sections client-side. `src/lib/styled-registry.tsx` handles SSR for Styled Components.

**Theme:** `useTheme` (localStorage + `prefers-color-scheme`) → `isDark` → `getTheme()` → `Theme`. Extend tokens in `src/types/index.ts` first.

**Sections order:** `Header` → `Hero` → `About` → `Projects` → `Contact` → `Footer` — exported from `src/components/index.ts`.

## Key files
| What | Where |
|---|---|
| Colors (light/dark) | `src/styles/theme.ts` |
| Global CSS | `src/styles/GlobalStyle.ts` |
| Section content | `src/components/{Hero,About,Projects,Contact}.tsx` |
| SEO / fonts | `src/app/layout.tsx` |
