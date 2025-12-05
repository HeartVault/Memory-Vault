// Utility functions and helpers

/**
 * Utility function to merge class names (for conditional styling)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

