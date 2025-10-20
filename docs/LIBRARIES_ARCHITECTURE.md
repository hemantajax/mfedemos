# Shared Libraries Architecture

## 📚 Overview

This document describes the shared library architecture implemented in the Nx monorepo. The libraries are organized by functionality to promote code reuse and maintainability.

## 🗂️ Library Structure

```
libs/shared/
├── layout/            # Layout components (eager-loaded)
├── ui-components/     # Reusable UI components (lazy-loaded)
├── services/          # Shared services
├── core/              # Core functionality (guards, interceptors, models)
├── pipes/             # Custom pipes
├── directives/        # Custom directives
├── constants/         # Application constants
├── utils/             # Utility functions
└── styles/            # Shared styles (already existing)
```

---

## 🎨 1. Layout Library

**Path:** `libs/shared/layout`  
**Import:** `@nxmfe/shared/layout`

### Purpose

Contains layout components that are eagerly loaded and shared across the application.

### Components

#### HeaderComponent

- **Purpose:** Application header with sticky navigation
- **Usage:**

```typescript
import { HeaderComponent } from '@nxmfe/shared/layout';

@Component({
  imports: [HeaderComponent],
  // ...
})
```

---

## 🎨 2. UI Components Library

**Path:** `libs/shared/ui-components`  
**Import:** `@nxmfe/shared/ui-components`

### Purpose

Contains reusable Angular components that are lazy-loaded via routing.

### Components

#### NotFoundComponent

- **Purpose:** 404 error page
- **Usage:** Via lazy loading in routes

```typescript
{
  path: '**',
  loadComponent: () => import('@nxmfe/shared/ui-components').then(m => m.NotFoundComponent)
}
```

---

## 🔧 3. Services Library

**Path:** `libs/shared/services`  
**Import:** `@nxmfe/shared/services`

### Purpose

Contains shared Angular services for common functionality.

### Services

#### StorageService

Manages local storage operations with type safety.

**Usage:**

```typescript
import { StorageService } from '@nxmfe/shared/services';

constructor(private storage: StorageService) {}

// Set item
this.storage.setItem('user', { name: 'John' });

// Get item
const user = this.storage.getItem<User>('user');

// Remove item
this.storage.removeItem('user');

// Clear all
this.storage.clear();
```

#### NotificationService

Manages application-wide notifications.

**Usage:**

```typescript
import { NotificationService } from '@nxmfe/shared/services';

constructor(private notification: NotificationService) {}

// Show notifications
this.notification.success('Operation successful!');
this.notification.error('Something went wrong!');
this.notification.warning('Please be careful!');
this.notification.info('Here is some info');

// Subscribe to notifications
this.notification.notification$.subscribe(notification => {
  // Handle notification
});
```

---

## 🛡️ 4. Core Library

**Path:** `libs/shared/core`  
**Import:** `@nxmfe/shared/core`

### Purpose

Contains core functionality like guards, interceptors, and models.

### Guards

#### authGuard

Protects routes from unauthorized access.

**Usage:**

```typescript
import { authGuard } from '@nxmfe/shared/core';

const routes: Route[] = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
  },
];
```

### Interceptors

#### authInterceptor

Adds authentication token to HTTP requests.

#### httpErrorInterceptor

Handles HTTP errors globally.

**Usage in app.config.ts:**

```typescript
import { authInterceptor, httpErrorInterceptor } from '@nxmfe/shared/core';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([authInterceptor, httpErrorInterceptor]))],
};
```

### Models

#### User Models

```typescript
import { User, UserRole, UserProfile } from '@nxmfe/shared/core';
```

#### API Response Models

```typescript
import { ApiResponse, PaginatedResponse, ApiError } from '@nxmfe/shared/core';
```

---

## 🔄 5. Pipes Library

**Path:** `libs/shared/pipes`  
**Import:** `@nxmfe/shared/pipes`

### Purpose

Contains custom Angular pipes for data transformation.

### Pipes

#### TruncatePipe

Truncates strings to specified length.

**Usage:**

