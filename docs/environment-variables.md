# Environment Variables

This document explains how environment variables are handled, validated, and used in both server and client contexts.

## Overview

The application uses a secure environment variable system that:
- Validates environment variables using Zod schemas
- Provides type safety for environment variables
- Safely exposes selected variables to the client
- Implements proper security boundaries

## Architecture

### Server-Side Validation

Environment variables are validated on the server using Zod schemas in `app/utils/env.server.ts`:

```typescript
const schema = z.object({
  [ENV_KEYS.NODE_ENV]: z.enum([
    'production',
    'development', 
    'staging',
  ] as const),
})
```

**Key Functions:**

- **`initEnv()`** - Validates all environment variables at startup
- **`getEnv()`** - Returns client-safe environment variables only

### Client-Side Access

Client-side environment variables are safely exposed through:

1. **Global declarations** in `env.server.ts`:
```typescript
declare global {
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}
```

2. **Script injection** via `/resources/env.js` route that:
   - Generates `window.ENV = {...}` JavaScript
   - Sets proper caching headers (1 year cache)
   - Includes content hashing for cache busting
   - Only exposes variables from `getEnv()`

3. **Script loading** in `app/root.tsx` Layout component:
   - Includes `<script src={href('/resources/env.js')} />` in the body
   - Loads client-safe environment variables on every page
   - Makes `window.ENV` available to all client-side code

## Environment Variables

### Server-Only Variables

These are validated but **never** exposed to the client:

| Variable | Type | Description | Required |
|----------|------|-------------|----------|
| `NODE_ENV` | `'production' \| 'development' \| 'staging'` | Application environment | ✅ |

### Client-Safe Variables

These are exposed to the client via `window.ENV`:

| Variable | Description | Source |
|----------|-------------|--------|
| `MODE` | Current environment mode | `process.env.NODE_ENV` |

## Security

### Security Boundaries

- **Server variables** are validated but never exposed to client
- **Client variables** go through explicit allowlist in `getEnv()`
- **Sensitive data** (API keys, secrets) should never be added to `getEnv()`

### Security Warning

The `getEnv()` function includes this warning:

> **SECURITY WARNING**: Only add environment variables that are safe for public exposure. Never include API keys, secrets, or sensitive credentials.

## Adding New Environment Variables

### 1. Update Constants

Add the new variable to `app/constants/env.ts`:

```typescript
export const ENV_KEYS = {
  NODE_ENV: 'NODE_ENV',
  NEW_VAR: 'NEW_VAR', // Add here
} as const
```

### 2. Update Validation Schema

Add validation to `app/utils/env.server.ts`:

```typescript
const schema = z.object({
  [ENV_KEYS.NODE_ENV]: z.enum(['production', 'development', 'staging'] as const),
  [ENV_KEYS.NEW_VAR]: z.string(), // Add validation
})
```

### 3. Client Exposure (Optional)

Only if the variable is safe for client-side use, add it to `getEnv()`:

```typescript
export function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
    NEW_VAR: process.env.NEW_VAR, // Only if client-safe!
  }
}
```

## Usage Examples

### Server-Side

```typescript
// Environment variables are available via process.env
const nodeEnv = process.env.NODE_ENV
```

### Client-Side

```typescript
// Access client-safe variables via window.ENV
const mode = window.ENV.MODE
```

## Caching

The `/resources/env.js` endpoint implements aggressive caching:

- **Cache-Control**: `public, max-age=31536000` (1 year)
- **ETag**: Content-based hash for cache invalidation
- **Content-Type**: `application/javascript`

This ensures optimal performance while maintaining cache validity when environment variables change.

## File Structure

```
app/
├── root.tsx             # Script inclusion in Layout
├── constants/
│   └── env.ts           # Environment variable keys
├── utils/
│   └── env.server.ts    # Validation and client exposure
└── routes/
    └── resources/
        └── env/
            ├── route.ts     # Route handler
            └── _loader.ts   # Script generation logic
```

## Implementation Flow

1. **Server startup**: `initEnv()` validates environment variables
2. **Client request**: Root layout includes `/resources/env.js` script
3. **Script generation**: Route generates JavaScript with `window.ENV = {...}`
4. **Client execution**: Browser executes script, making `window.ENV` available
5. **Client usage**: Components can access `window.ENV.MODE` etc.

## Best Practices

1. **Always validate** new environment variables with Zod
2. **Never expose secrets** to the client
3. **Use constants** for environment variable names
4. **Type safety** is enforced through Zod inference
5. **Security first** - review what goes in `getEnv()`