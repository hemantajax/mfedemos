# Module Federation Configuration Fix

## Problem

The host application was loading production remote URLs (GitHub Pages) even in local development mode, causing remotes to fail to load from `localhost:4201` and `localhost:4202`.

## Root Cause

The development webpack configuration (`webpack.config.ts`) was incorrectly overriding the remotes with production GitHub Pages URLs instead of using localhost URLs.

## Solution

Separated the webpack configurations properly:

### Development Configuration

**File: `apps/mfeui/webpack.config.ts`**

- Now imports from `./module-federation.config` (development config)
- Uses simple remote names: `['products', 'cart']`
- Nx automatically resolves these to:
  - `products` → `http://localhost:4201`
  - `cart` → `http://localhost:4202`

```typescript
import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

export default withModuleFederation(config, { dts: false });
```

### Production Configuration

**File: `apps/mfeui/webpack.prod.config.ts`**

- Now imports from `./module-federation.config.prod` (production config)
- Uses full GitHub Pages URLs:
  - `products` → `https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs`
  - `cart` → `https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs`

```typescript
import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config.prod';

export default withModuleFederation(config, { dts: false });
```

## Configuration Files Structure

```
apps/mfeui/
├── module-federation.config.ts      # Development config (localhost)
├── module-federation.config.prod.ts # Production config (GitHub Pages)
├── webpack.config.ts                # Uses module-federation.config.ts
└── webpack.prod.config.ts           # Uses module-federation.config.prod.ts
```

### Development Config (`module-federation.config.ts`)

```typescript
const config: ModuleFederationConfig = {
  name: 'mfeui',
  remotes: ['products', 'cart'], // Simple names, Nx resolves to localhost
};
```

### Production Config (`module-federation.config.prod.ts`)

```typescript
const config: ModuleFederationConfig = {
  name: 'mfeui',
  remotes: [
    ['products', 'https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs'],
    ['cart', 'https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs'],
  ],
};
```

## How It Works

### Local Development (`npm run serve:all`)

1. Nx uses `webpack.config.ts` for the build
2. `webpack.config.ts` imports `module-federation.config.ts`
3. Config has `remotes: ['products', 'cart']`
4. Nx resolves these based on `project.json` port settings:
   - `products` → `http://localhost:4201/remoteEntry.mjs`
   - `cart` → `http://localhost:4202/remoteEntry.mjs`

### Production Build (`npm run build:all:prod`)

1. Nx uses `webpack.prod.config.ts` for the build
2. `webpack.prod.config.ts` imports `module-federation.config.prod.ts`
3. Config has full GitHub Pages URLs
4. Remotes are loaded from deployed GitHub Pages locations

## Testing the Fix

### 1. Stop All Running Applications

```bash
# Press Ctrl+C in terminals or:
killall node
```

### 2. Clear Nx Cache

```bash
npm run reset
```

### 3. Restart Development Servers

```bash
npm run serve:all
```

### 4. Verify Correct URLs

Open Chrome DevTools → Network tab → Filter by "JS"

You should now see:

- ✅ `http://localhost:4201/remoteEntry.mjs` (not GitHub URL)
- ✅ `http://localhost:4202/remoteEntry.mjs` (not GitHub URL)

### 5. Test Navigation

- Navigate to `http://localhost:4200/products`
- Should load from `localhost:4201`
- Navigate to `http://localhost:4200/cart`
- Should load from `localhost:4202`

## Verification Checklist

- [ ] Stop all running dev servers
- [ ] Clear Nx cache: `npm run reset`
- [ ] Start all apps: `npm run serve:all`
- [ ] Open `http://localhost:4200`
- [ ] Open Chrome DevTools Network tab
- [ ] Navigate to `/products` route
- [ ] Verify remoteEntry.mjs loads from `localhost:4201`
- [ ] Navigate to `/cart` route
- [ ] Verify remoteEntry.mjs loads from `localhost:4202`
- [ ] No 404 errors in console
- [ ] Products and Cart pages load successfully

## Benefits

✅ **Clean Separation**: Dev and prod configs are completely separate  
✅ **No Manual Switching**: Nx automatically uses the right config  
✅ **Type Safety**: Both configs use TypeScript  
✅ **Easy Maintenance**: Update URLs in one place per environment  
✅ **Fast Development**: Load remotes from localhost, not external URLs

## Common Issues After Fix

### Issue: Still seeing GitHub URLs

**Solution**:

1. Hard refresh the browser (Cmd+Shift+R or Ctrl+Shift+R)
2. Clear browser cache
3. Make sure you restarted the dev servers after the changes

### Issue: 404 errors for remotes

**Solution**:

1. Verify all three applications are running:
   ```bash
   ps aux | grep "nx serve"
   ```
2. You should see three processes (mfeui, products, cart)
3. If not, restart with `npm run serve:all`

### Issue: Changes not reflecting

**Solution**:

1. Stop all dev servers
2. Clear Nx cache: `npm run reset`
3. Clear node_modules cache: `rm -rf node_modules/.cache`
4. Restart: `npm run serve:all`

## Summary

The fix ensures that:

- **Development**: Uses `localhost:4201` and `localhost:4202` for fast local development
- **Production**: Uses GitHub Pages URLs for deployed applications
- **No Manual Changes**: Environment-specific configs are automatically selected by Nx

You can now develop locally without any external dependencies! 🎉
