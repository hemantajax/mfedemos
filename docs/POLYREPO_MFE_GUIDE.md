# Polyrepo Micro-Frontend Architecture Guide

## 📋 Overview

This guide will help you create a **polyrepo micro-frontend architecture** where each shell and remote application lives in its own GitHub repository, with shared libraries distributed via npm packages.

## 🎯 Architecture Goals

- ✅ **Independent Repositories**: Each MFE has its own GitHub repo
- ✅ **Shared Libraries**: Common code distributed via npm or GitHub Packages
- ✅ **Independent Deployment**: Each MFE hosted on its own GitHub Pages
- ✅ **Runtime Integration**: Shell loads remotes from different domains
- ✅ **Independent Development**: Teams can work autonomously

## 🏗️ Repository Structure

### Repositories to Create

```
1. mfe-polyrepo-shared-libs     (Shared libraries as npm package)
2. mfe-polyrepo-shell           (Host/Shell application)
3. mfe-polyrepo-products        (Products remote)
4. mfe-polyrepo-cart            (Cart remote)
5. mfe-polyrepo-profile         (Profile remote)
6. mfe-polyrepo-orders          (Orders remote)
7. mfe-polyrepo-admin           (Admin remote)
8. mfe-polyrepo-analytics       (Analytics remote)
9. mfe-polyrepo-notifications   (Notifications remote)
10. mfe-polyrepo-messages       (Messages remote)
```

### GitHub Pages URLs

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

## 📦 Step 1: Shared Libraries Strategy

### Option A: NPM Package (Recommended) ✅

**Pros:**

- Standard dependency management
- Versioned releases
- Easy to consume
- Works with private GitHub Packages
- Better CI/CD integration

**Cons:**

- Requires publishing step
- Need npm registry or GitHub Packages

### Option B: Git Submodules ❌

**Pros:**

- No publishing required
- Direct source code

**Cons:**

- Complex to manage
- Harder to version
- Sync issues
- Not recommended for shared libraries

### ✅ **Decision: Use NPM with GitHub Packages**

We'll publish shared libraries to GitHub Packages (free for public repos) and consume them as npm dependencies.

---

## 🚀 Step 2: Create Shared Libraries Repository

### 2.1 Create Repository

```bash
# Create new directory
mkdir mfe-polyrepo-shared-libs
cd mfe-polyrepo-shared-libs

# Initialize Nx workspace
npx create-nx-workspace@latest . \
  --preset=ts \
  --name=mfe-shared \
  --nxCloud=skip \
  --packageManager=npm

# Initialize git
git init
git add .
git commit -m "Initial commit: Nx workspace for shared libs"

# Create GitHub repo (via GitHub UI or CLI)
gh repo create mfe-polyrepo-shared-libs --public --source=. --remote=origin
git push -u origin main
```

### 2.2 Create Shared Libraries

```bash
# Generate libraries
npx nx g @nx/js:library layout --directory=libs/layout --publishable --importPath=@mfe-shared/layout
npx nx g @nx/js:library ui-components --directory=libs/ui-components --publishable --importPath=@mfe-shared/ui-components
npx nx g @nx/js:library services --directory=libs/services --publishable --importPath=@mfe-shared/services
npx nx g @nx/js:library core --directory=libs/core --publishable --importPath=@mfe-shared/core
npx nx g @nx/js:library utils --directory=libs/utils --publishable --importPath=@mfe-shared/utils
npx nx g @nx/js:library pipes --directory=libs/pipes --publishable --importPath=@mfe-shared/pipes
npx nx g @nx/js:library directives --directory=libs/directives --publishable --importPath=@mfe-shared/directives
npx nx g @nx/js:library constants --directory=libs/constants --publishable --importPath=@mfe-shared/constants
npx nx g @nx/js:library styles --directory=libs/styles --publishable --importPath=@mfe-shared/styles
```

### 2.3 Copy Shared Code

Copy the content from your monorepo's `libs/shared/*` to the corresponding libraries.

### 2.4 Configure Publishing to GitHub Packages

Create `.npmrc` in the root:

```
@hemantajax:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Update each library's `package.json`:

```json
{
  "name": "@hemantajax/mfe-layout",
  "version": "1.0.0",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/@hemantajax"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/hemantajax/mfe-polyrepo-shared-libs.git"
  }
}
```

### 2.5 Set Up GitHub Actions for Publishing

Create `.github/workflows/publish.yml`:

```yaml
name: Publish Packages

on:
  push:
    branches: [main]
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@hemantajax'

      - name: Install dependencies
        run: npm ci

      - name: Build all libraries
        run: npx nx run-many --target=build --all

      - name: Publish packages
        run: |
          cd dist/libs/layout && npm publish
          cd ../ui-components && npm publish
          cd ../services && npm publish
          cd ../core && npm publish
          cd ../utils && npm publish
          cd ../pipes && npm publish
          cd ../directives && npm publish
          cd ../constants && npm publish
          cd ../styles && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🏠 Step 3: Create Shell Repository

### 3.1 Create Repository

