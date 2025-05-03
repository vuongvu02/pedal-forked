import { describe, it, expect, vi } from 'vitest';
import { jsonToTypes, customTypescriptEsmDeclarations } from '../typescript-esm-declarations';
import * as prettier from 'prettier';

vi.mock('prettier', () => ({
  format: vi.fn().mockResolvedValue('// formatted output'),
}));

describe('jsonToTypes', () => {
  it('should handle primitive values', () => {
    expect(jsonToTypes(null as any)).toBe(null);
    expect(jsonToTypes(undefined as any)).toBe(undefined);
    expect(jsonToTypes('string' as any)).toBe('string');
    expect(jsonToTypes(123 as any)).toBe(123);
    expect(jsonToTypes(true as any)).toBe(true);
  });

  it('should convert simple object to TypeScript type declarations', () => {
    const input = {
      color: '#ff0000',
      size: 16,
      enabled: true,
    };

    const output = jsonToTypes(input);

    expect(output).toContain('declare const _default: {');
    expect(output).toContain("'color': string;");
    expect(output).toContain("'size': number;");
    expect(output).toContain("'enabled': boolean;");
    expect(output).toContain('export default _default;');
  });

  it('should convert nested objects to TypeScript type declarations', () => {
    const input = {
      theme: {
        colors: {
          primary: '#ff0000',
          secondary: '#00ff00',
        },
        spacing: {
          small: 8,
          medium: 16,
        },
      },
    };

    const output = jsonToTypes(input);

    expect(output).toContain("'theme': {");
    expect(output).toContain("'colors': {");
    expect(output).toContain("'primary': string;");
    expect(output).toContain("'secondary': string;");
    expect(output).toContain("'spacing': {");
    expect(output).toContain("'small': number;");
    expect(output).toContain("'medium': number;");
  });
});

describe('customTypescriptEsmDeclarations', () => {
  it('should generate TypeScript declarations with proper formatting', async () => {
    const dictionary = {
      tokens: {
        color: {
          primary: { value: '#ff0000' },
          secondary: { value: '#00ff00' },
        },
        spacing: {
          small: { value: 8 },
          medium: { value: 16 },
        },
      },
    } as any;

    const file = {
      destination: 'tokens.d.ts',
      header: 'Generated header',
    } as any;

    const result = await customTypescriptEsmDeclarations({
      dictionary,
      file,
      options: {},
      platform: {},
    });

    expect(prettier.format).toHaveBeenCalled();
    expect(result).toBe('// formatted output');
  });

  it('should handle platform prefix', async () => {
    vi.mocked(prettier.format).mockImplementationOnce((input) => Promise.resolve(input as string));

    const dictionary = {
      tokens: {
        color: { primary: { value: '#ff0000' } },
      },
    } as any;

    const file = {
      destination: 'tokens.d.ts',
      header: 'Generated header',
    } as any;

    const result = await customTypescriptEsmDeclarations({
      dictionary,
      file,
      options: {},
      platform: { prefix: 'tokens' },
    });

    expect(result).toContain("'tokens': {");
  });
});
