# LINE MAN Clone

This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and Run Your App

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify Your App

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Architecture & Codebase Guidelines

This project follows a **feature-based modular architecture** with strict layer separation and dependency rules. All developers must adhere to the following 25 mandatory rules to maintain code consistency and scalability.

## Core Architecture Rules

### Layer Structure (Rules 1-3)
1. **Strict Layer Hierarchy**: Code must follow: `core/` → `features/` → `shared/`. Features cannot depend on other features (except via public API). Shared cannot depend on core or features.
2. **No Circular Dependencies**: Tools run in CI/CD to detect and prevent circular imports (`scripts/check-cross-feature-imports.js`).
3. **No Deep Imports**: Components outside a feature must import only from the feature's public API (`src/features/{feature}/index.ts`), never from internal paths.

### Feature Module Structure (Rules 4-6)
4. **Feature Folder Structure**: Every feature must have exactly: `components/`, `screens/`, `hooks/`, `types/`, `styles/`, `data/`, and `index.ts` (public API).
5. **Public API Contract**: Feature's `index.ts` must export only: screens, types, and utilities safe for cross-feature use. Internal implementation (components, hooks) stays private.
6. **Single Responsibility**: Each component/hook handles one concern. No god components. Extract reusable logic to hooks or utilities.

### Shared Canvas (Rules 7-8)
7. **Shared = Cross-Feature Primitives**: `shared/` contains only: `theme/` (colors, spacing, typography), `constants/`, `layouts/`, and `utils/`. No feature-specific logic.
8. **No Feature Dependencies**: Shared modules must never import from `features/`. Shared is the foundation for all features.

### Navigation & Type Safety (Rules 9-12)
9. **Centralized Navigation Types**: All navigation types live in `src/core/navigation/types.ts` (e.g., `RootStackParamList`).
10. **Type-Safe Navigation**: NavigatorStack must be parameterized with `RootStackParamList`. No raw `navigate: (screen: string)` signatures.
11. **Navigation Configuration**: Route mappings live in `src/core/navigation/config.ts` (e.g., `MENU_ROUTE_MAP`). Navigation logic uses lookup functions, not hardcoded strings.
12. **Root Hook Pattern**: Screens receive navigation via `useNavigation()` hook (from `@react-navigation/native`), not via props. Custom logic wraps navigation in feature-level hooks (e.g., `useHomeNavigation`).

### Data Models & State (Rules 13-16)
13. **Centralized Models**: Shared, feature-independent types live in `src/core/models/`. Feature-specific types live in `src/features/{feature}/types/`.
14. **No Any Types**: TypeScript strict mode enforced. No `any` type without explicit `// @ts-expect-error` comment and justification.
15. **Single Source of Truth**: Data fetching and mutation live in feature-level hooks (`useQuery`, `useMutation`), not in components.
16. **Immutable State**: All state updates are immutable by default. Complex state uses Zustand or similar (if needed; currently using React Query).

### Styling & Component Separation (Rules 17-20)
17. **Colocation for Small Components**: Styles for components under 100 LOC live inline or in a colocated `.styles.ts` file.
18. **Extracted Layouts**: Reusable larger layouts (over 100 LOC) go in `shared/layouts/`.
19. **Theme Access**: Colors, spacing, and typography come from `shared/theme/`, never hardcoded (e.g., `const color = colors.primary`).
20. **Naming Convention**: `styles.ts` (or `.styles.ts`) files export a default `StyleSheet` or object. No inline `StyleSheet.create()` in component files over 200 LOC.

### Code Quality & Organization (Rules 21-25)
21. **Eslint & Prettier**: All code must pass `npm run lint`. Auto-format with Prettier before commit.
22. **TypeScript Strict Mode**: `tsconfig.json` has `strict: true`. All implementations must satisfy strict TypeScript checks.
23. **Test Coverage**: Critical features (screens, hooks, utilities) must have unit tests in `__tests__/` folders. Run `npm test` before merging.
24. **Documentation**: Every feature's `README.md` describes: responsibility, public API, internal modules, and dependency rules.
25. **Git Hygiene**: Commits group related changes. Commit messages are descriptive (imperative mood). Feature branches are short-lived.

## Audit Compliance

Run these commands before committing:
```bash
npm run typecheck    # TypeScript strict mode check
npm run lint         # ESLint code quality check
npm test             # Run all tests
npm run check:feature-imports  # Detect circular dependencies
```

All four must pass for code to merge to main.

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how to set up your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
