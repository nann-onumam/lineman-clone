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
  onDishPress?: (dishId: string) => void;
  getDishQuantity?: (dishId: string) => number;
}

/**
 * Renders a single restaurant card with name, cuisine, rating, distance,
 * and a preview of signature dishes with prices.
 * Does not contain any business logic.
 */
const FoodRestaurantCardComponent = ({
  restaurant,
  onDishPress,
  getDishQuantity,
}: FoodRestaurantCardProps) => {
  const handleDishPress = (dishId: string) => {
    onDishPress?.(dishId);
  };

  return (
    <View style={styles.container}>
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
          {restaurant.signatureDishes.map((dish) => {
            const quantity = getDishQuantity?.(dish.id) ?? 0;

            return (
              <Pressable
                key={dish.id}
                onPress={() => handleDishPress(dish.id)}
                style={styles.dishRow}
              >
                <Text style={styles.dishName} numberOfLines={1}>
                  {dish.name}
                </Text>
                <View style={styles.dishMetaContainer}>
                  {quantity > 0 && (
                    <View style={styles.quantityBadge}>
                      <Text style={styles.quantityText}>x{quantity}</Text>
                    </View>
                  )}
                  <Text style={styles.dishPrice}>฿{dish.priceTHB}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
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
      prevProps.onDishPress === nextProps.onDishPress &&
      prevProps.getDishQuantity === nextProps.getDishQuantity
    );
  }
);

FoodRestaurantCard.displayName = 'FoodRestaurantCard';
