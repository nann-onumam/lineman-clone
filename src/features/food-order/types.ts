/**
 * Food Order Feature Types
 * Contains all feature-specific types for the food ordering domain.
 * These types are never exposed to external code; they're used internally within the feature.
 */

/**
 * Cuisine type classification for restaurants.
 * Defines the available cuisine categories.
 */
export type CuisineType = 'Chinese' | 'Thai' | 'Mexican' | 'Italian' | 'Indian';

/**
 * Represents a single dish (menu item).
 * Contains basic information about a food item available for ordering.
 */
export interface Dish {
  id: string;
  name: string;
  priceTHB: number;
}

/**
 * Represents a restaurant/food vendor.
 * Contains restaurant details and their signature dishes.
 */
export interface Restaurant {
  id: string;
  name: string;
  cuisine: CuisineType;
  rating: number;
  distance: string;
  image: string;
  signatureDishes: Dish[];
}

/**
 * Represents an item in the shopping cart.
 * Links a dish to the quantity ordered.
 */
export interface CartItem {
  dishId: string;
  quantity: number;
}

/**
 * Represents the breakdown of an order total.
 * Includes subtotal, discounts, delivery fees, and final total.
 */
export interface OrderSummary {
  subtotalFood: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

/**
 * Represents a single food menu item available for ordering.
 * @deprecated Use Dish instead for new code
 */
export interface FoodMenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  icon?: string;
}

/**
 * Represents the state of a food order.
 * Groups cart items with their submission status.
 */
export interface FoodOrder {
  id: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';
}

/**
 * Navigation callback for food order feature.
 * Provides callback-based navigation without exposing navigation object directly.
 */
export interface FoodOrderNavigationCallbacks {
  onBackPress: () => void;
}
