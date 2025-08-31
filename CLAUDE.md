# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Management
Uses pnpm as package manager:
- `pnpm install` - Install dependencies
- `pnpm run app:dev` - Start development server with HMR at http://localhost:3000
- `pnpm run app:build` - Create production build
- `pnpm run app:start` - Start production server

### Code Quality
- `pnpm exec biome format --write` - Format code
- `pnpm exec biome lint` - Lint code
- `pnpm exec biome check` - Format and lint
- `pnpm run typecheck` - Type check with `react-router typegen && tsc`
- `pnpm run typegen` - Generate React Router types

### Testing (Vitest)
- `pnpm test` - Run all tests
- `pnpm run test -- --watch` - Run tests in watch mode
- `pnpm run test -- --ui` - Run tests with UI (if installed)
- **IMPORTANT**: When creating utility functions, ALWAYS create corresponding test files
- Test files should be named `*.test.ts` or `*.spec.ts` and placed alongside the utility file
- **TDD APPROACH**: When possible and not instructed otherwise, use Test-Driven Development:
  1. Write tests first to define expected behavior
  2. Implement code to make tests pass
  3. Refactor while keeping tests green

### Database Operations (Prisma)
- `pnpm run prisma:generate` - Generate Prisma client
- `pnpm run prisma:db:push` - Push schema changes to database
- `pnpm run prisma:migrate:dev` - Create and apply migration
- `pnpm run prisma:studio` - Open Prisma Studio

### Git Hooks
- `pnpm lefthook:install` - Install lefthook git hooks
- `pnpm lefthook:pre-commit` - Run pre-commit hooks manually  
- `pnpm lefthook:pre-push` - Run pre-push hooks manually

### Commit Messages
- Use [Conventional Commits](https://www.conventionalcommits.org/) format for all commit messages
- Examples: `feat: Add new feature`, `fix: Resolve bug`, `docs: Update README`
- **IMPORTANT**: Do NOT add Claude Code attribution or co-author credits to commit messages
- **IMPORTANT**: Do NOT include changes to gitignored files in commit messages

## Architecture Overview

### Framework & Stack
- **React Router v7** - Full-stack React framework with SSR
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Database ORM with SQLite + Better-SQLite3 adapter
- **Biome** - Fast linter, formatter, and bundler
- **CSS Modules** - Scoped styling with `_styles.module.css` naming convention

### Application Structure

#### Personal Website Organization
The site serves as a dual-purpose platform:
- **Developer** section - Software engineering portfolio and notes
- **Beekeeper** section - Beekeeping-related content and notes

#### File-Based Routing System
Routes are defined in `app/routes.ts` using React Router's route configuration:
- `routes/__layout/` - Global layout components
- `routes/developer/` - Developer persona routes with nested layouts
- `routes/beekeeper/` - Beekeeper persona routes with nested layouts
- Route files follow patterns: `route.tsx` (components), `_loader.ts` (data), `_seo.ts` (SEO), `_meta.ts` (metadata)

#### Component Architecture
Components are organized in `app/components/` with this structure:
- `_component.tsx` - Main component implementation
- `_styles.module.css` - Component-specific CSS modules
- `index.ts` - Barrel export

#### Database Schema
Prisma schema defines a `Note` model with:
- `NoteType` enum for DEVELOPER/BEEKEEPER categorization
- Generated client outputs to `../generated/prisma`
- Database connection uses Better-SQLite3 adapter with connection pooling

#### Key Utilities
- `app/utils/db.server.ts` - Database connection with query logging
- `app/utils/breadcrumbs.ts` - Breadcrumb navigation system
- `app/utils/sitemap.server.ts` - Dynamic sitemap generation
- `app/constants/` - Site-wide constants and configuration

### Development Workflow

#### Code Quality Automation
Lefthook handles pre-commit hooks:
- Formats staged files with Biome
- Lints JavaScript/TypeScript files
- Type checks when TypeScript files are staged
- Pre-push hook runs full project check and all tests

**IMPORTANT**: Always run `pnpm exec biome format --write` and `pnpm exec biome check --write` after modifying file content to ensure consistent formatting and import sorting.

#### Environment Configuration
- Uses environment variables for database paths
- Client-side environment variables served via `/resources/env.js`
- Development vs production configuration handled automatically

#### Styling System
- Global styles in `app/styles/` (colors.css, fonts.css, globals.css)
- Inter font from rsms.me
- CSS Modules for component-specific styles
- Tailwind-like utility classes in global styles

### Key Patterns

#### Route Organization
Each route can have multiple files:
- `route.tsx` - Component and default export
- `_loader.ts` - Data loading logic
- `_meta.ts` - Meta tags configuration
- `_seo.ts` - SEO-specific configuration
- `_handle.ts` - Route handle (breadcrumbs, etc.)

**IMPORTANT**: When creating new routes, always:
1. Add them to `app/routes.ts` configuration to make them accessible
2. Run `pnpm typegen` to generate TypeScript types for the new route

#### Database Integration
- Use `db.server.ts` for all database operations
- Prisma client is configured with connection pooling
- Query logging enabled for development debugging

#### Type Safety
- React Router provides automatic type generation
- Run `pnpm run typegen` after route changes
- Strict TypeScript configuration with comprehensive checking

## Reference Documentation

### React Router v7
- **Official Documentation**: https://reactrouter.com/home
- Framework-specific solutions for routing, data loading, SSR, and React Router patterns