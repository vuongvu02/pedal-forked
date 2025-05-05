# Pedal Design Tokens

This package contains the design tokens for the Pedal UI design system. These tokens define the foundational design elements including colors, typography, spacing, and other visual attributes used throughout the Pedal UI components.

## Overview

The token system provides a single source of truth for design values that can be:

- Exported from Figma as design tokens
- Synchronized across design and engineering teams
- Transformed into various formats (CSS, SCSS, TypeScript)
- Used consistently across all platforms and components

## Token Categories

Our design tokens are organized into the following categories:

- **Primitives**: Base values like colors, opacities, and other raw values
- **Theme Tokens**: Light and dark theme-specific values
- **Typography**: Text styles for desktop and mobile platforms
- **Dimensions**: Spacing, sizing, and layout measurements
- **Components**: Component-specific design values
- **Responsive Tokens**: Platform-specific values for desktop and mobile

For a detailed explanation of our token architecture and usage guidelines, please refer to our [Design Tokens Concept documentation](https://www.notion.so/bikeleasing/Design-Tokens-Concept-b5caf3730f9d4cf6a1da3a3157852918).

## Token Structure

Our token system is organized hierarchically and transformed for different platforms and themes:

### Base

The complete collection with default settings:

- Component tokens
- Theme tokens (light)
- Responsive tokens (mobile)
- Dimension tokens
- Typography tokens (mobile)
- Primitives tokens

### Theme Variants

**Light Theme**

- Theme tokens (light)

**Dark Theme**

- Theme tokens (dark)

### Responsive Variants

**Mobile**

- Responsive tokens (mobile)
- Typography tokens (mobile)

**Desktop**

- Responsive tokens (desktop)
- Typography tokens (desktop)

## Usage

### Installation

#### Step 1: Generate a GitHub token

1. Go to your GitHub account settings → [Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token" (classic)
3. Give your token a name and select the `read:packages` scope
4. Copy the generated token for use in your configuration

#### Step 2: Configure access to GitHub Packages

Create a `.npmrc` file at the root of your project containing:

```bash
# Configure access to GitHub Packages
@bikeleasing-service:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_TOKEN}
```

Make sure to set the `GH_TOKEN` environment variable with your GitHub personal access token.

#### Troubleshooting

If you encounter installation issues with Yarn projects, you may need to specify both the default registry and the GitHub registry in your `.yarnrc.yml` file:

```yaml
npmRegistryServer: 'https://registry.yarnpkg.com'

npmScopes:
  bikeleasing-service:
    npmRegistryServer: 'https://npm.pkg.github.com'
    npmAlwaysAuth: true
    npmAuthToken: '${GH_TOKEN}'
```

#### Step 3: Install the package

```bash
# Using npm
npm install @bikeleasing-service/pedal-tokens

# Using yarn
yarn add @bikeleasing-service/pedal-tokens

# Using pnpm
pnpm add @bikeleasing-service/pedal-tokens
```

### Importing Tokens

#### CSS Usage

```css
@import '@bikeleasing-service/pedal-tokens/build/css/variables.css';

.my-element {
  color: var(--color-brand);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-m);
}
```

#### JavaScript / TypeScript Usage

```typescript
import tokens from '@bikeleasing-service/pedal-tokens';

const brandColor = tokens.Color.Brand; // "#95c11e"
const primaryFont = tokens.Font.Family.Primary; // "Titillium Web"
const fontSize = tokens.Font.Size.m; // "1rem"
```

## Development

### Prerequisites

- Node.js and pnpm
- Figma account with appropriate permissions (for token syncing)
- Personal access token for the Figma API with Variables scope

### Building Tokens

```bash
# Clean and build all tokens
pnpm build

# Just sync tokens from source files
pnpm sync-tokens
```

### Figma Integration

This package supports syncing with Figma variables, allowing you to pull the latest design tokens directly from your design source.

For Figma integration, you'll need to create a `.env` file with the following variables:

```
FILE_KEY="your_figma_file_key"
PERSONAL_ACCESS_TOKEN="your_figma_personal_access_token"
```

## Token Format

The tokens follow the [Design Tokens Format](https://tr.designtokens.org/format/) specification with some adaptations for our workflow. Each token file represents a collection of variables from Figma, with files organized by collection name and mode.

## Testing

```bash
pnpm test
```

## Publishing

This package is published to GitHub Packages under the `@bikeleasing-service` scope. To publish a new version:

```bash
# Ensure you're authenticated with GitHub Packages
pnpm publish --access restricted
```

## License

MIT
