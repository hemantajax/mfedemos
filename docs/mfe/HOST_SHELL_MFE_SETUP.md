# Shell/Host MFE Setup Guide

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Project Structure](#project-structure)
- [Configuration Files](#configuration-files)
- [Application Architecture](#application-architecture)
- [Module Federation Configuration](#module-federation-configuration)
- [Development Workflow](#development-workflow)
- [Production Build & Deployment](#production-build--deployment)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

The Shell/Host application is the container application in a Micro Frontend (MFE) architecture. It serves as:

- **Router Orchestrator**: Manages all application routes including remote MFEs
- **Layout Provider**: Provides shared layouts (headers, footers, navigation)
- **Authentication Gateway**: Controls access to protected routes
- **Remote MFE Consumer**: Dynamically loads and integrates remote micro frontends

This guide shows how to create a **standalone GitHub repository** for your host application that consumes remote MFEs.

---

## Prerequisites

### Required Tools

- **Node.js**: v20+ (LTS recommended)
- **npm**: v10+ or **yarn**: v1.22+
- **Git**: Latest version
- **Angular CLI**: v20.3+

### Knowledge Requirements

- Angular 18+ fundamentals
- Module Federation concepts
- TypeScript
- Bootstrap 5

---

## Initial Setup

### 1. Create Nx Workspace

```bash
# Create directory
mkdir mfe-host
cd mfe-host

# Initialize Nx workspace (interactive prompts)
npx create-nx-workspace@latest .

# When prompted, choose:
# - Preset: angular-monorepo
# - Application name: shell
# - Bundler: webpack
# - Test runner: none (or your preference)
# - Stylesheet format: scss
# - Enable SSR: No
# - Nx Cloud: Skip
```

### 2. Add Module Federation

```bash
# Add Module Federation to shell
nx g @nx/angular:setup-mf shell --mfType=host --port=4200
```

### 3. Install Bootstrap (Optional)

```bash
npm install bootstrap@^5.3.8
```

### 4. Start Development

```bash
nx serve shell
```

That's it! Your shell/host application is ready.

---

## Project Structure

```
mfe-host/
├── apps/
│   └── shell/                        # Host application
│       ├── src/
│       │   ├── app/
│       │   │   ├── layouts/
│       │   │   │   └── main-layout/
│       │   │   │       ├── main-layout.component.ts
│       │   │   │       ├── main-layout.component.html
│       │   │   │       └── main-layout.component.scss
│       │   │   ├── pages/
│       │   │   │   ├── dashboard/
│       │   │   │   ├── auth/
│       │   │   │   │   ├── login/
│       │   │   │   │   └── register/
│       │   │   │   ├── about/
│       │   │   │   └── contact/
│       │   │   ├── app.ts                    # Root component
│       │   │   ├── app.html                  # Root template
│       │   │   ├── app.scss                  # Root styles
│       │   │   ├── app.config.ts            # App configuration
│       │   │   └── app.routes.ts            # Route definitions
│       │   ├── bootstrap.ts                 # Bootstrap logic
│       │   ├── main.ts                      # Entry point
│       │   ├── index.html                   # HTML template
│       │   └── styles.scss                  # Global styles
│       ├── public/
│       │   └── favicon.ico
│       ├── module-federation.config.ts      # Dev MF config
│       ├── module-federation.config.prod.ts # Prod MF config
│       ├── webpack.config.ts                # Dev webpack
│       ├── webpack.prod.config.ts           # Prod webpack
│       ├── project.json                     # Nx project config
│       ├── tsconfig.json                    # TS config
│       ├── tsconfig.app.json               # App TS config
│       └── eslint.config.mjs               # ESLint config
├── node_modules/
├── .gitignore
├── package.json
├── tsconfig.base.json
├── nx.json
└── README.md
```

---

## Configuration Files

### 1. tsconfig.base.json

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "rootDir": ".",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "es2015",
    "module": "esnext",
    "lib": ["es2020", "dom"],
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "products/Routes": ["apps/products/remote-entry/entry.routes.ts"],
      "cart/Routes": ["apps/cart/remote-entry/entry.routes.ts"],
      "profile/Routes": ["apps/profile/remote-entry/entry.routes.ts"],
      "orders/Routes": ["apps/orders/remote-entry/entry.routes.ts"]
    }
  },
  "exclude": ["node_modules", "tmp"]
}
```

### 2. apps/shell/tsconfig.json

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "target": "es2022",
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "emitDecoratorMetadata": false,
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "typeCheckHostBindings": true,
    "strictTemplates": true
  },
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    }
  ]
}
```

### 3. apps/shell/tsconfig.app.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "types": [],
    "target": "ES2020"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.test.ts", "src/**/*.spec.ts"]
}
```

### 4. apps/shell/project.json

```json
{
  "name": "shell",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "projectType": "application",
  "prefix": "app",
  "sourceRoot": "apps/shell/src",
  "tags": ["type:app", "scope:host"],
  "targets": {
    "build": {
      "executor": "@nx/angular:webpack-browser",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/apps/shell",
        "index": "apps/shell/src/index.html",
        "main": "apps/shell/src/main.ts",
        "tsConfig": "apps/shell/tsconfig.app.json",
        "inlineStyleLanguage": "scss",
        "assets": [
          {
            "glob": "**/*",
            "input": "apps/shell/public"
          }
        ],
        "styles": ["apps/shell/src/styles.scss"],
        "customWebpackConfig": {
          "path": "apps/shell/webpack.config.ts"
        }
      },
      "configurations": {
        "production": {
          "budgets": [
            {
              "type": "initial",
              "maximumWarning": "500kb",
              "maximumError": "1mb"
            }
          ],
          "outputHashing": "all",
          "customWebpackConfig": {
            "path": "apps/shell/webpack.prod.config.ts"
          }
        },
        "development": {
          "buildOptimizer": false,
          "optimization": false,
          "vendorChunk": true,
          "extractLicenses": false,
          "sourceMap": true,
          "namedChunks": true
        }
      },
      "defaultConfiguration": "production"
    },
    "serve": {
      "executor": "@nx/angular:module-federation-dev-server",
      "configurations": {
        "production": {
          "buildTarget": "shell:build:production"
        },
        "development": {
          "buildTarget": "shell:build:development"
        }
      },
      "defaultConfiguration": "development",
      "options": {
        "port": 4200,
        "publicHost": "http://localhost:4200"
      }
    },
    "lint": {
      "executor": "@nx/eslint:lint"
    }
  }
}
```

---

## Module Federation Configuration

### Development Configuration

**apps/shell/module-federation.config.ts**

```typescript
import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  /**
   * For local development, remotes can be configured as:
   * 1. Dev server URLs (when running locally)
   * 2. Production URLs (when remotes are deployed)
   */
  remotes: ['products', 'cart', 'profile', 'orders'],
};

