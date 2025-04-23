# Pedal Design Tokens

This package contains the design tokens for the Pedal UI. These tokens define the foundational design elements including colors, typography, spacing, and other visual attributes used throughout the Pedal UI components.

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

## Usage

### Installation

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

This package supports syncing with Figma: **Sync from Figma to Tokens**: Pull the latest design tokens from Figma variables

For Figma integration, you'll need to create a `.env` file with:

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

## License

MIT
