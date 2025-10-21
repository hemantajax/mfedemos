# Polyrepo MFE - Quick Start Guide

## 🚀 Quick Setup Steps

This is a condensed version of the full guide for quick reference.

---

## Prerequisites

```bash
# Install required tools
npm install -g @nx/cli
npm install -g gh  # GitHub CLI (optional but recommended)

# Authenticate GitHub CLI
gh auth login

# Create GitHub Personal Access Token
# Settings → Developer settings → Personal access tokens
# Scopes: read:packages, write:packages
```

---

## Step 1: Shared Libraries (15 minutes)

```bash
# 1. Create repository
mkdir mfe-polyrepo-shared-libs && cd mfe-polyrepo-shared-libs
npx create-nx-workspace@latest . --preset=ts --name=mfe-shared --nxCloud=skip

# 2. Create libraries
npx nx g @nx/js:library layout --publishable --importPath=@hemantajax/mfe-layout
npx nx g @nx/js:library ui-components --publishable --importPath=@hemantajax/mfe-ui-components
npx nx g @nx/js:library services --publishable --importPath=@hemantajax/mfe-services
npx nx g @nx/js:library core --publishable --importPath=@hemantajax/mfe-core
npx nx g @nx/js:library utils --publishable --importPath=@hemantajax/mfe-utils

# 3. Copy code from monorepo
# Copy from ../nxmfe/libs/shared/* to ./libs/*

# 4. Configure GitHub Packages (see full guide)

# 5. Push to GitHub
git init && git add . && git commit -m "Initial commit"
gh repo create mfe-polyrepo-shared-libs --public --source=. --push

# 6. Publish packages
npx nx run-many --target=build --all
# Then publish (see full guide for GitHub Actions setup)
```

---

## Step 2: Shell Application (10 minutes)

```bash
# 1. Create repository
mkdir mfe-polyrepo-shell && cd mfe-polyrepo-shell
npx create-nx-workspace@latest . --preset=apps --name=shell --nxCloud=skip

# 2. Add Angular and generate host
npm install -D @nx/angular
npx nx g @nx/angular:host shell --directory=apps/shell --style=scss

# 3. Install shared libraries
echo "@hemantajax:registry=https://npm.pkg.github.com" > .npmrc
npm install @hemantajax/mfe-layout @hemantajax/mfe-services @hemantajax/mfe-core

# 4. Configure module federation (see full guide)

# 5. Push to GitHub
git init && git add . && git commit -m "Initial commit"
gh repo create mfe-polyrepo-shell --public --source=. --push

# 6. Enable GitHub Pages
gh repo edit --enable-pages --pages-branch main --source-path /
```

---

## Step 3: Remote Applications (10 minutes each)

```bash
# Example for Products remote
mkdir mfe-polyrepo-products && cd mfe-polyrepo-products
npx create-nx-workspace@latest . --preset=apps --name=products --nxCloud=skip

npm install -D @nx/angular
npx nx g @nx/angular:remote products --directory=apps/products --style=scss

echo "@hemantajax:registry=https://npm.pkg.github.com" > .npmrc
npm install @hemantajax/mfe-layout @hemantajax/mfe-services

# Configure module federation, GitHub Actions (see full guide)

git init && git add . && git commit -m "Initial commit"
gh repo create mfe-polyrepo-products --public --source=. --push
```

**Repeat for all remotes:**

- mfe-polyrepo-cart
- mfe-polyrepo-profile
- mfe-polyrepo-orders
- mfe-polyrepo-admin
- mfe-polyrepo-analytics
- mfe-polyrepo-notifications
- mfe-polyrepo-messages

---

## Step 4: Configure Module Federation URLs

### Shell (`module-federation.config.ts`)

```typescript
const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: [
    ['products', 'https://hemantajax.github.io/mfe-polyrepo-products/remoteEntry.js'],
    ['cart', 'https://hemantajax.github.io/mfe-polyrepo-cart/remoteEntry.js'],
    ['profile', 'https://hemantajax.github.io/mfe-polyrepo-profile/remoteEntry.js'],
    ['orders', 'https://hemantajax.github.io/mfe-polyrepo-orders/remoteEntry.js'],
    ['admin', 'https://hemantajax.github.io/mfe-polyrepo-admin/remoteEntry.js'],
    ['analytics', 'https://hemantajax.github.io/mfe-polyrepo-analytics/remoteEntry.js'],
    ['notifications', 'https://hemantajax.github.io/mfe-polyrepo-notifications/remoteEntry.js'],
    ['messages', 'https://hemantajax.github.io/mfe-polyrepo-messages/remoteEntry.js'],
  ],
};
```

