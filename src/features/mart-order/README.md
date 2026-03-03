# mart-order feature

## Feature responsibility
- Defines mart-order entrypoint and domain boundary for mart ordering.
- Currently delegates screen rendering to food-order implementation as a compatibility path.

## Public API
- `screens/martOrderScreen.tsx` — default export `MartOrderScreen`.

## Internal modules
- `screens/martOrderScreen.tsx` — mart-order entry screen delegating to food-order screen.

## Dependency rules
- May depend on `src/shared/**` for shared primitives.
- May consume `food-order` only through its public API when reusing implementation.
- Must not duplicate food-order internals inside mart-order files.
