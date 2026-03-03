# home feature

## Feature responsibility
- Owns the home landing experience and navigation entry points.
- Renders location-aware home header, service menu grid, and bottom navigation shortcuts.
- Provides static home menu/footer/location data and home-local types.

## Public API
- `index.ts` — public entrypoint for consumers outside `features/home`.
- `screens/homeScreen.tsx` — exported via `index.ts` as `HomeScreen`.
- `types/MenuItem.ts` — exported via `index.ts` as `MenuItem` type.
- `types/HomeLocation.ts` — exported via `index.ts` as `HomeLocation` type.

## Internal modules
- `components/homeHeader.tsx` — green location header with current location name.
- `components/homeMenuGrid.tsx` — service card grid.
- `components/bottomNav.tsx` — bottom quick-access navigation.
- `data/menuData.ts` — menu/footer constants for home rendering.
- `data/locationData.ts` — local location seed + async fetch mock.
- `hooks/useHomeLocationQuery.ts` — react-query wrapper for location data.
- `hooks/useHomeNavigation.ts` — navigation logic for menu and footer items.

## Development status
- Home screen with location header, menu grid, and bottom navigation.
- Location display (first location from query) in header.
- Service cards grid with 6 menu items.
- Bottom tab navigation with 4 shortcuts.

## Dependency rules
- May depend on `src/shared/**` for cross-feature primitives (theme/constants/utils).
- May depend on `src/core/navigation/**` for navigation types and routing.
- Must not import from other feature internals unless via that feature's documented public API.
- Consumers outside this feature must import from `src/features/home` (or `src/features/home/index`) only, never deep paths like `src/features/home/components/*`.
- `MenuItem` type for home UI/data should come from `types/MenuItem.ts` within this feature.