# Pedal UI

This project is powered by:

- 🏎 [Turborepo](https://turbo.build/repo) — High-performance build system for Monorepos
- 🚀 (WIP) [React](https://reactjs.org/) — JavaScript library for user interfaces
- 🎨 [Design Tokens](https://css-tricks.com/what-are-design-tokens/) — Single source of truth for design values
- 📖 [Storybook](https://storybook.js.org/) — UI component environment powered by Vite

As well as a few others tools preconfigured:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- (WIP) [ESLint](https://eslint.org/) for code linting
- (WIP) [Prettier](https://prettier.io) for code formatting
- [PNPM](https://pnpm.io/) for fast, disk space efficient package management
- [GitHub Packages](https://github.com/features/packages) for private package distribution

## Live Documentation

View our live Storybook documentation at:
[https://github.com/Bikeleasing-Service/pedal-ui/deployments/github-pages](https://github.com/Bikeleasing-Service/pedal-ui/deployments/github-pages)

## Setup

To set up the project:

1. Make sure you're using the correct Node.js version:

```bash
# Install the specified Node.js version in .nvmrc
nvm install

# Use the specified Node.js version
nvm use
```

2. Install dependencies:

```bash
pnpm install
```

## Useful Commands

- `pnpm build` - Build all packages, including the Storybook site
- `pnpm dev` - Run all packages locally and preview with Storybook
- `pnpm lint` - Lint all packages
- `pnpm clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)
- `pnpm publish` - Publish packages to GitHub packages registry

## Project Structure

This monorepo includes the following packages and applications:

- `apps/docs`: Component documentation site with Storybook
- `packages/ui`: Core React components for the design system
- `packages/tokens`: Design tokens for colors, typography, spacing, etc.
- `packages/typescript-config`: Shared TypeScript configurations
- `packages/eslint-config`: ESLint presets for consistent code style

## Design Tokens

The `packages/tokens` package is the foundation of our design system, providing a single source of truth for all design values. The tokens are:

- Synced with Figma through the Figma API
- Built into multiple formats (CSS variables, SCSS, TypeScript)
- Used by all UI components to ensure consistency

To update design tokens from Figma:

```bash
cd packages/tokens
pnpm sync-tokens
```

## UI Components

The `packages/ui` package contains our React components built using the design tokens. Each component is:

- Written in TypeScript for type safety
- Documented with Storybook stories
- Published as a package for use in applications

## Documentation

The Storybook documentation site in `apps/docs` provides:

- Interactive examples of all components
- Documentation on component usage and props
- Design guidelines and best practices

To view the documentation:

```bash
pnpm dev
```

Then open your browser to http://localhost:6006

## Package Publishing

Components are published to the GitHub Packages registry under the `@bikeleasing-service` scope. To use these packages in other projects, configure your `.npmrc` file with appropriate authentication.