```bash
# Create new directory
mkdir mfe-polyrepo-shell
cd mfe-polyrepo-shell

# Create empty Nx workspace
npx create-nx-workspace@latest . \
  --preset=apps \
  --name=mfe-shell \
  --nxCloud=skip \
  --packageManager=npm

# Add Angular capability
npm install -D @nx/angular

# Generate host application
npx nx g @nx/angular:host shell \
  --directory=apps/shell \
  --style=scss \
  --routing=true \
  --standaloneConfig=true

# Initialize git
git init
git add .
git commit -m "Initial commit: Shell application"

# Create GitHub repo
gh repo create mfe-polyrepo-shell --public --source=. --remote=origin
git push -u origin main
```

### 3.2 Install Shared Libraries

```bash
# Configure npm to use GitHub Packages
echo "@hemantajax:registry=https://npm.pkg.github.com" > .npmrc

# Install shared libraries
npm install @hemantajax/mfe-layout@latest
npm install @hemantajax/mfe-ui-components@latest
npm install @hemantajax/mfe-services@latest
npm install @hemantajax/mfe-core@latest
npm install @hemantajax/mfe-utils@latest
npm install @hemantajax/mfe-pipes@latest
npm install @hemantajax/mfe-directives@latest
npm install @hemantajax/mfe-constants@latest
npm install @hemantajax/mfe-styles@latest
```

### 3.3 Configure Module Federation

Update `apps/shell/module-federation.config.ts`:

```typescript
import { ModuleFederationConfig } from '@nx/webpack';

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

export default config;
```

### 3.4 Configure Routes

Update `apps/shell/src/app/app.routes.ts`:

```typescript
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'products',
    loadChildren: () => loadRemoteModule('products', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'cart',
    loadChildren: () => loadRemoteModule('cart', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'profile',
    loadChildren: () => loadRemoteModule('profile', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'orders',
    loadChildren: () => loadRemoteModule('orders', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'admin',
    loadChildren: () => loadRemoteModule('admin', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'analytics',
    loadChildren: () => loadRemoteModule('analytics', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'notifications',
    loadChildren: () => loadRemoteModule('notifications', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'messages',
    loadChildren: () => loadRemoteModule('messages', './Routes').then((m) => m.remoteRoutes),
  },
];
```

### 3.5 Setup GitHub Pages Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Build
        run: npx nx build shell --configuration=production --base-href=/mfe-polyrepo-shell/

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/apps/shell/browser

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🔌 Step 4: Create Remote Repositories

For each remote (products, cart, profile, orders, admin, analytics, notifications, messages):

### 4.1 Create Remote Repository

```bash
# Example for products remote
mkdir mfe-polyrepo-products
cd mfe-polyrepo-products

# Create Nx workspace
npx create-nx-workspace@latest . \
  --preset=apps \
  --name=mfe-products \
  --nxCloud=skip \
  --packageManager=npm

# Add Angular capability
npm install -D @nx/angular

# Generate remote application
npx nx g @nx/angular:remote products \
  --directory=apps/products \
  --host=shell \
  --style=scss \
  --routing=true \
  --standaloneConfig=true

# Initialize git
git init
git add .
git commit -m "Initial commit: Products remote"

# Create GitHub repo
gh repo create mfe-polyrepo-products --public --source=. --remote=origin
git push -u origin main
```

### 4.2 Install Shared Libraries

```bash
# Configure npm
echo "@hemantajax:registry=https://npm.pkg.github.com" > .npmrc

# Install shared libraries
npm install @hemantajax/mfe-layout@latest
npm install @hemantajax/mfe-ui-components@latest
npm install @hemantajax/mfe-services@latest
npm install @hemantajax/mfe-core@latest
npm install @hemantajax/mfe-utils@latest
```

### 4.3 Configure Module Federation

Update `apps/products/module-federation.config.ts`:

```typescript
import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'products',
  exposes: {
    './Routes': 'apps/products/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
```

### 4.4 Configure Production Build

Create `apps/products/webpack.prod.config.ts`:

```typescript
import { withModuleFederation } from '@nx/angular/module-federation';
import config from './module-federation.config';

export default withModuleFederation({
  ...config,
  shared: {
    ...config.shared,
    publicPath: 'https://hemantajax.github.io/mfe-polyrepo-products/',
  },
});
```

### 4.5 Setup GitHub Pages Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Build
        run: npx nx build products --configuration=production --base-href=/mfe-polyrepo-products/

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/apps/products/browser

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Repeat steps 4.1-4.5 for each remote** (cart, profile, orders, admin, analytics, notifications, messages)

---

## 🔐 Step 5: GitHub Packages Authentication

### 5.1 Create Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with scopes:
   - `read:packages`
   - `write:packages`
3. Save the token securely

### 5.2 Configure Local Development

Create/update `~/.npmrc`:

```
@hemantajax:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### 5.3 Configure GitHub Actions

Each repository already has access via `${{ secrets.GITHUB_TOKEN }}` in the workflow.

---

## 🎯 Step 6: Enable GitHub Pages

For each repository:

1. Go to repository Settings → Pages
2. Source: **GitHub Actions**
3. Save

---

## 🧪 Step 7: Testing the Setup

### 7.1 Local Development

```bash
# In shell repository
npm install
npm start

