---
name: eslint-prettier
description: Use when configuring, updating, or troubleshooting ESLint and Prettier for this Astro project. Includes lint rules, formatting config, scripts, and known patterns.
---

# ESLint + Prettier

## Config files

- **ESLint**: `eslint.config.mjs` — flat config with:
  - `typescript-eslint` recommended rules
  - `eslint-plugin-astro` flat/recommended
  - `eslint-config-prettier` (disables formatting rules that conflict with Prettier)
  - Ignores: `dist/`, `.vercel/`, `node_modules/`, `.astro/`
  - `.d.ts` files: `no-explicit-any` and `triple-slash-reference` disabled
  - `no-unused-vars`: warn, ignoring `_`-prefixed args/vars
- **Prettier**: `.prettierrc` with:
  - `prettier-plugin-astro` (parser `astro` for `*.astro` files)
  - `semi: true`, `singleQuote: false`, `tabWidth: 2`
  - `trailingComma: "all"`, `printWidth: 100`

## Scripts (package.json)

| Command | Action |
|---|---|
| `npm run lint` | Run ESLint on all files |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without writing |

## Code style conventions (maintain when editing)

Run `npm run format` after editing to keep formatting consistent.

- Semicolons required
- Double quotes (not single)
- 2-space indentation
- Trailing commas everywhere
- 100 char print width
- No unused variables (prefix with `_` to suppress)
- `any` type discouraged; prefer `unknown` or proper types
