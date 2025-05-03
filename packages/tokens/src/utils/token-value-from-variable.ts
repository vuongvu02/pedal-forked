import { LocalVariable } from '@figma/rest-api-spec';
import { rgbToHex } from './rgb-to-hex.js';

/**
 * Extracts the token value from a Figma variable based on the mode
 */
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
