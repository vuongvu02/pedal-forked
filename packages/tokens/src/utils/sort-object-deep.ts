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
