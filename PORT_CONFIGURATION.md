# Port Configuration Guide

## Overview

This document outlines the port configuration for the Module Federation architecture with host and remote applications.

## Port Assignments

| Application  | Type   | Port | URL                   | Purpose                 |
| ------------ | ------ | ---- | --------------------- | ----------------------- |
| **mfeui**    | Host   | 4200 | http://localhost:4200 | Main host application   |
| **products** | Remote | 4201 | http://localhost:4201 | Products micro-frontend |
| **cart**     | Remote | 4202 | http://localhost:4202 | Cart micro-frontend     |
| **profile**  | Remote | 4203 | http://localhost:4203 | Profile micro-frontend  |

## Configuration Files

### 1. Host Application (mfeui)

**File: `apps/mfeui/project.json`**

```json
"serve": {
  "executor": "@nx/angular:module-federation-dev-server",
  "options": {
    "port": 4200,
    "publicHost": "http://localhost:4200",
    "devRemotes": ["products", "cart", "profile"]
  }
}
```

**File: `apps/mfeui/module-federation.config.ts`**

```typescript
const config: ModuleFederationConfig = {
  name: 'mfeui',
  remotes: ['products', 'cart', 'profile'], // Nx auto-resolves to localhost URLs
};
```

> **Note:** The `devRemotes` option ensures all remotes are served as live Angular dev servers, eliminating the need for static file servers.

### 2. Products Remote (Remote 1)

**File: `apps/products/project.json`**

```json
"serve": {
  "executor": "@nx/angular:dev-server",
  "options": {
    "port": 4201,
    "publicHost": "http://localhost:4201"
  }
}
```

**File: `apps/products/module-federation.config.ts`**

```typescript
const config: ModuleFederationConfig = {
  name: 'products',
  exposes: {
    './Routes': 'apps/products/src/app/remote-entry/entry.routes.ts',
  },
};
```

### 3. Cart Remote (Remote 2)

**File: `apps/cart/project.json`**

```json
"serve": {
  "executor": "@nx/angular:dev-server",
  "options": {
    "port": 4202,
    "publicHost": "http://localhost:4202"
  }
}
```

**File: `apps/cart/module-federation.config.ts`**

```typescript
const config: ModuleFederationConfig = {
  name: 'cart',
  exposes: {
    './Routes': 'apps/cart/src/app/remote-entry/entry.routes.ts',
  },
};
```

### 4. Profile Remote (Remote 3)

**File: `profile/project.json`**

```json
"serve": {
  "executor": "@nx/angular:dev-server",
  "options": {
    "port": 4203,
    "publicHost": "http://localhost:4203"
  }
}
```

**File: `profile/module-federation.config.ts`**

```typescript
const config: ModuleFederationConfig = {
  name: 'profile',
  exposes: {
    './Routes': 'profile/src/app/remote-entry/entry.routes.ts',
  },
};
```

## How to Run

### Option 1: Run All Applications Together (Recommended)

This is the easiest way to start all applications in parallel:

```bash
npm run serve:all
```

This command runs:

- Host (mfeui) on port 4200
- Products on port 4201
- Cart on port 4202
- Profile on port 4203

All four applications will start simultaneously and are ready for development.

### Option 2: Run Applications Individually

If you need to run them separately:

```bash
# Terminal 1 - Start the host
npm run serve:host
# or
nx serve mfeui

# Terminal 2 - Start products remote
npm run serve:products
# or
nx serve products

# Terminal 3 - Start cart remote
npm run serve:cart
# or
nx serve cart

# Terminal 4 - Start profile remote
npm run serve:profile
# or
nx serve profile
```

### Option 3: Use Nx Commands Directly

```bash
# Start host
nx serve mfeui

# Start remotes
nx serve products
nx serve cart
nx serve profile

# Or run all in parallel
nx run-many --target=serve --projects=mfeui,products,cart,profile --parallel=4
```

## Available NPM Scripts

### Development Scripts

- `npm start` - Start the host application (port 4200)
- `npm run serve:host` - Start the host application
- `npm run serve:products` - Start products remote
- `npm run serve:cart` - Start cart remote
- `npm run serve:all` - **Start all applications in parallel**

### Build Scripts

- `npm run build` - Build the host application
- `npm run build:host` - Build the host
- `npm run build:products` - Build products remote
- `npm run build:cart` - Build cart remote
- `npm run build:all` - Build all applications in parallel
- `npm run build:all:prod` - Build all for production

### Test Scripts

- `npm run test:mfeui` - Test host application
- `npm run test:products` - Test products remote
- `npm run test:cart` - Test cart remote
- `npm run test:all` - Test all applications

### Lint Scripts

- `npm run lint:mfeui` - Lint host application
- `npm run lint:products` - Lint products remote
- `npm run lint:cart` - Lint cart remote
- `npm run lint` - Lint all applications
- `npm run lint:fix` - Lint and auto-fix all applications

