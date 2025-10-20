# Shared Services Library

This library contains reusable services that can be shared across all micro frontends (MFEs) in the workspace.

## Available Services

### 1. CounterService

A simple shared counter service that demonstrates state sharing across multiple MFEs.

#### Features

- Reactive state management using RxJS BehaviorSubject
- Observable stream for subscribing to counter changes
- Increment, decrement, reset, and set value operations
- Singleton service (providedIn: 'root') - shared instance across all MFEs

#### Usage

**Import the service:**

```typescript
import { CounterService } from '@nxmfe/shared/services';
```

**Inject in your component:**

```typescript
import { Component, inject } from '@angular/core';
import { CounterService } from '@nxmfe/shared/services';
import { Observable } from 'rxjs';

export class MyComponent {
  private counterService = inject(CounterService);
  counter$: Observable<number> = this.counterService.counter$;
}
```

**Display in template:**

```html
<div>Counter: {{ counter$ | async }}</div>
```

**Available methods:**

```typescript
// Increment by 1 (default)
counterService.increment();

// Increment by specific amount
counterService.increment(5);

// Decrement by 1 (default)
counterService.decrement();

// Decrement by specific amount
counterService.decrement(3);

// Reset to 0
counterService.reset();

// Set to specific value
counterService.setValue(10);

// Get current value (synchronous)
const current = counterService.currentValue;
```

#### Example Implementation

See the implementation in:

- **Products MFE**: `/apps/products/src/app/remote-entry/entry.ts`
- **Cart MFE**: `/apps/cart/src/app/remote-entry/entry.ts`
- **Header Component**: `/libs/shared/layout/src/lib/header/header.component.ts`

The counter is shared across all these components. When you update it in one MFE, the changes are immediately reflected in all other MFEs that subscribe to it.

---

### 2. NotificationService

Service for managing application-wide notifications.

#### Features

- Show success, error, warning, and info notifications
- Auto-dismiss with configurable duration
- Observable stream for notification handling

#### Usage

```typescript
import { NotificationService } from '@nxmfe/shared/services';

// Inject the service
private notificationService = inject(NotificationService);

// Show notifications
this.notificationService.success('Operation completed!');
this.notificationService.error('Something went wrong!');
this.notificationService.warning('Please be careful!');
this.notificationService.info('FYI: Here is some info');
```

---

### 3. StorageService

Service for managing browser storage (localStorage and sessionStorage).

#### Features

- Type-safe storage operations
- JSON serialization/deserialization
- Support for both localStorage and sessionStorage

---

## How Shared Services Work in MFE Architecture

### Key Concepts

1. **Singleton Pattern**: Services marked with `providedIn: 'root'` create a single instance across the entire application, including all MFEs.

2. **Module Federation**: When MFEs are loaded via Module Federation, they share the same Angular injector hierarchy from the host application.

3. **State Sharing**: Because there's only one instance of the service, state changes in one MFE are immediately reflected in all other MFEs.

### Benefits

- **Centralized State Management**: No need for complex state management libraries for simple shared state
- **Real-time Synchronization**: Changes propagate instantly across all MFEs
- **Type Safety**: Full TypeScript support with type checking
- **Maintainability**: Single source of truth for shared functionality

### Use Cases

- Shopping cart state across product browsing and checkout MFEs
- User authentication state across all MFEs
- Theme/preference settings
- Notifications and alerts
- Global counters or metrics
- Feature flags

### Best Practices

1. **Use for Simple State**: For complex state management, consider NgRx or Akita
2. **Document Usage**: Always document how services are used across MFEs
3. **Version Compatibility**: Ensure all MFEs use compatible versions of shared libraries
4. **Testing**: Test services in isolation and integration scenarios
5. **Error Handling**: Implement proper error handling in shared services

## Development

### Adding a New Service

1. Create the service file in `libs/shared/services/src/lib/`
2. Export it from `libs/shared/services/src/index.ts`
3. Document it in this README
4. Add unit tests
5. Use it in your MFEs by importing from `@nxmfe/shared/services`

### Testing

```bash
# Run tests for shared services
nx test shared-services
```

### Building

```bash
# Build the shared services library
nx build shared-services
```

## Related Documentation

- [Shared Libraries Architecture](/LIBRARIES_ARCHITECTURE.md)
- [Module Federation Guide](/docs/mfe.md)
- [Nx Workspace Documentation](/README.md)
