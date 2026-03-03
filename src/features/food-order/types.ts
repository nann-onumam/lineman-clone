/**
 * Food Order Feature Types
 * Contains all feature-specific types for the food ordering domain.
 */

/**
 * Represents a single food menu item available for ordering.
 */
export interface FoodMenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  icon?: string;
}

/**
 * Represents an item added to the shopping cart.
 */
export interface CartItem {
  menuItem: FoodMenuItem;
  quantity: number;
  addedAt: Date;
}

/**
 * Represents the state of a food order.
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
