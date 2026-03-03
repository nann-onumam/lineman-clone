# food-order Feature

## Feature Responsibility
- Owns the food ordering domain with complete business logic isolation.
- Manages restaurant search, menu browsing, shopping cart, and order submission.
- Provides type-safe composition screens without business logic.
- Implements complete food ordering workflow with clear separation of concerns.

## Folder Structure

```
food-order/
├── screens/
│   ├── FoodOrderScreen.tsx              # Landing screen with navigation to search
│   ├── FoodOrderScreen.styles.ts        # Styles for landing screen
│   ├── FoodOrderSearchScreen.tsx        # Restaurant search & browse screen
│   ├── FoodOrderSearchScreen.styles.ts  # Styles for search screen
│   └── index.ts                         # Internal screen exports
├── components/
│   ├── FoodRestaurantCard.tsx           # Restaurant display card
│   ├── FoodRestaurantCard.styles.ts     # Restaurant card styles
│   ├── OrderSummaryCard.tsx             # Order pricing breakdown card
│   ├── OrderSummaryCard.styles.ts       # Order summary styles
│   └── index.ts                         # Internal component exports
├── hooks/
│   ├── useFoodOrderNavigation.ts        # Navigation callbacks for FoodOrder
│   ├── useFoodRestaurants.ts            # Restaurant search with debounce & pagination
│   ├── useOrderPricing.ts               # Cart pricing calculation
│   ├── index.ts                         # Internal hooks export
│   └── __tests__/
│       └── useFoodOrderNavigation.test.ts
├── services/
│   ├── foodRestaurantService.ts         # Restaurant search & pagination logic
│   ├── orderPricingService.ts           # Pricing calculation & discount rules
│   └── index.ts                         # Internal service exports
├── data/
│   ├── mockRestaurants.ts               # Mock restaurant & dish data
│   └── index.ts                         # Internal data exports
├── types.ts                             # Feature-specific types (single file)
├── index.ts                             # Public API export
└── README.md                            # This file
```

## Screen Flow

```
Home Screen
    ↓ (tap "สั่งอาหาร")
FoodOrderScreen (Landing)
  ├─ Button: "ไปหน้าค้นหาร้าน" → FoodOrderSearchScreen
  └─ Button: "กลับหน้าหลัก" → Home Screen
    ↓
FoodOrderSearchScreen (Search & Browse)
  ├─ Search input with debounce (500ms)
  ├─ Restaurant list with pagination
  ├─ Back button → FoodOrderScreen
  └─ (Future: Restaurant card tap → Menu/Detail screen)
```

## Public API

These are the only exports safe for use outside this feature:

```typescript
// Default export: Main screen
export { FoodOrderScreen } from './src/features/food-order';

// Type exports for shared domain models
export type {
  FoodMenuItem,       // Represents a menu item
  CartItem,           // Represents a cart item with quantity
  FoodOrder,          // Represents a complete order
  FoodOrderNavigationCallbacks,  // Navigation callback interface
} from './src/features/food-order';
```

**Rule**: Consumers outside this feature must import from `src/features/food-order/index.ts` only. Never import from internal paths like `screens/`, `components/`, or `hooks/`.

## Internal Modules

### screens/FoodOrderScreen.tsx
- **Responsibility**: Landing screen for food ordering feature with navigation options.
- **Input**: Receives `navigation` prop from stack navigator.
- **Output**: React Native View with title, navigation buttons.
- **Navigation**: 
  - "ไปหน้าค้นหาร้าน" → navigates to FoodOrderSearch
  - "กลับหน้าหลัก" → uses `useFoodOrderNavigation()` hook to go back
- **Styling**: Imports styles from `FoodOrderScreen.styles.ts`.
- **No Business Logic**: Pure composition screen.

### screens/FoodOrderSearchScreen.tsx
- **Responsibility**: Restaurant search and browsing with pagination.
- **Input**: Receives `navigation` prop from stack navigator.
- **Features**:
  - Search input with 500ms debounce
  - Restaurant list with FlatList
  - Manual pagination (load more)
  - Loading states (initial + pagination)
  - Error state with retry
  - Empty states
  - Back button to FoodOrder screen
