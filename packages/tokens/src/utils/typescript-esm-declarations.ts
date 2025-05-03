import { TransformedTokens } from 'style-dictionary';
import { FormatFn } from 'style-dictionary/types';
import { fileHeader } from 'style-dictionary/utils';
import { format } from 'prettier';

/**
 * Converts a token structure to a nested value structure
 */
const jsonToNestedValue = (token: TransformedTokens) => {
  if (!token || typeof token !== 'object') return token;
  if ('value' in token) return token.value;
  if ('$value' in token) return token.$value;
  const nextObj = {};
  for (const [prop, value] of Object.entries(token)) {
    // @ts-expect-error: can't predict type
    nextObj[prop] = jsonToNestedValue(value);
  }
  return nextObj;
};

/**
 * Converts a JSON object to TypeScript type declarations
 */
export const jsonToTypes = (json: object, isRoot = true) => {
  if (!json || typeof json !== 'object') return json;

  let result = isRoot ? `declare const _default: {\n` : '{\n';

  Object.entries(json).forEach(([key, value]) => {
    result += `'${key}': `;
    if (typeof value === 'object' && value !== null) {
      result += jsonToTypes(value, false);
    } else {
      result += `${typeof value};\n`;
    }
  });

  result += `};\n`;

  if (isRoot) {
    result += `\nexport default _default;\n`;
  }

  return result;
};

/**
 * Generates TypeScript declaration files for design tokens.
 * Creates properly typed declarations based on the token structure in the dictionary.
 *
 * @see https://github.com/lukasoppermann/style-dictionary-utils/blob/main/src/format/typescript-esm-declarations.ts
 */
export const customTypescriptEsmDeclarations: FormatFn = async ({
  dictionary,
  file,
  options,
  platform = {},
}) => {
  const { prefix } = platform;
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens;

  // Convert token structure to TypeScript type declarations
  const values = jsonToTypes(jsonToNestedValue(tokens), true);

  const output = (await fileHeader({ file })) + `${values}\n`;

  return format(output, { parser: 'typescript', printWidth: 500, ...options?.prettier });
};