# The shell will try to load remotes from GitHub Pages URLs
# For local development, you can override the URLs in module-federation.config.ts
```

### 7.2 Development Mode with Local Remotes

Create `module-federation.config.dev.ts` in shell:

```typescript
import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: [
    ['products', 'http://localhost:4201'],
    ['cart', 'http://localhost:4202'],
    ['profile', 'http://localhost:4203'],
    // ... etc
  ],
};

export default config;
```

---

## 📊 Step 8: Version Management

### 8.1 Shared Libraries Versioning

Use semantic versioning:

```bash
# In shared-libs repository
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

git push --tags
```

### 8.2 Update Dependencies

```bash
# In shell or remote repositories
npm update @hemantajax/mfe-layout@latest
npm update @hemantajax/mfe-services@latest
# ... etc
```

---

## 🚀 Step 9: CI/CD Pipeline

### 9.1 Deployment Flow

```
1. Push to shared-libs main → Build & Publish packages
2. Push to remote main → Build & Deploy to GitHub Pages
3. Push to shell main → Build & Deploy to GitHub Pages
```

### 9.2 Cross-Origin Considerations

Ensure all remotes have proper CORS headers (GitHub Pages handles this automatically).

---

## 📁 Final Repository Structure

```
GitHub Repositories:
├── mfe-polyrepo-shared-libs/
│   ├── libs/
│   │   ├── layout/
│   │   ├── ui-components/
│   │   ├── services/
│   │   ├── core/
│   │   ├── utils/
│   │   ├── pipes/
│   │   ├── directives/
│   │   ├── constants/
│   │   └── styles/
│   ├── .github/workflows/publish.yml
│   └── package.json
│
├── mfe-polyrepo-shell/
│   ├── apps/shell/
│   ├── .github/workflows/deploy.yml
│   ├── package.json (with @hemantajax/mfe-* deps)
│   └── module-federation.config.ts
│
├── mfe-polyrepo-products/
│   ├── apps/products/
│   ├── .github/workflows/deploy.yml
│   └── package.json (with @hemantajax/mfe-* deps)
│
├── mfe-polyrepo-cart/
├── mfe-polyrepo-profile/
├── mfe-polyrepo-orders/
├── mfe-polyrepo-admin/
├── mfe-polyrepo-analytics/
├── mfe-polyrepo-notifications/
└── mfe-polyrepo-messages/
```

---

## ✅ Checklist

### Shared Libraries

- [ ] Create mfe-polyrepo-shared-libs repository
- [ ] Generate all 9 libraries
- [ ] Copy code from monorepo
- [ ] Configure GitHub Packages publishing
- [ ] Set up GitHub Actions
- [ ] Publish first version

### Shell Application

- [ ] Create mfe-polyrepo-shell repository
- [ ] Generate host application
- [ ] Install shared libraries
- [ ] Configure module federation with production URLs
- [ ] Set up routing
- [ ] Configure GitHub Pages deployment
- [ ] Test deployment

### Remote Applications (×8)

- [ ] Create repository for each remote
- [ ] Generate remote application
- [ ] Install shared libraries
- [ ] Configure module federation
- [ ] Configure production webpack
- [ ] Set up GitHub Pages deployment
- [ ] Test deployment

### Integration

- [ ] Enable GitHub Pages for all repos
- [ ] Test shell loading all remotes
- [ ] Verify cross-origin loading
- [ ] Test navigation between remotes
- [ ] Verify shared state/services

---

## 🎯 Benefits of Polyrepo Approach

✅ **Independent Deployment**: Deploy remotes without affecting shell
✅ **Team Autonomy**: Each team owns their repository
✅ **Independent Scaling**: Scale development teams independently
✅ **Clear Ownership**: Repository = Team = Service
✅ **Flexible Versioning**: Each remote can evolve independently
✅ **Real-World Architecture**: Mimics actual microservices

---

## 🚧 Challenges & Solutions

### Challenge 1: Shared Library Updates

**Solution**: Use semantic versioning and automated dependency updates

### Challenge 2: Testing Integration

**Solution**: Use production URLs in CI, local URLs in development

### Challenge 3: CORS Issues

**Solution**: GitHub Pages automatically handles CORS correctly

### Challenge 4: Build Coordination

**Solution**: Use GitHub Actions and proper versioning

---

## 📚 Additional Resources

- [Module Federation Documentation](https://module-federation.github.io/)
- [Nx Module Federation](https://nx.dev/recipes/module-federation)
- [GitHub Packages](https://docs.github.com/en/packages)
- [GitHub Pages](https://docs.github.com/en/pages)

---

## 🎉 Summary

You now have a complete polyrepo micro-frontend architecture with:

- ✅ 10 independent repositories
- ✅ Shared libraries via npm packages
- ✅ Independent deployments on GitHub Pages
- ✅ Runtime integration via Module Federation
- ✅ Full CI/CD pipeline
- ✅ Production-ready architecture

**Ready to showcase enterprise-grade micro-frontend architecture!** 🚀
