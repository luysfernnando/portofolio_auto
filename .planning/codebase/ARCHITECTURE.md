# Architecture

## System Design
- **Pattern**: Next.js App Router combining React Server Components (RSC) and Client Components.
- **Data Flow**: `nextjs_rebase/src/app/page.tsx` fetches data on the server and passes it down to interactive client components (`ProjectsSection`, `Hero`, etc).
- **State Management**: React Context (`ThemeContext.tsx`) for theme management, raw React hooks (`useState`, `useEffect`) for local component state.
- **Layers**: 
  - `app/`: Routing and server-side data fetching.
  - `components/`: UI presentation and client-side interactions.
  - `services/`: API calls (GitHub).
  - `hooks/`: Reusable logic.
