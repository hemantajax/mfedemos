# Building Enterprise-Scale Micro-Frontends with Angular 18, Nx, and Module Federation

## Introduction

A production-ready micro-frontend application showcasing modern best practices using **Angular 18**, **Nx Monorepo**, **Module Federation**, and **GitHub Actions CI/CD**.

**🔗 Live Demo:** [https://hemantajax.github.io/mfedemos/dashboard](https://hemantajax.github.io/mfedemos/dashboard)

**🔗 Production Remotes:**

- **Products**: [https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs](https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs)
- **Cart**: [https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs](https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs)

---

## 🛠️ How to Build This: Step-by-Step Setup

Want to create your own micro-frontend architecture? Here's exactly how I set it up using Nx CLI:

### Step 1: Create the Workspace

```bash
# Create a new Nx workspace
npx create-nx-workspace@latest my-mfe-app --preset=angular-monorepo
```

### Step 2: Set Up the Host Application

```bash
# Configure the main application as a Module Federation host
npx nx g @nx/angular:setup-mf mfeui --mfType=host --port=4200
```

This command:

- Configures Module Federation for the host app
- Sets up webpack configuration
- Creates the base structure for loading remotes

### Step 3: Generate Remote Micro-Frontends

```bash
# Create Products micro-frontend
npx nx g @nx/angular:remote products --host=mfeui --port=4201 --style=scss

# Create Cart micro-frontend
npx nx g @nx/angular:remote cart --host=mfeui --port=4202 --style=scss
```

Each remote gets:

- Its own `module-federation.config.ts`
- Independent port configuration
- Automatic registration with the host
- Remote entry point for Module Federation

### Step 4: Create Shared Libraries

```bash
# Generate shared libraries for code reuse
npx nx g @nx/angular:library layout --directory=shared --importPath=@nxmfe/shared/layout
npx nx g @nx/angular:library services --directory=shared --importPath=@nxmfe/shared/services
npx nx g @nx/angular:library ui-components --directory=shared --importPath=@nxmfe/shared/ui-components
npx nx g @nx/angular:library core --directory=shared --importPath=@nxmfe/shared/core
npx nx g @nx/angular:library pipes --directory=shared --importPath=@nxmfe/shared/pipes
npx nx g @nx/angular:library directives --directory=shared --importPath=@nxmfe/shared/directives
npx nx g @nx/angular:library constants --directory=shared --importPath=@nxmfe/shared/constants
npx nx g @nx/angular:library utils --directory=shared --importPath=@nxmfe/shared/utils
npx nx g @nx/angular:library styles --directory=shared --importPath=@nxmfe/shared/styles
```

### Step 5: Configure Module Federation

Update `module-federation.config.ts` in the host to define remotes:

```typescript
module.exports = {
  name: 'mfeui',
  remotes: ['products', 'cart'],
  // Shared dependencies
  shared: {
    '@angular/core': { singleton: true, strictVersion: true },
    '@angular/common': { singleton: true, strictVersion: true },
    '@angular/router': { singleton: true, strictVersion: true },
  },
};
```

### Step 6: Start Development

```bash
# Start all applications simultaneously
npm run serve:all

# Or start individually:
# npm run serve:host      # http://localhost:4200
# npm run serve:products  # http://localhost:4201
# npm run serve:cart      # http://localhost:4202
```

### Step 7: Configure Routes

In the host application, load remote routes dynamically:

```typescript
import { loadRemoteModule } from '@nx/angular/mf';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => loadRemoteModule('products', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'cart',
    loadChildren: () => loadRemoteModule('cart', './Routes').then((m) => m.remoteRoutes),
  },
];
```

### Step 8: Build for Production

```bash
# Build all applications optimized for production
npm run build:all:prod

# Output goes to dist/ directory
# Each app has its own remoteEntry.mjs for Module Federation
```

### Key Configuration Files

**`module-federation.config.ts` (Host)**

```typescript
export default {
  name: 'mfeui',
  remotes: ['products', 'cart'],
  shared: (name, config) => {
    if (name === '@angular/core' || name === '@angular/common') {
      return { ...config, singleton: true, strictVersion: true };
    }
    return config;
  },
};
```

**`module-federation.config.ts` (Remote)**

```typescript
export default {
  name: 'products',
  exposes: {
    './Routes': 'apps/products/src/app/remote-entry/entry.routes.ts',
  },
};
```

### Pro Tips

1. **Use `nx graph`** to visualize dependencies between apps and libraries
2. **Use `nx affected:test`** to only test what changed
3. **Enable computation caching** in `nx.json` for faster builds
4. **Use path aliases** in `tsconfig.base.json` for clean imports
5. **Keep remotes lightweight** - share common code via libraries

---

## 🔗 Production Links

**Host Application:**

- https://hemantajax.github.io/mfedemos/dashboard

**Remote Micro-Frontends:**

- **Products**: https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs
- **Cart**: https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs

---

**#Angular #MicroFrontends #ModuleFederation #Nx #WebDevelopment #TypeScript**

_Built with ❤️ using Angular 18, Nx, Module Federation, and Bootstrap 5_
