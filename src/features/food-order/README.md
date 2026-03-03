# food-order Feature

## Feature Responsibility
- Owns the food ordering screen and domain-specific business logic.
- Manages food menu items, shopping cart, and order state.
- Provides type-safe navigation callbacks without exposing navigation details.
- Implements all food ordering workflows in isolation.

## Folder Structure

```
food-order/
├── screens/
│   ├── FoodOrderScreen.tsx          # Main composition screen
│   └── FoodOrderScreen.styles.ts    # Extracted styles
├── components/                       # UI components (future)
│   └── (empty - add food-specific UI components here)
├── hooks/
│   ├── useFoodOrderNavigation.ts     # Navigation callback wrapper
│   ├── index.ts                      # Internal hooks export
│   └── __tests__/
│       └── useFoodOrderNavigation.test.ts
├── data/                             # Feature data and constants
│   └── (empty - add MENU_DATA, ORDER_CONFIG, etc. here)
├── types.ts                          # Feature-specific types (single file)
├── index.ts                          # Public API export
└── README.md                         # This file
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
- **Responsibility**: Composition-only screen that displays food ordering UI.
- **Input**: Uses `useFoodOrderNavigation()` hook to get navigation callbacks.
- **Output**: React Native View tree with title, subtitle, and back button.
- **Styling**: Imports styles from `FoodOrderScreen.styles.ts`.
- **No Direct Dependencies**: Does not receive navigation object; uses callbacks only.

### hooks/useFoodOrderNavigation.ts
- **Responsibility**: Encapsulates navigation logic for food order screens.
- **Export**: `FoodOrderNavigationCallbacks` interface with `onBackPress` callback.
- **Implementation**: Wraps `useNavigation()` to handle go-back or fallback-to-home.
- **Type Safety**: Uses `RootStackParamList` from core navigation.
- **Testable**: Can be tested without rendering UI components.

### screens/FoodOrderScreen.styles.ts
- **Responsibility**: Extracted StyleSheet for FoodOrderScreen.
- **Exports**: Named `styles` object with container, title, subtitle, button, buttonText.
- **Theme Access**: Uses `shared/theme/colors`, `spacing`, `typography`.
- **No Hardcoding**: All colors, sizes, and spacing come from shared theme.

### types.ts
- **Single File**: All feature-specific types live here (never split into multiple type files).
- **Scope**: Contains domain models (`FoodMenuItem`, `CartItem`, `FoodOrder`) and callback types.
- **Usage**: Imported by screens, components, hooks, and public API.
- **Export**: All types are re-exported via `index.ts`.

### data/ (Future)
- **Purpose**: Store feature-dependent constants and data (e.g., `MENU_DATA`, `ORDER_STATUSES`).
- **Isolation**: Separate data by domain (avoid mixing unrelated business domains).
- **Example**: Create `menuConfig.ts` for menu-related constants, `orderConfig.ts` for order logic.

### components/ (Future)
- Will hold reusable UI components specific to food ordering (e.g., `MenuItem`, `CartSummary`).
- Each component: single responsibility, locally typed, minimal prop drilling.
- Exported via internal `index.ts` only; not part of public feature API.

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
- Feature implements business logic without exposing internals.
- Does not import from other features.
- All external access routed through public API (`index.ts`).

### 2. Screen Composition (Rule 6)
- `FoodOrderScreen` is composition-only.
- All business logic (navigation) delegated to hooks.
- No `any` types; uses `RootStackParamList` for type safety.

### 3. Navigation Encapsulation (Rule 12, 14)
- Navigation logic wrapped in `useFoodOrderNavigation()` hook.
- Components receive callbacks, not navigation objects.
- No hardcoded route strings; uses centralized `core/navigation/config.ts`.

### 4. Type Discipline (Rule 14)
- No `any` types anywhere in this feature.
- All types live in single `types.ts`.
- Navigation uses typed callbacks, not raw objects.

### 5. Styling (Rule 19-20)
- Styles extracted to `FoodOrderScreen.styles.ts`.
- All colors/spacing/typography from `shared/theme/`.
- No inline hardcoded values.

### 6. Domain Separation (Rule 9-10)
- Food order types (`FoodMenuItem`, `CartItem`, `FoodOrder`) clearly named.
- Ready to extend into `data/` folder for domain-specific config.

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