## How Module Federation Works with Ports

### Development Mode

In development mode, Nx automatically resolves the remote URLs based on the port configuration in `project.json`:

1. **Host (mfeui)** runs on port 4200
2. When you navigate to routes like `/products`, `/cart`, or `/profile`, the host loads the remote modules from:

   - Products: `http://localhost:4201/remoteEntry.mjs`
   - Cart: `http://localhost:4202/remoteEntry.mjs`
   - Profile: `http://localhost:4203/remoteEntry.mjs`

3. Nx handles the URL resolution automatically with the `devRemotes` option, serving all remotes as live Angular dev servers

### Production Mode

For production deployments (like GitHub Pages), use the production config:

**File: `apps/mfeui/module-federation.config.prod.ts`**

```typescript
const mfConfig = {
  ...config,
  remotes: [
    ['products', 'https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs'],
    ['cart', 'https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs'],
  ],
};
```

## Testing the Setup

### 1. Start All Applications

```bash
npm run serve:all
```

Wait for all applications to compile and start. You should see output like:

```
✔ Browser application bundle generation complete.
✔ Built mfeui
✔ Built products
✔ Built cart

Available on:
  http://localhost:4200
  http://localhost:4201
  http://localhost:4202
  http://localhost:4203
```

### 2. Access the Host Application

Open your browser and navigate to:

```
http://localhost:4200
```

### 3. Test Layout Routes (With Header)

These routes should display the header with navigation:

- `http://localhost:4200/` - Dashboard (default)
- `http://localhost:4200/dashboard` - Dashboard page
- `http://localhost:4200/products` - Products MFE (loaded from port 4201)
- `http://localhost:4200/cart` - Cart MFE (loaded from port 4202)
- `http://localhost:4200/profile` - Profile MFE (loaded from port 4203)
- `http://localhost:4200/about` - About page
- `http://localhost:4200/contact` - Contact page

### 4. Test Full-Page Routes (Without Header)

These routes should display full-page without header:

- `http://localhost:4200/login` - Login page
- `http://localhost:4200/register` - Register page

### 5. Test Direct Access to Remotes (Optional)

You can also access remotes directly (useful for debugging):

- `http://localhost:4201` - Products standalone
- `http://localhost:4202` - Cart standalone
- `http://localhost:4203` - Profile standalone

## Troubleshooting

### Issue: "Failed to fetch dynamically imported module"

**Solution:** Make sure all applications are running:

```bash
npm run serve:all
```

### Issue: Port already in use

**Solution:** Kill the process using the port:

```bash
# On macOS/Linux
lsof -ti:4200 | xargs kill -9
lsof -ti:4201 | xargs kill -9
lsof -ti:4202 | xargs kill -9
lsof -ti:4203 | xargs kill -9

# On Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

### Issue: Remotes not loading

**Solution:**

1. Check that all applications are running
2. Check browser console for errors
3. Verify the module federation config uses correct remote names
4. Clear browser cache and restart dev servers

### Issue: Changes not reflecting

**Solution:**

1. Stop all applications (Ctrl+C)
2. Clear Nx cache: `npm run reset` or `nx reset`
3. Restart applications: `npm run serve:all`

## Network Configuration

### Accessing from Other Devices

To access the application from other devices on your network:

1. Find your local IP address:

   ```bash
   # macOS/Linux
   ifconfig | grep "inet "

   # Windows
   ipconfig
   ```

2. Update the host configuration in `apps/mfeui/project.json`:

   ```json
   "serve": {
     "options": {
       "host": "0.0.0.0",
       "port": 4200,
       "publicHost": "http://192.168.1.x:4200"  // Your IP
     }
   }
   ```

3. Access from other devices:
   ```
   http://192.168.1.x:4200
   ```

## Performance Tips

### 1. Use Parallel Serving

Always use `npm run serve:all` to start all applications in parallel rather than starting them one by one.

### 2. Nx Cache

Nx caches build artifacts. If you encounter issues, clear the cache:

```bash
npm run reset
```

### 3. Hot Module Replacement (HMR)

HMR is enabled by default in development mode. Changes will automatically reload without full page refresh.

### 4. Build Optimization

For faster builds during development, the following optimizations are disabled:

- buildOptimizer: false
- optimization: false
- sourceMap: true (for debugging)

## Summary

✅ **Host (mfeui)**: Port 4200 - Main application with routing and layout  
✅ **Products Remote**: Port 4201 - Products micro-frontend  
✅ **Cart Remote**: Port 4202 - Cart micro-frontend  
✅ **Profile Remote**: Port 4203 - Profile micro-frontend  
✅ **Quick Start**: `npm run serve:all`  
✅ **URL**: http://localhost:4200

The port configuration uses the `devRemotes` option to serve all remotes as live Angular dev servers with Hot Module Replacement (HMR), providing a seamless development experience for micro-frontend applications without any static file servers.
