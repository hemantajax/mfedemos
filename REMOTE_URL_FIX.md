# Module Federation Remote URL Fix for GitHub Pages

## Problem

After deploying to GitHub Pages, the micro-frontend remotes were still referencing `localhost` URLs instead of the GitHub Pages URLs, causing `ERR_CONNECTION_REFUSED` errors.

## Root Cause

The issue had two components:

### 1. File Ownership Issues

The webpack configuration files were owned by `root` instead of the user `hemant`, preventing edits from being saved.

**Files affected:**

- `apps/mfeui/module-federation.config.ts`
- `apps/mfeui/webpack.config.ts`
- `apps/mfeui/webpack.prod.config.ts`

### 2. Module Federation Manifest Generation

Nx's Module Federation plugin generates an `mf-manifest.json` file during the build process that contains the runtime URLs for remotes. This manifest was being generated with `localhost` URLs based on the development configuration, and the webpack configuration alone wasn't sufficient to override it.

## Solution

### Step 1: Fix File Permissions

Changed ownership of config files from `root` to `hemant`:

```bash
sudo chown hemant:staff apps/mfeui/module-federation.config.ts
sudo chown hemant:staff apps/mfeui/webpack.config.ts
sudo chown hemant:staff apps/mfeui/webpack.prod.config.ts
```

### Step 2: Update Module Federation Config

Updated `apps/mfeui/module-federation.config.ts` to use GitHub Pages URLs:

```typescript
const config: ModuleFederationConfig = {
  name: 'mfeui',
  remotes: [
    ['products', 'https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs'],
    ['cart', 'https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs'],
  ],
};
```

### Step 3: Post-Build Manifest Fix

Created `scripts/fix-mf-manifest.js` to programmatically fix the `mf-manifest.json` file after build:

```javascript
// Replaces localhost URLs with GitHub Pages URLs in the manifest
function fixManifest(manifestPath) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.remotes = manifest.remotes.map((remote) => {
    if (remote.federationContainerName.includes('localhost:4201')) {
      remote.federationContainerName = 'https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs';
    } else if (remote.federationContainerName.includes('localhost:4202')) {
      remote.federationContainerName = 'https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs';
    }
    return remote;
  });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}
```

### Step 4: Integrate Fix into Deployment

Updated `scripts/deploy-gh-pages.js` to run the manifest fix after building:

```javascript
// Fix module federation manifest to use GitHub Pages URLs
console.log('\n🔧 Fixing module federation manifests...');
execSync('node scripts/fix-mf-manifest.js', { stdio: 'inherit' });
```

## Verification

After the fix, the `mf-manifest.json` in `dist/gh-pages/` now contains:

```json
{
  "remotes": [
    {
      "federationContainerName": "https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs",
      "moduleName": "Routes",
      "alias": "cart"
    },
    {
      "federationContainerName": "https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs",
      "moduleName": "Routes",
      "alias": "products"
    }
  ]
}
```

## Deployment

To deploy with the fix:

```bash
npm run build:gh-pages
npm run deploy:gh-pages:manual
```

The deployment script now:

1. Builds all applications with `--skip-nx-cache` to ensure fresh builds
2. Fixes the module federation manifest to use GitHub Pages URLs
3. Copies files to `dist/gh-pages/`
4. Deploys to GitHub Pages

## For Local Development

To switch back to local development, update `apps/mfeui/module-federation.config.ts`:

```typescript
remotes: ['products', 'cart']; // Shorthand for localhost URLs
```

## Key Learnings

1. **Nx Module Federation** generates runtime manifests that can override webpack configuration
2. **File ownership** matters - files owned by `root` can't be edited by regular users
3. **Post-build fixes** can be necessary when build tools generate configuration files
4. **Cache clearing** is important with `--skip-nx-cache` to ensure configuration changes are applied

## Files Modified

- `apps/mfeui/module-federation.config.ts` - Updated with GitHub Pages URLs
- `scripts/fix-mf-manifest.js` - New script to fix manifest after build
- `scripts/deploy-gh-pages.js` - Updated to run manifest fix
- File permissions on webpack config files

## Status

✅ **FIXED** - Remotes now load from GitHub Pages URLs in production deployment


