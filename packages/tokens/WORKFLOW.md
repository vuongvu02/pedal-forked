# Pedal Design Tokens Workflow Guide

This document provides a detailed guide to the entire token workflow process - from Figma to code implementation.

## Overview

The design token workflow is a bridge between design and development, ensuring consistent visual styles across all products. This process has several key stages:

1. **Design in Figma** - Variables created by designers
2. **Sync from Figma** - Pull latest variables via Figma API
3. **Generate Token Formats** - Convert to CSS, SCSS, TS
4. **Distribute Tokens** - Use in components and applications

## Prerequisites

Before you can work with the token workflow, you need:

- Figma account with access to the design file
- Figma Personal Access Token with Variables API permission
- GitHub account with repository access
- Node.js and pnpm installed locally

## Detailed Workflow

### 1. Design Process in Figma

Designers work in Figma to create and maintain variables:

- **Collections** - Logical groupings of variables (e.g., Theme Tokens, Typography)
- **Modes** - Variants of collections (e.g., Light/Dark for Theme Tokens)
- **Variables** - Individual design values with specific types

When designers update variables in Figma, those changes need to be pulled into the codebase.

### 2. Syncing from Figma to Code

#### 2.1 Manual Sync

To manually sync tokens from Figma:

```bash
# From project root
pnpm sync-tokens:figma

# Or from tokens directory
cd packages/tokens
pnpm sync-tokens
```

This script:

- Connects to Figma API using your personal access token
- Fetches all variables from the specified Figma file
- Converts Figma variables to Design Tokens Format JSON
- Saves token files in the `tokens/` directory

#### 2.2 Automated Sync

A GitHub Actions workflow automatically syncs tokens on a schedule:

- Runs weekly on Monday at 1 AM
- Can be manually triggered from GitHub Actions tab
- Creates a pull request with updated tokens

### 3. Building Token Formats

After syncing raw token files, you need to build them into usable formats:

```bash
# From project root
pnpm sync-tokens

# Or from tokens directory
cd packages/tokens
pnpm build
```

This process:

- Takes JSON token files from the `tokens/` directory
- Processes them through Style Dictionary configuration
- Generates CSS variables, SCSS variables, and TypeScript files
- Outputs built files to `build/` directory

### 4. Implementing Tokens in Products

#### CSS Implementation

```css
@import '@bikeleasing-service/pedal-tokens/build/css/variables.css';

.element {
  color: var(--p-color-brand);
  font-size: var(--p-font-size-m);
}
```

#### TypeScript Implementation

```typescript
import tokens from '@bikeleasing-service/pedal-tokens';

const brandColor = tokens.Color.Brand;
const fontSize = tokens.Font.Size.M;
```

## Troubleshooting

### Common Issues

1. **Authentication Errors**

   - Ensure your Figma Personal Access Token is valid
   - Check that the token has Variables API permissions
   - Verify the token is correctly set in your `.env` file

2. **Missing Variables**

   - Confirm the Figma file ID is correct
   - Check if variables are published in Figma
   - Verify permission access to the Figma file

3. **Build Errors**
   - Try cleaning the token directory first (`pnpm clean`)
   - Check for syntax errors in token files
   - Ensure all dependencies are installed

## Best Practices

1. **Regular Updates**

   - Sync tokens regularly to stay in sync with design
   - Use the automated GitHub workflow when possible
   - Review token changes before merging PRs

2. **Naming Conventions**

   - Follow consistent naming in Figma variables
   - Use semantic names that describe purpose, not value
   - Organize variables in a logical hierarchy

3. **Documentation**
   - Document significant token changes
   - Keep token usage examples updated
   - Communicate changes to both design and dev teams

## Resources

- [Design Tokens Format Specification](https://tr.designtokens.org/format/)
- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [Figma Variables API Documentation](https://www.figma.com/developers/api#variables)
