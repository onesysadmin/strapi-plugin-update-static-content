# Architecture

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Strapi v5 (≥5.37.1) |
| Language | TypeScript (strict mode) |
| Frontend | React 18 + Strapi Design System v2 |
| Build | `@strapi/sdk-plugin` v6 |
| Linting | ESLint v10 with TypeScript + Stylistic |
| Node.js | ≥20.19.0, ≤24.x |
| Testing | None (Jest + React Testing Library planned) |

## Project Structure

```
admin/src/
  components/   # React UI components (use Strapi Design System)
  hooks/        # Custom React hooks (useFetchClient, AbortController)
  pages/        # Page-level components
  translations/ # i18n keys
  utils/        # Frontend utility functions
server/
  controllers/  # Request handlers
  services/     # Business logic (encryption, GitHub API calls)
  routes/       # Route definitions + permission policies
  utils/        # Server utility functions (encryption helpers)
  validators/   # Input validation
types/
  Config.ts     # Shared TypeScript types between admin and server
```

## Dev Commands

```bash
npm run build       # Production build
npm run watch       # Watch mode (development)
npm run watch:link  # Watch mode with npm link
npm run lint        # Check linting
npm run lint:fix    # Auto-fix linting errors
```

## Code Quality Standards

- **TypeScript**: Strict config; define interfaces for all props; no `any`; use type guards
- **React**: Functional components only; destructure props; single-purpose components; `React.memo` for expensive renders
- **State**: `useState` for local state; `useEffect` for side effects with full dependency arrays; `useCallback` for handlers passed as props; never set state during render
- **API calls**: Use `useFetchClient` from `@strapi/strapi/admin`; `AbortController` for cancellable requests; loading states; graceful error handling
- **UI**: Use `@strapi/design-system` components exclusively — no custom CSS unless unavoidable
- **Security**: Encrypt before storage; never log tokens; validate all inputs; follow Strapi permission system

## Adding a New Component

1. Create `admin/src/components/ComponentName/index.tsx`
2. Define TypeScript props interface
3. Use Strapi Design System components
4. Add i18n keys to `admin/src/translations/`
5. Export from component file
