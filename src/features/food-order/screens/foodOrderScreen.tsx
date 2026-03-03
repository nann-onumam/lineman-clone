/**
 * Food Order Screen
 * Single-screen restaurant browse and menu selection flow.
 * Users can select dishes directly and see realtime order summary.
 */

import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import useFoodOrderNavigation from '../hooks/useFoodOrderNavigation';
import { useOrderPricing } from '../hooks/useOrderPricing';
import { FoodRestaurantCard, OrderSummaryCard } from '../components';
import { MOCK_RESTAURANTS } from '../data/mockRestaurants';
import type { CartItem, Restaurant } from '../types';
import { styles } from './FoodOrderScreen.styles';

/**
 * FoodOrderScreen
 * Single-screen flow for browsing restaurants and selecting dishes.
 */
export default function FoodOrderScreen() {
  const { onBackPress } = useFoodOrderNavigation();
  const [selectedDishMap, setSelectedDishMap] = useState<Record<string, number>>({});

  const cartItems = useMemo<CartItem[]>(() => {
    return Object.entries(selectedDishMap)
      .filter(([, quantity]) => quantity > 0)
      .map(([dishId, quantity]) => ({ dishId, quantity }));
  }, [selectedDishMap]);

  const totalSelectedItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const { orderSummary, isEmpty } = useOrderPricing(cartItems);

  const handleSelectDish = useCallback((dishId: string) => {
    setSelectedDishMap((previousMap) => {
      const currentQuantity = previousMap[dishId] ?? 0;
      return {
        ...previousMap,
        [dishId]: currentQuantity + 1,
      };
    });
  }, []);

  const getDishQuantity = useCallback(
    (dishId: string) => {
      return selectedDishMap[dishId] ?? 0;
    },
    [selectedDishMap]
  );

  const renderRestaurant = useCallback(
    ({ item }: { item: Restaurant }) => (
      <FoodRestaurantCard
        restaurant={item}
        onDishPress={handleSelectDish}
        getDishQuantity={getDishQuantity}
      />
    ),
    [getDishQuantity, handleSelectDish]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>เลือกเมนูอาหาร 🍔</Text>
        <Text style={styles.subtitle}>เลือกร้านและกดเมนูเพื่อเพิ่มออเดอร์ได้ทันที</Text>

        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backButtonText}>กลับหน้าหลัก</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_RESTAURANTS}
        keyExtractor={(restaurant) => restaurant.id}
        renderItem={renderRestaurant}
        contentContainerStyle={styles.listContent}
        style={styles.restaurantList}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryHeaderRow}>
          <Text style={styles.summaryTitle}>สรุปออเดอร์</Text>
          <Text style={styles.summaryCount}>เลือกแล้ว {totalSelectedItems} เมนู</Text>
        </View>
        <Text style={styles.summaryTotal}>ราคารวม ฿{orderSummary.total.toFixed(2)}</Text>

        <OrderSummaryCard orderSummary={orderSummary} isEmpty={isEmpty} />
      </View>
    </View>
  );
}