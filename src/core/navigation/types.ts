/**
 * Core navigation type definitions for the entire application.
 * All navigation parameters and screen names are centralized here
 * to ensure type safety and consistent navigation patterns.
 */

/**
 * Root stack navigator parameter list.
 * Defines all available screens in the application and their parameter types.
 */
export type RootStackParamList = {
  Home: undefined;
  FoodOrder: undefined;
  FoodOrderSearch: undefined;
  MartOrder: undefined;
};

/**
 * Navigation route names type.
 * Use this for type-safe route name references.
 */
export type RootNavigationRoute = keyof RootStackParamList;