```typescript
import { TruncatePipe } from '@nxmfe/shared/pipes';

@Component({
  imports: [TruncatePipe],
  template: `{{ longText | truncate:50 }}`
})
```

#### TimeAgoPipe

Converts dates to "time ago" format.

**Usage:**

```typescript
import { TimeAgoPipe } from '@nxmfe/shared/pipes';

@Component({
  imports: [TimeAgoPipe],
  template: `{{ date | timeAgo }}`
})
```

#### SafeHtmlPipe

Sanitizes HTML content.

**Usage:**

```typescript
import { SafeHtmlPipe } from '@nxmfe/shared/pipes';

@Component({
  imports: [SafeHtmlPipe],
  template: `<div [innerHTML]="htmlContent | safeHtml"></div>`
})
```

---

## 📍 6. Directives Library

**Path:** `libs/shared/directives`  
**Import:** `@nxmfe/shared/directives`

### Purpose

Contains custom Angular directives for DOM manipulation and event handling.

### Directives

#### ClickOutsideDirective

Detects clicks outside an element.

**Usage:**

```typescript
import { ClickOutsideDirective } from '@nxmfe/shared/directives';

@Component({
  imports: [ClickOutsideDirective],
  template: `
    <div (clickOutside)="closeMenu()">
      Menu content
    </div>
  `
})
```

#### AutoFocusDirective

Automatically focuses an element.

**Usage:**

```typescript
import { AutoFocusDirective } from '@nxmfe/shared/directives';

@Component({
  imports: [AutoFocusDirective],
  template: `<input appAutoFocus />`
})
```

#### DebounceClickDirective

Debounces click events.

**Usage:**

```typescript
import { DebounceClickDirective } from '@nxmfe/shared/directives';

@Component({
  imports: [DebounceClickDirective],
  template: `
    <button
      (debounceClick)="handleClick()"
      [debounceTime]="500">
      Click me
    </button>
  `
})
```

---

## 📊 7. Constants Library

**Path:** `libs/shared/constants`  
**Import:** `@nxmfe/shared/constants`

### Purpose

Contains application-wide constants and configuration values.

### Constants

```typescript
import { APP_CONFIG, ROUTES, API_ENDPOINTS, LOCAL_STORAGE_KEYS, PAGINATION, VALIDATION, DATE_FORMATS, THEME } from '@nxmfe/shared/constants';

// Usage examples
const appName = APP_CONFIG.APP_NAME;
const loginRoute = ROUTES.DASHBOARD;
const apiUrl = API_ENDPOINTS.BASE_URL;
const pageSize = PAGINATION.DEFAULT_PAGE_SIZE;
```

---

## 🛠️ 8. Utils Library

**Path:** `libs/shared/utils`  
**Import:** `@nxmfe/shared/utils`

### Purpose

Contains pure utility functions for common operations.

### String Utils

```typescript
import { capitalize, toTitleCase, truncate, toKebabCase, toCamelCase, stripHtmlTags, isValidEmail, generateRandomString } from '@nxmfe/shared/utils';

// Usage
const title = toTitleCase('hello world'); // "Hello World"
const slug = toKebabCase('Hello World'); // "hello-world"
const isValid = isValidEmail('test@example.com'); // true
```

### Date Utils

```typescript
import { formatDate, getTimeAgo, isToday, addDays, daysDifference } from '@nxmfe/shared/utils';

// Usage
const formatted = formatDate(new Date(), 'long');
const timeAgo = getTimeAgo(new Date(Date.now() - 3600000)); // "1 hour ago"
const tomorrow = addDays(new Date(), 1);
```

### Array Utils

```typescript
import { unique, groupBy, sortBy, chunk, flatten, shuffle, sum, average } from '@nxmfe/shared/utils';

// Usage
const uniqueItems = unique([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
const grouped = groupBy(users, 'role');
const sorted = sortBy(users, 'name', 'asc');
const avg = average([1, 2, 3, 4, 5]); // 3
```

---

## 🎨 9. Styles Library

**Path:** `libs/shared/styles`  
**Import:** In SCSS files: `@use '@nxmfe/shared/styles' as *;`

