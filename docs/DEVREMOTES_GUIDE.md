# Dev Remotes Configuration Guide

## The Problem: http-server vs Angular Dev Server

When you run `nx serve mfeui`, you might see an **http-server** starting instead of Angular dev servers for all remotes. This happens when remote MFEs are not in the **`devRemotes`** array.

### Why This Matters:
- **Angular Dev Server** (devRemotes): Hot reload, fast rebuilds, live development
- **http-server** (Static remotes): Build once, no hot reload, slower development

## The Solution: Always Add to `devRemotes`

When you create a new remote MFE, **you MUST manually update** the host's `project.json`:

### Step-by-Step Fix:

1. **Open**: `apps/mfeui/project.json`
2. **Find**: The `serve` target options (around line 71-75)
3. **Add**: Your new remote to the `devRemotes` array

```json
{
  "serve": {
    "options": {
      "port": 4200,
      "publicHost": "http://localhost:4200",
      "devRemotes": [
        "products",
        "cart", 
        "profile",
        "orders",
        "analytics",
        "notifications"  // ⬅️ ADD YOUR NEW REMOTE HERE
      ]
    }
  }
}
```

## Complete Checklist When Adding a Remote MFE

After running `npx nx g @nx/angular:remote <name> --host=mfeui --port=XXXX --style=scss`:

### ✅ 1. Update `apps/mfeui/project.json`
Add to `devRemotes` array:
```json
"devRemotes": ["products", "cart", "profile", "orders", "analytics", "notifications"]
```

### ✅ 2. Update `apps/mfeui/module-federation.config.ts`
Add to `remotes` array and update comment:
```typescript
/**
 * - notifications: http://localhost:4206  // Add this comment
 */
remotes: ['products', 'cart', 'profile', 'orders', 'analytics', 'notifications'],
```

### ✅ 3. Update `apps/mfeui/module-federation.config.prod.ts`
Add production URL:
```typescript
remotes: [
  // ... other remotes
  [
    'notifications',
    'https://hemantajax.github.io/mfedemos/notifications/remoteEntry.mjs',
  ],
],
```

### ✅ 4. Update `apps/mfeui/src/app/app.routes.ts`
Add route **inside** `MainLayoutComponent` children (not at the top!):
```typescript
{
  path: '',
  component: MainLayoutComponent,
  children: [
    // ... other routes
    {
      path: 'notifications',
      loadChildren: () =>
        import('notifications/Routes').then((m) => m.remoteRoutes),
    },
  ],
},
```

### ✅ 5. Create Proper Component
Replace the default `nx-welcome.ts` with a proper Bootstrap 5 component in:
```
apps/<remote>/src/app/remote-entry/entry.ts
```

### ✅ 6. Delete Unused Files
Remove `nx-welcome.ts` to avoid TypeScript warnings:
```bash
rm apps/<remote>/src/app/remote-entry/nx-welcome.ts
```

## How to Verify It's Working

After making changes, run:
```bash
nx serve mfeui
```

### ✅ Success Indicators:
- All remotes show: `** Angular Live Development Server is listening on localhost:XXXX **`
- NO `http-server` messages in the output
- Host shows: `NX  All remotes started, server ready at http://localhost:4200`
- Access via: `http://localhost:4200/<remote-name>`

### ❌ Problem Indicators:
- You see: `Starting up http-server, serving dist/apps`
- You see: `Available on: http://localhost:4207` (or any http-server message)
- Remote is being served as static build

## Why Nx Doesn't Do This Automatically

The Nx generator **should** add remotes to `devRemotes`, but it doesn't always work correctly. This is a known issue with the generator when using the `--host` flag.

**Solution**: Always manually verify and update after generation!

## Quick Reference

| File to Update | What to Add | Why |
|---------------|-------------|-----|
| `apps/mfeui/project.json` | Add to `devRemotes` array | Enables Angular dev server |
| `apps/mfeui/module-federation.config.ts` | Add to `remotes` array | Module Federation config |
| `apps/mfeui/module-federation.config.prod.ts` | Add production URL | Production deployment |
| `apps/mfeui/src/app/app.routes.ts` | Add route path | Routing configuration |

## Remember

🎯 **The host port (4200) should NEVER change!**  
🎯 **Always add new remotes to `devRemotes` for hot reload!**  
🎯 **Update ALL 4 files after creating a remote!**  
🎯 **Test by accessing through `http://localhost:4200/<remote-name>`**

---

**Last Updated**: October 20, 2025  
**Current Remotes**: products, cart, profile, orders, analytics, notifications
