# Conventions

## Code Style
- **Components**: Functional components defined via arrow functions or standard functions.
- **Styling**: All CSS is authored using `styled-components` in the same file or a separate stylesheet.
- **Naming**: PascalCase for React components and their files (e.g., `Header.tsx`). camelCase for hooks (e.g., `useTheme.ts`) and utils.

## Patterns
- **Hooks**: Extensive use of custom hooks to abstract away logic from UI presentation.
- **Error Handling**: Standard try-catch blocks in services, mapped to state variables (`error`, `loading`) in hooks.
