/**
 * Mock Restaurant Data
 * Sample restaurants with signature dishes for development and testing.
 * Uses strict typing with Restaurant and Dish interfaces.
 */

import type { Restaurant, Dish, CuisineType } from '../types';

/**
 * Helper function to create a dish with strict typing.
 */
function createDish(id: string, name: string, priceTHB: number): Dish {
  return {
    id,
    name,
    priceTHB,
  };
}

/**
 * Helper function to create a restaurant with strict typing.
 */
function createRestaurant(
  id: string,
  name: string,
  cuisine: CuisineType,
  rating: number,
  distance: string,
  image: string,
  signatureDishes: Dish[],
): Restaurant {
  return {
    id,
    name,
    cuisine,
    rating,
    distance,
    image,
    signatureDishes,
  };
}

// Chinese Restaurant Dishes
const chineseDishes: Dish[] = [
  createDish('chinese-1', 'Peking Duck', 450),
  createDish('chinese-2', 'Dim Sum Platter', 320),
  createDish('chinese-3', 'Kung Pao Chicken', 280),
  createDish('chinese-4', 'Sweet & Sour Pork', 250),
  createDish('chinese-5', 'Mapo Tofu', 220),
];

// Thai Restaurant Dishes
const thaiDishes: Dish[] = [
  createDish('thai-1', 'Pad Thai', 120),
  createDish('thai-2', 'Tom Yum Goong', 180),
  createDish('thai-3', 'Green Curry Chicken', 150),
  createDish('thai-4', 'Som Tam', 90),
  createDish('thai-5', 'Massaman Beef', 170),
];

// Mexican Restaurant Dishes
const mexicanDishes: Dish[] = [
  createDish('mexican-1', 'Beef Tacos', 200),
  createDish('mexican-2', 'Chicken Quesadilla', 220),
  createDish('mexican-3', 'Burrito Bowl', 240),
  createDish('mexican-4', 'Nachos Supreme', 180),
  createDish('mexican-5', 'Enchiladas', 260),
];

// Italian Restaurant Dishes
const italianDishes: Dish[] = [
  createDish('italian-1', 'Margherita Pizza', 280),
  createDish('italian-2', 'Carbonara Pasta', 260),
  createDish('italian-3', 'Lasagna', 300),
  createDish('italian-4', 'Risotto Mushroom', 270),
  createDish('italian-5', 'Tiramisu', 190),
];

// Indian Restaurant Dishes
const indianDishes: Dish[] = [
  createDish('indian-1', 'Butter Chicken', 250),
  createDish('indian-2', 'Chicken Biryani', 230),
  createDish('indian-3', 'Paneer Tikka', 210),
  createDish('indian-4', 'Garlic Naan', 60),
  createDish('indian-5', 'Lamb Rogan Josh', 320),
];

/**
 * Mock restaurants available for ordering.
 * Each restaurant has exactly 5 signature dishes.
 */
export const MOCK_RESTAURANTS: Restaurant[] = [
  createRestaurant(
    'restaurant-1',
    'Golden Dragon',
    'Chinese',
    4.7,
    '0.8 km',
    '🏮',
    chineseDishes,
  ),
  createRestaurant(
    'restaurant-2',
    'Lemongrass Thai',
    'Thai',
    4.6,
    '1.2 km',
    '🌿',
    thaiDishes,
  ),
  createRestaurant(
    'restaurant-3',
    'Casa Fiesta',
    'Mexican',
    4.5,
    '1.5 km',
    '🌶️',
    mexicanDishes,
  ),
  createRestaurant(
    'restaurant-4',
    'La Bella Italia',
    'Italian',
    4.8,
    '0.9 km',
    '🍝',
    italianDishes,
  ),
  createRestaurant(
    'restaurant-5',
    'Taj Mahal',
    'Indian',
    4.6,
    '1.3 km',
    '🍛',
    indianDishes,
  ),
];

/**
 * Get a restaurant by ID.
 * @param id - Restaurant ID
 * @returns Restaurant object or undefined if not found
 */
export function getRestaurantById(id: string): Restaurant | undefined {
  return MOCK_RESTAURANTS.find((restaurant) => restaurant.id === id);
}

/**
 * Get restaurants by cuisine type.
 * @param cuisine - Cuisine type to filter by
 * @returns Array of restaurants matching the cuisine
 */
export function getRestaurantsByCuisine(cuisine: CuisineType): Restaurant[] {
  return MOCK_RESTAURANTS.filter((restaurant) => restaurant.cuisine === cuisine);
}

/**
 * Get a dish by ID from all restaurants.
 * @param dishId - Dish ID
 * @returns Dish object or undefined if not found
 */
export function getDishById(dishId: string): Dish | undefined {
  for (const restaurant of MOCK_RESTAURANTS) {
    const dish = restaurant.signatureDishes.find((d) => d.id === dishId);
    if (dish) {
      return dish;
    }
  }
  return undefined;
}

/**
 * Get all available dishes across all restaurants.
 * @returns Flattened array of all dishes
 */
export function getAllDishes(): Dish[] {
  return MOCK_RESTAURANTS.flatMap((restaurant) => restaurant.signatureDishes);
}
