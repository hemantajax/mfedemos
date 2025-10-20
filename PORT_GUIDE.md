# Port Configuration Guide

## How to Run the Application

### ✅ Correct Way (Recommended)
Run the **host application** which automatically starts all remotes:

```bash
nx serve mfeui
```

This will:
- Start **mfeui (host)** on `http://localhost:4200`
- Automatically start all remotes:
  - products → `http://localhost:4201` (background)
  - cart → `http://localhost:4202` (background)
  - profile → `http://localhost:4203` (background)
  - orders → `http://localhost:4204` (background)
  - analytics → `http://localhost:4205` (background)

### 🌐 Access the Application
**Always use the host URL:**
- Main App: `http://localhost:4200`
- Dashboard: `http://localhost:4200/dashboard`
- Products: `http://localhost:4200/products`
- Cart: `http://localhost:4200/cart`
- Profile: `http://localhost:4200/profile`
- Orders: `http://localhost:4200/orders`
- Analytics: `http://localhost:4200/analytics` ✨ NEW

## Port Assignment

| Application | Port | Type | Direct Access |
|------------|------|------|---------------|
| **mfeui** | 4200 | Host | ✅ Use this URL |
| products | 4201 | Remote | ❌ Don't access directly |
| cart | 4202 | Remote | ❌ Don't access directly |
| profile | 4203 | Remote | ❌ Don't access directly |
| orders | 4204 | Remote | ❌ Don't access directly |
| analytics | 4205 | Remote | ❌ Don't access directly |

## Important Notes

1. **Remote MFE ports (4201-4205)** are for Module Federation communication only
2. **Always access through host port 4200** - the host loads remotes automatically
3. Accessing remotes directly (e.g., `localhost:4205`) bypasses the layout and routing
4. The host provides the navigation, layout, and routing for all MFEs

## Development Workflow

### Start Everything
```bash
nx serve mfeui
```

### Start with Specific Remotes Only
```bash
nx serve mfeui --devRemotes=products,analytics
```

### Build for Production
```bash
nx build mfeui --configuration=production
```

## When Adding New Remote MFEs

After creating a new remote, update these files:
1. `apps/mfeui/project.json` → Add to `devRemotes` array
2. `apps/mfeui/module-federation.config.ts` → Add to `remotes` array
3. `apps/mfeui/module-federation.config.prod.ts` → Add to `remotes` with URL
4. `apps/mfeui/src/app/app.routes.ts` → Add route path

**The host port should ALWAYS remain 4200!** 🎯