### Purpose

Contains shared SCSS styles, variables, mixins, and Bootstrap configuration.

**Usage in component SCSS:**

```scss
@use '@nxmfe/shared/styles' as *;

.my-component {
  @include respond-to('mobile') {
    // Mobile styles
  }
}
```

---

## 📦 Import Paths

All libraries use scoped import paths for clean imports:

```typescript
// Layout Components (eager-loaded)
import { HeaderComponent } from '@nxmfe/shared/layout';

// UI Components (lazy-loaded)
import { NotFoundComponent } from '@nxmfe/shared/ui-components';

// Services
import { StorageService, NotificationService } from '@nxmfe/shared/services';

// Core
import { authGuard, User, ApiResponse } from '@nxmfe/shared/core';

// Pipes
import { TruncatePipe, TimeAgoPipe } from '@nxmfe/shared/pipes';

// Directives
import { ClickOutsideDirective, AutoFocusDirective } from '@nxmfe/shared/directives';

// Constants
import { APP_CONFIG, ROUTES } from '@nxmfe/shared/constants';

// Utils
import { capitalize, formatDate, unique } from '@nxmfe/shared/utils';
```

---

## 🚀 Benefits

### 1. **Code Reusability**

- Components, services, and utilities can be shared across multiple applications
- Reduces code duplication

### 2. **Maintainability**

- Single source of truth for shared functionality
- Easier to update and maintain

### 3. **Testability**

- Each library can be tested independently
- Better test coverage

### 4. **Scalability**

- Easy to add new libraries as the application grows
- Clear separation of concerns

### 5. **Type Safety**

- TypeScript interfaces and types shared across apps
- Better IDE support

### 6. **Build Optimization**

- Nx caching improves build times
- Only affected libraries are rebuilt

---

## 📝 Best Practices

### 1. Keep Libraries Focused

Each library should have a single, well-defined purpose.

### 2. Use Barrel Exports

Always export through `index.ts` for clean imports.

### 3. Document Everything

Add JSDoc comments to functions, classes, and interfaces.

### 4. Write Tests

Each library should have comprehensive unit tests.

### 5. Version Management

Consider versioning libraries for breaking changes.

### 6. Dependency Management

Minimize dependencies between libraries.

---

## 🔄 Adding New Items

### Adding a New Component to UI Components

```bash
# Create the component files in libs/shared/ui-components/src/lib/
# Then export it in libs/shared/ui-components/src/index.ts
export * from './lib/my-component/my-component.component';
```

### Adding a New Service

```bash
# Create the service in libs/shared/services/src/lib/
# Then export it in libs/shared/services/src/index.ts
export * from './lib/my-service.service';
```

### Adding a New Utility Function

```bash
# Create or add to existing util file in libs/shared/utils/src/lib/
# Then export it in libs/shared/utils/src/index.ts
export * from './lib/my-utils';
```

---

## 🎯 Migration Status

### Completed

- ✅ Created all shared libraries structure
- ✅ Created layout library for eager-loaded components
- ✅ Moved HeaderComponent to shared/layout
- ✅ Moved NotFoundComponent to shared/ui-components
- ✅ Created sample services (StorageService, NotificationService)
- ✅ Created sample pipes (TruncatePipe, TimeAgoPipe, SafeHtmlPipe)
- ✅ Created sample directives (ClickOutsideDirective, AutoFocusDirective, DebounceClickDirective)
- ✅ Created constants library with app constants
- ✅ Created utils library with string, date, and array utilities
- ✅ Created core library with guards, interceptors, and models
- ✅ Updated imports in application

### Application Pages (Kept in App)

The following are kept in the application as they are app-specific:

- ✅ Dashboard page (app-specific business logic)
- ✅ About page (app-specific content)
- ✅ Contact page (app-specific content)

---

## 📚 Documentation

- Architecture: This file
- Styles Library: `libs/shared/styles/INDEX.md`
- Quick Reference: `libs/shared/styles/QUICK_REFERENCE.md`

---

**Built with ❤️ using Nx Monorepo Architecture**
