# food-order feature

## Feature responsibility
- Owns food ordering screen behavior and domain-specific UI.
- Provides the implementation used when navigating to food ordering flows.

## Public API
- `screens/foodOrderScreen.tsx` — default export `FoodOrderScreen`.

## Internal modules
- `screens/foodOrderScreen.tsx` — current feature implementation.

## Dependency rules
- May depend on `src/shared/**` for reusable primitives.
- Must not depend on `mart-order` internals.
- Food-order behavior should be implemented here and reused by other features only through this public screen API.
