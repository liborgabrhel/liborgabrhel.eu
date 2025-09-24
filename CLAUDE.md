# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Before Writing Code

- Read the lint and formatting rules
- Observe the project's relevant existing code
- Conform to existing code style, patterns, and conventions unless directed otherwise

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

**Component Conventions:**
- Always name the rest parameter in prop destructuring as "...rest" (not "...props" or other variations)
- Use `type` (not `interface`) for Props definitions and always name it `Props`
- Export components as named exports (not default exports) from `_component.tsx`
- Use barrel exports in `index.ts` to re-export the component
- **Class Composition**: Use `clsx()` for multiple class names and conditional styling
  ```tsx
  import { clsx } from 'clsx'
  
  <div className={clsx(styles.base, isActive && styles.active, styles.modifier)} />
  ```
- **Compound Components**: Follow the compound component pattern (https://www.patterns.dev/react/compound-pattern/) for complex components that need subcomponents
  - Each subcomponent should have its own separate folder for better readability and maintainability
  - Avoid Object-like structures (e.g., `Card.Header`, `Card.Body`) - use individual component folders instead
  - Example: Instead of `Card.Header`, create separate `card-header/` folder with its own `_component.tsx` and styles

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

#### Browser Cache Issues
**Safari Development Troubleshooting:**
- If JavaScript/animations stop working after package updates, clear Safari cache: **Developer > Empty Caches**
- Safari caches compiled modules more aggressively than other browsers
- This can cause "Outdated Optimize Dep" errors and module import failures
- Always try clearing Safari cache before troubleshooting code issues

#### Environment Configuration
- Uses environment variables for database paths
- Client-side environment variables served via `/resources/env.js`
- Development vs production configuration handled automatically

#### Styling System
- Global styles in `app/styles/` (colors.css, fonts.css, globals.css)
- Inter font from rsms.me
- CSS Modules for component-specific styles
- Tailwind-like utility classes in global styles

**Design System Conventions:**
- **4px Spacing System**: Use multiples of 4px for all spacing (padding, margin, border-radius)
  - Examples: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, etc.
  - Avoid arbitrary values like `0.5rem` or `10px`
- **CSS Variables**: Always use CSS custom properties from `app/styles/`
  - Colors: `var(--text-primary)`, `var(--slate-200)`, `var(--blue-500)`
  - Typography: `var(--font-size-base-text)`, `var(--font-size-small-text)`
  - Spacing: Follow 4px increments in pixel values
- **CSS Layers**: Use `@layer component` inside class selectors for proper cascade control
  ```css
  .myClass {
    @layer component {
      padding: 12px;
      border-radius: 8px;
      color: var(--text-primary);
    }
  }
  ```
- **CSS Nesting**: Use modern CSS nesting for better organization and readability
  ```css
  .parent {
    @layer component {
      margin: 12px;
      
      p {
        font-size: var(--font-size-base-text);
        color: var(--slate-600);
      }
      
      &:hover {
        background: var(--slate-100);
      }
    }
  }
  ```

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

#### JavaScript/TypeScript Coding Standards

**Function Design:**
- Keep functions short, pure, and composable - one job per function
- Separate mapping logic from IO operations
- Use arrow functions, object/array destructuring, and template literals for concise syntax
- Chain operations rather than introducing intermediate variables: `[x].filter(p).map(f)`
- Prefer async/await over raw promise chains
- Use strict equality (`===`) throughout

**Parameter Handling:**
- Assign reasonable defaults directly in function signatures
- Use destructuring with explicit parameter names:
  ```typescript
  // Good: Clear signature with defaults
  const createUser = ({ id = createId(), name = '', description = '' } = {}) => ({ id, name, description })
  
  // Bad: Unclear signature
  const createUser = (payload = {}) => ({ /* ... */ })
  ```
- Avoid null/undefined arguments; use options objects instead
- Avoid using `||` for defaults - use parameter defaults instead

**Naming Conventions:**
- Functions should be verbs: `increment()`, `filter()`, `createUser()`
- Predicates and booleans should read like yes/no questions: `isActive`, `hasPermission`
- Prefer standalone verbs over noun.method: `createUser()` not `User.create()`
- Lifecycle methods: prefer `beforeX`/`afterX` over `willX`/`didX`
- Use strong negatives: `isEmpty(thing)` not `!isDefined(thing)`
- Mixins and decorators use `with${Thing}`: `withUser`, `withAuth`

**Code Organization:**
- Favor functional programming patterns over classes
- Avoid `class` and `extends` when possible
- Prefer immutability: use `const`, spread, and rest operators instead of mutation
- Favor `map`, `filter`, `reduce` over manual loops
- Modularize by feature; one concern per file or function
- Prefer named exports over default exports
- Keep related code together; group by feature, not by technical type

## Reference Documentation

### React Router v7
- **Official Documentation**: https://reactrouter.com/home
- Framework-specific solutions for routing, data loading, SSR, and React Router patterns

## Self-Improvement Protocol

### Pattern Recognition & Documentation
**IMPORTANT**: When working with the codebase, actively identify new patterns, requirements, rules, or conventions that aren't documented in CLAUDE.md:
- **Recognize**: Notice recurring patterns, naming conventions, architectural decisions, or workflow requirements
- **Ask**: When a new pattern is identified, ask the user: "I've noticed a new pattern/rule: [description]. Should I add this as a directive to CLAUDE.md?"
- **Document**: Only add new directives after explicit user confirmation
- **Update**: When existing patterns evolve or change, ask: "I've noticed pattern [X] has changed to [Y]. Should I update the existing directive in CLAUDE.md?"
- **Categories** to watch for:
  - Component patterns and naming conventions
  - File organization and structure patterns
  - Code style preferences beyond what's documented
  - Workflow requirements and development practices
  - Testing patterns and requirements
  - Database and API patterns
  - Performance or accessibility requirements

This ensures CLAUDE.md evolves with the project and captures institutional knowledge for future development work, keeping directives current as the codebase matures.