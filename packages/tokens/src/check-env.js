#!/usr/bin/env node

/**
 * Token Workflow Helper Script
 *
 * This script checks for required environment variables and provides
 * guidance if they are missing.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const dotenv = require('dotenv');

// Load environment variables from .env file if it exists
const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Required environment variables
const REQUIRED_VARS = ['FILE_KEY', 'PERSONAL_ACCESS_TOKEN'];

// Check if all required variables are set
const missingVars = REQUIRED_VARS.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('\n❌ Error: Missing required environment variables');
  console.error(`   Missing: ${missingVars.join(', ')}\n`);

  console.log('📝 You need to configure Figma API credentials:');
  console.log('   1. Create a .env file in packages/tokens/ directory');
  console.log('   2. Add the following variables:');
  console.log('      FILE_KEY="your_figma_file_key"');
  console.log('      PERSONAL_ACCESS_TOKEN="your_figma_personal_access_token"\n');

  console.log('📖 See packages/tokens/WORKFLOW.md for detailed instructions.\n');
  process.exit(1);
}

console.log('✅ Environment variables are set correctly.');
console.log('🔄 Ready to sync tokens from Figma...\n');

// If environment variables are good, continue with the sync process
try {
  console.log('🚀 Starting token sync process...');
  execSync('pnpm run sync-tokens', { stdio: 'inherit' });
} catch (error) {
  console.error('\n❌ Token sync process failed:', error.message);
  process.exit(1);
}
