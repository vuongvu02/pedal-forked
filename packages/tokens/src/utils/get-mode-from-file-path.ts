/**
 * Extracts the mode name from a token file path
 */
export const getModeFromFilePath = (path: string): string => {
  const modeMatch = path.match(/tokens\/[^.]+\.([^.]+)\.json/) || [];
  return modeMatch[1].toLowerCase();
};
