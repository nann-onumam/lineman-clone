/**
 * Food Restaurant Service
 * Handles restaurant data retrieval, search, and pagination.
 * Simulates an API backend using mock data.
 * No UI logic; purely business and data operations.
 */

import type { Restaurant } from '../types';
import { MOCK_RESTAURANTS } from '../data/mockRestaurants';

/**
 * Pagination metadata returned with search results.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

/**
 * Search results with pagination information.
 */
export interface RestaurantSearchResult {
  restaurants: Restaurant[];
  pagination: PaginationMeta;
}

/**
 * Default pagination limit for restaurant listings.
 */
const DEFAULT_LIMIT = 10;

/**
 * Searches restaurants by keyword.
 * Supports pagination with configurable limit.
 * Performs case-insensitive search on restaurant names and cuisine types.
 *
 * @param keyword - Search term (name or cuisine type)
 * @param page - Page number (1-indexed)
 * @param limit - Maximum results per page (default: 10)
 * @returns Search results with pagination metadata
 */
export function searchRestaurants(
  keyword: string,
  page: number = 1,
  limit: number = DEFAULT_LIMIT,
): RestaurantSearchResult {
  // Validate pagination parameters
  const actualPage = Math.max(1, page);
  const actualLimit = Math.max(1, Math.min(limit, 100)); // Cap at 100 to prevent abuse

  // Filter restaurants by keyword
  const filtered = MOCK_RESTAURANTS.filter((restaurant) => {
    const lowerKeyword = keyword.toLowerCase();
    const nameMatch = restaurant.name.toLowerCase().includes(lowerKeyword);
    const cuisineMatch = restaurant.cuisine.toLowerCase().includes(lowerKeyword);
    return nameMatch || cuisineMatch;
  });

  // Calculate pagination
  const total = filtered.length;
  const startIndex = (actualPage - 1) * actualLimit;
  const endIndex = startIndex + actualLimit;
  const paginated = filtered.slice(startIndex, endIndex);

  const hasNextPage = endIndex < total;

  return {
    restaurants: paginated,
    pagination: {
      page: actualPage,
      limit: actualLimit,
      total,
      hasNextPage,
    },
  };
}

/**
 * Gets all restaurants without filtering.
 * Supports pagination.
 *
 * @param page - Page number (1-indexed)
 * @param limit - Maximum results per page (default: 10)
 * @returns All restaurants with pagination metadata
 */
export function getAllRestaurants(
  page: number = 1,
  limit: number = DEFAULT_LIMIT,
): RestaurantSearchResult {
  return searchRestaurants('', page, limit);
}

/**
 * Gets a single restaurant by ID.
 *
 * @param id - Restaurant ID
 * @returns Restaurant object or null if not found
 */
export function getRestaurantById(id: string): Restaurant | null {
  const restaurant = MOCK_RESTAURANTS.find((r) => r.id === id);
  return restaurant || null;
}

/**
 * Simulates an API call with delay.
 * In production, this would replace searchRestaurants with actual API calls.
 *
 * @param keyword - Search term
 * @param page - Page number
 * @param limit - Results per page
 * @param delayMs - Simulated network delay in milliseconds
 * @returns Promise resolving to search results
 */
export async function searchRestaurantsAsync(
  keyword: string,
  page: number = 1,
  limit: number = DEFAULT_LIMIT,
  delayMs: number = 200,
): Promise<RestaurantSearchResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(searchRestaurants(keyword, page, limit));
    }, delayMs);
  });
}

/**
 * Gets all restaurants asynchronously.
 * Simulates an API call with delay.
 *
 * @param page - Page number
 * @param limit - Results per page
 * @param delayMs - Simulated network delay in milliseconds
 * @returns Promise resolving to all restaurants
 */
export async function getAllRestaurantsAsync(
  page: number = 1,
  limit: number = DEFAULT_LIMIT,
  delayMs: number = 200,
): Promise<RestaurantSearchResult> {
  return searchRestaurantsAsync('', page, limit, delayMs);
}
