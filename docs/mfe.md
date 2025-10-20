# Module Federation (MFE) Development Guide

## Table of Contents
1. [Overview](#overview)
2. [Workspace Features](#workspace-features)
3. [Development Workflow](#development-workflow)
4. [Creating New MFE Applications](#creating-new-mfe-applications)
5. [Integrating MFE into Existing Apps](#integrating-mfe-into-existing-apps)
6. [Layout Architecture](#layout-architecture)
7. [Port Configuration](#port-configuration)
8. [Production Deployment](#production-deployment)
9. [Best Practices](#best-practices)

---

## Overview

This workspace uses **Nx Module Federation** with **Angular 18** to create a micro-frontend architecture. The host application (`mfeui`) orchestrates multiple remote applications, each running independently and loaded dynamically at runtime.

### Technology Stack
- **Angular 18** - Standalone components architecture
- **Nx 21.6.5** - Monorepo management and build orchestration
- **Module Federation** - Runtime integration of micro-frontends
- **Bootstrap 5** - UI framework with utility classes
- **Bootswatch** - Bootstrap themes
- **TypeScript 5.9.2** - Type-safe development

---

## Workspace Features

### 1. Multiple Remote MFE Applications

The workspace includes **8 active remote micro-frontends**:

| Remote MFE | Port | URL | Description | Layout Type |
|------------|------|-----|-------------|-------------|
| **products** | 4201 | `/products` | Product catalog with filtering | Default (with header) |
| **cart** | 4202 | `/cart` | Shopping cart and checkout | Default (with header) |
| **profile** | 4203 | `/profile` | User profile management | Default (with header) |
| **orders** | 4204 | `/orders` | Order tracking and management | Default (with header) |
| **analytics** | 4205 | `/analytics` | Business insights and metrics | Default (with header) |
| **notifications** | 4206 | `/notifications` | Notification center | Default (with header) |
| **messages** | 4207 | `/messages` | Real-time messaging system | **Full Page** |
| **admin** | 4208 | `/admin` | Administrative panel | **Full Page** |

### 2. Layout Architecture

The workspace supports **two layout patterns**:

#### A. Default Layout (With Header)
- **Location**: `apps/mfeui/src/app/layouts/main-layout/main-layout.component.ts`
- **Features**:
  - Persistent header navigation with `HeaderComponent` from shared library
  - Consistent branding across all pages
  - Content area for child routes
- **Usage**: Most remotes (products, cart, profile, orders, analytics, notifications)
- **Routing**: Nested under `MainLayoutComponent` in `app.routes.ts`

```typescript
// Routes WITH layout (header + content)
{
  path: '',
  component: MainLayoutComponent,
  children: [
    {
      path: 'products',
      loadChildren: () => import('products/Routes').then((m) => m.remoteRoutes),
    },
    // ... other routes
  ],
}
```

#### B. Full Page Layout (No Header)
- **Features**:
  - Complete control over the entire viewport
  - Custom navigation and branding
  - Independent styling and UX
- **Usage**: Messages and Admin panel
- **Routing**: Top-level routes in `app.routes.ts`

```typescript
// Routes WITHOUT layout (full page)
{
  path: 'messages',
  loadChildren: () => import('messages/Routes').then((m) => m!.remoteRoutes),
},
{
  path: 'admin',
  loadChildren: () => import('admin/Routes').then((m) => m!.remoteRoutes),
}
```

### 3. Shared Libraries

The workspace includes a **shared library** (`@nxmfe/shared`) with:
- **UI Components**: Reusable components (NotFoundComponent, HeaderComponent, etc.)
- **Services**: Common services (auth, API, state management)
- **Utilities**: Helper functions and pipes
- **Styles**: Global SCSS variables, mixins, and utilities

See `SHARED_LIBRARIES_README.md` for detailed documentation.

### 4. Automatic Dependency Sharing

Nx Module Federation **automatically shares**:
- All npm packages (Angular, RxJS, etc.)
- Workspace libraries (`@nxmfe/shared`)
- Configured as **singletons** to prevent version conflicts

---

## Development Workflow

### Prerequisites
```bash
# Install dependencies
npm install

# Verify Nx installation
npx nx --version
```

### Starting the Development Environment

#### Option 1: Start All Applications (Recommended)
```bash
npm start
# or
npm run serve:all
```
This command:
- Starts the host (`mfeui`) on port 4200
- Starts all 8 remote MFEs on their respective ports
- Runs in parallel with hot module reloading
- Automatically resolves remotes to local dev servers

**Memory Allocation**: Uses `NODE_OPTIONS='--max-old-space-size=8192'` for large-scale development

#### Option 2: Start Individual Applications
```bash
# Host only
npm run serve:host

# Individual remotes
npm run serve:products   # Port 4201
npm run serve:cart       # Port 4202
npm run serve:profile    # Port 4203
# ... etc
```

#### Option 3: Start Specific Subset
```bash
# Custom combination
npx nx run-many --target=serve --projects=mfeui,products,cart --parallel=3
```

### Accessing the Application

- **Host**: http://localhost:4200
- **Dashboard**: http://localhost:4200/dashboard
- **Products**: http://localhost:4200/products
- **Cart**: http://localhost:4200/cart
- **Profile**: http://localhost:4200/profile
- **Orders**: http://localhost:4200/orders
- **Analytics**: http://localhost:4200/analytics
- **Notifications**: http://localhost:4200/notifications
- **Messages**: http://localhost:4200/messages (Full page)
- **Admin**: http://localhost:4200/admin (Full page)

---

## Creating New MFE Applications

### Step 1: Set Up Host Application (First Time Only)

If you're starting from scratch:

```bash
npx nx g @nx/angular:setup-mf mfeui --mfType=host --port=4200
```

**What this does**:
- Configures `mfeui` as a Module Federation host
- Sets up webpack with Module Federation plugin
- Creates `module-federation.config.ts`
- Configures port 4200

### Step 2: Create a New Remote MFE

#### Basic Remote MFE

```bash
npx nx g @nx/angular:remote apps/<remote-name> --host=mfeui --port=<PORT> --style=scss
```

**Example**: Creating a new "inventory" remote on port 4209

```bash
npx nx g @nx/angular:remote apps/inventory --host=mfeui --port=4209 --style=scss
```

**What this generates**:
```
apps/inventory/
  ├── src/
  │   ├── app/
  │   │   ├── remote-entry/
  │   │   │   ├── entry.component.ts        # Root component for the remote
  │   │   │   ├── entry.component.html
  │   │   │   ├── entry.component.scss
  │   │   │   └── entry.routes.ts           # Exported routes
  │   │   ├── app.component.ts
  │   │   ├── app.config.ts
  │   │   └── app.routes.ts
  │   ├── main.ts
  │   ├── index.html
  │   └── styles.scss
  ├── module-federation.config.ts            # MFE configuration
  ├── webpack.config.ts
  ├── webpack.prod.config.ts
  ├── project.json                           # Nx project configuration
  ├── tsconfig.app.json
  ├── tsconfig.json
  └── tsconfig.spec.json
```

### Step 3: Configure the Remote

#### A. Update `module-federation.config.ts`

```typescript
import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'inventory',
  exposes: {
    './Routes': 'apps/inventory/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
```

#### B. Define Routes in `entry.routes.ts`

```typescript
import { Route } from '@angular/router';
import { EntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: EntryComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../pages/inventory-list/inventory-list.component').then(
            (m) => m.InventoryListComponent
          ),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('../pages/inventory-add/inventory-add.component').then(
            (m) => m.InventoryAddComponent
          ),
      },
    ],
  },
];
```

### Step 4: Register Remote in Host Application

#### A. Add to `module-federation.config.ts` (Development)

```typescript
// apps/mfeui/module-federation.config.ts
const config: ModuleFederationConfig = {
  name: 'mfeui',
  remotes: [
    'products',
    'cart',
    'profile',
    'orders',
    'analytics',
    'notifications',
    'messages',
    'admin',
    'inventory',  // ← Add new remote
  ],
};
```

#### B. Add to `module-federation.config.prod.ts` (Production)

```typescript
// apps/mfeui/module-federation.config.prod.ts
const config: ModuleFederationConfig = {
  name: 'mfeui',
  remotes: [
    // ... existing remotes
    [
      'inventory',
      'https://your-domain.com/inventory/remoteEntry.mjs',
    ],
  ],
};
```

### Step 5: Add Route to Host

#### For Default Layout (With Header)

Edit `apps/mfeui/src/app/app.routes.ts`:

```typescript
{
  path: '',
  component: MainLayoutComponent,
  children: [
    // ... existing routes
    {
      path: 'inventory',
      loadChildren: () =>
        import('inventory/Routes').then((m) => m.remoteRoutes),
    },
  ],
}
```

#### For Full Page Layout (No Header)

```typescript
// At top level
{
  path: 'inventory',
  loadChildren: () => import('inventory/Routes').then((m) => m.remoteRoutes),
}
```

### Step 6: Update TypeScript Declarations

Add type declaration in `apps/mfeui/src/declarations.d.ts`:

```typescript
declare module 'inventory/Routes' {
  export const remoteRoutes: any;
}
```

### Step 7: Add to Package Scripts (Optional)

Edit `package.json`:

```json
{
  "scripts": {
    "serve:inventory": "nx serve inventory",
    "build:inventory": "nx build inventory",
    "test:inventory": "nx test inventory",
    "lint:inventory": "nx lint inventory"
  }
}
```

### Step 8: Update Dashboard (Optional)

Add to `apps/mfeui/src/app/pages/dashboard/dashboard.component.ts`:

```typescript
remoteMFEs = [
  // ... existing MFEs
  {
    id: 9,
    name: 'Inventory Management',
    description: 'Track and manage inventory levels',
    icon: 'bi-box2-fill',
    color: 'success',
    url: '/inventory',
    status: 'active',
    remoteEntry: 'http://localhost:4209/remoteEntry.js',
    port: 4209,
  },
];
```

### Step 9: Start Development

```bash
# Start the new remote
npm run serve:inventory

# Or start everything
npm start
```

### Step 10: Verify Integration

1. Navigate to http://localhost:4200
2. Click on the Inventory card or navigate to http://localhost:4200/inventory
3. Verify the remote loads correctly

---

## Integrating MFE into Existing Apps

### Scenario: You Already Have an Angular Application

#### Option 1: Convert Existing App to Remote

```bash
# Add Module Federation to existing app
npx nx g @nx/angular:setup-mf apps/<existing-app> --mfType=remote --host=mfeui --port=<PORT>
```

**What this does**:
- Adds Module Federation configuration
- Creates `module-federation.config.ts`
- Updates webpack configuration
- Configures the app as a remote

**Manual steps**:
1. Create `remote-entry` folder structure
2. Move existing routes to `entry.routes.ts`
3. Export routes as `remoteRoutes`
4. Follow Steps 4-10 from "Creating New MFE Applications"

#### Option 2: Gradual Migration

1. **Create new remote shell**: Generate a new remote MFE
2. **Move components gradually**: Copy components from existing app
3. **Update imports**: Change imports to use new paths
4. **Test independently**: Verify remote works standalone
5. **Integrate**: Add to host following Steps 4-10

---

## Port Configuration

### Standard Port Allocation

| Application | Port | Environment Variable |
|-------------|------|---------------------|
| mfeui (host) | 4200 | - |
| products | 4201 | - |
| cart | 4202 | - |
| profile | 4203 | - |
| orders | 4204 | - |
| analytics | 4205 | - |
| notifications | 4206 | - |
| messages | 4207 | - |
| admin | 4208 | - |

### Changing Ports

Edit `project.json` of the specific app:

```json
{
  "targets": {
    "serve": {
      "options": {
        "port": 4209,  // ← Change port here
        "publicHost": "http://localhost:4209"
      }
    }
  }
}
```

See `PORT_GUIDE.md` for detailed port configuration.

---

## Production Deployment

### Build for Production

```bash
# Build all applications
npm run build:all:prod

# Or build individually
npm run build:host
npm run build:products
npm run build:cart
# ... etc
```

### GitHub Pages Deployment

```bash
# Build and deploy to GitHub Pages
npm run build:gh-pages
npm run deploy
```

**What happens**:
1. Builds all apps with production configuration
2. Uses `module-federation.config.prod.ts` for remote URLs
3. Copies files to `dist/gh-pages`
4. Deploys to GitHub Pages

### Custom Deployment

1. **Build all apps**:
   ```bash
   npm run build:all:prod
   ```

2. **Deploy each app** to your hosting:
   - Host: `dist/apps/mfeui`
   - Remotes: `dist/apps/<remote-name>`

3. **Update remote URLs** in `module-federation.config.prod.ts`:
   ```typescript
   remotes: [
     ['products', 'https://your-cdn.com/products/remoteEntry.mjs'],
     ['cart', 'https://your-cdn.com/cart/remoteEntry.mjs'],
     // ... etc
   ]
   ```

---

## Best Practices

### 1. Component Architecture
- **Use Standalone Components**: Angular 18 standalone architecture
- **Lazy Loading**: Load routes and components on demand
- **Shared Library**: Use `@nxmfe/shared` for common components
- **Bootstrap Classes**: Leverage Bootstrap 5 utility classes

### 2. State Management
- **Keep state local**: Each remote manages its own state
- **Share via services**: Use shared services for cross-remote communication
- **Event bus**: Consider implementing event bus for loose coupling

### 3. Routing
- **Clear boundaries**: Each remote owns its route namespace
- **Nested routes**: Use child routes within remotes
- **Guards**: Implement route guards in shared library

### 4. Styling
- **Bootstrap utilities**: Use built-in Bootstrap classes
- **Component styles**: Scope styles to components
- **Theme consistency**: Use shared SCSS variables
- **Responsive design**: Mobile-first approach

### 5. Performance
- **Lazy loading**: Load remotes only when needed
- **Code splitting**: Split large components into chunks
- **Caching**: Leverage browser caching for shared dependencies
- **Bundle size**: Monitor bundle sizes with `nx build --stats-json`

### 6. Testing
```bash
# Test individual apps
npm run test:products

# Test all apps
npm run test:all

# E2E testing
npm run e2e
```

### 7. Development Tips
- **Use `npm start`**: Starts all apps for full integration testing
- **Hot reload**: Changes reflect immediately in dev mode
- **Nx Console**: Use VS Code Nx Console extension for visual management
- **Dependency graph**: Run `npm run graph` to visualize dependencies

### 8. Error Handling
- **Fallback UI**: Implement fallback for failed remote loads
- **Error boundaries**: Use error boundaries in host
- **Monitoring**: Log remote loading failures
- **Graceful degradation**: Handle missing remotes gracefully

### 9. Version Management
- **Synchronized versions**: Keep Angular and dependencies aligned
- **Shared singletons**: Nx auto-shares npm packages
- **Lock file**: Commit `package-lock.json` to ensure consistency

### 10. Documentation
- **Remote README**: Each remote should have its own README
- **API documentation**: Document exposed components/services
- **Change log**: Maintain changelog for breaking changes

---

## Common Commands Reference

```bash
# Development
npm start                    # Start all apps in parallel
npm run serve:host          # Start host only
npm run serve:products      # Start products remote

# Building
npm run build:all           # Build all apps (development)
npm run build:all:prod      # Build all apps (production)
npm run build:host          # Build host only

# Testing
npm run test:all            # Run all tests
npm run test:mfeui          # Test host app
npm run test:watch          # Watch mode

# Linting
npm run lint                # Lint all apps
npm run lint:fix            # Lint and fix issues

# Deployment
npm run build:gh-pages      # Build for GitHub Pages
npm run deploy              # Deploy to GitHub Pages

# Utilities
npm run graph               # Visualize dependency graph
npm run format              # Format code
npm run affected:test       # Test affected apps
npm run affected:build      # Build affected apps
```

---

## Troubleshooting

### Remote Not Loading

1. **Check if remote is running**: Verify port is accessible
2. **Check module-federation.config.ts**: Ensure remote is listed
3. **Check app.routes.ts**: Verify route is configured
4. **Check browser console**: Look for loading errors
5. **Clear cache**: Clear browser cache and restart dev server

### Port Conflicts

```bash
# Kill process on specific port
lsof -ti:4201 | xargs kill -9

# Use different port
npx nx serve products --port=4210
```

### Build Errors

```bash
# Clean Nx cache
npm run reset

# Clean node_modules
rm -rf node_modules package-lock.json
npm install

# Clean dist
rm -rf dist
```

### Type Errors

1. Check `declarations.d.ts` in host app
2. Verify remote exports routes correctly
3. Restart TypeScript server in IDE

---

## Additional Resources

- **Nx Documentation**: https://nx.dev/
- **Module Federation**: https://module-federation.io/
- **Angular Documentation**: https://angular.dev/
- **Bootstrap 5**: https://getbootstrap.com/

---

## Quick Reference: File Structure

```
workspace/
├── apps/
│   ├── mfeui/                           # Host application (Port 4200)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layouts/
│   │   │   │   │   └── main-layout/    # Header layout
│   │   │   │   ├── pages/
│   │   │   │   │   └── dashboard/      # Dashboard with MFE cards
│   │   │   │   ├── app.routes.ts       # Main routing configuration
│   │   │   │   └── app.config.ts
│   │   │   └── declarations.d.ts       # TypeScript declarations
│   │   ├── module-federation.config.ts      # Dev remotes config
│   │   └── module-federation.config.prod.ts # Prod remotes config
│   │
│   ├── products/                        # Remote MFE (Port 4201)
│   │   ├── src/
│   │   │   └── app/
│   │   │       └── remote-entry/
│   │   │           ├── entry.component.ts
│   │   │           └── entry.routes.ts  # Exported routes
│   │   └── module-federation.config.ts  # Exposes routes
│   │
│   ├── cart/                            # Remote MFE (Port 4202)
│   ├── profile/                         # Remote MFE (Port 4203)
│   ├── orders/                          # Remote MFE (Port 4204)
│   ├── analytics/                       # Remote MFE (Port 4205)
│   ├── notifications/                   # Remote MFE (Port 4206)
│   ├── messages/                        # Remote MFE (Port 4207) - Full page
│   └── admin/                           # Remote MFE (Port 4208) - Full page
│
├── libs/
│   └── shared/                          # Shared libraries
│       ├── ui-components/
│       ├── layout/
│       ├── services/
│       └── utils/
│
├── docs/
│   └── mfe.doc                          # This document
│
├── scripts/
│   ├── start-dev.sh                     # Start all apps script
│   └── deploy-gh-pages.js               # Deployment script
│
├── nx.json                              # Nx workspace configuration
├── package.json                         # Dependencies and scripts
└── tsconfig.base.json                   # TypeScript base config
```

---

**Last Updated**: October 2025
**Workspace Version**: 0.0.0
**Nx Version**: 21.6.5
**Angular Version**: 20.3.0

