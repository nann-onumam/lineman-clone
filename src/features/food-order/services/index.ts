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
} from './orderService';

export {
  searchMenuItems,
  filterByPriceRange,
  sortMenuItems,
  findMenuItemById,
} from './menuService';
