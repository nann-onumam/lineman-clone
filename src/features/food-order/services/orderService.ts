/**
 * Order Service
 * Business logic for order creation, submission, and retrieval.
 * This service encapsulates all order-related operations.
 */

import type { FoodOrder, CartItem } from '../types';

/**
 * Calculates the total price of all items in a cart.
 * @param items - Array of cart items
 * @returns Total price in currency units
 */
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + item.menuItem.price * item.quantity;
  }, 0);
}

/**
 * Validates if an order is ready to be submitted.
 * An order is valid if it has at least one item.
 * @param order - The order to validate
 * @returns true if order is valid, false otherwise
 */
export function isOrderValid(order: FoodOrder): boolean {
  return order.items.length > 0 && order.totalPrice > 0;
}

/**
 * Generates a unique order ID.
 * In production, this would be replaced with server-generated IDs.
 * @returns A unique order ID string
 */
export function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Creates a new food order with the given items.
 * @param items - Array of cart items
 * @returns A new FoodOrder object
 */
export function createOrder(items: CartItem[]): FoodOrder {
  return {
    id: generateOrderId(),
    items,
    totalPrice: calculateCartTotal(items),
    createdAt: new Date(),
    status: 'pending',
  };
}

/**
 * Submits an order to the backend.
 * In production, this would make an API call.
 * @param order - The order to submit
 * @returns A promise resolving to the submitted order with server details
 */
export async function submitOrder(order: FoodOrder): Promise<FoodOrder> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...order,
        status: 'confirmed',
      });
    }, 500);
  });
}
