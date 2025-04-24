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
- Primitives tokens

**Dark Theme**

- Theme tokens (dark)
- Primitives tokens

### Responsive Variants

**Mobile**

- Responsive tokens (mobile)
- Typography tokens (mobile)
- Primitives tokens

**Desktop**

- Responsive tokens (desktop)
- Typography tokens (desktop)
- Primitives tokens

## Usage

### Installation

#### Step 1: Configure access to GitHub Packages

```bash
# Configure .npmrc for GitHub Packages
@bikeleasing-service:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN

# Or for Yarn v4, configure .yarnrc.yml
npmRegistries:
  "https://npm.pkg.github.com":
    npmAuthToken: YOUR_GITHUB_TOKEN
```

#### Step 2: Install the package

```bash
# Using npm
npm install @bikeleasing-service/pedal-tokens

# Using yarn
yarn add @bikeleasing-service/pedal-tokens

# Using pnpm
pnpm add @bikeleasing-service/pedal-tokens
```

### Importing Tokens

```typescript
// Import CSS variables
import '@bikeleasing-service/pedal-tokens/build/css/variables.css';

// Import specific token values in TypeScript
import { colorBrand, fontFamilyPrimary } from '@bikeleasing-service/pedal-tokens';
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

### Figma Integration

This package supports syncing with Figma variables, allowing you to pull the latest design tokens directly from your design source.

For Figma integration, you'll need to create a `.env` file with the following variables:

```
FILE_KEY="your_figma_file_key"
PERSONAL_ACCESS_TOKEN="your_figma_personal_access_token"
THEME_MODES=light,dark
RESPONSIVE_MODES=mobile,desktop
MOBILE_BREAKPOINT=768px
DEFAULT_MODES=light,mobile
PRIMITIVE_SET_NAME=primitives
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
