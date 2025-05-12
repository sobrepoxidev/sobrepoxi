/**
 * Combines multiple class names into a single string
 * Filters out falsy values (undefined, null, false, "")
 */
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
