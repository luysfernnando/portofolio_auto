# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint     # ESLint via Next.js
```

No test suite configured.

## Architecture

Single-page portfolio built with **Next.js App Router** + **Styled Components** + **Framer Motion**.

**Rendering model:** The App Router entry (`src/app/page.tsx`) delegates to `src/App.tsx`, which is a `"use client"` component. All sections render client-side. `src/lib/styled-registry.tsx` handles SSR style injection for Styled Components.

**Theme system:** `useTheme` (localStorage + `prefers-color-scheme`) feeds a boolean `isDark` into `getTheme()` which returns a typed `Theme` object. The `ThemeProvider` wraps the entire app, so every Styled Component receives `theme` via context. `src/types/index.ts` defines the `Theme` interface — extend it there first if adding new color tokens.

**Content sections** (rendered in order): `Header` → `Hero` → `About` → `Projects` → `Contact` → `Footer`. All are exported from `src/components/index.ts`.

**Contact API:** `src/app/api/contact/route.ts` — POST handler using **Resend** (`RESEND_API_KEY` env var required). Emails are sent to `contato@luysfernnando.dev`.

## Key customization points

| What | Where |
|---|---|
| Colors / dark & light palettes | `src/styles/theme.ts` |
| Global CSS primitives | `src/styles/GlobalStyle.ts` |
| Section content | `src/components/{Hero,About,Projects,Contact}.tsx` |
| SEO metadata | `src/app/layout.tsx` |
| Fonts | `<head>` in `src/app/layout.tsx` (IBM Plex Sans, JetBrains Mono, Newsreader) |

## Environment

`RESEND_API_KEY` must be set for the contact form to function.
