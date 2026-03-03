/**
 * Order Pricing Service
 * Implements all pricing business rules for food orders.
 * All pricing calculations must go through this service.
 * No UI logic; purely business logic.
 */

import type { OrderSummary } from '../types';

/**
 * Fixed delivery fee in THB.
 */
export const DELIVERY_FEE_THB = 50;

/**
 * Discount threshold: orders above this amount get a discount.
 */
export const DISCOUNT_THRESHOLD_THB = 200;

/**
 * Discount percentage applied to food subtotal when threshold is met.
 */
export const DISCOUNT_PERCENTAGE = 5;

/**
 * Calculates discount amount based on business rules.
 * Applies 5% discount if subtotalFood > 200 THB.
 * Discount is calculated only on food subtotal, not on delivery fee.
 *
 * @param subtotalFood - Food subtotal in THB
 * @returns Discount amount in THB
 */
export function calculateDiscount(subtotalFood: number): number {
  if (subtotalFood > DISCOUNT_THRESHOLD_THB) {
    return Math.round((subtotalFood * DISCOUNT_PERCENTAGE) / 100);
  }
  return 0;
}

/**
 * Calculates the complete order summary with all fees and discounts.
 * Business rules:
 * 1. Delivery fee is always 50 THB
 * 2. If subtotalFood > 200: apply 5% discount on food only
 * 3. Total = subtotalFood - discount + deliveryFee
 *
 * @param subtotalFood - Food subtotal in THB
 * @returns Complete order summary with breakdown
 */
export function calculateOrderSummary(subtotalFood: number): OrderSummary {
  // Validate input
  if (subtotalFood < 0) {
    throw new Error('Subtotal cannot be negative');
  }

  // Calculate discount on food subtotal
  const discount = calculateDiscount(subtotalFood);

  // Calculate total
  const deliveryFee = DELIVERY_FEE_THB;
  const total = subtotalFood - discount + deliveryFee;

  return {
    subtotalFood,
    discount,
    deliveryFee,
    total,
  };
}

/**
 * Formats price for display with THB currency symbol.
 *
 * @param price - Price in THB
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return `${price.toFixed(0)} ฿`;
}

/**
 * Determines if an order qualifies for a discount.
 *
 * @param subtotalFood - Food subtotal in THB
 * @returns true if discount applies, false otherwise
 */
export function hasDiscount(subtotalFood: number): boolean {
  return subtotalFood > DISCOUNT_THRESHOLD_THB;
}

/**
 * Calculates the savings amount (if any).
 * Useful for marketing messaging: "Save X THB!"
 *
 * @param subtotalFood - Food subtotal in THB
 * @returns Savings amount in THB (0 if no discount)
 */
export function calculateSavings(subtotalFood: number): number {
  return calculateDiscount(subtotalFood);
}

/**
 * Validates if order is economically viable.
 * Orders with 0 subtotal are not allowed.
 *
 * @param subtotalFood - Food subtotal in THB
 * @returns true if order is valid, false otherwise
 */
export function isValidOrderAmount(subtotalFood: number): boolean {
  return subtotalFood > 0;
}
