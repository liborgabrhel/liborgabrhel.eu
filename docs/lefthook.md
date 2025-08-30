# Lefthook Git Hooks

This project uses [Lefthook](https://github.com/evilmartians/lefthook) to manage Git hooks for code quality automation.

## Installation

After cloning the repository, install the Git hooks:

```bash
pnpm lefthook:install
```

This installs the hooks defined in `lefthook.yaml` into your local Git repository.

## Configuration

The project's Lefthook configuration is defined in `lefthook.yaml` at the repository root.

### Pre-commit Hooks

Automatically runs on every commit:

- **Format**: Formats staged files using Biome
- **Lint**: Lints JavaScript/TypeScript files using Biome
- **Type Check**: Runs TypeScript type checking when `.ts/.tsx` files are staged

### Pre-push Hooks

Automatically runs before pushing to remote:

- **Check**: Runs full Biome check (format + lint) on changed files
- **Test**: Runs the complete test suite

## Hook Behavior

- All hooks run in **parallel** for faster execution
- Pre-commit hooks only process **staged files** for efficiency
- Pre-push hooks process **changed files** between local and remote
- TypeScript type checking is **skipped** if no `.ts/.tsx` files are staged
- Hooks will **prevent commits/pushes** if any checks fail

## File Patterns

The hooks target these file types:
- **Format/Check**: `.js`, `.ts`, `.cjs`, `.mjs`, `.jsx`, `.tsx`, `.json`, `.jsonc`, `.md`, `.css`
- **Lint**: `.js`, `.ts`, `.cjs`, `.mjs`, `.jsx`, `.tsx`
- **Type Check**: `.ts`, `.tsx`

## Troubleshooting

### Bypassing Hooks

⚠️ **Not recommended** - Use only for emergency situations:

```bash
git commit --no-verify    # Skip pre-commit hooks
git push --no-verify      # Skip pre-push hooks
```

### Reinstalling Hooks

If hooks aren't working:

```bash
pnpm lefthook:install
```

### Manual Hook Execution

Test hooks manually:

```bash
pnpm lefthook:pre-commit
pnpm lefthook:pre-push
```

## Benefits

- **Consistent Code Quality**: Automatic formatting and linting
- **Early Error Detection**: Type checking before commits
- **Test Safety**: Prevents pushing broken code
- **Team Standards**: Enforces project conventions automatically