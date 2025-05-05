/**
 * Logs a success message with green color to the console.
 */
export function logSuccess(message: string): void {
  console.info(`\n\x1b[32m✅ ${message}\x1b[0m\n`);
}
