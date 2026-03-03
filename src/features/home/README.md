# home feature

## Feature responsibility
- Owns the home landing experience and navigation entry points.
- Renders home menu tiles and bottom navigation shortcuts.
- Provides static home menu/footer data and the home-local `MenuItem` type.

## Public API
- `index.ts` — public entrypoint for consumers outside `features/home`.
- `screens/homeScreen.tsx` — exported via `index.ts` as `HomeScreen`.
- `types/MenuItem.ts` — exported via `index.ts` as `MenuItem` type.

## Internal modules
- `components/homeMenuGrid.tsx` — grid of main menu actions.
- `components/bottomNav.tsx` — bottom quick-access navigation.
- `data/menuData.ts` — menu/footer constants for home rendering.
- `hooks/__tests__/useHomeNavigation.test.ts` — unit tests for hook logic.

## Dependency rules
- May depend on `src/shared/**` for cross-feature primitives (theme/constants/utils).
- Must not import from other feature internals unless via that feature's documented public API.
- Consumers outside this feature must import from `src/features/home` (or `src/features/home/index`) only, never deep paths like `src/features/home/components/*`.
- `MenuItem` type for home UI/data should come from `types/MenuItem.ts` within this feature.