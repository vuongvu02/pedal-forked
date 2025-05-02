import { RGB, RGBA } from '@figma/rest-api-spec';
import { LocalVariable } from '@figma/rest-api-spec';
import { StyleDictionaryType } from './types.js';

function rgbToHex({ r, g, b, ...rest }: RGB | RGBA) {
  const a = 'a' in rest ? rest.a : 1;

  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join('');
  return `#${hex}` + (a !== 1 ? toHex(a) : '');
}

export function tokenTypeFromVariable(variable: LocalVariable): StyleDictionaryType {
  switch (variable.resolvedType) {
    case 'COLOR':
      return 'color';
    case 'FLOAT': {
      const tokenScopes = variable.scopes || [];
      if (tokenScopes.length > 0) {
        if (tokenScopes.includes('OPACITY')) {
          return 'opacity';
        }
        if (tokenScopes.includes('CORNER_RADIUS')) {
          return 'borderRadius';
        }
        if (tokenScopes.includes('STROKE_FLOAT')) {
          return 'borderWidth';
        }
        if (tokenScopes.includes('WIDTH_HEIGHT')) {
          return 'dimension';
        }
        if (tokenScopes.includes('GAP')) {
          return 'dimension';
        }
        if (tokenScopes.includes('TEXT_CONTENT')) {
          return 'fontSize';
        }
        if (tokenScopes.includes('EFFECT_FLOAT')) {
          return 'dimension';
        }
        // @ts-ignore -- FONT_STYLE is a valid scope for font-weight but not appear in the official type (VariableScope)
        if (tokenScopes.includes('FONT_STYLE')) {
          return 'number';
        }
      }

      return 'dimension';
    }
    case 'STRING': {
      return 'string';
    }
    case 'BOOLEAN':
      return 'boolean';
  }
}

export function tokenValueFromVariable(
  variable: LocalVariable,
  modeId: string,
  localVariables: { [id: string]: LocalVariable },
) {
  const value = variable.valuesByMode[modeId];

  if (typeof value !== 'object') {
    return value;
  }

  if ('type' in value && value.type === 'VARIABLE_ALIAS') {
    const aliasedVariable = localVariables[value.id];
    return `{${aliasedVariable.name.replace(/\//g, '.')}}`;
  }

  if ('r' in value) {
    return rgbToHex(value);
  }

  throw new Error(`Invalid variable value format: ${JSON.stringify(value)}`);
}

/**
 * Logs a success message with green color to the console.
 */
export function logSuccess(message: string) {
  console.info(`\n\x1b[32m✅ ${message}\x1b[0m`);
}

/**
 * Recursively sorts an object by its keys in alphabetical order.
 * This includes nested objects at any depth.
 * Special handling for t-shirt sizes to maintain logical order (xs, s, m, l, xl, 2xl, etc.)
 * Special handling for font weights to maintain logical order (Normal, Medium, Semi-Bold, Bold)
 */
export function sortObjectDeep<T extends Record<string, any>>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // Define priority maps for special ordering
  const specialOrders: Record<string, number> = {
    xs: 0,
    s: 1,
    m: 2,
    l: 3,
    xl: 4,
    '2xl': 5,
    '3xl': 6,
    '4xl': 7,
    '5xl': 8,
    normal: 0,
    medium: 1,
    'semi-bold': 2,
    bold: 3,
    none: 0,
    small: 1,
    large: 3,
  };

  return Object.keys(obj)
    .sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();

      // Check if both keys exist in special ordering
      if (specialOrders[aLower] !== undefined && specialOrders[bLower] !== undefined) {
        return specialOrders[aLower] - specialOrders[bLower];
      }

      // Default to alphabetical sorting
      return a.localeCompare(b);
    })
    .reduce((acc, key) => {
      acc[key as keyof T] =
        typeof obj[key] === 'object' && obj[key] !== null ? sortObjectDeep(obj[key]) : obj[key];
      return acc;
    }, {} as T);
}
