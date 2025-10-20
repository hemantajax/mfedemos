# Building Scalable Applications with Micro-Frontends: A Practical Guide

## Introduction

In today's fast-paced development landscape, building scalable and maintainable applications is crucial. **Micro-frontends** extend the microservices concept to frontend development, allowing teams to work independently while delivering a unified user experience.

In this article, I'll share a practical approach to building micro-frontend applications using **Angular 20**, **Module Federation**, and **Nx Workspace**.

## 🎯 What You'll Learn

- Creating a Host (Shell) application
- Building Remote micro-frontend applications
- Local development setup
- Production deployment strategy
- Sharing services across micro-frontends

---

## 🏗️ Architecture Overview

A micro-frontend architecture consists of:

1. **Host Application** (Shell): The main application that orchestrates everything
2. **Remote Applications**: Independent micro-frontends loaded dynamically
3. **Shared Libraries**: Common code, utilities, and services

![Micro-Frontend Architecture](https://raw.githubusercontent.com/hemantajax/mfedemos/main/docs/images/mfe.png)

_The diagram above shows how the Host (Shell) application dynamically loads multiple remote micro-frontends, all sharing common services and state management._

---

## 📦 Step 1: Creating the Host Application

The host application is your main shell that loads remote micro-frontends dynamically.

### Module Federation Config (Host)

```typescript
// module-federation.config.ts
module.exports = {
  name: 'mfeui',
  remotes: {
    products: 'http://localhost:4201',
    cart: 'http://localhost:4202',
    profile: 'http://localhost:4203',
    orders: 'http://localhost:4204',
  },
};
```

### Routing Configuration

```typescript
// app.routes.ts
export const appRoutes: Route[] = [
  {
    path: 'products',
    loadChildren: () => import('products/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'cart',
    loadChildren: () => import('cart/Routes').then((m) => m.remoteRoutes),
  },
  // ... more routes
];
```

---

## 🔧 Step 2: Creating Remote Applications

Each remote is an independent Angular application that can be developed, tested, and deployed separately.

### Module Federation Config (Remote)

```typescript
// module-federation.config.ts (products remote)
module.exports = {
  name: 'products',
  exposes: {
    './Routes': 'apps/products/src/app/remote-entry/entry.routes.ts',
  },
};
```

### Remote Entry Component

```typescript
// remote-entry.component.ts
@Component({
  selector: 'app-products-entry',
  template: `
    <div class="container mt-4">
      <h2>Products Micro-Frontend</h2>
      <router-outlet></router-outlet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {}
```

---

## 💻 Local Development

Running your micro-frontends locally is straightforward:

### Start Individual Applications

```bash
# Terminal 1 - Host
nx serve mfeui --port 4200

# Terminal 2 - Products Remote
nx serve products --port 4201

# Terminal 3 - Cart Remote
nx serve cart --port 4202
```

### Start All at Once

```bash
# Use the development script
npm start

# This runs all applications concurrently:
# - Host (mfeui): http://localhost:4200
# - Products: http://localhost:4201
# - Cart: http://localhost:4202
# - Profile: http://localhost:4203
# - Orders: http://localhost:4204
# - Analytics: http://localhost:4205
# - Notifications: http://localhost:4206
# - Messages: http://localhost:4207
# - Admin: http://localhost:4208
```

The host will automatically load remotes from their respective ports during development.

---

## 🚀 Production Deployment

For production, the configuration changes to use absolute URLs:

### Production Module Federation Config

```typescript
// module-federation.config.prod.ts
module.exports = {
  name: 'mfeui',
  remotes: {
    products: 'https://hemantajax.github.io/mfedemos/products/',
    cart: 'https://hemantajax.github.io/mfedemos/cart/',
    profile: 'https://hemantajax.github.io/mfedemos/profile/',
    orders: 'https://hemantajax.github.io/mfedemos/orders/',
    analytics: 'https://hemantajax.github.io/mfedemos/analytics/',
    notifications: 'https://hemantajax.github.io/mfedemos/notifications/',
    messages: 'https://hemantajax.github.io/mfedemos/messages/',
    admin: 'https://hemantajax.github.io/mfedemos/admin/',
  },
};
```

### Build for Production

```bash
# Build host
nx build mfeui --configuration=production

# Build remotes
nx build products --configuration=production
nx build cart --configuration=production
# ... etc
```

### Deployment Structure

```
https://hemantajax.github.io/mfedemos/
├── index.html (Host)
├── products/
│   └── remoteEntry.js
├── cart/
│   └── remoteEntry.js
├── profile/
│   └── remoteEntry.js
└── ...
```

---

## 🔄 Sharing Services Across Micro-Frontends

One of the most powerful features is sharing state and services across micro-frontends. This is where the magic happens!

### Shared Service Architecture

```typescript
// libs/shared/services/src/lib/state.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StateService {
  // Shared state using Angular signals
  private cartItemsSignal = signal<number>(0);

  cartItems = this.cartItemsSignal.asReadonly();

  addToCart(): void {
    this.cartItemsSignal.update((count) => count + 1);
  }

  removeFromCart(): void {
    this.cartItemsSignal.update((count) => Math.max(0, count - 1));
  }
}
```

### Using Shared Services

**In Products Remote:**

```typescript
export class ProductListComponent {
  private stateService = inject(StateService);

