import { describe, it, expect } from 'vitest';
import { rgbToHex } from '../rgb-to-hex';

describe('rgbToHex', () => {
  it('should convert RGB to hex', () => {
    expect(rgbToHex({ r: 1, g: 0, b: 0 })).toBe('#ff0000');
    expect(rgbToHex({ r: 0, g: 1, b: 0 })).toBe('#00ff00');
    expect(rgbToHex({ r: 0, g: 0, b: 1 })).toBe('#0000ff');
    expect(rgbToHex({ r: 1, g: 1, b: 1 })).toBe('#ffffff');
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
  });

  it('should handle decimal values', () => {
    expect(rgbToHex({ r: 0.5, g: 0.5, b: 0.5 })).toBe('#808080');
    expect(rgbToHex({ r: 0.25, g: 0.5, b: 0.75 })).toBe('#4080bf');
  });

  it('should include alpha channel when provided and not 1', () => {
    expect(rgbToHex({ r: 1, g: 0, b: 0, a: 0.5 })).toBe('#ff000080');
    expect(rgbToHex({ r: 0, g: 1, b: 0, a: 0.25 })).toBe('#00ff0040');
    expect(rgbToHex({ r: 0, g: 0, b: 1, a: 0.75 })).toBe('#0000ffbf');
  });

  it('should omit alpha channel when it is 1', () => {
    expect(rgbToHex({ r: 1, g: 0, b: 0, a: 1 })).toBe('#ff0000');
    expect(rgbToHex({ r: 0, g: 0, b: 0, a: 1 })).toBe('#000000');
  });
});
