# MFE Quick Reference Card

Quick reference for common Module Federation tasks and configurations.

## 🚀 Quick Start Commands

### Shell/Host Application

```bash
# 1. Create workspace
mkdir mfe-host && cd mfe-host
npx create-nx-workspace@latest .    # Choose: angular-monorepo, shell, webpack

# 2. Add Module Federation
nx g @nx/angular:setup-mf shell --mfType=host --port=4200

# 3. Install Bootstrap (optional)
npm install bootstrap@^5.3.8

# 4. Start development
nx serve shell

# 5. Build for production
nx build shell --configuration=production
```

### Remote MFE _(Coming Soon)_

```bash
# Commands will be added when remote MFE guide is complete
```

## 📁 Essential File Structures

### Module Federation Config (Development)

```typescript
// module-federation.config.ts
import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['products', 'cart', 'profile', 'orders'],
};

export default config;
```

### Module Federation Config (Production)

```typescript
// module-federation.config.prod.ts
import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: [
    ['products', 'https://cdn.com/products/remoteEntry.mjs'],
    ['cart', 'https://cdn.com/cart/remoteEntry.mjs'],
  ],
};

export default config;
```

### Webpack Configs

```typescript
// webpack.config.ts (Dev)
import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';
export default withModuleFederation(config, { dts: false });

// webpack.prod.config.ts (Prod)
import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config.prod';
export default withModuleFederation(config, { dts: false });
```

### Route Configuration

```typescript
// app.routes.ts
export const appRoutes: Route[] = [
  // Local routes
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  // Remote MFE routes
  {
    path: 'products',
    loadChildren: () => import('products/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'cart',
    loadChildren: () => import('cart/Routes').then((m) => m.remoteRoutes),
  },
];
```

### TypeScript Paths

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "paths": {
      "products/Routes": ["apps/products/remote-entry/entry.routes.ts"],
      "cart/Routes": ["apps/cart/remote-entry/entry.routes.ts"]
    }
  }
}
```

## 🔧 Common Configurations

### project.json (Shell)

```json
{
  "name": "shell",
  "targets": {
    "build": {
      "executor": "@nx/angular:webpack-browser",
      "options": {
        "customWebpackConfig": {
          "path": "apps/shell/webpack.config.ts"
        }
      },
      "configurations": {
        "production": {
          "customWebpackConfig": {
            "path": "apps/shell/webpack.prod.config.ts"
          }
        }
      }
    },
    "serve": {
      "executor": "@nx/angular:module-federation-dev-server",
      "options": {
        "port": 4200,
        "publicHost": "http://localhost:4200"
      }
    }
  }
}
```

### App Configuration

```typescript
// app.config.ts
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection(), provideRouter(appRoutes)],
};
```

## 🎨 Component Patterns

### Root Component

```typescript
@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class App {}
```

### Layout Component

```typescript
@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterModule],
  template: `
    <nav><!-- Navigation --></nav>
    <main><router-outlet></router-outlet></main>
    <footer><!-- Footer --></footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
```

### Page Component

```typescript
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
```

## 🔐 Security Patterns

### Auth Guard

```typescript
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
```

Usage:

```typescript
{
  path: 'profile',
  loadChildren: () => import('profile/Routes').then(m => m.remoteRoutes),
  canActivate: [authGuard],
}
```

## 📦 Package.json Essentials

```json
{
  "scripts": {
    "start": "nx serve shell",
    "build": "nx build shell",
    "build:prod": "nx build shell --configuration=production",
    "lint": "nx lint shell",
    "test": "nx test shell"
  },
  "dependencies": {
    "@angular/common": "~20.3.0",
    "@angular/core": "~20.3.0",
    "@angular/router": "~20.3.0",
    "bootstrap": "^5.3.8"
  },
  "devDependencies": {
    "@nx/angular": "21.6.5",
    "@nx/module-federation": "21.6.5",
    "@module-federation/enhanced": "^0.18.0",
    "nx": "21.6.5"
  }
}
```

## 🌐 Environment Configuration

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};

// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com',
};
```

## 🚀 Deployment Commands

### GitHub Pages

```bash
# Build
npm run build:prod

# Deploy (with gh-pages package)
npx gh-pages -d dist/apps/shell/browser
```

### Docker

```bash
# Build image
docker build -t my-shell-app .

# Run container
docker run -p 80:80 my-shell-app
```

### AWS S3

```bash
# Build
npm run build:prod

# Sync to S3
aws s3 sync dist/apps/shell/browser s3://my-bucket --delete
```

## 🐛 Debugging Commands

```bash
# Clear Nx cache
nx reset

# Clear node_modules cache
rm -rf node_modules/.cache

# Rebuild with verbose logging
nx build shell --verbose

# Serve with specific port
nx serve shell --port 4200

# Check project configuration
nx show project shell --web
```

## 📊 Performance Tips

### Bundle Analysis

```bash
# Install analyzer
npm install -D webpack-bundle-analyzer

# Build with stats
nx build shell --configuration=production --stats-json

# Analyze (if configured in webpack)
npx webpack-bundle-analyzer dist/apps/shell/browser/stats.json
```

### Optimization Checklist

- ✅ Enable OnPush change detection
- ✅ Use lazy loading for routes
- ✅ Implement code splitting
- ✅ Optimize images with NgOptimizedImage
- ✅ Enable production mode
- ✅ Use trackBy in \*ngFor loops
- ✅ Minimize bundle size
- ✅ Enable gzip/brotli compression

## 🔍 Troubleshooting Quick Fixes

| Issue                    | Quick Fix                                           |
| ------------------------ | --------------------------------------------------- |
| Module not found         | `nx reset && npm install`                           |
| CORS errors              | Configure CORS headers in remote MFEs               |
| Version mismatch         | Align all Angular versions                          |
| Build fails              | Check webpack configs and module federation         |
| Routes not loading       | Verify tsconfig paths and module federation remotes |
| Production build differs | Test with `nx serve-static shell`                   |

## 📚 Documentation Links

- **Host Setup**: [HOST_SHELL_MFE_SETUP.md](./HOST_SHELL_MFE_SETUP.md)
- **UIKit Approach**: [POLYREPO_UIKIT_APPROACH.md](./POLYREPO_UIKIT_APPROACH.md)
- **MFE Overview**: [README.md](./README.md)
- **Nx Docs**: https://nx.dev/recipes/module-federation
- **Module Federation**: https://module-federation.io/

## 🎯 Port Conventions

| Application   | Port | Purpose            |
| ------------- | ---- | ------------------ |
| Shell/Host    | 4200 | Main container app |
| Products      | 4201 | Products MFE       |
| Cart          | 4202 | Shopping cart MFE  |
| Profile       | 4203 | User profile MFE   |
| Orders        | 4204 | Orders MFE         |
| Analytics     | 4205 | Analytics MFE      |
| Notifications | 4206 | Notifications MFE  |

## 💡 Best Practices

1. **Standalone Components**: Always use standalone components (Angular 18+)
2. **Signals**: Use signals for state management
3. **OnPush**: Enable OnPush change detection
4. **Lazy Loading**: Lazy load all routes and MFEs
5. **Type Safety**: Use strict TypeScript settings
6. **Bootstrap 5**: Leverage Bootstrap classes for UI
7. **Semantic Versioning**: Version your UIKit package properly
8. **Independent Deployment**: Each MFE should deploy independently

---

**Last Updated**: October 21, 2025  
**For detailed guides**: See [HOST_SHELL_MFE_SETUP.md](./HOST_SHELL_MFE_SETUP.md)