export default config;
```

### Production Configuration

**apps/shell/module-federation.config.prod.ts**

```typescript
import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  /**
   * Production configuration pointing to deployed remote MFEs
   * Update these URLs to match your deployment infrastructure
   */
  remotes: [
    ['products', 'https://your-cdn.com/products/remoteEntry.mjs'],
    ['cart', 'https://your-cdn.com/cart/remoteEntry.mjs'],
    ['profile', 'https://your-cdn.com/profile/remoteEntry.mjs'],
    ['orders', 'https://your-cdn.com/orders/remoteEntry.mjs'],
  ],
};

export default config;
```

### Webpack Configurations

**apps/shell/webpack.config.ts** (Development)

```typescript
import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

/**
 * Development webpack configuration
 * Uses localhost URLs for remotes
 */
export default withModuleFederation(config, { dts: false });
```

**apps/shell/webpack.prod.config.ts** (Production)

```typescript
import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config.prod';

/**
 * Production webpack configuration
 * Uses CDN/deployed URLs for remotes
 */
export default withModuleFederation(config, { dts: false });
```

---

## Application Architecture

### 1. Entry Point

**apps/shell/src/main.ts**

```typescript
import('./bootstrap').catch((err) => console.error(err));
```

### 2. Bootstrap

**apps/shell/src/bootstrap.ts**

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
```

### 3. App Configuration

**apps/shell/src/app/app.config.ts**

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection(), provideBrowserGlobalErrorListeners(), provideRouter(appRoutes)],
};
```

### 4. Root Component

**apps/shell/src/app/app.ts**

```typescript
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Shell Application';
}
```

**apps/shell/src/app/app.html**

```html
<router-outlet></router-outlet>
```

### 5. Route Configuration

**apps/shell/src/app/app.routes.ts**

```typescript
import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const appRoutes: Route[] = [
  // Routes WITHOUT layout (full page - auth screens)
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.component').then((m) => m.RegisterComponent),
  },

  // Routes WITH layout (header + content)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
      },

      // ============================================
      // REMOTE MFE ROUTES
      // ============================================
      {
        path: 'products',
        loadChildren: () => import('products/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'cart',
        loadChildren: () => import('cart/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'profile',
        loadChildren: () => import('profile/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'orders',
        loadChildren: () => import('orders/Routes').then((m) => m.remoteRoutes),
      },

      // 404 - Not Found
      {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
      },
    ],
  },
];
```

### 6. Main Layout

**apps/shell/src/app/layouts/main-layout/main-layout.component.ts**

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
```

**apps/shell/src/app/layouts/main-layout/main-layout.component.html**

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" routerLink="/">Shell App</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/products" routerLinkActive="active">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/cart" routerLinkActive="active">Cart</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/orders" routerLinkActive="active">Orders</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/profile" routerLinkActive="active">Profile</a>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" routerLink="/login">Login</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<main class="container-fluid py-4">
  <router-outlet></router-outlet>
