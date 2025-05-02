export const THEME_MODES = ['light', 'dark'];
export const RESPONSIVE_MODES = ['mobile', 'desktop'];
export const MOBILE_BREAKPOINT = '768px';
export const DEFAULT_MODES = ['light', 'mobile'];
export const PRIMITIVE_SET_NAME = 'primitives';
export const OUTPUT_DIR = 'tokens';

// These are token categories that appear in the response but should be excluded
// from token generation since they're not part of the Figma design collection.
export const EXCEPTIONS: Record<string, string[]> = {
  Light: ['Sizing', 'Spacing', 'Radius'],
  Dark: ['Sizing', 'Spacing', 'Radius'],
};
