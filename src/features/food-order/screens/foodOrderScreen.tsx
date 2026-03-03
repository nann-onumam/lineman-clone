/**
 * Food Order Screen
 * Main composition screen for food ordering feature.
 * Delegates navigation logic to hooks, focuses on UI composition.
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useFoodOrderNavigation from '../hooks/useFoodOrderNavigation';
import { styles } from './FoodOrderScreen.styles';

/**
 * FoodOrderScreen
 * Minimal composition-only screen.
 * All business logic (navigation) is delegated to hooks.
 */
export default function FoodOrderScreen() {
  const { onBackPress } = useFoodOrderNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>หน้าสั่งอาหาร 🍔</Text>
      <Text style={styles.subtitle}>ตอนนี้คุณอยู่ใน Feature: food-order</Text>

      <TouchableOpacity style={styles.button} onPress={onBackPress}>
        <Text style={styles.buttonText}>กลับหน้าหลัก</Text>
      </TouchableOpacity>
    </View>
  );
}