/**
 * Food Order Feature Data
 * Static data and configuration for the food ordering domain.
 */

import type { FoodMenuItem } from '../types';

/**
 * Sample menu items for the food ordering feature.
 * In production, this would be fetched from the API.
 */
export const MENU_ITEMS: FoodMenuItem[] = [
  {
    id: 1,
    name: 'ส้มตำ',
    description: 'ซอสมะขามสด ผักสดใจ',
    price: 89,
    icon: '🥗',
  },
  {
    id: 2,
    name: 'กระเพราหมูสับ',
    description: 'เนื้อหมูสับ ใบกระเพรา เพิ่มเติม',
    price: 99,
    icon: '🍲',
  },
  {
    id: 3,
    name: 'ผัดไทย',
    description: 'เส้นข้าว กุ้งสด หมู่',
    price: 79,
    icon: '🍜',
  },
  {
    id: 4,
    name: 'เเกงแดง',
    description: 'เนื้อวัว มะเขือ ใบโหระพ',
    price: 129,
    icon: '🥘',
  },
  {
    id: 5,
    name: 'ข้าวมัน',
    description: 'ข้าว หมูต้ม น้ำซุปหมู',
    price: 69,
    icon: '🍚',
  },
];

/**
 * Order status display labels.
 * Maps internal status values to user-friendly labels.
 */
export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'รอการยืนยัน',
  confirmed: 'ยืนยันแล้ว',
  preparing: 'กำลังเตรียม',
  ready: 'พร้อมรับ',
  completed: 'สำเร็จ',
};

/**
 * Minimum order value required to place an order.
 * Orders below this amount may require additional fees.
 */
export const MINIMUM_ORDER_VALUE = 100;

/**
 * Delivery fee configuration.
 * Applied to orders below MINIMUM_ORDER_VALUE.
 */
export const DELIVERY_FEE = 20;
