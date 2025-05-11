# Pedal Design Tokens

This package contains the design tokens for the Pedal UI design system. These tokens define the foundational design elements including colors, typography, spacing, and other visual attributes used throughout the Pedal UI components.

## Overview

The token system provides a single source of truth for design values that can be:

- Exported from Figma as design tokens
- Synchronized across design and engineering teams
- Transformed into various formats (CSS, SCSS, TypeScript)
- Used consistently across all platforms and components

## Token Collections

Our design tokens are organized into the following collections:

- **Primitives**: Base values like colors, opacities, and other raw values
- **Theme Tokens**: Light and dark theme-specific values
- **Typography**: Text styles for desktop and mobile platforms
- **Dimensions**: Spacing, sizing, and layout measurements
- **Components**: Component-specific design values
- **Responsive Tokens**: Platform-specific values for desktop and mobile

For a detailed explanation of our token architecture and usage guidelines, please refer to our [Design Tokens Concept documentation](https://www.notion.so/bikeleasing/Design-Tokens-Concept-b5caf3730f9d4cf6a1da3a3157852918).

## Token Build Structure

All tokens are organized into different sets to allow flexibility in usage:

### Default Set

The complete collection with default settings including:

- Component tokens
- Theme tokens (light)
- Responsive tokens (mobile)
- Dimension tokens
- Typography tokens (mobile)
- Primitives tokens

### Dark theme set

- Theme tokens (dark)

### Desktop token set

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
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Make sure to set the `GITHUB_TOKEN` environment variable with your GitHub personal access token.

#### Troubleshooting

If you encounter installation issues with Yarn projects, you may need to specify both the default registry and the GitHub registry in your `.yarnrc.yml` file:

```yaml
npmRegistryServer: 'https://registry.yarnpkg.com'

npmScopes:
  bikeleasing-service:
    npmRegistryServer: 'https://npm.pkg.github.com'
    npmAlwaysAuth: true
    npmAuthToken: '${GITHUB_TOKEN}'
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

The token building process has three main steps:

1. **Clean** - Remove previously generated token files
2. **Sync** - Pull the latest variables from Figma
3. **Build** - Generate tokens in CSS, SCSS, and TypeScript formats

```bash
# Full build process (clean, sync, and build)
pnpm build

# Individual steps (if you need more control)
pnpm clean            # Remove all generated token files
pnpm sync-tokens      # Only sync tokens from Figma
pnpm run build        # Only build token formats from existing token files
```

### Figma Integration

This package supports syncing with Figma variables, allowing you to pull the latest design tokens directly from your design source.

#### Configuration

For Figma integration, you'll need to create a `.env` file in the tokens package directory with the following variables:

```
# Figma file ID (found in the URL of your Figma file)
FILE_KEY="your_figma_file_key"

# Personal access token with Variables API access
PERSONAL_ACCESS_TOKEN="your_figma_personal_access_token"
```

#### Creating a Figma Personal Access Token

1. Log in to Figma and go to your Account Settings
2. Navigate to the "Personal access tokens" section
3. Create a new token with a clear name (e.g., "Design Token Sync")
4. Make sure the token has access to the Variables API
5. Add this token to your `.env` file and/or repository secrets

#### GitHub Actions Integration

We have a GitHub workflow that automatically syncs tokens from Figma. It:

1. Runs on a weekly schedule to keep tokens up-to-date
2. Can be manually triggered from the Actions tab in GitHub
3. Creates a pull request with the updated tokens

The workflow uses repository secrets for authentication:

- `FIGMA_FILE_KEY`: The ID of your Figma design file
- `GH_ACTION_VARIABLES_SYNC_FIGMA_TOKEN`: Your Figma personal access token

## Token Workflow

### From Figma to Code

The token synchronization process follows these steps:

1. **Figma Design Work**:

   - Designers create and update variables in Figma
   - Variables are organized into collections and modes

2. **Token Sync**:

   - The `sync-tokens` script connects to Figma API using your personal access token
   - It retrieves all local variables from the specified file
   - Variables are converted to Design Tokens Format JSON files
   - Token files are saved to the `tokens/` directory

3. **Token Build**:

   - The `build` script processes the JSON token files
   - It generates theme variants (light/dark)
   - It creates responsive variants (mobile/desktop)
   - It builds tokens into CSS variables, SCSS variables, and TypeScript

4. **Distribution**:
   - Token files are published to GitHub Packages
   - Components and applications import the tokens
   - Design consistency is maintained across products

### Automated Updates

When the GitHub Action workflow runs:

1. It syncs the latest variables from Figma
2. It builds all token formats
3. It creates a pull request with the changes
4. After review and approval, the changes are merged

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
pnpm release
```

## License

MIT
