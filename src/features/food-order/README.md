# food-order Feature

## Feature Responsibility
- Owns the food ordering domain with business logic isolated in hooks/services.
- Provides a single-screen flow for browsing restaurants and selecting menu items.
- Shows realtime order summary (selected count + price totals) on the same screen.

## Current User Flow
- Home → FoodOrder
- FoodOrder is the main working screen (no intermediate FoodOrderSearch route in stack).
- Users tap dish rows to add quantity (`x1`, `x2`, ...).
- Summary updates immediately at the bottom with selected menu count and total price.

## Folder Structure

```
food-order/
├── screens/
│   ├── foodOrderScreen.tsx              # Main single-screen browse + select flow
│   ├── FoodOrderScreen.styles.ts        # Styles for main screen
│   ├── FoodOrderSearchScreen.tsx        # Legacy/standalone search screen (not in main stack flow)
│   ├── FoodOrderSearchScreen.styles.ts
│   └── index.ts
├── components/
│   ├── FoodRestaurantCard.tsx           # Restaurant card + selectable dish rows
│   ├── FoodRestaurantCard.styles.ts
│   ├── OrderSummaryCard.tsx             # Pricing breakdown display
│   ├── OrderSummaryCard.styles.ts
│   └── index.ts
├── hooks/
│   ├── useFoodOrderNavigation.ts
│   ├── useFoodRestaurants.ts
│   ├── useOrderPricing.ts
│   ├── index.ts
│   └── __tests__/
├── services/
│   ├── foodRestaurantService.ts
│   ├── orderPricingService.ts
│   └── index.ts
├── data/
│   ├── mockRestaurants.ts
│   └── index.ts
├── types.ts
├── index.ts
└── README.md
```

## Key Screen Behavior: foodOrderScreen.tsx
- Renders restaurant list from mock data.
- Renders each restaurant menu via `FoodRestaurantCard`.
- Dish row tap increases selected quantity per dish.
- Uses `useOrderPricing` to calculate pricing summary.
- Displays realtime summary with:
  - selected menu count
  - total price
  - subtotal / discount / delivery / total breakdown
- Keeps back-to-home action via `useFoodOrderNavigation`.

## Architecture Rules
- UI components contain no pricing or API business rules.
- Pricing logic stays in `services/orderPricingService.ts` + `hooks/useOrderPricing.ts`.
- Feature imports only from `core` and `shared` (validated by boundary check).
- Public consumption must import from `src/features/food-order/index.ts` only.
