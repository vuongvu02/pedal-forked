import { LocalVariable } from '@figma/rest-api-spec';
import { StyleDictionaryType } from '../types.js';

/**
 * Determines the Style Dictionary type from a Figma variable
 */
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
