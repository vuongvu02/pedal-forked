import * as glob from 'glob';
import * as fs from 'fs';
import 'dotenv/config';
import { Config } from 'style-dictionary';
import { StyleDictionary } from 'style-dictionary-utils';
import { TokenSourceWithMode } from './types.js';
import { logSuccess } from './utils.js';
import {
  THEME_MODES,
  RESPONSIVE_MODES,
  MOBILE_BREAKPOINT,
  DEFAULT_MODES,
  PRIMITIVE_SET_NAME,
} from './constants.js';

const inputTokenSets = glob.sync('tokens/**/*.json');

const getModeFromFilePath = (path: string): string => {
  const modeMatch = path.match(/tokens\/[^.]+\.([^.]+)\.json/) || [];
  return modeMatch[1].toLowerCase();
};

const getBaseTokenSet = (): TokenSourceWithMode => {
  const tokenSource = inputTokenSets.filter((tokenPath) => {
    const fileMode = getModeFromFilePath(tokenPath);
    const allModes = [...THEME_MODES, ...RESPONSIVE_MODES];
    if (allModes.includes(fileMode) && !DEFAULT_MODES.includes(fileMode)) {
      return false;
    }
    return true;
  });

  return { tokenSource };
};

const getTokenSets = (modes: string[]): TokenSourceWithMode[] => {
  return modes.map((currentMode) => {
    const tokenSource = inputTokenSets.filter((tokenPath) => {
      if (tokenPath.toLowerCase().includes(PRIMITIVE_SET_NAME)) {
        return true;
      }
      return getModeFromFilePath(tokenPath) === currentMode;
    });

    return { mode: currentMode, tokenSource };
  });
};

const getCSSThemeSelector = (mode: string) => {
  if (THEME_MODES.includes(mode) && !DEFAULT_MODES.includes(mode)) {
    return `[data-theme="${mode}"]`;
  }
  return ':root';
};

const getCSSRules = (mode: string) => {
  if (RESPONSIVE_MODES.includes(mode) && !DEFAULT_MODES.includes(mode)) {
    return [
      {
        atRule: `@media screen and (min-width: ${MOBILE_BREAKPOINT})`,
      },
    ];
  }
  return undefined;
};

const getConfigs = (): Config[] => {
  return [getBaseTokenSet(), ...getTokenSets(THEME_MODES), ...getTokenSets(RESPONSIVE_MODES)].map(
    ({ mode = 'base', tokenSource }) => ({
      source: tokenSource,
      hooks: {
        filters: {
          'ignore-primitives-in-mode': (token) =>
            mode === 'base' || !String(token.filePath).toLowerCase().includes(PRIMITIVE_SET_NAME),
        },
      },
      platforms: {
        css: {
          transformGroup: 'css',
          transforms: ['size/pxToRem'],
          buildPath: 'build/css/',
          files: [
            {
              destination: `${mode}.css`,
              format: 'css/advanced',
              filter: 'ignore-primitives-in-mode',
              options: {
                outputReferences: true,
                selector: getCSSThemeSelector(mode),
                rules: getCSSRules(mode),
              },
            },
          ],
        },
        scss: {
          transformGroup: 'scss',
          transforms: ['size/pxToRem'],
          basePxFontSize: 16,
          buildPath: 'build/scss/',
          files: [
            {
              destination: `${mode}.scss`,
              format: 'scss/variables',
              filter: 'ignore-primitives-in-mode',
              options: {
                outputReferences: true,
              },
            },
          ],
        },
        ts: {
          transformGroup: 'js',
          transforms: ['name/camel', 'size/pxToRem'],
          basePxFontSize: 16,
          buildPath: 'build/ts/',
          files: [
            {
              destination: `${mode}.js`,
              format: 'javascript/esm',
              filter: 'ignore-primitives-in-mode',
            },
            {
              destination: `${mode}.d.ts`,
              format: 'typescript/esm-declarations',
              filter: 'ignore-primitives-in-mode',
            },
          ],
        },
      },
    }),
  );
};

const generateCSSImportFile = (outputCSSRefs: string[]) => {
  const cssFilePath = 'build/css/variables.css';

  const cssImports = outputCSSRefs
    .filter(Boolean)
    .map((ref) => `@import url('./${ref}');`)
    .join('\n');

  fs.writeFileSync(
    cssFilePath,
    `/**\n* Do not edit directly, this file was auto-generated.\n*/\n\n${cssImports}\n`,
  );

  logSuccess(`Generated CSS import file: ${cssFilePath}`);
};

async function run() {
  const configs = getConfigs();
  const outputCSSRefs: string[] = [];

  const buildPromises = configs.map(async (config) => {
    const sd = new StyleDictionary(config);
    outputCSSRefs.push(config.platforms?.css.files?.[0].destination || '');

    await sd.buildAllPlatforms();
  });

  await Promise.all(buildPromises);

  generateCSSImportFile(outputCSSRefs);
}

run();
