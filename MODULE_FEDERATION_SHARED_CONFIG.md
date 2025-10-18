# Module Federation Shared Configuration Fix

## Problem

You were experiencing multiple requests to `common.js` and duplicate loading of shared dependencies. Looking at your Network tab, the same modules were being loaded multiple times (common.js, runtime, etc.).

## Root Cause

In **Nx 21.6.5** with **Angular 20** and **Module Federation Enhanced**, the `shared` configuration is **NOT automatic** anymore. Without explicit `shared` configuration:

1. Each remote (products, cart, profile) bundles its own copy of Angular and common dependencies
2. The host (mfeui) also has its own copy
3. Result: Multiple downloads of the same code = performance issues

### What Changed in Recent Nx Versions?

In older versions of Nx (pre-v16), shared dependencies were automatically configured. However, starting with **Module Federation 2.0** and newer Nx versions:

- **Explicit configuration is required** for proper sharing
- Default behavior: Each MFE bundles all its dependencies independently
- You must use the `shared` property to define what should be shared

## Solution Applied

Added a `shared` configuration function to **all** module federation configs:

### Files Updated

1. ✅ `/apps/mfeui/module-federation.config.ts` (host - dev)
2. ✅ `/apps/mfeui/module-federation.config.prod.ts` (host - production)
3. ✅ `/apps/products/module-federation.config.ts` (remote)
4. ✅ `/apps/cart/module-federation.config.ts` (remote)
5. ✅ `/profile/module-federation.config.ts` (remote)

### Configuration Details - "Share Everything by Default" (Like Old Nx)

```typescript
shared: (libraryName, defaultConfig) => {
  // Share everything by default with singleton pattern (like old Nx behavior)
  // This makes Angular, RxJS, and all common dependencies shared automatically
  return {
    ...defaultConfig,
    singleton: true,        // Only one instance across all MFEs
    strictVersion: false,   // Allow version mismatches (with warnings)
    requiredVersion: false, // Don't enforce specific version
    eager: false,          // Lazy load shared modules (better performance)
  };
},
```

This simple configuration automatically shares:

- ✅ All `@angular/*` packages
- ✅ `rxjs` and other reactive libraries
- ✅ `bootstrap`, `bootswatch`, and UI libraries
- ✅ Your shared libraries (`@nxmfe/shared/*`)
- ✅ Any other npm packages in your dependencies

## Key Configuration Options Explained

### `singleton: true`

- Ensures only ONE instance of the library is loaded across all micro-frontends
- Critical for Angular, RxJS, and other stateful libraries
- Prevents version conflicts and duplicate code

### `strictVersion: false`

- Allows different MFEs to use slightly different versions
- Provides flexibility during development
- Shows warnings in console if versions mismatch

### `requiredVersion: false`

- Doesn't enforce a specific version requirement
- Host provides the version, remotes use it
- Useful for monorepos where versions are synchronized via package.json

### `eager: false`

- Shared modules are loaded on-demand (lazy loading)
- Better initial load performance
- Modules are fetched only when needed by the remote

## Expected Results

After this fix, you should see:

### Before (❌)

```
Network Tab:
- common.js (from host)
- common.js (from products)
- common.js (from cart)
- common.js (from profile)
Total: 4 downloads of same code
```

### After (✅)

```
Network Tab:
- common.js (shared, loaded once)
- Products remote-specific code
- Cart remote-specific code
- Profile remote-specific code
Total: Significantly reduced bundle size
```

## How to Test

1. **Stop all running dev servers** (important!)
2. **Clear browser cache** (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. **Rebuild everything:**
   ```bash
   npm run build:all
   ```
4. **Start the dev servers:**
   ```bash
   npm run serve:all
   ```
5. **Open browser DevTools** → Network tab
6. **Load the application** and check that `common.js` is loaded only once

## Alternative Approach: Fine-Grained Control (If Needed)

If you prefer more control over what gets shared, you can use conditional logic:

```typescript
shared: (libraryName, defaultConfig) => {
  // Only share specific packages
  if (libraryName.startsWith('@angular/')) {
    return { ...defaultConfig, singleton: true, strictVersion: false };
  }
  if (libraryName === 'rxjs') {
    return { ...defaultConfig, singleton: true, strictVersion: false };
  }

  // Don't share certain packages
  if (libraryName === 'zone.js') {
    return false;
  }

  // Default behavior for others
  return defaultConfig;
};
```

Or use explicit object configuration:

```typescript
shared: {
  '@angular/core': { singleton: true, strictVersion: false },
  '@angular/common': { singleton: true, strictVersion: false },
  '@angular/router': { singleton: true, strictVersion: false },
  'rxjs': { singleton: true, strictVersion: false },
  '@nxmfe/shared/core': { singleton: true },
  '@nxmfe/shared/services': { singleton: true },
}
```

**Current Config:** We're using the "share everything" approach for simplicity and consistency with old Nx behavior.

## Best Practices for Module Federation

1. **Always configure shared dependencies** in both host and remotes
2. **Use singleton: true** for Angular, RxJS, and state management libraries
3. **Test with cold cache** to verify bundle sharing
4. **Monitor bundle sizes** using webpack-bundle-analyzer
5. **Keep versions synchronized** across all MFEs in monorepo

## References

- [Nx Module Federation Guide](https://nx.dev/recipes/module-federation)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Angular Module Federation](https://www.angulararchitects.io/en/blog/multi-framework-and-version-micro-frontends-with-module-federation-the-good-the-bad-the-ugly/)

## Summary

The issue was caused by missing `shared` configuration in your module federation configs. This is a **required configuration** in recent versions of Nx and Module Federation 2.0. The fix ensures that common dependencies (Angular, RxJS, etc.) are loaded only once and shared across all micro-frontends, significantly improving performance and reducing bundle size.