- **Hooks**: Uses `useFoodRestaurants()` for data fetching
- **Components**: Renders `FoodRestaurantCard` for each restaurant
- **Styling**: Imports styles from `FoodOrderSearchScreen.styles.ts`.
- **No Business Logic**: All logic in hooks and services.

### screens/FoodOrderScreen.styles.ts
- **Responsibility**: Extracted StyleSheet for FoodOrderScreen.
- **Exports**: Named `styles` object with container, title, subtitle, button, buttonText.
- **Theme Access**: Uses `shared/theme/colors`, `spacing`, `typography`.
- **No Hardcoding**: All colors, sizes, and spacing come from shared theme.

### hooks/useFoodOrderNavigation.ts
- **Responsibility**: Encapsulates navigation logic for food order screens.
- **Export**: `FoodOrderNavigationCallbacks` interface with `onBackPress` callback.
- **Implementation**: Wraps `useNavigation()` to handle go-back or fallback-to-home.
- **Type Safety**: Uses `RootStackParamList` from core navigation.
- **Testable**: Can be tested without rendering UI components.

### services/orderService.ts
- **Responsibility**: Business logic for order creation, submission, and validation.
- **Functions**:
  - `calculateCartTotal(items)` — Sums cart item prices
  - `isOrderValid(order)` — Validates order completeness
  - `generateOrderId()` — Creates unique order ID
  - `createOrder(items)` — Creates a new order object
  - `submitOrder(order)` — Submits order to backend
- **No UI Dependencies**: Pure functions, testable without React.
- **No Navigation**: Handled separately in hooks.
- **Export**: Via `services/index.ts` (internal only).

### services/menuService.ts
- **Responsibility**: Business logic for menu operations (search, filter, sort).
- **Functions**:
  - `searchMenuItems(items, query)` — Filters by name/description
  - `filterByPriceRange(items, min, max)` — Filters by price
  - `sortMenuItems(items, sortBy, order)` — Sorts by name or price
  - `findMenuItemById(items, itemId)` — Finds item by ID
- **No UI Dependencies**: Pure utility functions.
- **No State Management**: Accepts data, returns transformed data.
- **Export**: Via `services/index.ts` (internal only).

### data/menuConfig.ts
- **Responsibility**: Static configuration and constants for the food domain.
- **Exports**:
  - `MENU_ITEMS` — Sample menu items
  - `ORDER_STATUS_LABELS` — User-friendly status labels
  - `MINIMUM_ORDER_VALUE` — Minimum order threshold
  - `DELIVERY_FEE` — Delivery cost
- **Static Data**: No API calls; would be replaced with API in production.
- **Domain Constants**: All food-order specific configuration.
- **Export**: Via `data/index.ts` (internal only).

### types.ts
- **Single File**: All feature-specific types live here (never split into multiple type files).
- **Scope**: Contains domain models (`FoodMenuItem`, `CartItem`, `FoodOrder`) and callback types.
- **Usage**: Imported by screens, components, hooks, services, and public API.
- **Export**: All types are re-exported via `index.ts`.
- **Examples**:
  ```typescript
  interface FoodMenuItem { id, name, description, price, icon }
  interface CartItem { menuItem, quantity, addedAt }
  interface FoodOrder { id, items, totalPrice, createdAt, status }
  ```

### components/ (Future)
- **Purpose**: Reusable UI components specific to food ordering.
- **Isolation**: Components are feature-private; not exported to other features.
- **Single Responsibility**: Each component handles one concern.
- **Typing**: Uses types from `../types.ts`.
- **Examples**:
  - `MenuItem.tsx` — Single menu item display+action
  - `MenuList.tsx` — List of menu items
  - `CartItem.tsx` — Cart item with quantity controls
  - `CartSummary.tsx` — Order summary with total

## Dependency Rules

