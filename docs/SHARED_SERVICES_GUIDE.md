# Shared Services Guide

## Overview

Shared services enable **real-time state synchronization** across all MFEs. Changes in one MFE are instantly reflected in all others.

**Location:** `libs/shared/services/`

## How It Works

```
┌─────────────────────────────────────┐
│  Shared Service (Singleton)         │
│  providedIn: 'root'                 │
└───────┬─────────────────────────────┘
        │ Single instance shared across all MFEs
        │
    ┌───┴────┬──────────┬──────────┐
    │        │          │          │
  Shell   Products    Cart     Orders
   MFE      MFE       MFE       MFE
```

All MFEs share the **same instance** of the service thanks to Module Federation.

## Counter Service Example

### Basic Implementation

```typescript
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root', // Creates singleton instance
})
export class CounterService {
  private counterSignal = signal<number>(0);
  readonly counter = this.counterSignal.asReadonly();

  get currentValue(): number {
    return this.counterSignal();
  }

  increment(amount = 1): void {
    this.counterSignal.update((value) => value + amount);
  }

  decrement(amount = 1): void {
    this.counterSignal.update((value) => value - amount);
  }

  reset(): void {
    this.counterSignal.set(0);
  }
}
```

### Using in Components

```typescript
import { Component, inject, computed } from '@angular/core';
import { CounterService } from '@nxmfe/shared/services';

@Component({
  selector: 'app-example',
  template: `
    <div>
      <h3>Counter: {{ counter() }}</h3>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  private counterService = inject(CounterService);

  // Access the signal directly
  counter = this.counterService.counter;

  // Or create a computed signal
  doubleCounter = computed(() => this.counter() * 2);

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

## Test It Live

1. **Start the app:** `npm run start:all`
2. **Navigate to Products** (http://localhost:4200/products)
3. **Click the counter buttons** - watch the header badge update
4. **Navigate to Cart** - counter shows the same value
5. **Update from Cart** - all locations update instantly

## Available Shared Services

### 1. CounterService

**Purpose:** Demo state sharing across MFEs

```typescript
counterService.increment(5); // Increment by 5
counterService.decrement(); // Decrement by 1
counterService.reset(); // Reset to 0
```

### 2. NotificationService

**Purpose:** Global notifications across all MFEs

```typescript
notificationService.success('Order placed!');
notificationService.error('Failed to load data');
notificationService.warning('Session expiring soon');
notificationService.info('New feature available');
```

### 3. StorageService

**Purpose:** Consistent localStorage access

```typescript
storageService.setItem('user', { id: 1, name: 'John' });
const user = storageService.getItem<User>('user');
storageService.removeItem('user');
```

## Best Practices

### ✅ DO

- Use `providedIn: 'root'` for singleton services
- Use Angular signals for reactive state
- Use `inject()` function instead of constructor injection
- Keep services focused on a single responsibility
- Export services from `libs/shared/services/src/index.ts`

### ❌ DON'T

- Don't create multiple instances of shared services
- Don't use `mutate()` on signals - use `update()` or `set()`
- Don't put business logic in shared services
- Don't forget to make signals readonly for external use

## Creating a New Shared Service

1. **Create the service:**

```bash
nx g s my-service --project=shared-services
```

2. **Implement with signals:**

```typescript
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  private stateSignal = signal<MyState>({});
  readonly state = this.stateSignal.asReadonly();

  updateState(newState: MyState): void {
    this.stateSignal.set(newState);
  }
}
```

3. **Export from index.ts:**

```typescript
// libs/shared/services/src/index.ts
export * from './lib/my-service';
```

4. **Use in any MFE:**

```typescript
import { MyService } from '@nxmfe/shared/services';
```

## Real-World Use Cases

- **Authentication:** Share user login state across all MFEs
- **Shopping Cart:** Add items from Products, view in Cart MFE
- **Theme:** Toggle dark/light mode globally
- **User Preferences:** Language, timezone, display settings
- **Notifications:** Alert users from any MFE
- **Feature Flags:** Enable/disable features across app

## Troubleshooting

**Q: Counter shows different values in different MFEs?**

- Ensure all MFEs use Module Federation (check `webpack.config.ts`)
- Verify shared library is in `webpack.config.ts` shared dependencies

**Q: Signal updates not reflecting in UI?**

- Use `ChangeDetectionStrategy.OnPush` in component
- Make sure you're calling the signal as a function: `counter()` not `counter`
- Use `computed()` for derived values

**Q: Service seems to have multiple instances?**

- Check that service has `providedIn: 'root'`
- Verify it's exported from shared library correctly
- Ensure all apps use the same Angular version

## Related Documentation

- [Counter Service Demo](/docs/SHARED_COUNTER_DEMO.md) - Detailed walkthrough
- [Module Federation Guide](/docs/mfe.md) - MFE architecture
- [Shared Libraries](/LIBRARIES_ARCHITECTURE.md) - Library structure
