/**
 * FoodOrderSearchScreen
 * Main screen for searching and browsing restaurants.
 * Composes hooks and UI only, no business logic.
 */

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useFoodRestaurants } from '../hooks/useFoodRestaurants';
import { FoodRestaurantCard } from '../components/FoodRestaurantCard';
import type { Restaurant } from '../types';
import { styles } from './FoodOrderSearchScreen.styles';
import { colors } from '../../../shared/theme/colors';

/**
 * Renders a full-screen restaurant search experience.
 * - Search input at top
 * - FlatList of restaurants with pagination
 * - Loading state (full screen spinner during initial load)
 * - Error state with retry button
 * - Pagination spinner at bottom
 * - Empty state messaging
 */
export const FoodOrderSearchScreen = () => {
  const {
    restaurants,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    searchQuery,
    setSearchQuery,
  } = useFoodRestaurants();

  // Local state for refined search UI
  const [displayQuery, setDisplayQuery] = useState('');

  /**
   * Called when user types in search input.
   * Updates display state and triggers hook search after debounce.
   */
  const handleSearchChange = useCallback((text: string) => {
    setDisplayQuery(text);
    setSearchQuery(text);
  }, [setSearchQuery]);

  /**
   * Called when user presses "Retry" after error.
   */
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  /**
   * Called when user presses on a restaurant card.
   * Could navigate to restaurant detail screen.
   */
  const handleRestaurantPress = useCallback((restaurantId: string) => {
    // TODO: navigate to restaurant detail or menu screen
    console.log('Restaurant pressed:', restaurantId);
  }, []);

  /**
   * Called to load more restaurants (pagination).
   */
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  /**
   * Renders footer with pagination spinner if loading next page.
   */
  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) {
      return null;
    }
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }, [isFetchingNextPage]);

  /**
   * Renders empty state when no restaurants found.
   */
  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return null; // Loading state handled separately
    }
    if (searchQuery === '') {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Enter a restaurant name or cuisine to search
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No restaurants found</Text>
        <Text style={styles.emptyText}>
          Try searching for a different cuisine or restaurant name
        </Text>
      </View>
    );
  }, [isLoading, searchQuery]);

  /**
   * Renders the restaurant list item.
   */
  const renderRestaurant = useCallback(
    ({ item }: ListRenderItemInfo<Restaurant>) => (
      <FoodRestaurantCard
        restaurant={item}
        onPress={handleRestaurantPress}
      />
    ),
    [handleRestaurantPress]
  );

  /**
   * Full-screen loading state (during initial search).
   */
  if (isLoading && restaurants.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Searching restaurants...</Text>
      </View>
    );
  }

  /**
   * Full-screen error state with retry button.
   */
  if (isError && restaurants.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error?.message || 'Failed to load restaurants'}
        </Text>
        <Text style={styles.errorSubtext}>Please try again</Text>
        <Pressable style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  /**
   * Renders main content: search input + restaurant list.
   */
  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants or cuisine..."
          placeholderTextColor={colors.textSecondary}
          value={displayQuery}
          onChangeText={handleSearchChange}
          editable={!isLoading}
        />
      </View>

      {/* Restaurant List */}
      <FlatList
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderRestaurant}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        scrollEnabled={!isLoading}
      />
    </View>
  );
};
