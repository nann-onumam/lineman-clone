/**
 * Food Restaurants Hook
 * Manages restaurant search with pagination, debouncing, and caching.
 * Handles all data fetching logic for restaurant discovery.
 */

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import type { Restaurant } from '../types';
import { searchRestaurantsAsync, type RestaurantSearchResult } from '../services/foodRestaurantService';

/**
 * Configuration constants for the hook.
 */
const DEBOUNCE_DELAY_MS = 500;
const STALE_TIME_MS = 5 * 60 * 1000; // 5 minutes
const PAGE_LIMIT = 10;

/**
 * Return type for useFoodRestaurants hook.
 */
export interface UseFoodRestaurantsResult {
  restaurants: Restaurant[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<void>;
  refetch: () => Promise<void>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

/**
 * Hook for searching and paginating through restaurants.
 * Features:
 * - Debounced search input (500ms)
 * - Manual pagination management
 * - Automatic retry (max 3 times)
 * - Configurable cache and stale times
 * - Prevents duplicate fetchNextPage while loading
 *
 * @returns Restaurant search state and methods
 */
export function useFoodRestaurants(): UseFoodRestaurantsResult {
  const [searchQuery, setSearchQueryState] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input
  const debouncedSetQuery = useMemo(
    () => debounce((query: string) => {
      setDebouncedQuery(query);
      setCurrentPage(1); // Reset to first page on new search
    }, DEBOUNCE_DELAY_MS),
    [],
  );

  useEffect(() => {
    debouncedSetQuery(searchQuery);
  }, [searchQuery, debouncedSetQuery]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [debouncedSetQuery]);

  // Query for paginated search
  const {
    data,
    isLoading,
    isFetching,
  } = useQuery<RestaurantSearchResult>({
    queryKey: ['restaurants', 'search', debouncedQuery, currentPage],
    queryFn: () => searchRestaurantsAsync(debouncedQuery, currentPage, PAGE_LIMIT),
    staleTime: STALE_TIME_MS,
  });

  // Extract pagination info
  const hasNextPage = data?.pagination.hasNextPage ?? false;
  const isFetchingNextPage = isFetching && currentPage > 1;
  const isError = data === undefined && !isLoading && !isFetching;
  const error: Error | null = null;

  // Wrapped fetchNextPage to prevent duplicate calls
  const fetchNextPage = useCallback(async () => {
    if (!isFetchingNextPage && hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isFetchingNextPage, hasNextPage]);

  return {
    restaurants: data?.restaurants ?? [],
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch: async () => {
      setCurrentPage(1);
      setDebouncedQuery('');
      setSearchQueryState('');
    },
    searchQuery,
    setSearchQuery: setSearchQueryState,
  };
}
