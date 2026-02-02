# AGENTS.md - yadwy-seller

## Commands
```bash
npm run dev      # Dev server (port 3000)
npm run build    # Production build - RUN AFTER EVERY CHANGE
npm run check    # Biome lint + format
```

## Stack
- TanStack Start + TanStack Router + TanStack Query
- Tailwind CSS v4 + shadcn/ui
- TypeScript strict mode
- Biome (tabs, double quotes)

## Project Structure
```
src/routes/           # File-based routing
  feature/
    -components/      # Feature-specific (dash prefix = ignored by router)
    -hooks/
    index.tsx
src/components/       # SHARED components only
src/hooks/            # SHARED hooks only
```

## Rules

### Pre-Commit Checks
- Run `npm run check` before committing any code changes
- This runs Biome lint + format to catch errors early
- Fix all lint errors (button types, import order, etc.)
- Lefthook will block commits with lint errors

### Build Verification
- Run `npm run build` after every change
- Fix all TypeScript errors before committing

### Component Guidelines
- Use shadcn/ui components first (`pnpm dlx shadcn@latest add <name>`)
- Keep components small and focused (single responsibility)
- Max 100 lines per component - split if larger
- No inline styles - use Tailwind classes

### Code Style
- No unnecessary comments in generated code
- Self-documenting code over comments
- Use descriptive variable/function names
- Extract magic numbers to constants

### TypeScript
- Strict mode enabled - no `any` types
- Define interfaces for all props
- Use `as const` for literal types
- Prefer `unknown` over `any`

### React Patterns
- Functional components only
- Custom hooks for reusable logic
- Avoid prop drilling - use context or composition
- Memoize expensive computations

### Colocation
- Feature-specific code → `routes/feature/-components/`
- Shared by 2+ features → `src/components/`
- Use relative imports for colocated code
- Use `@/` alias for shared code

### TanStack Query
- Define queries in `-hooks/` folders
- Use `queryOptions` for type-safe queries
- Implement proper error boundaries
- Cache invalidation on mutations

### File Naming
- Components: PascalCase (`OrderTable.tsx`)
- Hooks: camelCase with `use` prefix (`useOrders.ts`)
- Utils: camelCase (`formatDate.ts`)

## i18n
- Use `useTranslation` hook
- Keys: `feature.section.key` format
- Locales: `src/i18n/locales/{en,ar}.json`