</main>

<footer class="bg-light py-3 mt-5">
  <div class="container text-center">
    <p class="mb-0">© 2025 Shell Application. Powered by Module Federation.</p>
  </div>
</footer>
```

### 7. Dashboard Component

**apps/shell/src/app/pages/dashboard/dashboard.component.ts**

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
```

**apps/shell/src/app/pages/dashboard/dashboard.component.html**

```html
<div class="row">
  <div class="col-12">
    <h1>Dashboard</h1>
    <p class="lead">Welcome to the Shell/Host Application</p>
  </div>
</div>

<div class="row mt-4">
  <div class="col-md-3">
    <div class="card text-bg-primary mb-3">
      <div class="card-body">
        <h5 class="card-title">Products</h5>
        <p class="card-text">Browse product catalog</p>
        <a routerLink="/products" class="btn btn-light">View</a>
      </div>
    </div>
  </div>

  <div class="col-md-3">
    <div class="card text-bg-success mb-3">
      <div class="card-body">
        <h5 class="card-title">Cart</h5>
        <p class="card-text">View shopping cart</p>
        <a routerLink="/cart" class="btn btn-light">View</a>
      </div>
    </div>
  </div>

  <div class="col-md-3">
    <div class="card text-bg-warning mb-3">
      <div class="card-body">
        <h5 class="card-title">Orders</h5>
        <p class="card-text">Track your orders</p>
        <a routerLink="/orders" class="btn btn-light">View</a>
      </div>
    </div>
  </div>

  <div class="col-md-3">
    <div class="card text-bg-info mb-3">
      <div class="card-body">
        <h5 class="card-title">Profile</h5>
        <p class="card-text">Manage your profile</p>
        <a routerLink="/profile" class="btn btn-light">View</a>
      </div>
    </div>
  </div>
</div>
```

### 8. Global Styles

**apps/shell/src/styles.scss**

```scss
// Bootstrap 5 Import
@import 'bootstrap/scss/bootstrap';

// Optional: Bootswatch Theme (comment out if not using)
// @import 'bootswatch/dist/cerulean/bootstrap.min.css';

// Global styles
* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

// Utility classes
.cursor-pointer {
  cursor: pointer;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 9. HTML Template

**apps/shell/src/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Shell Application</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

---

## Development Workflow

### package.json Scripts

```json
{
  "name": "my-mfe-host",
  "version": "1.0.0",
  "scripts": {
    "start": "nx serve shell",
    "build": "nx build shell",
    "build:prod": "nx build shell --configuration=production",
    "lint": "nx lint shell",
    "test": "nx test shell",
    "serve:static": "nx serve-static shell"
  }
}
```

### Running the Application

#### Development Mode

```bash
# Start the host application
npm start

# Application will be available at http://localhost:4200
```

#### Production Build

```bash
# Build for production
npm run build:prod

# Output will be in dist/apps/shell
```

#### Serve Production Build Locally

```bash
# Test production build
npm run serve:static

# Or use a simple HTTP server
npx http-server dist/apps/shell -p 8080
```

---

## Production Build & Deployment

### Build Process

1. **Production Build**

```bash
nx build shell --configuration=production
```

2. **Output Structure**

```
dist/apps/shell/
├── browser/
│   ├── index.html
│   ├── main-*.js
│   ├── polyfills-*.js
│   ├── remoteEntry.mjs
│   ├── styles-*.css
│   └── assets/
```

### Deployment Options

#### 1. GitHub Pages

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

      - name: Build
        run: npm run build:prod

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/apps/shell/browser'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 2. Netlify

Create `netlify.toml`:

```toml
[build]
  command = "npm run build:prod"
  publish = "dist/apps/shell/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 3. AWS S3 + CloudFront

```bash
# Build
npm run build:prod

# Sync to S3
aws s3 sync dist/apps/shell/browser s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

#### 4. Docker

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:prod

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist/apps/shell/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
      try_files $uri $uri/ /index.html;
    }

    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
  }
}
```

---

## Best Practices

### 1. Error Handling

Create an error boundary component:

**apps/shell/src/app/core/error-boundary.component.ts**

