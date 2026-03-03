# home feature

## Feature responsibility
- Owns the home landing experience and navigation entry points.
- Renders location-aware home header, nearby map markers, service cards, and bottom navigation shortcuts.
- Provides static home menu/footer/location data and home-local types.

## Public API
- `index.ts` — public entrypoint for consumers outside `features/home`.
- `screens/homeScreen.tsx` — exported via `index.ts` as `HomeScreen`.
- `types/MenuItem.ts` — exported via `index.ts` as `MenuItem` type.
- `types/HomeLocation.ts` — exported via `index.ts` as `HomeLocation` type.

## Internal modules
- `components/homeHeader.tsx` — green location header + search input.
- `components/locationSearchInput.tsx` — controlled search input for location query.
- `components/nearbyMapCard.tsx` — `react-native-maps` map card + markers.
- `components/homeMenuGrid.tsx` — service card grid.
- `components/bottomNav.tsx` — bottom quick-access navigation.
- `data/menuData.ts` — menu/footer constants for home rendering.
- `data/locationData.ts` — local location seed + async fetch mock.
- `hooks/useDebouncedKeyword.ts` — debounce handling for location search.
- `hooks/useHomeLocationQuery.ts` — react-query wrapper for location data.
- `hooks/__tests__/useHomeNavigation.test.ts` — unit tests for hook logic.

## 10 development phases implemented
1. Confirmed existing home screen baseline and navigation hooks.
2. Added dependency declarations for map, query, and debounce packages.
3. Added `HomeLocation` model to keep location data strongly typed.
4. Created location data source with async fetch simulation.
5. Added debounced keyword hook for search UX and reduced rerenders.
6. Added react-query home location hook for async data lifecycle.
7. Added modular header with location display + controlled search input.
8. Added nearby map card with markers via `react-native-maps`.
9. Refactored home menu section into card-based service module.
10. Composed everything in `HomeScreen` with loading state while preserving bottom tab navigation.

## Dependency rules
- May depend on `src/shared/**` for cross-feature primitives (theme/constants/utils).
- Must not import from other feature internals unless via that feature's documented public API.
- Consumers outside this feature must import from `src/features/home` (or `src/features/home/index`) only, never deep paths like `src/features/home/components/*`.
- `MenuItem` type for home UI/data should come from `types/MenuItem.ts` within this feature.