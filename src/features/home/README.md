# home feature

## Feature responsibility
- Owns the home landing experience and navigation entry points.
- Renders home menu tiles and bottom navigation shortcuts.
- Provides static home menu/footer data and the home-local `MenuItem` type.

## Public API
- `screens/homeScreen.tsx` — default export `HomeScreen`.
- `hooks/useHomeNavigation.ts` — navigation behavior for home interactions.
- `types/MenuItem.ts` — shared type used by home modules.

## Internal modules
- `components/homeMenuGrid.tsx` — grid of main menu actions.
- `components/bottomNav.tsx` — bottom quick-access navigation.
- `data/menuData.ts` — menu/footer constants for home rendering.
- `hooks/__tests__/useHomeNavigation.test.ts` — unit tests for hook logic.

## Dependency rules
- May depend on `src/shared/**` for cross-feature primitives (theme/constants/utils).
- Must not import from other feature internals unless via that feature's documented public API.
- `MenuItem` type for home UI/data should come from `types/MenuItem.ts` within this feature.
