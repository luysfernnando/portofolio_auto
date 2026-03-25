# Roadmap

## Core Architecture
- **Pattern**: Next.js App Router with React Client Components
- **State**: React Context (Theme)
- **Validation**: Visual equivalence to original React SPA, zero Next.js build errors.

## Milestone: v1.0 — Next.js Rebase Completion

### Phase 1: Contexts and Client Directives
**Goal**: Update all required components with Next.js client directives and wrap them structurally in the app layout.
**Requirements**: REQ-001, REQ-002, REQ-003

1. Identify and prepend `"use client"` to all stateful components and styled-components.
2. Render context providers (ThemeProvider, StyledComponentsRegistry) in `app/layout.tsx`.
3. Consolidate `app/page.tsx` logic to seamlessly render the original app tree.

---

*Future milestones deferred until rebase is complete and stable.*