  addToCart(product: Product): void {
    // Add product logic...
    this.stateService.addToCart();
  }
}
```

**In Cart Remote:**

```typescript
export class CartComponent {
  private stateService = inject(StateService);

  cartItems = this.stateService.cartItems;

  removeItem(item: CartItem): void {
    // Remove item logic...
    this.stateService.removeFromCart();
  }
}
```

**In Host Navigation:**

```typescript
export class NavbarComponent {
  private stateService = inject(StateService);

  cartCount = this.stateService.cartItems;
}
```

### Real-World Example

For a complete guide on implementing shared services with state management, event communication, and best practices, check out:

📚 **[Shared Services Guide](https://github.com/hemantajax/mfedemos/blob/main/docs/SHARED_SERVICES_GUIDE.md)**

This guide covers:

- ✅ State management across micro-frontends
- ✅ Event-driven communication
- ✅ Service singleton patterns
- ✅ Best practices and gotchas

---

## 📊 Benefits We've Achieved

### 1. **Independent Development**

- Teams work on separate micro-frontends without conflicts
- Each team owns their deployment pipeline

### 2. **Scalability**

- Add new features as new micro-frontends
- Scale teams independently

### 3. **Technology Flexibility**

- Different versions of Angular (if needed)
- Different UI libraries per micro-frontend
- Gradual migration capabilities

### 4. **Performance**

- Lazy loading of micro-frontends
- Load only what users need
- Reduced initial bundle size

### 5. **Maintainability**

- Smaller codebases per micro-frontend
- Easier to understand and modify
- Better test coverage

---

## 🎓 Key Takeaways

1. **Start Simple**: Begin with a host and 2-3 remotes
2. **Shared Libraries**: Create shared code for common functionality
3. **Service Communication**: Use singleton services for cross-micro-frontend communication
4. **Environment Configs**: Separate configs for local and production
5. **Documentation**: Keep your architecture documented (crucial for team onboarding)

---

## 🔗 Live Demo & Source Code

Want to see it in action?

🌐 **Live Demo**: [https://hemantajax.github.io/mfedemos/](https://hemantajax.github.io/mfedemos/)

💻 **Source Code**: [https://github.com/hemantajax/mfedemos](https://github.com/hemantajax/mfedemos)

### Explore the Documentation:

- 📖 [Complete Documentation Index](https://github.com/hemantajax/mfedemos/blob/main/docs/DOCUMENTATION_INDEX.md)
- 🔧 [Shared Services Guide](https://github.com/hemantajax/mfedemos/blob/main/docs/SHARED_SERVICES_GUIDE.md)
- 🏗️ [Libraries Architecture](https://github.com/hemantajax/mfedemos/blob/main/docs/LIBRARIES_ARCHITECTURE.md)
- 🚀 [Port Guide](https://github.com/hemantajax/mfedemos/blob/main/docs/PORT_GUIDE.md)

---

## 💬 Final Thoughts

Micro-frontends are not just about splitting code – they're about enabling team autonomy, improving scalability, and creating a more maintainable architecture.

The learning curve is worth it, especially for large-scale applications with multiple teams.

---

**What's your experience with micro-frontends? Have you implemented them in your projects? Let's discuss in the comments!** 👇

---

### Tags

`#MicroFrontends` `#Angular` `#WebDevelopment` `#ModuleFederation` `#SoftwareArchitecture` `#Frontend` `#TypeScript` `#NxWorkspace` `#DevOps` `#SoftwareEngineering`

---

_Built with ❤️ using Angular 20, Nx Workspace, Cursor AI editor and Module Federation_
