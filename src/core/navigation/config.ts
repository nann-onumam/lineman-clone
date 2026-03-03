/**
 * Navigation configuration and routing mappings.
 * This file centralizes all navigation routing decisions,
 * allowing data-driven navigation from menu items and other UI elements.
 */

import type { RootNavigationRoute } from './types';

/**
 * Maps menu item IDs to navigation routes.
 * This decouples UI data from navigation logic.
 */
export const MENU_ROUTE_MAP: Record<number, RootNavigationRoute | null> = {
  1: 'FoodOrder',     // สั่งอาหาร (Food Order)
  2: 'MartOrder',     // สั่งของ (Mart Order) - Placeholder, not yet implemented
  3: null,            // เรียกรถ (Ride) - TBD
  4: null,            // ปรึกษาเภสัช (Pharmacy) - TBD
  5: null,            // เมสเซนเจอร์ (Messenger) - TBD
  6: null,            // แพ็กเกจ (Package) - TBD
};

/**
 * Maps footer item IDs to navigation routes.
 * Extended as new features are implemented.
 */
export const FOOTER_ROUTE_MAP: Record<number, RootNavigationRoute | null> = {
  1: 'Home',          // หน้าแรก (Home)
  2: null,            // คำสั่งซื้อ (Orders) - TBD
  3: null,            // ข้อความ (Messages) - TBD
  4: null,            // อื่นๆ (Settings) - TBD
};

/**
 * Resolves a menu/button ID to a navigation route.
 * Returns null if the route is not yet implemented.
 */
export function getRouteFromMenuId(menuId: number): RootNavigationRoute | null {
  return MENU_ROUTE_MAP[menuId] ?? null;
}

/**
 * Resolves a footer button ID to a navigation route.
 * Returns null if the route is not yet implemented.
 */
export function getRouteFromFooterId(footerId: number): RootNavigationRoute | null {
  return FOOTER_ROUTE_MAP[footerId] ?? null;
}
