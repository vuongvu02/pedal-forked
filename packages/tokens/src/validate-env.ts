/**
 * Token Workflow Helper Script
 *
 * This script checks for required environment variables and provides
 * guidance if they are missing before syncing tokens from Figma.
 *
 * It helps ensure that the Figma API token and file key are properly
 * configured before attempting to connect to the Figma API.
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { logSuccess, logError } from './utils';

// Function to check if environment variables are set
function checkEnvVars(): void {
  // Load environment variables from .env file if it exists
  const envPath = path.resolve(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    console.log('📄 Loaded environment variables from .env file');
  } else {
    console.log('ℹ️ No .env file found, using environment variables from process');
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
  console.log('  - FILE_KEY: ' + (process.env.FILE_KEY ? '✓ Found' : '❌ Missing'));
  console.log(
    '  - PERSONAL_ACCESS_TOKEN: ' + (process.env.PERSONAL_ACCESS_TOKEN ? '✓ Found' : '❌ Missing'),
  );
  console.log('🔄 Ready to sync tokens from Figma...\n');
}

// Main function
function main(): void {
  try {
    checkEnvVars();
    console.log('🚀 Starting token sync process...');
    execSync('pnpm run sync-tokens', { stdio: 'inherit' });
  } catch (error) {
    console.error(
      '\n❌ Token sync process failed:',
      error instanceof Error ? error.message : String(error),
    );
    process.exit(1);
  }
}

// Run the main function
main();
