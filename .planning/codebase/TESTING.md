# Testing

## Framework & Structure
- The original CRA project used Jest and React Testing Library (`@testing-library/react`).
- The testing dependencies remain in the `portofolio_auto` package.json, however, they are absent from the new Next.js configuration in `nextjs_rebase`.

## Migrating
- Testing setup needs to be re-initialized under `nextjs_rebase` for Next.js 16 standard compatibility.
