import { describe, it, expect } from 'vitest';
import { tokenTypeFromVariable } from '../token-type-from-variable';

describe('tokenTypeFromVariable', () => {
  it('should return "color" for COLOR type', () => {
    const variable = {
      resolvedType: 'COLOR',
    } as any;

    expect(tokenTypeFromVariable(variable)).toBe('color');
  });

  it('should return "opacity" for FLOAT type with OPACITY scope', () => {
    const variable = {
      resolvedType: 'FLOAT',
      scopes: ['OPACITY'],
    } as any;

    expect(tokenTypeFromVariable(variable)).toBe('opacity');
  });

  it('should return "borderRadius" for FLOAT type with CORNER_RADIUS scope', () => {
    const variable = {
      resolvedType: 'FLOAT',
      scopes: ['CORNER_RADIUS'],
    } as any;

    expect(tokenTypeFromVariable(variable)).toBe('borderRadius');
  });

  it('should return "borderWidth" for FLOAT type with STROKE_FLOAT scope', () => {
    const variable = {
      resolvedType: 'FLOAT',
      scopes: ['STROKE_FLOAT'],
    } as any;

    expect(tokenTypeFromVariable(variable)).toBe('borderWidth');
  });

  it('should return "dimension" for FLOAT type with WIDTH_HEIGHT scope', () => {
    const variable = {
      resolvedType: 'FLOAT',
      scopes: ['WIDTH_HEIGHT'],
    } as any;

    expect(tokenTypeFromVariable(variable)).toBe('dimension');
  });

  it('should return "dimension" for FLOAT type with GAP scope', () => {
    const variable = {
      resolvedType: 'FLOAT',
      scopes: ['GAP'],
    } as any;

    expect(tokenTypeFromVariable(variable)).toBe('dimension');
  });

  it('should return "fontSize" for FLOAT type with TEXT_CONTENT scope', () => {
    const variable = {
      resolvedType: 'FLOAT',
      scopes: ['TEXT_CONTENT'],
    } as any;

    expect(tokenTypeFromVariable(variable)).toBe('fontSize');
  });

  it('should return "dimension" for FLOAT type with EFFECT_FLOAT scope', () => {
    const variable = {
      resolvedType: 'FLOAT',
      scopes: ['EFFECT_FLOAT'],
    } as any;

    expect(tokenTypeFromVariable(variable)).toBe('dimension');
  });

  it('should return "number" for FLOAT type with FONT_STYLE scope', () => {
    const variable = {
      resolvedType: 'FLOAT',
      scopes: ['FONT_STYLE'],
    } as any;

    expect(tokenTypeFromVariable(variable)).toBe('number');
  });

  it('should return "dimension" for FLOAT type without specific scope', () => {
    const variable = {
      resolvedType: 'FLOAT',
      scopes: [],
    } as any;

    expect(tokenTypeFromVariable(variable)).toBe('dimension');
  });

  it('should return "string" for STRING type', () => {
    const variable = {
      resolvedType: 'STRING',
    } as any;

    expect(tokenTypeFromVariable(variable)).toBe('string');
  });

  it('should return "boolean" for BOOLEAN type', () => {
    const variable = {
      resolvedType: 'BOOLEAN',
    } as any;

    expect(tokenTypeFromVariable(variable)).toBe('boolean');
  });
});
