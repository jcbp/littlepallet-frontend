export type SortDirection = 'asc' | 'desc';

export const sortItems = <T extends Record<string, any>>(
  items: T[],
  key: string,
  direction: SortDirection = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === undefined || aValue === null) return direction === 'asc' ? 1 : -1;
    if (bValue === undefined || bValue === null) return direction === 'asc' ? -1 : 1;

    const comparison = String(aValue).localeCompare(String(bValue), undefined, { 
      numeric: true, 
      sensitivity: 'base' 
    });

    return direction === 'asc' ? comparison : -comparison;
  });
};