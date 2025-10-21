# Automation Scripts for Polyrepo Setup

## 📜 Shell Module Federation Config

Save as `apps/shell/module-federation.config.prod.ts`:

```typescript
import { ModuleFederationConfig } from '@nx/webpack';

// Production configuration with GitHub Pages URLs
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

Save as `apps/shell/module-federation.config.ts` (development):

```typescript
import { ModuleFederationConfig } from '@nx/webpack';

// Development configuration with localhost URLs
const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: [
    ['products', 'http://localhost:4201'],
    ['cart', 'http://localhost:4202'],
    ['profile', 'http://localhost:4203'],
    ['orders', 'http://localhost:4204'],
    ['admin', 'http://localhost:4208'],
    ['analytics', 'http://localhost:4205'],
    ['notifications', 'http://localhost:4206'],
    ['messages', 'http://localhost:4207'],
  ],
};

export default config;
```

---

## 📜 GitHub Actions - Publish Shared Libraries

Save as `.github/workflows/publish.yml` in shared-libs repo:

```yaml
name: Publish Packages

on:
  push:
    branches: [main]
  release:
    types: [created]
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

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

      - name: Publish layout
        run: cd dist/libs/layout && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true

      - name: Publish ui-components
        run: cd dist/libs/ui-components && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true

      - name: Publish services
        run: cd dist/libs/services && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true

      - name: Publish core
        run: cd dist/libs/core && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true

      - name: Publish utils
        run: cd dist/libs/utils && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true

      - name: Publish pipes
        run: cd dist/libs/pipes && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true

      - name: Publish directives
        run: cd dist/libs/directives && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true

      - name: Publish constants
        run: cd dist/libs/constants && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true

      - name: Publish styles
        run: cd dist/libs/styles && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true
```

---

## 📜 GitHub Actions - Deploy Shell

Save as `.github/workflows/deploy.yml` in shell repo:

```yaml
name: Deploy Shell to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@hemantajax'

      - name: Configure npm for GitHub Packages
        run: |
          echo "@hemantajax:registry=https://npm.pkg.github.com" >> .npmrc
          echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" >> .npmrc

      - name: Install dependencies
        run: npm ci
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Build application
        run: npx nx build shell --configuration=production --base-href=/mfe-polyrepo-shell/

      - name: Add .nojekyll
        run: touch dist/apps/shell/browser/.nojekyll

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

## 📜 GitHub Actions - Deploy Remote

Save as `.github/workflows/deploy.yml` in each remote repo:

```yaml
name: Deploy Remote to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@hemantajax'

      - name: Configure npm for GitHub Packages
        run: |
          echo "@hemantajax:registry=https://npm.pkg.github.com" >> .npmrc
          echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" >> .npmrc

      - name: Install dependencies
        run: npm ci
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Build application
        run: |
          APP_NAME=$(basename $(pwd) | sed 's/mfe-polyrepo-//')
          npx nx build $APP_NAME --configuration=production --base-href=/mfe-polyrepo-$APP_NAME/

      - name: Add .nojekyll
        run: |
          APP_NAME=$(basename $(pwd) | sed 's/mfe-polyrepo-//')
          touch dist/apps/$APP_NAME/browser/.nojekyll

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: |
            dist/apps/*/browser

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

## 📜 Package.json Template for Shared Libraries

Each library's `package.json` should look like:

```json
{
  "name": "@hemantajax/mfe-layout",
  "version": "1.0.0",
  "description": "Shared layout components for MFE polyrepo",
  "main": "./src/index.js",
  "types": "./src/index.d.ts",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/@hemantajax",
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/hemantajax/mfe-polyrepo-shared-libs.git"
  },
  "keywords": ["angular", "micro-frontend", "module-federation", "layout"],
  "author": "Hemant",
  "license": "MIT",
  "peerDependencies": {
    "@angular/common": "^18.0.0",
    "@angular/core": "^18.0.0"
  }
}
```

---

## 📜 NPM Configuration

Root `.npmrc` for all repositories:

```
@hemantajax:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

---

## 📜 Webpack Production Config for Remotes

Save as `apps/<remote>/webpack.prod.config.ts`:

