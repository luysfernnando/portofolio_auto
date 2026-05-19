**Commands:** `dev` · `build` · `check`

**Stack:** Next.js App Router + Styled Components + Framer Motion. All sections `"use client"`. SSR via `src/lib/styled-registry.tsx`.

**Theme:** `useThemeContext()` → `isDark` → `getTheme()`. Tokens in `src/types/index.ts`.

**Sections:** `Header` → `Hero` → `Technologies` → `Experiences` → `Projects` → `Contact` → `Footer` — via `src/components/index.ts`.

**i18n:** `useLanguage()` → `{ t, messages, locale, setLocale }`. Locales: `en_US` (default), `pt_BR`, `es_ES`. Browser-detected, `localStorage('portfolio-locale')`. `t('section.key')` for strings, `messages.section.array` for arrays.

**Key files:** theme `src/styles/theme.ts` · sections `src/components/sections/` · i18n `src/context/LanguageContext.tsx` · translations `src/locales/{en_US,pt_BR,es_ES}/common.json` · layout `src/app/layout.tsx`

**Commits:** `/caveman-commit` gera só o título, sem corpo. Português, prefixo semântico em inglês (`feat`, `fix`, `refactor`, `docs`, etc). Ex: `feat(header): adiciona switcher de idiomas`
