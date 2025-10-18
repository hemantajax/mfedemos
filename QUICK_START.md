# Quick Start Guide

## 🚀 Start Developing

### One Command to Rule Them All

```bash
npm run serve:all
```

This starts all applications in parallel:

- ✅ Host (mfeui) → http://localhost:4200
- ✅ Products Remote → http://localhost:4201
- ✅ Cart Remote → http://localhost:4202

Then open your browser to **http://localhost:4200**

## 📐 Application Architecture

```
┌─────────────────────────────────────────────────────┐
│                 Host Application                     │
│                 http://localhost:4200                │
│                                                      │
│  ┌───────────────────────────────────────────────┐  │
│  │              Header Component                  │  │
│  │  [Dashboard] [Products] [Cart] [About] [Contact] │
│  └───────────────────────────────────────────────┘  │
│                                                      │
│  ┌───────────────────────────────────────────────┐  │
│  │           Main Content Area                    │  │
│  │                                                │  │
│  │  Routes with Layout:                          │  │
│  │  • /dashboard  - Dashboard page               │  │
│  │  • /products   - Products MFE (port 4201)     │  │
│  │  • /cart       - Cart MFE (port 4202)         │  │
│  │  • /about      - About page                   │  │
│  │  • /contact    - Contact page                 │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│            Full-Page Routes (No Header)              │
│                                                      │
│  • /login      - Login page                         │
│  • /register   - Registration page                  │
└─────────────────────────────────────────────────────┘
```

## 🎯 Route Structure

### Routes WITH Layout (Header + Content)

```typescript
{
  path: '',
  component: MainLayoutComponent,
  children: [
    { path: 'dashboard', ... },      // Local route
    { path: 'products', ... },       // Remote MFE
    { path: 'cart', ... },           // Remote MFE
    { path: 'about', ... },          // Local route
    { path: 'contact', ... },        // Local route
  ]
}
```

### Routes WITHOUT Layout (Full Page)

```typescript
{ path: 'login', ... },              // Full-page auth
{ path: 'register', ... },           // Full-page auth
```

## 📂 Key Files

### Routing Configuration

- `apps/mfeui/src/app/app.routes.ts` - Main routing configuration

### Layout Components

- `apps/mfeui/src/app/layouts/main-layout/` - Layout with header
- `libs/shared/layout/src/lib/header/` - Shared header component

### Auth Pages (Full-Page)

- `apps/mfeui/src/app/pages/auth/login/` - Login component
- `apps/mfeui/src/app/pages/auth/register/` - Register component

### Module Federation

- `apps/mfeui/module-federation.config.ts` - Host MF config (dev)
- `apps/mfeui/module-federation.config.prod.ts` - Host MF config (prod)
- `apps/products/module-federation.config.ts` - Products remote config
- `apps/cart/module-federation.config.ts` - Cart remote config

### Port Configuration

- `apps/mfeui/project.json` - Host port (4200)
- `apps/products/project.json` - Products port (4201)
- `apps/cart/project.json` - Cart port (4202)

## 🎨 Styling

- **Framework**: Bootstrap 5
- **Icons**: Bootstrap Icons 1.11.3
- **Approach**: Utility-first with Bootstrap classes
- **Shared Styles**: `libs/shared/styles/`

## 🧪 Testing Routes

### With Header

- http://localhost:4200/dashboard
- http://localhost:4200/products (MFE)
- http://localhost:4200/cart (MFE)
- http://localhost:4200/about
- http://localhost:4200/contact

### Without Header (Full-Page)

- http://localhost:4200/login
- http://localhost:4200/register

## 📦 Common Commands

```bash
# Development
npm start                  # Start host only
npm run serve:all         # Start all (host + remotes)

# Build
npm run build:all         # Build all applications
npm run build:all:prod    # Build all for production

# Testing
npm run test:all          # Test all applications

# Linting
npm run lint              # Lint all
npm run lint:fix          # Lint and auto-fix

# Utilities
npm run graph             # View dependency graph
npm run reset             # Clear Nx cache
```

## 🔧 Adding New Routes

### Add Route WITH Layout (shows header)

In `apps/mfeui/src/app/app.routes.ts`:

```typescript
{
  path: '',
  component: MainLayoutComponent,
  children: [
    // ... existing routes
    {
      path: 'new-page',
      loadComponent: () =>
        import('./pages/new-page/new-page.component')
          .then(m => m.NewPageComponent)
    }
  ]
}
```

Then add to header navigation in `libs/shared/layout/src/lib/header/header.component.html`.

### Add Route WITHOUT Layout (full-page)

In `apps/mfeui/src/app/app.routes.ts`:

```typescript
// At the top level (before MainLayoutComponent)
{
  path: 'full-page',
  loadComponent: () =>
    import('./pages/full-page/full-page.component')
      .then(m => m.FullPageComponent)
}
```

## 🎓 Documentation

- `LAYOUT_ROUTING_CONFIGURATION.md` - Detailed layout & routing guide
- `PORT_CONFIGURATION.md` - Complete port configuration guide
- `NPM_SCRIPTS_REFERENCE.md` - All available npm scripts
- `IMPLEMENTATION_SUMMARY.md` - Project implementation overview

## 💡 Tips

1. **Always use `npm run serve:all`** for development
2. **Check all apps are running** if remotes don't load
3. **Clear Nx cache** (`npm run reset`) if you encounter issues
4. **Use Chrome DevTools** to debug Module Federation loading

## 🎉 You're Ready!

Start developing with:

```bash
npm run serve:all
```

Then navigate to **http://localhost:4200** and start building!
