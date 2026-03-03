/**
 * Food Order Feature Services
 * Internal business logic layer (not part of public API).
 * Exposes utility functions for order and menu operations.
 */

export {
  calculateCartTotal,
  isOrderValid,
  generateOrderId,
  createOrder,
  submitOrder,
  calculateCartTotalFromDishes,
} from './orderService';

export {
  searchMenuItems,
  filterByPriceRange,
  sortMenuItems,
  findMenuItemById,
} from './menuService';

export {
  searchRestaurants,
  getAllRestaurants,
  getRestaurantById,
  searchRestaurantsAsync,
  getAllRestaurantsAsync,
  type RestaurantSearchResult,
  type PaginationMeta,
} from './foodRestaurantService';

export {
  calculateDiscount,
  calculateOrderSummary,
  formatPrice,
  hasDiscount,
  calculateSavings,
  isValidOrderAmount,
  DELIVERY_FEE_THB,
  DISCOUNT_THRESHOLD_THB,
  DISCOUNT_PERCENTAGE,
} from './orderPricingService';
