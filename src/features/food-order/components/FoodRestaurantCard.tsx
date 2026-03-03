/**
 * FoodRestaurantCard Component
 * Displays restaurant information with signature dishes preview.
 * Memoized for performance, receives minimal props.
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { Restaurant } from '../types';
import { styles } from './FoodRestaurantCard.styles';

export interface FoodRestaurantCardProps {
  restaurant: Restaurant;
  onPress?: (restaurantId: string) => void;
}

/**
 * Renders a single restaurant card with name, cuisine, rating, distance,
 * and a preview of signature dishes with prices.
 * Does not contain any business logic.
 */
const FoodRestaurantCardComponent = ({
  restaurant,
  onPress,
}: FoodRestaurantCardProps) => {
  const handlePress = () => {
    onPress?.(restaurant.id);
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.nameText} numberOfLines={1}>
          {restaurant.name}
        </Text>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {restaurant.rating}</Text>
        </View>
      </View>

      <View style={styles.cuisineAndDistance}>
        <Text style={styles.cuisineText}>{restaurant.cuisine}</Text>
        <Text style={styles.distanceText}>{restaurant.distance}</Text>
      </View>

      {restaurant.signatureDishes.length > 0 && (
        <View>
          <Text style={styles.signatureDishesLabel}>Signature Dishes</Text>
          {restaurant.signatureDishes.map((dish) => (
            <View key={dish.id} style={styles.dishRow}>
              <Text style={styles.dishName} numberOfLines={1}>
                {dish.name}
              </Text>
              <Text style={styles.dishPrice}>฿{dish.priceTHB}</Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );
};

/**
 * Memoized export to prevent unnecessary re-renders.
 */
export const FoodRestaurantCard = React.memo(
  FoodRestaurantCardComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.restaurant.id === nextProps.restaurant.id &&
      prevProps.onPress === nextProps.onPress
    );
  }
);

FoodRestaurantCard.displayName = 'FoodRestaurantCard';