```typescript
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-boundary',
  imports: [CommonModule],
  template: `
    <div class="alert alert-danger m-4" role="alert">
      <h4 class="alert-heading">Oops! Something went wrong</h4>
      <p>{{ errorMessage }}</p>
      <hr />
      <button class="btn btn-primary" (click)="retry()">Retry</button>
      <button class="btn btn-secondary ms-2" (click)="goHome()">Go Home</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorBoundaryComponent implements OnInit {
  errorMessage = 'An unexpected error occurred. Please try again.';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Log error to monitoring service
    console.error('Error Boundary triggered:', this.errorMessage);
  }

  retry(): void {
    window.location.reload();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
```

### 2. Loading States

Create a loading component:

**apps/shell/src/app/shared/loading.component.ts**

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  template: `
    <div class="d-flex justify-content-center align-items-center p-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
```

Use in routes:

```typescript
{
  path: 'products',
  loadChildren: () =>
    import('products/Routes').then((m) => m.remoteRoutes),
  loadComponent: () =>
    import('./shared/loading.component').then((m) => m.LoadingComponent),
}
```

### 3. Authentication Guard

**apps/shell/src/app/core/auth.guard.ts**

```typescript
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Replace with your actual auth logic
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
```

Apply to routes:

```typescript
{
  path: 'profile',
  loadChildren: () => import('profile/Routes').then((m) => m.remoteRoutes),
  canActivate: [authGuard],
}
```

### 4. Environment Configuration

**apps/shell/src/environments/environment.ts**

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  remoteUrls: {
    products: 'http://localhost:4201',
    cart: 'http://localhost:4202',
    profile: 'http://localhost:4203',
    orders: 'http://localhost:4204',
  },
};
```

**apps/shell/src/environments/environment.prod.ts**

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com',
  remoteUrls: {
    products: 'https://cdn.yourdomain.com/products',
    cart: 'https://cdn.yourdomain.com/cart',
    profile: 'https://cdn.yourdomain.com/profile',
    orders: 'https://cdn.yourdomain.com/orders',
  },
};
```

### 5. Performance Optimization

#### Lazy Loading

- Use lazy loading for all routes
- Lazy load remote MFEs
- Defer loading of non-critical features

#### Bundle Size

```json
// project.json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "4kb",
      "maximumError": "8kb"
    }
  ]
}
```

#### Caching Strategy

```typescript
// apps/shell/src/app/app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        /* your interceptors */
      ])
    ),
    // ... other providers
  ],
};
```

---

## Troubleshooting

### Common Issues

#### 1. Remote Module Not Loading

**Problem**: `Cannot find module 'products/Routes'`

**Solution**:

- Ensure remote MFE is running
- Check `tsconfig.base.json` paths are correct
- Verify `module-federation.config.ts` remotes configuration
- Clear `node_modules/.cache` and rebuild

```bash
rm -rf node_modules/.cache
nx reset
nx serve shell
```

#### 2. CORS Errors

**Problem**: CORS errors when loading remote MFEs

**Solution**: Configure CORS in remote MFE servers:

```typescript
// Remote MFE server config
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
```

#### 3. Version Mismatch

**Problem**: Different Angular versions between host and remotes

**Solution**: Ensure all MFEs use the same Angular version:

```json
{
  "dependencies": {
    "@angular/core": "~20.3.0",
    "@angular/common": "~20.3.0"
  }
}
```

#### 4. Shared Dependencies Issues

**Problem**: Multiple instances of singleton services

**Solution**: Configure shared dependencies in Module Federation:

```typescript
// module-federation.config.ts
{
  name: 'shell',
  shared: {
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  }
}
```

#### 5. Production Build Fails

**Problem**: Build works in dev but fails in production

**Solution**:

- Check production webpack config
- Verify environment variables
- Test production build locally
- Check bundle size limits

```bash
# Build and test locally
nx build shell --configuration=production
npx http-server dist/apps/shell/browser -p 8080
```

### Debug Mode

Enable verbose logging:

```typescript
// apps/shell/src/main.ts
import { enableProdMode, enableDebugTools } from '@angular/core';
import { environment } from './environments/environment';

if (!environment.production) {
  // Debug mode enabled
  console.log('🔧 Debug mode enabled');
} else {
  enableProdMode();
}
```

---

## Next Steps

After setting up your shell/host application:

1. **Create Remote MFEs**: Follow the remote MFE setup guide
2. **Shared Libraries**: Set up shared libraries for common code
3. **CI/CD Pipeline**: Automate builds and deployments
4. **Monitoring**: Add application monitoring and error tracking
5. **Testing**: Implement E2E tests for MFE integration

---

## Related Documentation

- [Remote MFE Setup Guide](./REMOTE_MFE_SETUP.md) _(to be created)_
- [Shared Libraries Guide](./SHARED_LIBRARIES_GUIDE.md) _(to be created)_
- [Module Federation Best Practices](./MF_BEST_PRACTICES.md) _(to be created)_
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) _(to be created)_

---

## Resources

- [Nx Module Federation](https://nx.dev/recipes/module-federation)
- [Angular Module Federation](https://www.angulararchitects.io/en/blog/module-federation-with-angular/)
- [Module Federation Official Docs](https://module-federation.io/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)

---

**Last Updated**: October 21, 2025  
**Version**: 1.0.0
