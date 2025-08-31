# Breadcrumb Navigation System

The application implements a comprehensive breadcrumb system with both UI navigation and SEO-optimized structured data.

## Overview

- **Breadcrumb utilities** in `app/utils/breadcrumbs.ts` provide core functionality
- **Route handles** define breadcrumb metadata via `_handle.ts` files
- **UI component** in `app/components/breadcrumbs/` renders navigation
- **Structured data** automatically generates Schema.org JSON-LD for SEO

## Implementation

### 1. Create Route Handle (`_handle.ts`)

Each route that should appear in breadcrumbs needs a handle file:

```typescript
import { href } from 'react-router'
import type { Breadcrumb } from '~/types/breadcrumb'

export const handle = {
  breadcrumb: (): Breadcrumb => ({
    label: 'Developer',
    path: href('/developer'),
  }),
}
```

### 2. Add Structured Data to Meta (`_meta.ts`)

For SEO benefits, add structured data to your route's meta function:

```typescript
import type { Match } from '~/types/match'
import { createBreadcrumbStructuredData, getBreadcrumbs } from '~/utils/breadcrumbs'
import type { Route } from './+types/route'

export const meta: Route.MetaFunction = ({ matches, loaderData }) => {
  const breadcrumbs = getBreadcrumbs(matches as unknown as Match[])
  const breadcrumbStructuredData = createBreadcrumbStructuredData(
    breadcrumbs,
    loaderData.baseUrl,
  )
  return [{ 'script:ld+json': breadcrumbStructuredData }]
}
```

### 3. Display Breadcrumbs in UI

Use the breadcrumbs component in your layout:

```typescript
import { Breadcrumbs } from '~/components/breadcrumbs'

export default function Layout() {
  return (
    <div>
      <Breadcrumbs />
      {/* rest of layout */}
    </div>
  )
}
```

## API Reference

### Core Functions

#### `getBreadcrumbs(matches: Match[]): Breadcrumb[]`

Extracts breadcrumb data from React Router matches.

- **Parameters**: `matches` - Array of React Router match objects
- **Returns**: Array of breadcrumb objects with `label` and `path`
- **Behavior**: Filters for routes that have breadcrumb handles and maps them to breadcrumb objects

#### `createBreadcrumbStructuredData(breadcrumbs: Breadcrumb[], baseUrl: string)`

Generates Schema.org BreadcrumbList structured data for SEO.

- **Parameters**: 
  - `breadcrumbs` - Array of breadcrumb objects
  - `baseUrl` - Base URL for generating absolute paths
- **Returns**: JSON-LD object conforming to Schema.org BreadcrumbList specification
- **Purpose**: Helps search engines understand page hierarchy

### Types

#### `Breadcrumb`

```typescript
export type Breadcrumb = {
  label: string  // Display text for the breadcrumb
  path: string   // Route path (relative)
}
```

#### `Match`

```typescript
export type Match = UIMatch<
  unknown,
  { breadcrumb: (match?: unknown) => Breadcrumb }
>
```

## Features

### Automatic Hierarchy
Breadcrumbs automatically build from nested route matches, creating a natural hierarchy based on your routing structure.

### SEO Optimization
The system generates Schema.org structured data that helps search engines understand your site's navigation structure, potentially improving search result displays.

### Persona-Aware Styling
The breadcrumbs component includes special styling for different sections:
- Developer section links get developer-specific styling
- Beekeeper section links get beekeeper-specific styling

### Accessibility
- Proper ARIA attributes for screen readers
- Current page indicators with `aria-current="page"`
- Semantic navigation structure

### Type Safety
Full TypeScript support with React Router integration ensures type safety throughout the breadcrumb system.

## Example Structure

For a route like `/developer/notes/some-note`, the breadcrumb trail might look like:

```
Developer › Notes › Some Note Title
```

Each segment corresponds to a route with its own `_handle.ts` file defining the breadcrumb metadata.

## Schema.org Output

The structured data output follows this format:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Developer",
      "item": "https://example.com/developer"
    },
    {
      "@type": "ListItem", 
      "position": 2,
      "name": "Notes",
      "item": "https://example.com/developer/notes"
    }
  ]
}
```

This helps search engines display rich breadcrumb trails in search results.