import { describe, it, expect } from 'vitest';
import { sortObjectDeep } from '../sort-object-deep';

describe('sortObjectDeep', () => {
  it('should return non-objects as is', () => {
    expect(sortObjectDeep(null as any)).toBeNull();
    expect(sortObjectDeep('string' as any)).toBe('string');
    expect(sortObjectDeep(123 as any)).toBe(123);
    expect(sortObjectDeep(true as any)).toBe(true);
  });

  it('should sort object keys alphabetically', () => {
    const input = {
      c: 1,
      a: 2,
      b: 3,
    };

    const expected = {
      a: 2,
      b: 3,
      c: 1,
    };

    expect(sortObjectDeep(input)).toEqual(expected);
  });

  it('should sort nested objects recursively', () => {
    const input = {
      z: {
        c: 1,
        a: 2,
      },
      b: {
        z: 3,
        x: 4,
      },
      a: 5,
    };

    const expected = {
      a: 5,
      b: {
        x: 4,
        z: 3,
      },
      z: {
        a: 2,
        c: 1,
      },
    };

    expect(sortObjectDeep(input)).toEqual(expected);
  });

  it('should maintain special order for t-shirt sizes', () => {
    const input = {
      xl: 'value',
      l: 'value',
      s: 'value',
      m: 'value',
      xs: 'value',
      '2xl': 'value',
    };

    const keys = Object.keys(sortObjectDeep(input));

    expect(keys).toEqual(['xs', 's', 'm', 'l', 'xl', '2xl']);
  });

  it('should maintain special order for font weights', () => {
    const input = {
      bold: 'value',
      normal: 'value',
      'semi-bold': 'value',
      medium: 'value',
    };

    const keys = Object.keys(sortObjectDeep(input));

    expect(keys).toEqual(['normal', 'medium', 'semi-bold', 'bold']);
  });

  it('should maintain special order for size names', () => {
    const input = {
      none: 'value',
      large: 'value',
      small: 'value',
    };

    const keys = Object.keys(sortObjectDeep(input));

    expect(keys).toEqual(['none', 'small', 'large']);
  });

  it('should handle mixed special and regular keys', () => {
    const input = {
      zebra: 'value',
      l: 'value',
      apple: 'value',
      m: 'value',
    };

    const result = sortObjectDeep(input);
    const keys = Object.keys(result);

    expect(keys.indexOf('m')).toBeLessThan(keys.indexOf('l'));
    expect(keys.indexOf('apple')).toBeLessThan(keys.indexOf('zebra'));
  });
});
