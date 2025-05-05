import { describe, it, expect, vi } from 'vitest';
import { logSuccess } from '../log-success';

describe('logSuccess', () => {
  it('should log a success message with green color formatting', () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const testMessage = 'Test success message';

    logSuccess(testMessage);
    expect(consoleSpy).toHaveBeenCalledWith(`\n\x1b[32m✅ ${testMessage}\x1b[0m\n`);

    consoleSpy.mockRestore();
  });
});
