/**
 * Menu Service
 * Business logic for menu items, filtering, and searching.
 * This service encapsulates all menu-related operations.
 */

import type { FoodMenuItem } from '../types';

/**
 * Filters menu items by name or description.
 * @param items - Array of menu items to filter
 * @param query - Search query string
 * @returns Filtered array of menu items matching the query
 */
export function searchMenuItems(items: FoodMenuItem[], query: string): FoodMenuItem[] {
  if (!query.trim()) {
    return items;
  }

  const lowerQuery = query.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      (item.description?.toLowerCase().includes(lowerQuery) ?? false),
  );
}

/**
 * Filters menu items by price range.
 * @param items - Array of menu items to filter
 * @param minPrice - Minimum price (inclusive)
 * @param maxPrice - Maximum price (inclusive)
 * @returns Filtered array of menu items within the price range
 */
export function filterByPriceRange(
  items: FoodMenuItem[],
  minPrice: number,
  maxPrice: number,
): FoodMenuItem[] {
  return items.filter((item) => item.price >= minPrice && item.price <= maxPrice);
}

/**
 * Sorts menu items by price or name.
 * @param items - Array of menu items to sort
 * @param sortBy - Sort criteria: 'price' or 'name'
 * @param order - Sort order: 'asc' (ascending) or 'desc' (descending)
 * @returns Sorted array of menu items
 */
export function sortMenuItems(
  items: FoodMenuItem[],
  sortBy: 'price' | 'name' = 'name',
  order: 'asc' | 'desc' = 'asc',
): FoodMenuItem[] {
  const sorted = [...items].sort((a, b) => {
    let compareValue = 0;

    if (sortBy === 'price') {
      compareValue = a.price - b.price;
    } else {
      compareValue = a.name.localeCompare(b.name);
    }

    return order === 'asc' ? compareValue : -compareValue;
  });

  return sorted;
}

/**
 * Finds a menu item by ID.
 * @param items - Array of menu items
 * @param itemId - ID of the menu item to find
 * @returns The menu item if found, undefined otherwise
 */
export function findMenuItemById(items: FoodMenuItem[], itemId: number): FoodMenuItem | undefined {
  return items.find((item) => item.id === itemId);
}
