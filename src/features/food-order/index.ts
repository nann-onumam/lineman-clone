/**
 * Food Order Feature Public API
 * This file defines the public interface for the food-order feature.
 * External code must import from this file only, never from internal paths.
 */

export { default as FoodOrderScreen } from './screens/foodOrderScreen';
export type {
  FoodMenuItem,
  CartItem,
  FoodOrder,
  FoodOrderNavigationCallbacks,
} from './types';
