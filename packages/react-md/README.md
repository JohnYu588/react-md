# react-md [![license](https://img.shields.io/npm/l/react-md)](https://github.com/mlaursen/react-md/blob/main/LICENSE) [![codecov](https://codecov.io/gh/mlaursen/react-md/branch/main/graph/badge.svg)](https://codecov.io/gh/mlaursen/react-md) [![Actions Status](https://github.com/mlaursen/react-md/workflows/Build,%20Lint,%20and%20Test/badge.svg)](https://github.com/mlaursen/react-md/actions)

[![npm](https://img.shields.io/npm/v/react-md)](https://www.npmjs.com/package/react-md)
[![downloads](https://img.shields.io/npm/dw/react-md)](https://www.npmjs.com/package/react-md)

Create an accessible React application with the [material design specifications]
and SCSS.

## [Installation]

```sh
npm install react-md sass
```

Note: it is recommended to use the [@react-md/core] package instead since the
`react-md` package just re-exports everything from `@react-md/core` for
convenience. Some more information can be found
[here](https://vitejs.dev/guide/performance#avoid-barrel-files).

## [Full Documentation]

### Highlights/Features

- Matches the accessibility guidelines from [www.w3.org]
- Low level customizable components
- Easily themeable on a global and component level
- Uses css variables for dynamic themes with fallbacks for older browsers
- Light, Dark, and System theme support
- Left-to-right and right-to-left language support
- Written and maintained in [Typescript]

## Additional Exports

There are a few exports from `@react-md/core` which must be imported separately
since they have side effects or are for testing only:

### `configureMaterialSymbols`

This is the shortcut for configuring the default icons to use material symbols
instead of font icons.

```diff
-import "@react-md/core/icon/configureMaterialSymbols";
+import "react-md/configureMaterialSymbols";
```

### `test-utils`

```diff
-export * from  "@react-md/core/test-utils";
+export * from  "react-md/test-utils";
```

### `test-utils/data-testid`

```diff
-import "@react-md/core/test-utils/data-testid";
+import "react-md/test-utils/data-testid";
```

### `test-utils/polyfills`

```diff
-import "@react-md/core/test-utils/polyfills";
+import "react-md/test-utils/polyfills";
```

> NOTE: You cannot pick and choose which polyfills to use unlike in
> `@react-md/core`. It is all or nothing.

### `test-utils/jest-globals`

```diff
-import "@react-md/core/test-utils/jest-globals/setup";
+import "react-md/test-utils/jest-globals/setup";

-export * from  "@react-md/core/test-utils/jest-globals";
+export * from  "react-md/test-utils/jest-globals";
```

### `test-utils/vitest`

```diff
-import "@react-md/core/test-utils/vitest/setup";
+import "react-md/test-utils/vitest/setup";

-export * from "@react-md/core/test-utils/vitest";
+export * from "react-md/test-utils/vitest";
```

[typescript]: https://www.typescriptlang.org/
[www.w3.org]: https://www.w3.org/TR/wai-aria-practices
[installation]: https://react-md.dev/getting-started/installation
[full documentation]: https://react-md.dev
[material design specifications]: https://material.io/design/
[@react-md/core]: https://npmjs.com/package/@react-md/core