```typescript
import { withModuleFederation } from '@nx/angular/module-federation';
import config from './module-federation.config';

// Get the remote name from the directory
const remoteName = __dirname.split('/').pop() || 'remote';

export default withModuleFederation({
  ...config,
  library: {
    type: 'module',
  },
  shared: {
    ...config.shared,
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  },
  remotes: [],
});
```

---

## 📜 Start All Script (for local development)

Save as `start-all-polyrepo.sh`:

```bash
#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting all Polyrepo MFE applications...${NC}"

# Start shell
echo -e "${GREEN}Starting Shell on port 4200...${NC}"
cd mfe-polyrepo-shell
npm start &
SHELL_PID=$!

# Wait a bit
sleep 3

# Start remotes
echo -e "${GREEN}Starting Products on port 4201...${NC}"
cd ../mfe-polyrepo-products
npx nx serve products --port=4201 &
PRODUCTS_PID=$!

echo -e "${GREEN}Starting Cart on port 4202...${NC}"
cd ../mfe-polyrepo-cart
npx nx serve cart --port=4202 &
CART_PID=$!

echo -e "${GREEN}Starting Profile on port 4203...${NC}"
cd ../mfe-polyrepo-profile
npx nx serve profile --port=4203 &
PROFILE_PID=$!

echo -e "${GREEN}Starting Orders on port 4204...${NC}"
cd ../mfe-polyrepo-orders
npx nx serve orders --port=4204 &
ORDERS_PID=$!

echo -e "${GREEN}Starting Analytics on port 4205...${NC}"
cd ../mfe-polyrepo-analytics
npx nx serve analytics --port=4205 &
ANALYTICS_PID=$!

echo -e "${GREEN}Starting Notifications on port 4206...${NC}"
cd ../mfe-polyrepo-notifications
npx nx serve notifications --port=4206 &
NOTIFICATIONS_PID=$!

echo -e "${GREEN}Starting Messages on port 4207...${NC}"
cd ../mfe-polyrepo-messages
npx nx serve messages --port=4207 &
MESSAGES_PID=$!

echo -e "${GREEN}Starting Admin on port 4208...${NC}"
cd ../mfe-polyrepo-admin
npx nx serve admin --port=4208 &
ADMIN_PID=$!

echo -e "${BLUE}All applications started!${NC}"
echo -e "${BLUE}Shell: http://localhost:4200${NC}"
echo ""
echo "Press Ctrl+C to stop all applications"

# Wait for Ctrl+C
trap "kill $SHELL_PID $PRODUCTS_PID $CART_PID $PROFILE_PID $ORDERS_PID $ANALYTICS_PID $NOTIFICATIONS_PID $MESSAGES_PID $ADMIN_PID 2>/dev/null" EXIT
wait
```

Make it executable:

```bash
chmod +x start-all-polyrepo.sh
```

---

## 📜 Repository Creation Script

Save as `create-polyrepo.sh`:

```bash
#!/bin/bash

# This script creates all polyrepo repositories
# Requires: gh CLI (GitHub CLI)

echo "Creating Polyrepo MFE Repositories..."

REPOS=(
  "mfe-polyrepo-shared-libs"
  "mfe-polyrepo-shell"
  "mfe-polyrepo-products"
  "mfe-polyrepo-cart"
  "mfe-polyrepo-profile"
  "mfe-polyrepo-orders"
  "mfe-polyrepo-admin"
  "mfe-polyrepo-analytics"
  "mfe-polyrepo-notifications"
  "mfe-polyrepo-messages"
)

for repo in "${REPOS[@]}"; do
  echo "Creating repository: $repo"
  gh repo create $repo --public --description "Polyrepo MFE Demo - $repo"
  echo "✅ Created: https://github.com/hemantajax/$repo"
done

echo ""
echo "All repositories created!"
echo "Next steps:"
echo "1. Clone each repository"
echo "2. Set up the code"
echo "3. Enable GitHub Pages for each repo"
```

---

## 📜 Summary

These scripts will help you:

1. **Module Federation Configs**: Ready-to-use configurations
2. **GitHub Actions**: CI/CD pipelines for build and deploy
3. **Package Configs**: npm and publishing setup
4. **Development Scripts**: Local development helpers
5. **Automation**: Repository creation script

Copy these scripts to your polyrepo repositories as needed!
