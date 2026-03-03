# home feature

## Feature responsibility
- Owns the home landing experience and navigation entry points.
- Renders location-aware home header, nearby location list, service cards, and bottom navigation shortcuts.
- Provides static home menu/footer/location data and home-local types.

## Public API
- `index.ts` — public entrypoint for consumers outside `features/home`.
- `screens/homeScreen.tsx` — exported via `index.ts` as `HomeScreen`.
- `types/MenuItem.ts` — exported via `index.ts` as `MenuItem` type.
- `types/HomeLocation.ts` — exported via `index.ts` as `HomeLocation` type.

## Internal modules
- `components/homeHeader.tsx` — green location header + search input.
- `components/locationSearchInput.tsx` — controlled search input for location query.
- `components/nearbyMapCard.tsx` — nearby location list (text-based).
- `components/homeMenuGrid.tsx` — service card grid.
- `components/bottomNav.tsx` — bottom quick-access navigation.
- `data/menuData.ts` — menu/footer constants for home rendering.
- `data/locationData.ts` — local location seed + async fetch mock.
- `hooks/useDebouncedKeyword.ts` — debounce handling for location search.
- `hooks/useHomeLocationQuery.ts` — react-query wrapper for location data.

## Development status
- Home screen with location search, location list, menu grid, and navigation.
- Debounced location search with react-query integration.
- Text-based nearby location list (no maps).
- Service cards grid and bottom tab navigation.

## Dependency rules
- May depend on `src/shared/**` for cross-feature primitives (theme/constants/utils).
- Must not import from other feature internals unless via that feature's documented public API.
- Consumers outside this feature must import from `src/features/home` (or `src/features/home/index`) only, never deep paths like `src/features/home/components/*`.
- `MenuItem` type for home UI/data should come from `types/MenuItem.ts` within this feature.