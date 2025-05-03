import { describe, it, expect } from 'vitest';
import { getModeFromFilePath } from '../get-mode-from-file-path';

describe('getModeFromFilePath', () => {
  it('should extract mode name from token file path', () => {
    expect(getModeFromFilePath('path/to/tokens/file.light.json')).toBe('light');
    expect(getModeFromFilePath('tokens/theme.dark.json')).toBe('dark');
    expect(getModeFromFilePath('/absolute/path/tokens/mode.custom.json')).toBe('custom');
  });

  it('should convert mode name to lowercase', () => {
    expect(getModeFromFilePath('tokens/theme.DARK.json')).toBe('dark');
    expect(getModeFromFilePath('tokens/theme.Light.json')).toBe('light');
    expect(getModeFromFilePath('tokens/theme.Custom.json')).toBe('custom');
  });
});