### ✅ Allowed Dependencies
- `src/core/**` — system-level navigation types, models, utilities
- `src/shared/**` — theme, colors, spacing, typography, constants, layouts

### ❌ Forbidden Dependencies
- Other `features/**` (except via shared/core)
- Deep imports from any feature (including `food-order`)

### Example Import Rules
```typescript
// ✅ Correct
import { FoodOrderScreen } from 'src/features/food-order';
import type { FoodMenuItem } from 'src/features/food-order';
import useFoodOrderNavigation from '../hooks/useFoodOrderNavigation';  // Internal

// ❌ Incorrect
import FoodOrderScreen from 'src/features/food-order/screens/foodOrderScreen';  // Deep import
import { FoodMenuData } from 'src/features/food-order/data/menuData';  // Internal data
import type { FoodOrder } from 'src/features/food-order/types';  // Use index export
import SomeHomeComponent from 'src/features/home/components/...';  // Cross-feature
```

## Architecture Rules Applied

### 1. Layer Separation (Rule 1-3)
- **Core** ← **Features** ← **Shared** (dependency direction)
- Feature implements business logic without exposing internals.
- Does not import from other features.
- All external access routed through public API (`index.ts`).
- Services layer handles pure business logic (no UI, no navigation).
- Data layer holds constants and static configuration.

### 2. Internal Layer Structure
- **screens/**: Composition-only (UI + hooks, no business logic)
- **components/**: Reusable feature-private UI components
- **hooks/**: Feature-specific React hooks (navigation, state)
- **services/**: Pure business logic (order operations, menu filtering)
- **data/**: Static constants and configuration
- **types.ts**: Single file for all feature types

### 3. Screen Composition (Rule 6)
- `FoodOrderScreen` is composition-only.
- All business logic (navigation, data fetching) delegated to hooks/services.
- No `any` types; uses `RootStackParamList` for type safety.
- Screens receive minimal props (only callbacks and styled data).

### 4. Navigation Encapsulation (Rule 12)
- Navigation logic wrapped in `useFoodOrderNavigation()` hook.
- Screens call callbacks, not navigation directly.
- Navigation never exposed to child components.

### 5. Business Logic Isolation (Rule 6, 15)
- Order logic in `services/orderService.ts` (pure functions).
- Menu logic in `services/menuService.ts` (pure functions).
- Services are UI-free and testable without React.
- Data transformations happen in services, not components.

### 6. Type Discipline (Rule 14)
- No `any` types anywhere in this feature.
- All types live in single `types.ts`.
- Services, hooks, and data fully typed.
- Navigation callbacks typed via `FoodOrderNavigationCallbacks`.

### 7. Styling (Rule 19-20)
- Styles extracted to `*.styles.ts` files.
- All colors/spacing/typography from `shared/theme/`.
- No inline hardcoded values.

### 8. Domain Separation
- Food order types, services, data live together.
- Clear boundaries: order domain ≠ menu domain.
- Data and services named by domain (e.g., `orderService`, `menuConfig`).

## Testing

Run the following to validate:

```bash
npm run typecheck    # TypeScript strict mode
npm run lint         # ESLint
npm test             # Jest (includes useFoodOrderNavigation.test.ts)
npm run check:feature-imports  # No circular dependencies
```

All tests must pass before merging.

## Future Expansion

As the food ordering domain grows, follow these patterns:

### Adding Menu Items Component
```typescript
// components/MenuItem.tsx — Single-responsibility component
interface MenuItemProps {
  item: FoodMenuItem;
  onPress: (itemId: number) => void;
}
```

### Adding Shopping Cart Data
```typescript
// data/menuConfig.ts
export const MENU_ITEMS: FoodMenuItem[] = [...]

// hooks/useShoppingCart.ts
export function useShoppingCart() { ... }
```

### Adding Order Management
```typescript
// hooks/useOrderMutation.ts
export function useOrderMutation() {
  return useMutation({ /* order submission */ })
}
```

All new modules follow the same rules: single responsibility, typed, tested, exported via public API.
