/**
 * Food Order Screen
 * Main composition screen for food ordering feature.
 * Delegates navigation logic to hooks, focuses on UI composition.
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../core/navigation';
import useFoodOrderNavigation from '../hooks/useFoodOrderNavigation';
import { styles } from './FoodOrderScreen.styles';

type FoodOrderScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  'FoodOrder'
>;

type FoodOrderScreenProps = {
  navigation: FoodOrderScreenNavigationProps;
};

/**
 * FoodOrderScreen
 * Minimal composition-only screen.
 * All business logic (navigation) is delegated to hooks.
 */
export default function FoodOrderScreen({ navigation }: FoodOrderScreenProps) {
  const { onBackPress } = useFoodOrderNavigation();

  const handleGoToSearch = () => {
    navigation.navigate('FoodOrderSearch');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>หน้าสั่งอาหาร 🍔</Text>
      <Text style={styles.subtitle}>ตอนนี้คุณอยู่ใน Feature: food-order</Text>

      <TouchableOpacity style={styles.button} onPress={handleGoToSearch}>
        <Text style={styles.buttonText}>ไปหน้าค้นหาร้าน</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onBackPress}>
        <Text style={styles.buttonText}>กลับหน้าหลัก</Text>
      </TouchableOpacity>
    </View>
  );
}