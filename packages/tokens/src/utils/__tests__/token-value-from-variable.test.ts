import { describe, it, expect } from 'vitest';
import { tokenValueFromVariable } from '../token-value-from-variable';

describe('tokenValueFromVariable', () => {
  it('should return primitive values directly', () => {
    const variable = {
      valuesByMode: {
        mode1: 'textValue',
      },
    } as any;

    expect(tokenValueFromVariable(variable, 'mode1', {})).toBe('textValue');

    const numVariable = {
      valuesByMode: {
        mode1: 42,
      },
    } as any;

    expect(tokenValueFromVariable(numVariable, 'mode1', {})).toBe(42);
  });

  it('should handle variable aliases', () => {
    const aliasedVariable = {
      name: 'color/primary',
    } as any;

    const variables = {
      var123: aliasedVariable,
    };

    const variable = {
      valuesByMode: {
        mode1: {
          type: 'VARIABLE_ALIAS',
          id: 'var123',
        },
      },
    } as any;

    expect(tokenValueFromVariable(variable, 'mode1', variables)).toBe('{color.primary}');
  });

  it('should convert RGB values to hex', () => {
    const variable = {
      valuesByMode: {
        mode1: {
          r: 1,
          g: 0,
          b: 0,
        },
      },
    } as any;

    expect(tokenValueFromVariable(variable, 'mode1', {})).toBe('#ff0000');

    const variableWithAlpha = {
      valuesByMode: {
        mode1: {
          r: 0,
          g: 0,
          b: 1,
          a: 0.5,
        },
      },
    } as any;

    expect(tokenValueFromVariable(variableWithAlpha, 'mode1', {})).toBe('#0000ff80');
  });

  it('should throw error for invalid value format', () => {
    const variable = {
      valuesByMode: {
        mode1: {
          invalidProp: 'something',
        },
      },
    } as any;

    expect(() => tokenValueFromVariable(variable, 'mode1', {})).toThrow(
      'Invalid variable value format',
    );
  });
});