### Each Remote (`module-federation.config.ts`)

```typescript
const config: ModuleFederationConfig = {
  name: 'products', // Change for each remote
  exposes: {
    './Routes': 'apps/products/src/app/remote-entry/entry.routes.ts',
  },
};
```

---

## Step 5: GitHub Actions Setup

Copy the GitHub Actions workflows from the full guide:

1. **Shared Libs**: `.github/workflows/publish.yml`
2. **Shell & Remotes**: `.github/workflows/deploy.yml`

---

## Step 6: Enable GitHub Pages

For each repository:

```bash
# Using GitHub CLI
gh repo edit mfe-polyrepo-shell --enable-pages --pages-source="gh-pages"

# Or manually:
# Repo Settings → Pages → Source: GitHub Actions
```

---

## Step 7: Deploy Everything

```bash
# 1. Shared libs will auto-publish on push to main
cd mfe-polyrepo-shared-libs
git push

# 2. Each remote will auto-deploy on push to main
cd ../mfe-polyrepo-products
git push

# 3. Shell will auto-deploy on push to main
cd ../mfe-polyrepo-shell
git push
```

---

## Testing

```bash
# Wait for all GitHub Actions to complete
# Then visit:
# https://hemantajax.github.io/mfe-polyrepo-shell/

# You should see the shell loading all remotes from their respective GitHub Pages!
```

---

## Local Development

### Terminal 1: Shell

```bash
cd mfe-polyrepo-shell
npm start
```

### Terminal 2: Products Remote

```bash
cd mfe-polyrepo-products
npx nx serve products --port=4201
```

### Terminal 3: Cart Remote

```bash
cd mfe-polyrepo-cart
npx nx serve cart --port=4202
```

For local development, temporarily change shell's module federation config to use `localhost` URLs.

---

## Repository URLs

Once created, your repositories will be at:

```
https://github.com/hemantajax/mfe-polyrepo-shared-libs
https://github.com/hemantajax/mfe-polyrepo-shell
https://github.com/hemantajax/mfe-polyrepo-products
https://github.com/hemantajax/mfe-polyrepo-cart
https://github.com/hemantajax/mfe-polyrepo-profile
https://github.com/hemantajax/mfe-polyrepo-orders
https://github.com/hemantajax/mfe-polyrepo-admin
https://github.com/hemantajax/mfe-polyrepo-analytics
https://github.com/hemantajax/mfe-polyrepo-notifications
https://github.com/hemantajax/mfe-polyrepo-messages
```

## Live Demo URLs

```
Shell:         https://hemantajax.github.io/mfe-polyrepo-shell/
Products:      https://hemantajax.github.io/mfe-polyrepo-products/
Cart:          https://hemantajax.github.io/mfe-polyrepo-cart/
Profile:       https://hemantajax.github.io/mfe-polyrepo-profile/
Orders:        https://hemantajax.github.io/mfe-polyrepo-orders/
Admin:         https://hemantajax.github.io/mfe-polyrepo-admin/
Analytics:     https://hemantajax.github.io/mfe-polyrepo-analytics/
Notifications: https://hemantajax.github.io/mfe-polyrepo-notifications/
Messages:      https://hemantajax.github.io/mfe-polyrepo-messages/
```

---

## Timeline

- **Shared Libs**: 30 minutes
- **Shell**: 15 minutes
- **8 Remotes**: 1.5 hours (10 min each)
- **Configuration & Testing**: 30 minutes

**Total**: ~2.5 hours for complete setup

---

## Next Steps

1. Start with shared libraries
2. Then create shell
3. Add one remote at a time
4. Test integration after each remote
5. Polish UI and add features

---

## Need Help?

Refer to the full guide at: `docs/POLYREPO_MFE_GUIDE.md`
