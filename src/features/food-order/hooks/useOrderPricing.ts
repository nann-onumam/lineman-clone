/**
 * Order Pricing Hook
 * Manages pricing calculations for shopping cart.
 * Orchestrates pricing business logic without exposing it to UI.
 */

import { useMemo } from 'react';
import type { CartItem, OrderSummary } from '../types';
import { calculateOrderSummary } from '../services/orderPricingService';
import { getDishById } from '../data/mockRestaurants';

/**
 * Return type for useOrderPricing hook.
 */
export interface UseOrderPricingResult {
  subtotalFood: number;
  orderSummary: OrderSummary;
  isEmpty: boolean;
}

/**
 * Hook for calculating order pricing.
 * Features:
 * - Computes food subtotal from cart items
 * - Applies business pricing rules
 * - Memoized calculations for performance
 * - No UI logic; purely orchestration
 *
 * @param cartItems - Array of items in the shopping cart
 * @returns Pricing information and order summary
 */
export function useOrderPricing(cartItems: CartItem[]): UseOrderPricingResult {
  // Calculate subtotal from cart items
  const subtotalFood = useMemo(() => {
    if (cartItems.length === 0) {
      return 0;
    }

    return cartItems.reduce((total, item) => {
      const dish = getDishById(item.dishId);
      if (!dish) {
        return total;
      }
      return total + dish.priceTHB * item.quantity;
    }, 0);
  }, [cartItems]);

  // Calculate complete order summary using pricing service
  const orderSummary = useMemo(() => {
    return calculateOrderSummary(subtotalFood);
  }, [subtotalFood]);

  // Determine if cart is empty
  const isEmpty = useMemo(() => {
    return cartItems.length === 0 || subtotalFood === 0;
  }, [cartItems, subtotalFood]);

  return {
    subtotalFood,
    orderSummary,
    isEmpty,
  };
}

/**
 * Alternative hook for cases where you already have a subtotal.
 * Useful when pricing is calculated elsewhere.
 *
 * @param subtotalFood - Pre-calculated food subtotal in THB
 * @returns Order summary with pricing breakdown
 */
export function useOrderPricingFromSubtotal(subtotalFood: number): OrderSummary {
  return useMemo(() => {
    return calculateOrderSummary(Math.max(0, subtotalFood));
  }, [subtotalFood]);
}
