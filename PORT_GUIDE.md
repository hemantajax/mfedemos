# Port Configuration Guide

## How to Run the Application

### ✅ Correct Way (Recommended)

Run the **host application** which automatically starts all remotes:

```bash
npm start
# or
nx serve mfeui
```

**Important**: After running this command, you'll see many dev servers starting. A **prominent colored banner** will automatically appear when ready:

```
╔═════════════════════════════════════════════════════════════════╗
║  ✅ ALL SERVICES READY!                                         ║
║  Open your browser: 👉  http://localhost:4200  👈              ║
╚═════════════════════════════════════════════════════════════════╝
```

👉 **This is the URL to use**: `http://localhost:4200`

> 💡 **Note**: You'll see messages about ports 4201-4206 - these are remote MFEs running in the background. **Ignore them** and always use port 4200.

This will:

- Start **mfeui (host)** on `http://localhost:4200`
- Automatically start all remotes:
  - products → `http://localhost:4201` (background)
  - cart → `http://localhost:4202` (background)
  - profile → `http://localhost:4203` (background)
  - orders → `http://localhost:4204` (background)
  - analytics → `http://localhost:4205` (background)
  - notifications → `http://localhost:4206` (background)

### 🌐 Access the Application

**Always use the host URL:**

- Main App: `http://localhost:4200`
- Dashboard: `http://localhost:4200/dashboard`
- Products: `http://localhost:4200/products`
- Cart: `http://localhost:4200/cart`
- Profile: `http://localhost:4200/profile`
- Orders: `http://localhost:4200/orders`
- Analytics: `http://localhost:4200/analytics`
- Notifications: `http://localhost:4200/notifications` ✨ NEW

## Port Assignment

| Application   | Port | Type   | Direct Access            |
| ------------- | ---- | ------ | ------------------------ |
| **mfeui**     | 4200 | Host   | ✅ Use this URL          |
| products      | 4201 | Remote | ❌ Don't access directly |
| cart          | 4202 | Remote | ❌ Don't access directly |
| profile       | 4203 | Remote | ❌ Don't access directly |
| orders        | 4204 | Remote | ❌ Don't access directly |
| analytics     | 4205 | Remote | ❌ Don't access directly |
| notifications | 4206 | Remote | ❌ Don't access directly |

## Important Notes

1. **Remote MFE ports (4201-4206)** are for Module Federation communication only
2. **Always access through host port 4200** - the host loads remotes automatically
3. Accessing remotes directly (e.g., `localhost:4205`) bypasses the layout and routing
4. The host provides the navigation, layout, and routing for all MFEs
5. **Terminal Messages**: You'll see messages like "open your browser on http://localhost:4206" - **IGNORE these!** The smart banner will show port 4200 clearly.

## Development Workflow

### Start Everything

```bash
nx serve mfeui
```

### Start with Specific Remotes Only

```bash
nx serve mfeui --devRemotes=products,analytics,notifications
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
