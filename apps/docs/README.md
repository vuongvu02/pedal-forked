# Pedal UI Documentation

This package contains the documentation site for the Pedal UI design system, built with Storybook.

## Overview

The documentation site provides:

- Interactive examples of all components
- Documentation on component usage and props
- Design guidelines and best practices
- Design token visualization and usage

## Development

```bash
# Start the development server
pnpm dev

# Build the documentation site
pnpm build

# Preview the built site
pnpm preview
```

## Design Tokens Documentation

The design tokens are a key part of the Pedal UI design system. The documentation includes:

- **Token Showcase**: Visual display of all tokens
- **Token README**: General information about tokens and their usage
- **Token Workflow**: Detailed guide on the token sync process

### Updating Token Documentation

When design tokens are updated from Figma, the documentation site will automatically reflect these changes when rebuilt. The token documentation is sourced directly from the `@bikeleasing-service/pedal-tokens` package.

To ensure the documentation stays up to date:

1. Sync tokens from Figma (see main README)
2. Rebuild the documentation site

```bash
# From project root
pnpm sync-tokens
pnpm build
```

## Component Documentation

Each component in the Pedal UI library has its own documentation page with:

- Interactive examples
- Props documentation
- Usage guidelines
- Accessibility information

To add documentation for a new component:

1. Create a `.stories.tsx` file in the appropriate directory
2. Add examples and documentation
3. Include relevant props and usage information
