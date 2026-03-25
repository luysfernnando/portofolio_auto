# Portfolio Next.js Rebase

## What This Is
A personal developer portfolio designed to showcase projects automatically synchronized from GitHub. The project is currently being migrated from a standard React SPA to a Next.js App Router application.

## Core Value
Provides an always-up-to-date, performant showcase of my work without requiring manual project entry edits.

## Requirements

### Validated
- ✓ Automatic GitHub project fetching via API — existing logic
- ✓ Presentation of user statistics and repositories — existing logic
- ✓ Themed UI using styled-components — existing logic
- ✓ Smooth animations via framer-motion — existing logic

### Active
- [ ] Complete Next.js (App Router) migration
- [ ] Add `"use client"` directives to all React Client Components
- [ ] Ensure Next.js Server Components correctly pass data to Client Components
- [ ] Reconfigure global styles and themes for Next.js registry

### Out of Scope
- Backend database integration — unnecessary, using GitHub for data

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | Modern standard, better performance, SEO capability | — Pending |
| Keep styled-components | Maintain original design system | — Pending |

## Evolution
This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-25 after initialization*
