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

### Project Structure (Colocation Approach)

```
src/
├── routes/                    # File-based routing with colocated code
│   ├── __root.tsx             # Root layout with providers and devtools
│   ├── index.tsx              # Home/Dashboard page (/)
│   ├── _auth.tsx              # Auth layout route
│   ├── _auth/                 # Auth routes group
│   │   ├── -components/       # Auth-specific components
│   │   ├── login.tsx          # /login
│   │   └── signup.tsx         # /signup
│   ├── orders/                # Orders feature
│   │   ├── -components/       # OrderTable, OrderTimeline
│   │   ├── -hooks/            # useOrders, useOrder
│   │   ├── index.tsx          # /orders
│   │   └── $orderId.tsx       # /orders/:orderId
│   ├── products/              # Products feature
│   │   ├── -components/       # ProductTable
│   │   ├── -hooks/            # useProducts, useProduct
│   │   ├── index.tsx          # /products
│   │   ├── $productId.tsx     # /products/:productId
│   │   └── new.tsx            # /products/new
│   └── store/                 # Store feature
│       └── index.tsx          # /store
├── components/                # SHARED components only
│   ├── layout/                # DashboardLayout, PageHeader
│   ├── dashboard/             # StatCard, ActionCard
│   └── ui/                    # shadcn/ui components
├── hooks/                     # SHARED hooks only
│   └── use-mobile.ts
├── contexts/                  # React contexts
├── integrations/              # Third-party integrations
├── lib/                       # Utilities (cn helper, etc.)
└── routeTree.gen.ts           # Auto-generated route tree (do not edit)
```

### Key Patterns

**Colocation Approach**: Each route/feature has its own folder containing related code:
- `-components/` → Feature-specific components (dash prefix excludes from routing)
- `-hooks/` → Feature-specific hooks
- `-utils/` → Feature-specific utilities
- Only **shared** components/hooks belong in `src/components/` and `src/hooks/`

**Rules for Colocation**:
1. If a component/hook is ONLY used within a single route folder → colocate it
2. If a component/hook is used by 2+ route folders → put in `src/components/` or `src/hooks/`
3. The `-` prefix tells TanStack Router to ignore folders for route generation
4. Import colocated items with relative paths: `import { OrderTable } from "./-components/OrderTable"`

**File-Based Routing**: Routes are defined by file structure in `src/routes/`. The route tree is auto-generated to `src/routeTree.gen.ts`.

**SSR + Query Integration**: The router is configured with TanStack Query SSR integration via `setupRouterSsrQueryIntegration()` in `src/router.tsx`.

**Import Alias**: Use `@/` for imports from `src/` directory (for shared code). Use relative paths for colocated code.

### Adding shadcn Components

```bash
pnpm dlx shadcn@latest add <component-name>
```

## Code Style

- Biome enforces: tabs for indentation, double quotes for strings
- Files excluded from linting: `routeTree.gen.ts`, `styles.css`


## Internationalization (i18n)

- **Library**: `react-i18next`
- **Configuration**: `src/i18n/index.ts`
- **Locales**: `src/i18n/locales/` (en.json, ar.json)
- **Convention**: Use `useTranslation` hook in components.
- **Keys**: Nested keys grouping by feature (e.g., `auth.login.title`, `products.new.name`).
- **RTL Support**: Arabic (ar) sets `document.dir = "rtl"`.

## Shadcn
- use shadcn commpments whenever possible