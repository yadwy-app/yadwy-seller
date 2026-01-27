# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Yadwy Seller is a merchant dashboard built with TanStack Start (full-stack React framework). It's part of the larger Yadwy handmade marketplace platform. See `../CLAUDE.md` for the overall platform architecture.

## Commands

```bash
npm run dev          # Start dev server on port 3000
npm run build        # Production build
npm run preview      # Preview production build
npm run test         # Run tests with Vitest
npm run check        # Run Biome linter + formatter check
npm run lint         # Lint only
npm run format       # Format only
```

## Architecture

### Tech Stack
- **Framework**: TanStack Start (SSR-capable React framework)
- **Router**: TanStack Router with file-based routing
- **Data Fetching**: TanStack Query with SSR integration
- **Styling**: Tailwind CSS v4 + shadcn/ui (new-york style)
- **Linting/Formatting**: Biome (tabs, double quotes)
- **Deployment**: Netlify

### Project Structure

```
src/
├── routes/           # File-based routing (TanStack Router)
│   ├── __root.tsx    # Root layout with providers and devtools
│   ├── index.tsx     # Home page (/)
│   └── demo/         # Demo routes (can be deleted)
├── components/       # React components
│   └── ui/           # shadcn/ui components
├── integrations/     # Third-party integrations
│   └── tanstack-query/  # Query client setup and SSR integration
├── lib/              # Utilities (cn helper, etc.)
└── routeTree.gen.ts  # Auto-generated route tree (do not edit)
```

### Key Patterns

**File-Based Routing**: Routes are defined by file structure in `src/routes/`. The route tree is auto-generated to `src/routeTree.gen.ts`.

**SSR + Query Integration**: The router is configured with TanStack Query SSR integration via `setupRouterSsrQueryIntegration()` in `src/router.tsx`.

**Import Alias**: Use `@/` for imports from `src/` directory.

### Adding shadcn Components

```bash
pnpm dlx shadcn@latest add <component-name>
```

## Code Style

- Biome enforces: tabs for indentation, double quotes for strings
- Files excluded from linting: `routeTree.gen.ts`, `styles.css`
