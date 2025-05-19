# Frontend Toolbox

## Development Environment

### Node.js Version Management

- [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm) with `.node-version`
- Probably well-known, enables configuration of Node.js version to be shared by team
- fnm is much faster & supports automated version switching
- Can be used in CI environments as single source of truth

### Package Management

- Clear winner in my eyes: [pnpm](https://pnpm.io)
- Safer dependencies through better defaults
  - No postinstall execution by default, requires approval
- Dependency isolation for clear separation
- Faster installation & better lockfiles
- Improved task execution (parallelization)
- Better monorepo support
- [`workspace:` protocol](https://pnpm.io/workspaces#workspace-protocol-workspace)
  - Easier usage of packages in monorepos

### npm, yarn, pnpm?

- Different projects may use different package managers (or different versions)
- [corepack](https://github.com/nodejs/corepack)
  - Specifies package manager (and version) to be used in `package.json`, analogous to `.node-version`
  - Automatically uses (and downloads!) the right package manager (+ version)
  - Great for CI, since package managers like pnpm receive frequent updates
- [`@antfu/ni`](https://github.com/antfu-collective/ni)
  - Automatic package manager detection
  - One unified sets of commands
  - In combination with corepack, no need to worry about which package manager is used
  - Can be used in scripts within `package.json` files to make migrations easier

### Development Scripts

- [Bun](https://bun.sh) is an alternative JavaScript/TypeScript runtime to Node.js and Deno
- Focus on high performance and low memory usage
- Aims to achieve compatibility with Node.js
  - Might not be production ready yet (depending on usage of Node.js builtins)
- **However:** Great for execution of scripts like mock data generators
  - OotB support for TypeScript with top-level async-await
  - Utilities for (shell) scripting

## OpenAPI CLI generator

- Available through npm package [@openapitools/openapi-generator-cli](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)
- Generates API clients from OpenAPI specifications
- Supports various languages and flavors per language
- Can generate TypeScript interfaces and types
- Makes OpenAPI specification single source of truth
- Customizable through templates

## Running Tasks with Turbo

- [Turborepo](https://turborepo.com) is not just for monorepos
- Optimized task execution
  - Caching of task outputs
  - Parallel execution of tasks
- Easier onboarding for new developers
  - Changes don't have to be communicated
- Can be used to define "CI" pipeline steps
- Optional remote caches
  - Can be self-hosted

## Managing Dependencies

- [taze](https://github.com/antfu-collective/taze)
  - Lightweight CLI tool for updating dependencies
  - Supports monorepos, version ranges, and the `packageManager` field
  - Inclusions and exclusions of dependencies with regex support
  - Might not work with proxy registries
- [syncpack](https://github.com/JamieMason/syncpack)
  - Synchronizes dependencies in monorepos
  - Can be used to limit allowed specifier types (`^`, `~`, exact)
  - Can enforce usage of `workspace:` protocol
- [pnpm catalogs](https://pnpm.io/catalogs)
  - Central specification of dependencies in monorepos
    - Prevents duplication of dependencies
    - Less merge conflicts
  - (Relatively) new, limited tool support
    - [ ] `pnpm update`
    - [~] syncpack
      - No automated fixes due to unknown protocol
      - **But:** Can enforce usage of `catalog:` protocol and specific catalogs
    - [x] Renovate
    - [x] taze
  - Easy migration with `pnpx codemod pnpm/catalog`

## Demo

- Non-monorepo that uses
  - fnm/nvm with `.node-version`
  - pnpm with corepack and `@antfu/ni`
  - Bun script to fetch and persist latest GitHub OpenAPI
  - Turbo with
    - OpenAPI CLI generator task to create API
    - Custom ESLint script task to lint all project files
    - Build task
    - Preview task
    - E2E task (with Playwright)
