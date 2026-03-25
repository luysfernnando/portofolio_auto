# Concerns

## Technical Debt & Issues
- **Migration In Progress**: The codebase is mid-migration from a standard React SPA to Next.js. The files have been copied to `nextjs_rebase/src`, but the app won't boot until context wrappers and `"use client"` directives are correctly established in all UI components relying on Hooks and `styled-components`.
- **Duplicate Package Managers**: Heavy mix of `npm` (in root) and `bun` (in nextjs_rebase), could cause locking inconsistencies.
- **Missing `use client` Directives**: As of the last build, Next.js hydration was failing because Server Components were attempting to invoke React Context.

## Next Steps
- Implement `"use client"` in all `src/components/*.tsx`.
- Refactor `app/page.tsx` to properly compose the UI.
