# Shared Counter Service Demo

This document demonstrates how shared services work across micro frontends (MFEs) in this application.

## 🎯 Overview

A shared counter service has been implemented to showcase real-time state synchronization across multiple MFEs. The counter can be modified from any MFE and the changes are immediately reflected in all other MFEs.

## 📍 Implementation Locations

### 1. **Counter Service**

`/libs/shared/services/src/lib/counter.service.ts`

The core service that manages the counter state using RxJS BehaviorSubject.

**Key Features:**

- ✅ Reactive state management
- ✅ Observable stream for subscriptions
- ✅ Methods: increment, decrement, reset, setValue
- ✅ Singleton pattern (shared across all MFEs)

### 2. **Header Component** (Shell App)

`/libs/shared/layout/src/lib/header/header.component.ts`

Displays the counter value in the navigation header, visible on all pages.

**Visual:**

```
┌──────────────────────────────────────────────────┐
│ Dashboard App              [Badge: 0]   ☰       │
└──────────────────────────────────────────────────┘
```

### 3. **Products MFE**

`/apps/products/src/app/remote-entry/entry.ts`

Includes counter controls with single increment/decrement buttons.

**Controls:**

- [-] button: Decrement by 1
- [+] button: Increment by 1
- [↻] button: Reset to 0
- Display: Shows current counter value

### 4. **Cart MFE**

`/apps/cart/src/app/remote-entry/entry.ts`

Includes enhanced counter controls with bulk operations.

**Controls:**

- [-5] button: Decrement by 5
- [-] button: Decrement by 1
- [+] button: Increment by 1
- [+5] button: Increment by 5
- [↻] button: Reset to 0
- Display: Shows current counter value

## 🚀 How to Test

### Step 1: Start the Application

```bash
# Start all MFEs
npm run start:all

# Or start individually
npm run start:mfeui
npm run start:products
npm run start:cart
```

### Step 2: Access the Applications

- **Host (Shell)**: http://localhost:4200
- **Products**: http://localhost:4201
- **Cart**: http://localhost:4202

### Step 3: Test the Shared Counter

1. **Navigate to Products** (`/products` route)
2. Look at the header - you'll see the counter badge showing `0`
3. Click the `[+]` button in the Products page
4. **Observe**: The counter in the header updates immediately
5. **Navigate to Cart** (`/cart` route)
6. **Observe**: The counter displays the same value
7. Click `[+5]` in the Cart page
8. **Observe**: Counter increments by 5 in both header and cart
9. **Navigate back to Products**
10. **Observe**: Counter shows the updated value

## 🎨 UI Design

### Products MFE - Counter Card

```
┌────────────────────────────────────────────────────┐
│ 🔗 Shared Counter Service Demo                     │
│                                                     │
│ This counter is shared across all MFEs.            │
│ Changes here will be reflected in the header       │
│ and Cart MFE in real-time!                         │
│                                                     │
│                [-]  [ 5 ]  [+]  [↻]                │
└────────────────────────────────────────────────────┘
```

### Cart MFE - Counter Card

```
┌────────────────────────────────────────────────────┐
│ ☁️ Shared Counter Service Demo                     │
│                                                     │
│ This is the same counter from Products MFE.        │
│ Update it here and see the changes reflected       │
│ everywhere!                                         │
│                                                     │
│         [-5] [-]  [ 5 ]  [+] [+5]  [↻]            │
└────────────────────────────────────────────────────┘
```

### Header - Counter Badge

```
┌──────────────────────────────────────────┐
│ Dashboard App        [🔢 5]         ☰   │
└──────────────────────────────────────────┘
```

## 🔧 Technical Architecture

### State Flow Diagram

```
┌─────────────────────────────────────────────────┐
│           CounterService (Singleton)            │
│                                                 │
│  private counterSubject = BehaviorSubject(0)   │
│  public counter$ = counterSubject.asObservable()│
└─────────────────────┬───────────────────────────┘
                      │ (shared instance)
          ┌───────────┴───────────┬───────────┐
          │                       │           │
    ┌─────▼─────┐          ┌─────▼─────┐  ┌──▼───┐
    │  Header   │          │ Products  │  │ Cart │
    │Component  │          │    MFE    │  │ MFE  │
    │           │          │           │  │      │
    │(observes) │          │(modifies) │  │(both)│
    └───────────┘          └───────────┘  └──────┘
```

### Service API

```typescript
class CounterService {
  // Observable stream
  counter$: Observable<number>

  // Current value (sync)
  get currentValue: number

  // Methods
  increment(amount?: number): void
  decrement(amount?: number): void
  reset(): void
  setValue(value: number): void
}
```

## 💡 Key Learning Points

### 1. Singleton Services in MFE

- Services with `providedIn: 'root'` create a **single instance** across all MFEs
- The host app's Angular injector is shared with all remote MFEs
- This enables seamless state sharing without additional infrastructure

### 2. Reactive State Management

- Uses RxJS `BehaviorSubject` for state
- Components subscribe using `async` pipe in templates
- Automatic change detection and UI updates

### 3. Module Federation Benefits

- Shared dependencies (Angular, RxJS, Services)
- Single bundle for shared code
- Real-time synchronization across MFEs

### 4. Real-World Applications

This pattern can be used for:

- 🛒 Shopping cart state
- 👤 User authentication/profile
- 🎨 Theme/preferences
- 🔔 Notifications
- 🚩 Feature flags
- 📊 Analytics/metrics

## 📝 Code Examples

### Using in a Component

```typescript
import { Component, inject } from '@angular/core';
import { CounterService } from '@nxmfe/shared/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-example',
  template: `
    <div>
      <h3>Counter: {{ counter$ | async }}</h3>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
})
export class ExampleComponent {
  private counterService = inject(CounterService);
  counter$: Observable<number> = this.counterService.counter$;

  increment(): void {
    this.counterService.increment();
  }

  decrement(): void {
    this.counterService.decrement();
  }

  reset(): void {
    this.counterService.reset();
  }
}
```

## 🔍 Troubleshooting

### Counter not updating?

1. Check that all MFEs are using the same version of `@nxmfe/shared/services`
2. Verify the service is imported correctly
3. Make sure you're using the `async` pipe in templates

### Different values in different MFEs?

1. Ensure all MFEs are loaded via Module Federation (not standalone)
2. Check that the service has `providedIn: 'root'`
3. Verify there are no multiple service instances

## 📚 Related Documentation

- [Shared Services README](/libs/shared/services/README.md)
- [Module Federation Guide](/docs/mfe.md)
- [Shared Libraries Architecture](/LIBRARIES_ARCHITECTURE.md)

## 🎓 Next Steps

Try implementing:

1. **Shopping Cart Service**: Track items across Products and Cart MFEs
2. **Theme Service**: Share dark/light mode preference
3. **User Service**: Share authentication state
4. **Notification Service**: Global notification system (already exists!)
